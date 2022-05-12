import express from 'express';
import { client } from "./app";
// import { isLoggedInAPI } from './guard';

export const categoriesRoutes = express.Router();

categoriesRoutes.get('/incomeItemGroup', async (req, res) => {

    const result = await client.query(`SELECT json_agg(categories.groups),groups FROM categories WHERE is_income = $1 group by groups`, [true]);
    let incItemList = result;
    res.json(incItemList.rows)
});


categoriesRoutes.get('/expItemGroup', async (req, res) => {

    const result = await client.query(`SELECT json_agg(categories.groups),groups FROM categories WHERE is_income = $1 group by groups`, [false]);
    let expItemList = result;
    res.json(expItemList.rows)
});

categoriesRoutes.get('/categories/:is_income', async (req, res) => {
    console.log("paras", req.params.is_income);

    const is_incomeGroup = req.params.is_income == "true" ? true : false;
    console.log("is_income", is_incomeGroup)

    const result = await client.query(`SELECT json_agg(categories.is_income),groups FROM categories WHERE is_income = $1 group by groups`, [is_incomeGroup]);
    let is_incomeList = result;
    console.log("is_incomeList:", is_incomeList.rows)
    res.json(is_incomeList.rows)

});

categoriesRoutes.get('/cat/:groups', async (req, res) => {
    const catGroup = req.params.groups;
    console.log("catgroup", catGroup)

    const result = await client.query(`SELECT json_agg(categories.name),groups FROM categories WHERE groups = $1 group by groups`, [catGroup]);
    let catDescriptions = result;
    console.log("catD", catDescriptions.rows)
    res.json(catDescriptions.rows)

});




categoriesRoutes.get('/category-item/:type', async (req, res) => {
    let para = true;
    if (req.params['type'] === "Income") {
        para = true;
    }else if (req.params['type'] === "Expense") {
        para = false;
    }

    let result = await client.query (`SELECT groups, json_agg(categories.name) as name, json_agg(id) as ID FROM categories 
        WHERE is_income = $1 group by groups`,[para]);

    let output = result.rows    
    res.json(output);
})

//combined in one "Route"

// categoriesRoutes.get('/category-descriptions/:type', async (req, res) => {
//     let para = req.params.type.toLowerCase();

//     let result = await client.query(`SELECT json_agg(name), json_agg(id) FROM categories
//     WHERE groups = $1
//     GROUP BY groups;`,[para]);
    
//     let output = result.rows;
//     res.json(output);
// })