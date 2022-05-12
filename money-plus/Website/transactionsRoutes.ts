// interface GetCharts  {
//     labels: string[],
//     data: number[],
//     backgroundColor: any,
//     borderColor: any,
//     title: string
// }

import express from 'express';
import { format } from 'date-fns';
import { client } from "./app";
import { isLoggedInAPI } from './guard';

export const transactionsRoutes = express.Router();

transactionsRoutes.get('/transactions-calendar', isLoggedInAPI, async (req, res) => {
    const user = req.session['user'];    
    const temps = (await client.query(`SELECT * FROM transactions JOIN categories
            ON transactions.categories_id = categories.id
            WHERE users_id = $1`, [user.id])).rows
    
    const transactions = temps.map((temp) => {
        temp.date = format(temp.date, "yyyy-MM-dd");
        return temp;
    })
    res.json(transactions);
});

transactionsRoutes.get('/transactions-home/', async (req, res) => {
    const user = req.session['user'];

    // Query, sql in chart.sql
    const result = await (client.query(`SELECT categories.groups, SUM(transactions.amount), journals_id FROM transactions JOIN categories 
        ON transactions.categories_id = categories.id
        WHERE transactions.users_id = $1 AND
        categories.is_income = false
        GROUP BY categories.groups, journals_id
        ORDER BY journals_id;`, [user.id]));
    const list = result.rows;

    // Reduce and group by Journal_id
    let output = list.reduce((acc, current) => {
        let lastId = acc[acc.length - 1]?.['journals_id']
        let id = current['journals_id']

        if (id != lastId) {
            let pushObj = {
                journals_id: id,
                groups: [current.groups],
                sum: [current.sum]
            };

            acc.push(pushObj);

            return acc
        } else {
            acc[acc.length - 1].groups.push(current.groups);
            acc[acc.length - 1].sum.push(current.sum);
            return acc;
        }
    }, [])
    res.json(output);
})

transactionsRoutes.get('/transactions-chart/', async (req, res) => {
    // const user = req.session['user'];
    let isIncome = req.query.income;
    let period = req.query.period;
    let journalId = req.query.journal;

    // Query, sql in chart.sql
    const result = await (client.query(`SELECT SUM(amount),groups FROM transactions JOIN categories 
    ON transactions.categories_id = categories.id
    WHERE 
    categories.is_income = $1 AND
    journals_id = $2 AND
    date_part ($3,transactions.date) = date_part($3, NOW())
    GROUP BY categories.groups;`, [isIncome, journalId,period]));
    const list = result.rows;

    // Reduce and group by Journal_id
    let output = list.reduce((acc, current) => {
        acc.sum.push(current.sum);
        acc.groups.push(current.groups);
        return acc;
    }, { sum: [], groups: [] })

    res.json(output);
})


// Monthly Invome / expense
transactionsRoutes.get('/transactions-monthly/', async (req, res) => {
    let isIncome = req.query.income;
    let journalId = req.query.journal;

    // Query, sql in chart.sql
    const result = await (client.query(`SELECT SUM(amount) FROM transactions JOIN categories 
    ON transactions.categories_id = categories.id
    WHERE 
    categories.is_income = $1 AND
    journals_id = $2 AND
    date_part ('month',transactions.date) = date_part('month', NOW()) AND
    date_part ('year',transactions.date) = date_part('year', NOW())
    GROUP BY categories.is_income`, [isIncome, journalId]));
    const list = result.rows[0];

    // Reduce and group by Journal_id

    res.json(list);
})

// Yearly Invome / expense
transactionsRoutes.get('/transactions-yearly/', async (req, res) => {
    // const user = req.session['user'];
    let isIncome = req.query.income;
    let journalId = req.query.journal;

    // Query, sql in chart.sql
    const result = await (client.query(`SELECT SUM(amount) FROM transactions JOIN categories 
    ON transactions.categories_id = categories.id
    WHERE 
    categories.is_income = $1 AND
    journals_id = $2 AND
    date_part ('year',transactions.date) = date_part('year', NOW())
    GROUP BY categories.is_income`, [isIncome, journalId]));
    const list = result.rows[0];

    // Reduce and group by Journal_id

    res.json(list);
})

// Monthly Invome / expense 12
transactionsRoutes.get('/transactions-monthly12/', async (req, res) => {
    // const user = req.session['user'];
    let isIncome = req.query.income;
    let journalId = req.query.journal;

    // Query, sql in chart.sql
    const result = await (client.query(`SELECT json_agg(sum) as amount, json_agg(label) as labels
    FROM (
    SELECT SUM(amount), TO_CHAR(transactions.date :: DATE, 'Mon-yyyy') as label ,Date_part('month', transactions.date) as month , 
        Date_part('year', transactions.date) as year, is_income FROM  transactions JOIN categories
        ON transactions.categories_id = categories.id
        WHERE 
        categories.is_income = $1 AND
        journals_id = $2
        GROUP BY TO_CHAR(transactions.date :: DATE, 'Mon-yyyy'), is_income, month, year
        ORDER BY Date_part('year', transactions.date) desc, Date_part('month', transactions.date) desc
        LIMIT 12
    ) as a
        group by is_income`, [isIncome, journalId]));

    
    const list = result.rows[0];
        
    // Reduce and group by Journal_id

    res.json(list);
})



// Add New Transactions

transactionsRoutes.post('/newTransactions', isLoggedInAPI, async (req, res) => {
    const user = req.session['user'];
    const {txnDate, categoriesId, amount,journalsId} = req.body;
    // const {journalsId, txnDate, categoriesId, amount} = req.body;

    await client.query (`INSERT INTO transactions (users_id, categories_id, 
        date, amount, journals_id) VALUES ($1, $2, $3, $4, $5) returning id`, 
        [user.id, categoriesId, txnDate, amount, journalsId]);

    // await client.query (`INSERT INTO transactions (users_id, journals_id, categories_id, 
    //     date, amount) VALUES ($1, $2, $3, $4, $5) returning id`, 
    //     [user.id, journalsId, categoriesId, txnDate, amount]);
    
    
    res.status(200).json({success:true});
    // res.status(401),({ success: false, msg: "Incomplete Form. Please check and try again!" });
});
