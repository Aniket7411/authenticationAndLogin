const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "",
  database: "test",
});

db.connect((err) => {
  if (err) throw err;
  console.log("Connected to the database");
});

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});

app.post("/signup", (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ error: "All fields are required." });
  }

  const checkUserQuery = `SELECT * FROM users WHERE email = '${email}'`;
  db.query(checkUserQuery, (err, results) => {
    if (err) return res.status(500).json({ error: "Database error." });

    if (results.length > 0) {
      return res
        .status(200)
        .json({ message: "User already registered. Please log in." });
    }

    const insertUserQuery = `INSERT INTO users (username, email, password) VALUES ('${username}', '${email}', '${password}')`;
    db.query(insertUserQuery, (err) => {
      if (err) return res.status(500).json({ error: "Database error." });

      res.status(201).json({ message: "User registered successfully." });
    });
  });
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required." });
  }

  const loginQuery = `SELECT * FROM users WHERE email = '${email}' AND password = '${password}'`;
  db.query(loginQuery, (err, results) => {
    if (err) return res.status(500).json({ error: "Database error." });

    if (results.length === 0) {
      return res.status(401).json({ error: "Invalid email or password." });
    }

    res.status(200).json({ message: "Login successful." });
  });
});
