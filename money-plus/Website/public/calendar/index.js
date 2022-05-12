import { navSetup } from "../navbar/index.js";

window.onload = async () => {
  await navSetup();
  await locator();
  await userIcon();
}


let calendar = {};
let events = [];
let user;

document.addEventListener('DOMContentLoaded', function () {
  const calendarEl = document.getElementById('calendar');

  calendar = new FullCalendar.Calendar(calendarEl, {
    themeSystem: 'lumen',
    initialView: 'dayGridMonth',
    duration: { weeks: 5 },
    initialDate: new Date(),
    selectable: true,
    editable: true,
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,listMonth',
      close: 'fa-times',
      prev: 'fa-angle-left',
      next: 'fa-angle-right',
      prevYear: 'fa-angle-double-left',
      nextYear: 'fa-angle-double-right'
    },
    // eventDidMount: function(info) {
    //   let tooltip = createPopper(info.el,{
    //     title: 'info.event.amount',
    //     placement: 'top',
    //     trigger: 'hover',
    //     container: 'body'
    //   });
    // },
    displayEventTime: false,
    // dateClick: function (info) {
    //   alert('clicked ' + info.dateStr);
    // },
    // select: function (info) {
    //   alert('selected ' + info.startStr + ' to ' + info.endStr);
    // },

    // dateClick: dateClickCallback,

    // VVVVVVVVV bomb
    // dateClick: function(info) {
    //   const input = prompt('Clicked on: ' + info.dateStr);
    //   console.log(input);// date
    //   info.dayEl.style.backgroundColor = 'red';
    //   info.push(
    //     events [
    //       {
    //         title: input,
    //         start: info.dateStr,
    //       }

    //     ]), 
    //   // alert('Coordinates: ' + info.jsEvent.pageX + ',' + info.jsEvent.pageY);// mouse x + y
    //   // alert('Current view: ' + info.view.type); 
    //   // change the day's background color just for fun
    // },
    events: [],
    height: 'auto',
  });

  calendar.render();
  getEvent();
});



function dateClickCallback(info) {
  console.log(info);
  const title = prompt('Please Insert Transaction Title');
  const amount = prompt('Please Insert Transaction Amount') * 100;
  console.log(info);
  calendar.addEvent({
    title: title,
    start: info.dateStr,
  });
}



async function getEvent() {
  events = await (await fetch('/transactions-calendar')).json()
  console.log(events);

  let tranxAmounts;

  function capitalize (str){
    const lower = str.toLowerCase ()
    return str.charAt(0).toUpperCase () + lower.slice(1)
  }

  for (let event of events) {
    if (event.is_income == false) {
      tranxAmounts = '-' + event.amount
      console.log(tranxAmounts)
    } else {
      tranxAmounts = event.amount
    }
      calendar.addEvent({
        title: capitalize(event.groups) + "\n" + ":" + "\n" + tranxAmounts,
        display: "block",
        date: event.date,
        // color: '#E03728'
        color: tranxAmounts >= 0 ? '#9AC6CE':'#eb8e86' 
      })
    }
}



// events: [
//   {
//     title: 'All Day Event',
//     start: '2021-07-01'
//   },
//   {
//     title: 'Long Event',
//     start: '2021-07-07',
//     end: '2021-07-10'
//   },
// ],

async function getUser() {
  const result = await fetch('/userIcon');
  user = await result.json();
  console.log(user.username);
}

async function locator() {
  await getUser();
  let locatorDiv = document.querySelector('.locator');
  locatorDiv.innerHTML = "";
      locatorDiv.innerHTML += `
      <div>${user.username}</div>
      <i class="fas fa-chevron-right"></i>
      <div>Calendar</div>
  `
}

async function userIcon() {
  await getUser();
  let iconDiv = document.querySelector('.profile_details2');
  iconDiv.innerHTML = "";
      iconDiv.innerHTML += `
      <img src="/src/profile-pic/${user.image}">
      <div class="profile-tag">
          <div class="name2">Hi~ ${user.username}</div>
      </div>
  `
}

