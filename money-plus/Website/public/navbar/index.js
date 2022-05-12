export function navSetup() {
    let btn = document.querySelector('#hide');
    let sidebar = document.querySelector('.sidebar');
    let searchBtn = document.querySelector(".fa-search");
    let notiBtn = document.querySelector(".icons.noti");
    let notiPopup = document.querySelector(".noti-popup");
    let logOutBtn = document.querySelector("#log_out")

    
    btn.onclick = () => {
        sidebar.classList.toggle("active");
    };
    
    searchBtn.onclick = () => {
        sidebar.classList.toggle("active");
    };

    notiBtn.onclick = (event) => {
        if (event.target != notiPopup) {
            notiPopup.classList.toggle("active")
        }
    }

    logOutBtn.onclick = () => {
        console.log("fk");
        window.location = "/logout"
    }

    if (window.innerWidth < 650) {
        sidebar.classList.remove("active")
    };

    window.addEventListener('resize', (event) => {
        console.log(window.innerWidth);
        if (window.innerWidth < 650) {
            sidebar.classList.remove("active")
        }
    })

    noticePop();
}

window.onload = () => {
    navSetup();
    noticePop();
}

async function noticePop() {
    const res = await fetch('/noti');
    const notice = await res.json();
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

