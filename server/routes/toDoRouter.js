const pool = require('../modules/pool');
const express = require('express');
const router = express.Router();

router.get('/', (req,res) => {
    let queryText = `
    SELECT * FROM "list";
    `;
    pool.query(queryText)
    .then( result => {
        res.send(result.rows);
    })
    .catch(error => {
        console.log('Error getting the to-do list.', error);
        res.sendStatus(500);
    });
});

router.post('/', (req,res) => {
    const newToDo = req.body;
    const queryText = `
    INSERT INTO list ('item', 'is_done')
    VALUES ($1, $2);
    `;
    pool.query(queryText, [newToDo.item, newToDo.isDone])
    .then(dbResponse => {
        res.sendStatus(201);
    })
    .catch(error => {
        console.log('Could not create new to-do.');
        res.sendStatus(500);
    })
});

module.exports = router;