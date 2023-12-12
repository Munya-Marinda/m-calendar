/* m-calendar.js */

class MCalendar {
  constructor(calendarContainer, props) {
    this.CALENDAR_HTML =
      '<div id="calendar-header"> <button id="prev-month-btn"> <svg style="transform: rotate(180deg)" fill="white" height="30px" width="30px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve" > <g id="SVGRepo_bgCarrier" stroke-width="0"></g> <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" ></g> <g id="SVGRepo_iconCarrier"> <g> <g> <path d="M256,0C114.844,0,0,114.839,0,256s114.844,256,256,256s256-114.839,256-256S397.156,0,256,0z M398.825,269.916 L213.273,392.998c-2.838,1.88-6.045,2.783-9.219,2.783c-5.404,0-10.709-2.621-13.927-7.469c-5.099-7.686-3-18.047,4.686-23.146 L359.381,256L194.813,146.835c-7.686-5.099-9.785-15.46-4.686-23.146c5.121-7.686,15.492-9.773,23.146-4.686l185.551,123.081 c4.664,3.093,7.469,8.317,7.469,13.916C406.294,261.599,403.488,266.823,398.825,269.916z" ></path> </g> </g> </g> </svg> </button> <h2 id="current-month-year">Month Year</h2> <button id="next-month-btn"> <svg fill="white" height="30px" width="30px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve" > <g id="SVGRepo_bgCarrier" stroke-width="0"></g> <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" ></g> <g id="SVGRepo_iconCarrier"> <g> <g> <path d="M256,0C114.844,0,0,114.839,0,256s114.844,256,256,256s256-114.839,256-256S397.156,0,256,0z M398.825,269.916 L213.273,392.998c-2.838,1.88-6.045,2.783-9.219,2.783c-5.404,0-10.709-2.621-13.927-7.469c-5.099-7.686-3-18.047,4.686-23.146 L359.381,256L194.813,146.835c-7.686-5.099-9.785-15.46-4.686-23.146c5.121-7.686,15.492-9.773,23.146-4.686l185.551,123.081 c4.664,3.093,7.469,8.317,7.469,13.916C406.294,261.599,403.488,266.823,398.825,269.916z" ></path> </g> </g> </g> </svg> </button> </div> <div id="calendar-days"> <div class="week-day-name" style="color: red">Sun</div> <div class="week-day-name">Mon</div> <div class="week-day-name">Tue</div> <div class="week-day-name">Wed</div> <div class="week-day-name">Thu</div> <div class="week-day-name">Fri</div> <div class="week-day-name">Sat</div> <div class="week-day-name-mobile" style="color: red">S</div> <div class="week-day-name-mobile">M</div> <div class="week-day-name-mobile">T</div> <div class="week-day-name-mobile">W</div> <div class="week-day-name-mobile">T</div> <div class="week-day-name-mobile">F</div> <div class="week-day-name-mobile">S</div> </div>  <div id="event-card-extra-parent"> <div id="event-card-extra-info-card"></div> </div> <div id="week-rows-parent"></div> ';

    this.CALENDARCONTAINER = calendarContainer;

    if (!this.validateDate()) {
      return false;
    }

    this.CALENDARCONTAINER.innerHTML = this.CALENDAR_HTML;
    this.EVENT_CARD_EXTRA_PARENT = document.getElementById(
      "event-card-extra-parent"
    );
    this.prevMonthBtn = calendarContainer.querySelector("#prev-month-btn");
    this.nextMonthBtn = calendarContainer.querySelector("#next-month-btn");
    this.currentMonthYear = document.getElementById("current-month-year");
    //
    this.events = props.events || [];
    //
    this.MONTH_NUMBER = new Date().getMonth() + 1;
    this.YEAR = new Date().getFullYear();
    //
    this.prevMonthBtn.addEventListener("click", () => {
      if (this.MONTH_NUMBER === 1) {
        this.MONTH_NUMBER = 12;
        this.YEAR--;
      } else if (this.MONTH_NUMBER <= 12) {
        this.MONTH_NUMBER--;
      }
      this.render();
    });

    this.nextMonthBtn.addEventListener("click", () => {
      if (this.MONTH_NUMBER === 12) {
        this.MONTH_NUMBER = 1;
        this.YEAR++;
      } else if (this.MONTH_NUMBER < 12) {
        this.MONTH_NUMBER++;
      }
      this.render();
    });

    this.EVENT_CARD_EXTRA_PARENT.addEventListener("click", () => {
      this.EVENT_CARD_EXTRA_PARENT.style.display = "none";
    });
  }

