import { navSetup } from "../navbar/index.js";

let transactions = [];
let user;

// Get Transactions Data
async function getTransactions() {
    const result = await fetch('/transactions-home');
    transactions = await result.json();
};

// Arrange Div HTML
async function addChartDiv() {
    // await getExpense();
    // await getIncome();
    let chartPond = document.querySelector('.chart-pond');
    chartPond.innerHTML = "";
    for (let i = 0; i < transactions.length; i++) {
        chartPond.innerHTML += `
        <div class="col-lg-4">
            <div class="dashboard-cards">
            <div id="canvas${i}" name="data-chart">
            <canvas id="Chart${[i]}"></canvas>
            </div>
            </div>
        </div>
        `
    }
    // loadCharts();
}

window.onload = async (event) => {
    navSetup();
    await getTransactions();
    await addChartDiv();
    await loadCharts();
    await locator();
    await userIcon();
    await formSetup();
};

// Calling Chart.js Functions
async function loadCharts() {
    // await getExpense();
    // await getIncome();
    for (let i = 0; i < transactions.length; i++) {
        const doughnut = document.getElementById(`Chart${i}`).getContext('2d');
        const doughnutChart = new Chart(doughnut, {
            type: 'doughnut', // Chart types
            data: {
                labels: transactions[i].groups, //Data name
                datasets: [{
                    data: transactions[i].sum,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)',

                        'rgba(255, 74, 211, 0.2)',
                        'rgba(136, 53, 230, 0.2)',
                        'rgba(112, 138, 250, 0.2)',
                        'rgba(91, 203, 227, 0.2)',
                        'rgba(100, 251, 176, 0.2)',
                        'rgba(250, 309, 87, 0.2)'
                    ] ,
                        
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)',
                        'rgba(255, 74, 211, 1)',
                        'rgba(136, 53, 230, 1)',
                        'rgba(112, 138, 250, 1)',
                        'rgba(91, 203, 227, 1)',
                        'rgba(100, 251, 176, 1)',
                        'rgba(250, 309, 87, 1)'

                    ],
                    hoverOffset: 10,
                    borderWidth: 1,
                }]
            },
            options: {
                layout: {
                    padding: 20,
                    margin: 30
                },
                plugins: {
                    title: {
                        display: true,
                        text: `Chart ${i + 1}`
                    },
                    legend: {
                        position: 'bottom'
                    }
                },
            },
        });
    }
}

// Hover Function, BROKENNNNN
function handleHover(evt, item, legend) {
    legend.chart.data.datasets[0].backgroundColor.forEach((color, index, colors) => {
        colors[index] = index === item.index || color.length === 9 ? color : color + '4D';
    });
    legend.chart.update();
}

// Hover Function, BROKENNNNN2
function handleLeave(evt, item, legend) {
    legend.chart.data.datasets[0].backgroundColor.forEach((color, index, colors) => {
        colors[index] = color.length === 9 ? color.slice(0, -2) : color;
    });
    legend.chart.update();
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
        <div>Dashboard</div>
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

async function formSetup() {
    document.querySelector('#new-journal-form').addEventListener("submit", async (event) => {
        event.preventDefault();

        const form = event.target;

        const formInfo = {
            name: form.name.value,
            modules_id: form.modules.value,
            description: form.description.value,
            goals: form.goals.value,
        }

        console.log(formInfo);

        const res = await fetch('/insertJournal', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formInfo)
        });
        // const result = await res.json();
        if (res.status === 200) {
            window.location = '/home'
        }

    });
}
