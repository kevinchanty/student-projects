import {navSetup} from "../navbar/index.js";

let user;
let notice;

window.onload = async () => {
    await navSetup();
    await loadNoti();
    await locator();
    await userIcon();
    await noticePop();
}

async function noticePop() {
    const res = await fetch('/noti');
    notice = await res.json();
    console.log(notice);
    const noticeDiv = document.querySelector('.topbar .noti-ponds');
    noticeDiv.innerHTML = "";
    for (let noti of notice) {
        noticeDiv.innerHTML += `
        <div class="noti-cards">
        <div>
            <div class="tag">${noti.tag}</div>
            <div class="title"><b>${noti.title}</b></div>
            <i class="far fa-clock"></i>${noti.create_at}
        </div>
    </div>
    `}
}


async function loadNoti() {
    const res = await fetch('/noti');
    const notis = await res.json();
    const notiContainer = document.querySelector('.main')
    // notiContainer.innerHTML = "";

    for (let noti of notis) {
        notiContainer.innerHTML += `
    <div class="noti-cards">
        <div>
            <i class="far fa-trash-alt"></i>
        </div>
        <div>
            <div class="tag">${noti.tag}</div>
            <div class="title"><b>${noti.title}</b></div>
            <div class="message">${noti.message}</div>
        </div>
        <div>
            <i class="far fa-clock"></i>${noti.create_at}
        </div>
    </div>`
    }
}

async function getUser() {
    const result = await fetch('/userIcon');
    user = await result.json();
}

async function locator() {
    await getUser();
    let locatorDiv = document.querySelector('.locator');
    locatorDiv.innerHTML = "";
        locatorDiv.innerHTML += `
        <div>${user.username}</div>
        <i class="fas fa-chevron-right"></i>
        <div>Notification</div>
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
