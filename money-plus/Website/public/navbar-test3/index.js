let btn = document.querySelector('#btn');
let sidebar = document.querySelector('.sidebar');
let searchBtn = document.querySelector(".fa-search");

btn.onclick = () => {
    sidebar.classList.toggle("active");
};

searchBtn.onclick = () => {
    sidebar.classList.toggle("active");
};