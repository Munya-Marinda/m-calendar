# MCalendar

MCalendar is a lightweight JavaScript library for easily integrating a customizable calendar into your web projects. It provides an intuitive interface to display events, deadlines, meetings, or any other date-related information. MCalendar is designed with simplicity and flexibility in mind, making it easy to use and customize according to your needs.

## Getting Started

To use MCalendar, follow these simple steps:

1. **Include Stylesheet**: Link to the MCalendar stylesheet in the `<head>` of your HTML file.

   ```html
   <link rel="stylesheet" href="m-calendar.css" />
   ```

2. **Create a Container**: Add a `<div>` with the ID "calendar-container" where you want the calendar to appear.

   ```html
   <div id="calendar-container"></div>
   ```

3. **Include JavaScript**: Link to the MCalendar JavaScript file just before the closing `</body>` tag.

   ```html
   <script src="m-calendar.js"></script>
   ```

4. **Initialize MCalendar**: Use JavaScript to create an instance of MCalendar and pass your configuration.

   ```html
   <script>
     document.addEventListener("DOMContentLoaded", function () {
       const calendarContainer = document.getElementById("calendar-container");
       const mcalendar = new MCalendar(calendarContainer, {
         events: [
           // Add your events here
         ],
       });
       mcalendar.render();
     });
   </script>
   ```

## Configuration

MCalendar is highly configurable. You can customize the appearance and behavior by providing options in the configuration object. For example:

```javascript
const mcalendar = new MCalendar(calendarContainer, {
  events: [
    // Your events here
  ],
  // Additional configuration options go here
});
```

## Event Structure

Events are structured as objects with specific properties:

- `title`: The title of the event.
- `start_date`: The start date and time of the event.
- `end_date`: The end date and time of the event.
- `color`: The text color of the event.
- `background_color`: The background color of the event.

Feel free to contribute, report issues, or customize the code to suit your project's needs. Enjoy using MCalendar!
