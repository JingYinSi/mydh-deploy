const dates= {
    day: {
        yesterday: {
            date: function () {
                let now = new Date();
                now.setDate(now.getDate() - 1);
                return now;
            },
            begin: function () {
                return new Date(this.date().setHours(0, 0, 0, 0));
            },
            end: function () {
                return new Date(this.date().setHours(23, 59, 59, 999));
            }
        },
        today: {
            date: function () {
                return new Date();
            },
            begin: function () {
                return new Date(this.date().setHours(0, 0, 0, 0));
            },
            end: function () {
                return new Date(this.date().setHours(23, 59, 59, 999));
            }
        },
        tomorrow: {
            date: function () {
                let now = new Date();
                now.setDate(now.getDate() + 1);
                return now;
            },
            begin: function () {
                return new Date(this.date().setHours(0, 0, 0, 0));
            },
            end: function () {
                return new Date(this.date().setHours(23, 59, 59, 999));
            }
        },
    },
    week: {
        firstDay: {
            date: function () {
                const now = new Date();
                const day = now.getDay(),
                    diff = now.getDate() - day + (day == 0 ? -6 : 1); // adjust when day is sunday
                return new Date(now.setDate(diff))
            },
            begin: function () {
                return new Date(this.date().setHours(0, 0, 0, 0));
            },
            end: function () {
                return new Date(this.date().setHours(23, 59, 59, 999));
            }
        }
    },
    month: {
        firstDay: {
            date: function () {
                const now = new Date();
                return new Date(now.getFullYear(), now.getMonth(), 1,now.getHours(),now.getMinutes(),now.getSeconds(),now.getMilliseconds());
            },
            begin: function () {
                return new Date(this.date().setHours(0, 0, 0, 0));
            },
            end: function () {
                return new Date(this.date().setHours(23, 59, 59, 999));
            }
        }
    }
};