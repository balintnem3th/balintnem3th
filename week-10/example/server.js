'use strict';// eslint-disable-line

/* eslint linebreak-style: ['error', 'windows'] */

const express = require('express');
const mysql = require('mysql');

const app = express();
const PORT = 8080;

app.use(express.json());

app.use(express.static('page'));

const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'orientation_retake',
});


conn.connect((err) => {
  if (err) {
    console.log('Error connecting to Db');
    return;
  }
  console.log('Connection established');
});

conn.query('SELECT * FROM users;', (err, rows) => {// eslint-disable-line
  console.log('Data received from Db:\n');
  //console.log(rows);
});

app.get('/users', (req, res) => {
  const sql1 = 'SELECT * FROM users';
  conn.query(sql1, (err, row) => {
    if (err) {
      res.status(400);
      res.json({
        error: err,
      });
    }
    res.status(200);
    res.json({
      rows: row,
    });
  });
});

app.get('/tickets', (req, res) => {
  const manufacturer = req.query.manufacturer;
  const reporter = req.query.reporter;
  if ((reporter === undefined) && (manufacturer === undefined)) {
    const sql1 = 'SELECT * FROM tickets';
    conn.query(sql1, (err, row) => {
      if (err) {
        res.status(400);
        res.json({
          error: err,
        });
      }
      res.status(200);
      res.json({
        rows: row,
      });
    });
  }
  else if (reporter !== undefined && manufacturer === undefined) {
    const sql1 = `SELECT * FROM tickets WHERE reporter = ${reporter}`;
    conn.query(sql1, (err, row) => {
      if (err) {
        res.status(400);
        res.json({
          error: err,
        });
      }
      res.status(200);
      res.json({
        rows: row,
      });
    });
  }
  else if (manufacturer !== undefined && reporter === undefined) {
    const sql1 = `SELECT * FROM tickets WHERE manufacturer = ${manufacturer}`;
    conn.query(sql1, (err, row) => {
      if (err) {
        res.status(400);
        res.json({
          error: err,
        });
      }
      res.status(200);
      res.json({
        rows: row,
      });
    });
  }
  else {
    const sql1 = `SELECT * FROM tickets WHERE manufacturer = ${manufacturer} AND reporter = ${reporter}`;
    conn.query(sql1, (err, row) => {
      if (err) {
        res.status(400);
        res.json({
          error: err,
        });
      }
      res.status(200);
      res.json({
        rows: row,
      });
    });
  }
  // console.log(reporter);
  // console.log(manufacturer);
});

app.post('/tickets', (req, res) => {
  const sql1 = 'INSERT INTO tickets (reporter, manufacturer, serial_number, description, reported_at) VALUES ?;';
  const date = new Date();
  const day = date.getDate();
  const reportedAt = `2018-01-${day}`;
  const values = ([[req.body.reporter, req.body.manufacturer, req.body.serial_number, req.body.description ,reportedAt]]);// eslint-disable-line
  conn.query(sql1, [values], (err, row) => {
    if (err) {
      res.status(400);
      console.log(err);
      res.json({
        error: err,
      });
    }
    res.status(200);
    res.json({
      rows: row,
    });
  });
});

app.delete('/tickets/:id', (req, res) => {
  const id = req.params.id;
  const sql1 = `DELETE FROM tickets WHERE tickets.id = ${id}`;
  console.log('id', id);
  conn.query(sql1, (err) => {
    if (err) {
      res.status(500);
      res.json({
        error: err,
      });
    }
    res.status(204);
    res.json({
    });
  });
});

app.listen(PORT, () => {
  console.log('App listening on :', PORT);
});
