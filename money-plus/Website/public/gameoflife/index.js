import {navSetup} from "../navbar/index.js";

window.onload = () => {
    navSetup();
    locator();
    userIcon();
}


let user;

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
        <div>Game Of Life</div>
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
