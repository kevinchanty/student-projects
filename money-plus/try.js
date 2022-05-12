// :root{
//     --green:#29929A;
//     --dark-green:#45725F;
//     --blue:#9AC6CE;
//     --tan:#C5A56F;
//     --grey:#BAB79C;
//     --dark-grey:#978E89;
//     --pink:#F8B0B3;
// }


function randomColor() {
    return '#' + Math.random().toString(16).substr(2,6);
}

// let randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
let transactions = [
    {
        category: ['Wages', 'Passive Income', 'Interest', 'Others'],
        spend: [1000,90,90,90],
    },
    {
        category: ['Wages', 'Passive Income', 'Interest', 'Others'],
        spend: [1000,90,90,90],
    }
]


function txn() {
    const chartData = {
        labels: [],
        data: [],
        // backgroundColor: [],
        // borderColor: []
    }

    for (let txn of transactions) {
        chartData.labels.push(txn.category);
        chartData.data.push(txn.spend);
        // chartData.backgroundColor.push(txn.backgroundColor);
        // chartData.borderColor.push(txn.borderColor);
    }
    console.log(chartData);
}

function loadCharts() {
    for (let i = 0; i <= transactions.length; i++) {
    const canvas = document.getElementById(`Chart${i}`).getContext('2d');
    const chart = new Chart(canvas, {
            type: 'doughnut', // Chart types
            data: {
                labels: transactions[`${i}`], //Data name
                datasets: [{
                    data: transactions[`${i}`],
                    backgroundColor: transactions[`${i}`],
                    borderColor: transactions[`${i}`],
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
                        text: `Chart ${i}`
                    },
                    legend: {
                        onHover: handleHover,
                        onLeave: handleLeave
                    }
                },
            },
        });
    }
}


txn();

function loadCharts() {
    for (let i = 1; i <= transactions.length; i++) {
        // const canvas = document.getElementById(Chart`${i}`).getContext('2d');
        const chart = ({
            type: 'doughnut', // Chart types
            data: {
                labels: txn(), //Data name
                datasets: [{
                    data: txn(),
                    backgroundColor: randomColor(),
                    borderColor: randomColor(),
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
                        text: 'Chart'
                    },
                    legend: {
                        onHover: 'handleHover',
                        onLeave: 'handleLeave'
                    }
                },
            },
        });
        console.log(chart);
    }
}

loadCharts();


function loadCharts() {
        for (let i = 0; i < transactions.length; i++) {
            const doughnut = document.getElementById(`Chart${i}`).getContext('2d');
            const doughnutChart = new Chart(doughnut, {
                type: 'doughnut', // Chart types
                data: {
                    labels: ['Wages', 'Passive Income', 'Interest', 'Others'], //Data name
                    datasets: [{
                        data: [1000, 90, 90, 90],
                        backgroundColor: [
                            randomColor(),
                            randomColor(),
                            randomColor(),
                            randomColor()
    
                        ],
                        borderColor: [
                            randomColor(),
                            randomColor(),
                            randomColor(),
                            randomColor()
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
                            text: "Expense"
                        },
                        legend: {
                            onHover: handleHover,
                            onLeave: handleLeave
                        }
                    },
                },
            });
        }
    }
    

