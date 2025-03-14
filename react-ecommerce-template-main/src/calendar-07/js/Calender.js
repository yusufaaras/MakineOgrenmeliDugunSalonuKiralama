class Calendar {
    constructor(selector, options) {
        this.options = options;
        this.today = new Date();
        this.year = this.today.getFullYear();
        this.month = this.today.getMonth();
        this.monthTag = [
            "January", "February", "March", "April", "May", "June", "July",
            "August", "September", "October", "November", "December"
        ];
        this.day = this.today.getDate();
        
        const calendarTable = document.querySelector("#calendar-table");
        if (calendarTable) {
            this.days = calendarTable.getElementsByTagName('td');
            this.daysLen = this.days.length;
        } else {
            console.error("Takvim tablosu bulunamadı.");
            return;
        }

        this.selectedDay = null;
        this.setDate = null;
        this.draw();
    }

    draw() {
        this.getCookie('selected_day');
        this.getOptions();
        this.drawDays();
        const reset = document.getElementById('reset');
        const pre = document.getElementsByClassName('pre-button');
        const next = document.getElementsByClassName('next-button');

        if (pre[0]) pre[0].addEventListener('click', () => this.preMonth());
        if (next[0]) next[0].addEventListener('click', () => this.nextMonth());
        if (reset) reset.addEventListener('click', () => this.reset());

        for (let i = 0; i < this.daysLen; i++) {
            this.days[i].addEventListener('click', () => this.clickDay(this.days[i]));
        }
    }

    drawHeader(e) {
        const headDay = document.getElementsByClassName('head-day');
        const headMonth = document.getElementsByClassName('head-month');

        if (headDay[0]) headDay[0].innerHTML = e || this.day;
        if (headMonth[0]) headMonth[0].innerHTML = `${this.monthTag[this.month]} - ${this.year}`;
    }

    drawDays() {
        const startDay = new Date(this.year, this.month, 1).getDay();
        const nDays = new Date(this.year, this.month + 1, 0).getDate();
        let n = startDay;

        for (let k = 0; k < 42; k++) {
            this.days[k].innerHTML = '';
            this.days[k].id = '';
            this.days[k].className = '';
        }

        for (let i = 1; i <= nDays; i++) {
            this.days[n].innerHTML = i;
            n++;
        }

        for (let j = 0; j < 42; j++) {
            if (this.days[j].innerHTML === "") {
                this.days[j].id = "disabled";
            } else if (j === this.day + startDay - 1) {
                if ((this.options && (this.month === this.setDate.getMonth()) && (this.year === this.setDate.getFullYear())) ||
                    (!this.options && (this.month === this.today.getMonth()) && (this.year === this.today.getFullYear()))) {
                    this.drawHeader(this.day);
                    this.days[j].id = "today";
                }
            }

            if (this.selectedDay) {
                if ((j === this.selectedDay.getDate() + startDay - 1) &&
                    (this.month === this.selectedDay.getMonth()) &&
                    (this.year === this.selectedDay.getFullYear())) {
                    this.days[j].className = "selected";
                    this.drawHeader(this.selectedDay.getDate());
                }
            }
        }
    }
}

window.Calendar = Calendar; 
export default Calendar;

document.addEventListener('DOMContentLoaded', () => {
    new Calendar("#calendar-table", "2024-03-14");
});
