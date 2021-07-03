const pool = require('../modules/pool');
const express = require('express');
const router = express.Router();

router.post('/', (req,res) => {
    const newToDo = req.body;
    const queryText = `
    INSERT INTO list (item, isDone)
    VALUES ($1, $2);
    `;
    pool.query(queryText, [newToDo.item, false])
    .then(dbResponse => {
        res.sendStatus(201);
    })
    .catch(error => {
        console.log('Could not create new to-do.');
        res.sendStatus(500);
    })
});

module.exports = router;