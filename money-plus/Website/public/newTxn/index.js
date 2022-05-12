import { navSetup } from "../navbar/index.js"

let user;

window.onload = () => {
    navSetup();
    setUp();
    locator();
    userIcon();
}

function setUp() {
    // Form Reset
    document.querySelector('form').reset();

    // Income / Expense Listener => update Item selections
    const incomeForm = document.querySelector('#income-expense');
    incomeForm.addEventListener('change', () => {
        updateItems(incomeForm.value);
    });

    // Item Form Listener => update Description selections
    const itemForm = document.querySelector('#item');
    const descForm = document.querySelector('#description');

    itemForm.addEventListener('change', () => {
        if (incomeForm.value === "Expense") {
            updateDesc('Expense', itemForm.value);
        } else {
            updateDesc('Income', itemForm.value);
            descForm.style.display = "none"
        }
    });

    // Load Journals
    updateJournals();
}

// Fetch User's Journals from Server
async function getJournals() {
    let result = await fetch(`/userJournals/`);
    return await result.json();
};

// Update Journal List HTML
async function updateJournals() {
    let list = await getJournals();
    console.log("list",list);
    const journalForm = document.querySelector('#journals');
    for (let i = 0; i < list.name.length; i++) {
        journalForm.innerHTML += `
        <option value = "${list['id'][i]}">${list['name'][i]}</option>`
    }
}

// Fetch Item List From Server
async function getItems(type) {
    let result = await fetch(`/category-item/${type}`);
    return await result.json();
};

// Update Item List HTML
async function updateItems(type) {
    let lists = await getItems(type);
    const itemForm = document.querySelector('#item');
    itemForm.innerHTML = "";
    for (let item of lists) {
        itemForm.innerHTML += `
        <option value = "${item.groups}">${item.groups}</option>`
    }
}

// // Fetch Description from Server (Amended categories Routes, call data from SQL at once)
// async function getDesc(type) {
//     let result = await fetch(`/category-descriptions/${type}`);
//     return await result.json();
// }



// Update Description List HTML
async function updateDesc(type, item) {
    let lists = await getItems(type);
    const descForm = document.querySelector('#description');
    descForm.innerHTML = ""


    for (let list of lists) {
        if (list.groups === item) {
            for (let k = 0; k < list.name.length; k++) {
                descForm.innerHTML += `
                    <option value = "${list.id[k]}">${list.name[k]}</option>`
            }
        }
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
        <div>New Transaction</div>
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


// INSERT INTO transactions (users_id, journals_id, categories_id, date, amount)
//     VALUES (2,1,59,'2021-08-28',4);


// new transaction form submission
document.querySelector('#tranx-form').
    addEventListener('submit', async function (event) {
        event.preventDefault();

        const form = event.target;

        const tranxFormObj = {
            journalsId: form.journals.value,
            categoriesId: form.description.value,
            txnDate: form.transactionDate.value,
            amount: form.amount.value
        }

        const res = await fetch('/newTransactions', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(tranxFormObj)
        });

        const result = await res.json();
        if (res.status === 200) {
            window.location = '/newTxn'
        } else {
            document.querySelector('#errorAlert-container')
                .innerHTML = `<div class="alert alert-danger" role="alert">Incomplete form submitted. Please check and try again!</div>`;
        }
    });