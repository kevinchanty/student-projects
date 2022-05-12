import { navSetup } from "../navbar/index.js"

navSetup();

let journals;
let user;

window.onload = async function() {
    await getJournals();
    await addCardDiv();
    await locator();
    await userIcon();
};

async function getJournals(req, res) {
    const result = await fetch('/getJournals');
    journals = await result.json();
    console.log(journals);
};

async function addCardDiv() {
    await getJournals();
    console.log(journals);
    let cardBox = document.querySelector('.journals-card-groups');
    cardBox.innerHTML = "";
    for (let i = 0; i < journals.length; i++) {
        cardBox.innerHTML += `
        <div class="col-md-3" style="margin-bottom:10px;">
            <div class="card border-secondary">
                <div class="card-header bg-transparent border-secondary">Journals</div>
                <img src="Asset 11@4x.png">
                <div class="card-body text-secondary">
                    <h5 class="card-title">${journals[i].name}</h5>
                    <p>${journals[i].description}</p>
                    <p class="card-text">${journals[i].goals}</p>
                </div>
                <div class="card-footer bg-transparent border-secondary">
                    <a href="/journal?id=${journals[i].jid}" class="btn btn-secondary">Go</a>
                </div>
            </div>
        </div>
        `
    }
};

async function getUser() {
    const result = await fetch('/userIcon');
    user = await result.json();
    console.log(user.username);
};

async function locator() {
    await getUser();
    let locatorDiv = document.querySelector('.locator');
    locatorDiv.innerHTML = "";
        locatorDiv.innerHTML += `
        <div>${user.username}</div>
        <i class="fas fa-chevron-right"></i>
        <div>My Journals</div>
    `
};


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
};
