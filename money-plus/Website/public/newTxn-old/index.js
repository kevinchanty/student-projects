import {navSetup} from "../navbar/index.js"

window.onload = () =>{
    navSetup();
    main();
}

async function incomeItemArray() {
    let res = await fetch (`/incomeItemGroup`)
    let incomeItemA = await res.json();
    let arr = []
    console.log("asfjd;lasfj",incomeItemA)
    for (let i = 0; i <incomeItemA.length; i++){
        arr.push(incomeItemA[i].groups)
    }
    // console.log("function incomeItemArray:", arr)
    return arr;
};

async function expenseItemArray() {
    let res = await fetch (`/expItemGroup`)
    let expenseItemA = await res.json();
    let arr = []
    console.log(expenseItemA)
    for (let i = 0; i < expenseItemA.length; i++){
        // console.log (expenseItemA[i].groups)
        arr.push(expenseItemA[i].groups);
    }
    // console.log("function expenseItemArray:", arr)
    return arr;
    //let a = expenseItemA.map( e => {return e.groups});
    //return a;
};

// !!!!!!!!!!!!! others should be the latest
// income item the last

async function main(){
    let incomeItemArr = await incomeItemArray();
    let expenseItemArr = await expenseItemArray();

    let txnArr = ["true", "false"];
    let txnArrID = ["incomeItem", "expenseItem"];

    // reset form
    const form = document.querySelector('form');
    form.reset();

    for (let k = 0; k < txnArrID.length ; k ++){
        document.getElementById(txnArrID[k])
            .addEventListener("click", async function (event){
                let res = await fetch(`/categories/${txnArr[k]}`)
                let txnItemData = await res.json();

                let arr = []
                console.log(txnItemData)
                for (let i = 0; i < txnItemData.length; i++){
                    console.log (txnItemData[i].groups)
                    arr.push(txnItemData[i].groups);
                }


            const displayBox = document.getElementById("itemDisplayBox");
            itemDisplayBox.innerHTML = ""

            let content = ""

            for (let i of arr){
                content += `<option value="${i}"> ${i} </option>`
            }
            
            displayBox.innerHTML += `<div id="selectedItem"> <label> Item: </label> <select required id="selectOpt" name="selectOpt">` + content + `</select></div>`;
        
            
            if (txnArrID[k] === "expenseItem"){
            
            document.querySelector('#selectOpt')
                .addEventListener("change", async function(event){
                
                let loadSubCat = document.querySelector('#selectOpt').value
                
                let res = await fetch(`/cat/${loadSubCat}`)
                let subCatData = await res.json();
                let arr = subCatData[0].json_agg;
            
                const displayBox = document.getElementById("subCatDisplayBox");
                subCatDisplayBox.innerHTML = ""
                
                let content = ""
                
                for (let i of arr){
                    content += `<option value="${i}">${i}</option>`
                }
                
                displayBox.innerHTML += `<div id="selectedItem"> <label> Item Description:</label> <select required id="selectedItem">` + content + `</select></div>`;
            
            });
            }else{
                console.log("subCatDisplayBox skipped");
                const displayBox = document.getElementById("subCatDisplayBox");
                subCatDisplayBox.innerHTML = ""
            }
            document.getElementById('amount').disabled=false;
        })

        }
            
    };
    
    


document.querySelector('#tranx-form').
    addEventListener('submit', async function (event) {
        event.preventDefault();

        let incomeItemValue;
        let expenseItemValue;

        const txnDate = document.getElementById('txnDate');
        let txnDateValue = txnDate.value;
        console.log(txnDateValue)


        const tranxs = document.querySelectorAll('input[name="transaction"]');
        let tranxValue;
        for (tranx of tranxs) {
            if (tranx.checked) {
                tranxValue = tranx.value;
                console.log(tranxValue)
            }
        }

        if (tranxValue === "income") {
            const incomeIs = document.querySelectorAll('input[name="incomeItem"]');
            let incomeIValue;
            for (incomeI of incomeIs) {
                if (incomeI.checked) {
                    incomeItemValue = incomeI.value;
                    console.log(incomeItemValue)
                }
            }
        }   
        else {
            const expenseIs = document.querySelectorAll('input[name="expenseItem"]');
            let expenseIValue;
            for (expenseI of expenseIs) {
                if (expenseI.checked) {
                    expenseItemValue = expenseI.value;
                    console.log(expenseItemValue)
                }
            }
        }


        const form = event.target;

        const formObj = {
            tnxDate: txnDateValue,
            transaction: tranxValue,
            incomeItem: incomeItemValue ? incomeItemValue : "",
            expenseItem: expenseItemValue ? expenseItemValue : "",
            amount: form.amount.value,
        }
        console.log(formObj)
        

        const res = await fetch('/transaction', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formObj)
        });

        const result = await res.json();

        if (res.status === 200) {
            window.location = '/dashboard1/'
        }

});

