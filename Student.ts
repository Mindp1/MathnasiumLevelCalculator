class StartEndDatePair {
    startDate: Date;
    endDate: Date;
    daysOnHold: number;

    constructor(start: Date, end: Date, holdDays: number) {
        this.startDate = new Date(start.valueOf());
        this.endDate = new Date(end.valueOf());
        this.daysOnHold = holdDays;
    }
}

class Student {
    private EnrollmentPeriods: StartEndDatePair[];
    private invalidEnrollment: boolean;
    private monthsEnrolled: number;
    private level: number;


    constructor(start?: Date, end?: Date, holdDays?: number) {
        this.EnrollmentPeriods = [];
        this.invalidEnrollment = false;
        this.monthsEnrolled = 0;
        this.level = 1;
        if (start && end && holdDays) {
            if (start.valueOf() < end.valueOf()) {
                this.EnrollmentPeriods.push(new StartEndDatePair(start, end, holdDays));
                this.calculateMonthsEnrolled();
                this.calculateLevel();
            } else {
                this.invalidEnrollment = true;
            }
        }
    }

    get hasInvalidEnrollment() {
        return this.invalidEnrollment;
    }

    get getMonthsEnrolled() {
        return this.monthsEnrolled;
    }

    addEnrollment(start: Date, end: Date, holdDays: number) {
        if (start.getTime() < end.getTime()) {
            this.EnrollmentPeriods.push(new StartEndDatePair(start, end, holdDays));
            this.calculateMonthsEnrolled();
            this.calculateLevel();
        } else {
            this.invalidEnrollment = true;
        }
    }

    get getLevel() {
        return this.level;
    }

    calculateMonthsEnrolled() {
        this.monthsEnrolled = 0;
        this.EnrollmentPeriods.forEach(enrollmentPeriod => {


            let diffInMonths = enrollmentPeriod.endDate.getMonth() - enrollmentPeriod.startDate.getMonth()
                + (12 * (enrollmentPeriod.endDate.getFullYear() - enrollmentPeriod.startDate.getFullYear()));

            this.monthsEnrolled += diffInMonths;
            this.monthsEnrolled -= Math.floor(enrollmentPeriod.daysOnHold / 30);

            //Bring back if current logic doesn't work
            /*const temp = new Date(enrollmentPeriod.startDate.valueOf());
            if (temp.getDate() > 7) {
                temp.setMonth(temp.getMonth() + 1);
            }
            while (temp.getMonth() !== enrollmentPeriod.endDate.getMonth() || temp.getFullYear() !== enrollmentPeriod.endDate.getFullYear()) {
                this.monthsEnrolled++;
                temp.setMonth(temp.getMonth() + 1);
            }
            if (enrollmentPeriod !== this.EnrollmentPeriods[this.EnrollmentPeriods.length - 1]) {
                this.monthsEnrolled++;
            }
            this.monthsEnrolled -= Math.floor(enrollmentPeriod.daysOnHold / 30);*/
        })
    }

    calculateLevel() {
        this.level = Math.floor(this.monthsEnrolled / 6) + 1;
    }

    get dateForNextLevel() {
        let temp = new Date(this.EnrollmentPeriods[this.EnrollmentPeriods.length - 1].endDate.valueOf());
        temp.setMonth(temp.getMonth() + (6-(this.monthsEnrolled%6)));
        return temp;
    }

    get nextLevel() {
        return this.level + 1;
    }

    get dateForNextNextLevel() {
        let temp = new Date(this.EnrollmentPeriods[this.EnrollmentPeriods.length - 1].endDate.valueOf());
        temp.setMonth(temp.getMonth() + (12-(this.monthsEnrolled%6)));
        return temp;
    }

    get nextNextLevel() {
        return this.level + 2;
    }
}