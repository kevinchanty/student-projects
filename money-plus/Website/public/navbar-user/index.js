export function navSetup() {
    let btn = document.querySelector('#hide');
    let sidebar = document.querySelector('.sidebar');
    let searchBtn = document.querySelector(".fa-search");

    btn.onclick = () => {
        sidebar.classList.toggle("active");
    };

    searchBtn.onclick = () => {
        sidebar.classList.toggle("active");
    };
}

navSetup();


let user;
// let iconArr = ["Edgar Gaming.png", "pig-bank.png", "Nyan Cat.gif"];


async function getUser() {
    const result = await fetch('/userIcon');
    user = await result.json();
    console.log(user.username);
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
userIcon();