  render = () => {
    if (!this.validateDate()) {
      return false;
    }
    //
    try {
      const isMobile = window.innerWidth < 500 ? true : false;
      const month_data = this.getMonthData(this.MONTH_NUMBER, this.YEAR);

      this.currentMonthYear.innerHTML =
        this.getMonthName(this.MONTH_NUMBER - 1) + " " + this.YEAR;
      const calendar_week_row = document.getElementById("week-rows-parent");
      calendar_week_row.innerHTML = "";

      const filler_days = month_data[0].week_day_number - 1;
      let _week_row = document.createElement("div");
      _week_row.className = "week-row";

      if (filler_days > 0) {
        for (let i = 0; i < filler_days; i++) {
          const _filler_child = document.createElement("div");
          _filler_child.className = "week-row-day";
          _week_row.appendChild(_filler_child);
        }
      }

      month_data.forEach((day, index) => {
        const eventDay = this.isEventDay(day);
        //
        const _day_child = document.createElement("div");
        _day_child.className = "week-row-day";
        _day_child.style.border = this.isToday(day) ? "1px solid blue" : "";
        const _day_date = document.createElement("span");
        _day_date.innerHTML = day.day_number;
        if (day.week_day_number === 1) {
          _day_date.style.color = "red";
        }
        const _event_container = document.createElement("div");
        _event_container.className = this.isEventDay(day).result
          ? "event-card-parent"
          : "event-card-parent-2";
        _day_child.appendChild(_day_date);
        //
        eventDay.events.forEach((event, index) => {
          //
          const _event_child = document.createElement("div");
          _event_child.className = "event-card";
          _event_child.innerHTML =
            "<span class='event-card-text'>" +
            (event?.title?.length > 5 && isMobile
              ? event?.title.substring(0, 4) + "..."
              : event?.title) +
            "</span>";
          _event_child.style.backgroundColor = event?.background_color;
          _event_child.style.color = event?.color;
          //
          _event_child.addEventListener("click", () => {
            this.EVENT_CARD_EXTRA_PARENT.style.display = "flex";
            const HTML =
              '<div id="event-card-extra-info-card" style="background-color:' +
              event?.background_color +
              "; color: " +
              event?.color +
              ';">' +
              "<h3>" +
              this.formatDate(event?.start_date) +
              "</h3>" +
              "<h3>" +
              event?.title +
              "</h3>" +
              "<p>START DATE: <span>" +
              this.formatDate(event?.start_date) +
              "</span></p>" +
              "<p>END DATE: <span>" +
              this.formatDate(event?.end_date) +
              "</span></p>" +
              "</div>";
            this.EVENT_CARD_EXTRA_PARENT.innerHTML = HTML;
          });
          //
          _event_container.appendChild(_event_child);
          //
        });
        //
        _day_child.appendChild(_event_container);
        _week_row.appendChild(_day_child);
      });

      calendar_week_row.appendChild(_week_row);
      //
      setInterval(() => {
        const event_card_extra_parent = document.getElementById(
          "event-card-extra-parent"
        );
        event_card_extra_parent.style.height =
          this.CALENDARCONTAINER.clientHeight + "px";
        event_card_extra_parent.style.width =
          this.CALENDARCONTAINER.clientWidth + "px";
      }, 1000);
    } catch (e) {
      console.error("ERROR: " + e.message);
    }
    //
  };

  getMonthData(monthNumber, year) {
    const daysInMonth = new Date(year, monthNumber, 0).getDate();
    const monthStart = new Date(year, monthNumber - 1, 1);
    const monthStartDay = monthStart.getDay(); // 0 is Sunday, 1 is Monday, etc.

    const monthData = [];

    // Create objects for each day in the month
    for (let i = 1; i <= daysInMonth; i++) {
      const dayNumber = i;
      const dayIndex = (monthStartDay + i - 1) % 7;
      const weekDayName = this.getDayName(dayIndex);
      const day_data = new Date(year, monthNumber - 1, dayNumber);

      monthData.push({
        day_number: dayNumber,
        week_day_name: weekDayName,
        week_day_number: dayIndex + 1,
        day_data: day_data,
      });
    }

    return monthData;
  }

  getDayName(dayIndex) {
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    return daysOfWeek[dayIndex];
  }

  getMonthName = (index) => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    return months[index];
  };

  isEventDay = (day) => {
    let RESULT = false;
    let EVENTS = [];
    //
    this.events.forEach((event, index) => {
      const YEAR_BOOL =
        new Date(
          this.YEAR + "-" + this.MONTH_NUMBER + "-" + day.day_number
        ).getFullYear() === new Date(event.start_date).getFullYear();
      const MONTH_BOOL =
        new Date(
          this.YEAR + "-" + this.MONTH_NUMBER + "-" + day.day_number
        ).getMonth() === new Date(event.start_date).getMonth();
      const DAY_BOOL =
        new Date(
          this.YEAR + "-" + this.MONTH_NUMBER + "-" + day.day_number
        ).getDate() === new Date(event.start_date).getDate();
      //
      if (YEAR_BOOL && DAY_BOOL && MONTH_BOOL) {
        RESULT = true;
        EVENTS.push(event);
      }
    });
    return { result: RESULT, events: EVENTS };
  };

  isToday = (day) => {
    //
    const YEAR_BOOL =
      new Date(
        this.YEAR + "-" + this.MONTH_NUMBER + "-" + day.day_number
      ).getFullYear() === new Date().getFullYear();
    const MONTH_BOOL =
      new Date(
        this.YEAR + "-" + this.MONTH_NUMBER + "-" + day.day_number
      ).getMonth() === new Date().getMonth();
    const DAY_BOOL =
      new Date(
        this.YEAR + "-" + this.MONTH_NUMBER + "-" + day.day_number
      ).getDate() === new Date().getDate();
    //
    return YEAR_BOOL && MONTH_BOOL && DAY_BOOL;
  };

  formatDate(inputDate) {
    const months = [
      "JANUARY",
      "FEBRUARY",
      "MARCH",
      "APRIL",
      "MAY",
      "JUNE",
      "JULY",
      "AUGUST",
      "SEPTEMBER",
      "OCTOBER",
      "NOVEMBER",
      "DECEMBER",
    ];

    const date = new Date(inputDate);
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    return `${day} ${month} ${year}`;
  }

  //
  validateDate() {
    if (
      this.CALENDARCONTAINER === undefined ||
      this.CALENDARCONTAINER === null ||
      typeof this.CALENDARCONTAINER !== "object"
    ) {
      console.error("Parent DIV is not defined.");
      return false;
    }
    return true;
  }
}
