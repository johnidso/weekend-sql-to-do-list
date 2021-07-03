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
    INSERT INTO list (item, is_done)
    VALUES ($1, $2);
    `;
    pool.query(queryText, [newToDo.item, newToDo.isDone])
    .then( dbResponse => {
        res.sendStatus(201);
    })
    .catch( error => {
        console.log('Could not create new to-do.');
        res.sendStatus(500);
    });
});

router.put('/:id', (req,res) => {
    const listItemId = req.params.id;
    let queryText = `
    UPDATE list SET is_done = true WHERE id = $1;
    `;
    pool.query(queryText, [listItemId])
    .then(dbResponse => {
        console.log('Updated is_done status:', dbResponse.rowCount);
        res.sendStatus(202);
    })
    .catch(err => {
        console.log('Error updating list', err);
        res.sendStatus(500);
    });
});

router.delete('/:id', (req,res) => {
    const listItemId = req.params.id;
    let queryText = `
    DELETE FROM list WHERE id = $1;
    `;
    pool.query(queryText, [listItemId])
    .then(dbResponse => {
        console.log('Deleted row:', dbResponse.rowCount);
        res.sendStatus(200);
    })
    .catch(err => {
        console.log('Error deleting list item', err);
        res.sendStatus(500);
    });
});

module.exports = router;