import { navSetup } from "../navbar/index.js";

let id = 0;
let journals;
let user;
getJournalId();

window.onload = () => {
    navSetup();
    chart1();
    chart2();
    chart3();
    chart4();
    chart5();
    chart6();
    updateSavingAmount();
    updateYearlySavingAmount();
    addUser();
    locator();
    userIcon();
    let forms = document.querySelectorAll('form');
    for (let i = 0; i < forms.length; i++) {
        forms[i].reset();
    }
}

function randomColor() {
    return '#' + Math.random().toString(16).substr(2, 6);
}

// Get ID of Journals
function getJournalId() {
    let url = window.location.href;
    let getQuery = url.split('?')[1];
    id = getQuery.split('&')[0].split('=')[1];
    // params is ['param1=value', 'param2=value2'] 
}

// Get Transactions Data (Monthly chart)
async function getTransactions(income, period) {
    let result = await fetch(`/transactions-chart?income=${income}&journal=${id}&period=${period}`)
    let output = await result.json();
    return output;
}
async function getTransactions12(income) {
    let result = await fetch(`/transactions-monthly12/?income=${income}&journal=${id}`)
    let output = await result.json();
    return output;
}

// chart 1
async function chart1() {
    let chart1 = document.getElementById('Chart1').getContext('2d');
    let data = await getTransactions("true", "month");

    let barChart1 = new Chart(chart1, {
        type: 'bar',
        data: {
            labels: data.groups,
            datasets: [{
                label: 'Monthly - Income',
                // barPercentage: 0.5,
                barThickness: 20,
                data: data.sum,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
};


// chart 2
async function chart2() {
    let chart2 = document.getElementById('Chart2').getContext('2d');
    let data = await getTransactions("false", 'month');

    let barChart2 = new Chart(chart2, {
        type: 'bar',
        data: {
            labels: data.groups,
            datasets: [{
                label: 'Monthly - Expense',
                barThickness: 20,
                data: data.sum,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// chart 3
async function chart3() {
    let data = await getTransactions12(true)
    let chart3 = document.getElementById('Chart3').getContext('2d');
    let barChart3 = new Chart(chart3, {
        type: 'line',
        data: {
            labels: data.labels,
            datasets: [{
                label: 'Monthly Income',
                data: data.amount,
                fill: false,
                borderColor: ['rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'],
                tension: 0.1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    })
};

// chart 4
async function chart4() {
    let data = await getTransactions12(false)
    let chart4 = document.getElementById('Chart4').getContext('2d');
    let barChart3 = new Chart(chart4, {
        type: 'line',
        data: {
            labels: data.labels,
            datasets: [{
                label: 'Monthly Expense',
                data: data.amount,
                fill: false,
                borderColor: ['rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'],
                tension: 0.1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    })
};

// Update saving in this month
async function updateSavingAmount() {
    let incomeResult = await fetch(`/transactions-monthly?income=${true}&journal=${id}`);
    let expenseResult = await fetch(`/transactions-monthly?income=${false}&journal=${id}`);
    let income = parseFloat((await incomeResult.json()).sum);
    let expense = parseFloat((await expenseResult.json()).sum);

    let incomeEle = document.querySelector('.income-amount');
    let expenseEle = document.querySelector('.expense-amount');
    let savingEle = document.querySelector('.saving-amount');

    incomeEle.innerHTML = "$" + income;
    expenseEle.innerHTML = "$" + expense;
    savingEle.innerHTML = "$" + (income - expense);
}

async function updateYearlySavingAmount() {
    let incomeResult = await fetch(`/transactions-yearly?income=${true}&journal=${id}`);
    let expenseResult = await fetch(`/transactions-yearly?income=${false}&journal=${id}`);
    let income = parseFloat((await incomeResult.json()).sum);
    let expense = parseFloat((await expenseResult.json()).sum);

    let incomeEle = document.querySelector('.y-income-amount');
    let expenseEle = document.querySelector('.y-expense-amount');
    let savingEle = document.querySelector('.y-saving-amount');

    incomeEle.innerHTML = "$" + income;
    expenseEle.innerHTML = "$" + expense;
    savingEle.innerHTML = "$" + (income - expense);
}

// chart 5
async function chart5() {
    let chart = document.getElementById('Chart5').getContext('2d');
    let data = await getTransactions("true", "year");

    let barChart1 = new Chart(chart, {
        type: 'bar',
        data: {
            labels: data.groups,
            datasets: [{
                label: data.groups,
                // barPercentage: 0.5,
                barThickness: 20,
                data: data.sum,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
};

// chart 6
async function chart6() {
    let chart = document.getElementById('Chart6').getContext('2d');
    let data = await getTransactions("false", "year");

    let barChart1 = new Chart(chart, {
        type: 'bar',
        data: {
            labels: data.groups,
            datasets: [{
                label: 'Yearly - Expense',
                // barPercentage: 0.5,
                barThickness: 20,
                data: data.sum,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
};

async function addUser() {

    document.querySelector('#form-add').addEventListener('submit', async (event) => {
        event.preventDefault();
        const messageEle = document.querySelector('#response')
        const form = event.target
        const dataObj = {
            user: form.username.value,
            journal: id
        }

        const res = await fetch('/journal-member', {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify(dataObj)
        });
        const result = await res.json();

        if (res.status == 200) {
               messageEle.innerHTML = result.msg
        }else {
            messageEle.innerHTML = result.msg
        }

    })
}


async function getUser() {
    const result = await fetch('/userIcon');
    user = await result.json();
    console.log(user.username);
};

async function locator() {
    await getUser();
    let locatorDiv = document.querySelector('.locator>div>span');
    locatorDiv.innerHTML = "";
        locatorDiv.innerHTML += `
        <span>${user.username}</span>
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