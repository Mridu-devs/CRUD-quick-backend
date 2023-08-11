import express from "express";
import cors from "cors";
import { createConnection } from "mysql";

const app = express();
const port = 8000; // Choose an appropriate port number
// const cors = require("cors");

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3001",
  })
);
// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Create a MySQL connection
const connection = createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "crud",
});

// Connect to the MySQL server
connection.connect((err) => {
  if (err) {
    console.error("Error connecting to the database: ", err);
    return;
  }
  console.log("Connected to the MySQL database");
});

app.post("/register", (req, res) => {
  console.log("req--------------------------", req.body);
  const { name, password, employeeId, position } = req.body;
  const registrationData = { name, password, employeeId, position };

  // Insert the registration data into the MySQL table
  connection.query(
    "INSERT INTO users SET ?",
    registrationData,
    (err, result) => {
      if (err) {
        console.error("Error inserting data into the table: ", err);
        res.status(500).json({ error: "Registration failed" });
        return;
      }
      console.log("Registration successful");
      res.status(200).json({ success: true });
    }
  );
});

// app.post("/login", (req, res) => {
//   console.log("req.body-----------", req.body);
//   const { employeeId, password } = req.body;

//   // Perform validation or authentication logic here
//   // Check if employeeId and password match records in the database

//   // Example query to retrieve user by employeeId
//   connection.query(
//     "SELECT * FROM users WHERE employeeId = ?",
//     [employeeId],
//     (err, results) => {
//       if (err) {
//         console.error("Error executing the query: ", err);
//         res.status(500).json({ success: false });
//         return;
//       }

//       if (results.length === 0) {
//         // No user found with the provided employeeId
//         res.json({ success: false });
//         return;
//       }

//       const user = results[0];

//       // Compare the provided password with the password stored in the database
//       if (password === user.password) {
//         // Passwords match
//         res.json({ success: true });
//       } else {
//         // Passwords do not match
//         res.json({ success: false });
//       }
//     }
//   );
// });

app.post("/login", (req, res) => {
  const { employeeId, password, position } = req.body;

  // Perform validation or authentication logic here
  // Check if employeeId, password, and position match records in the database

  // Example query to retrieve user by employeeId, password, and position
  connection.query(
    "SELECT * FROM users WHERE employeeId = ? AND password = ? AND position = ?",
    [employeeId, password, position],
    (err, results) => {
      if (err) {
        console.error("Error executing the query: ", err);
        res.status(500).json({ success: false });
        return;
      }

      if (results.length === 0) {
        // No user found with the provided employeeId, password, and position
        res.json({ success: false });
        return;
      }

      // User found with the provided employeeId, password, and position
      res.json({ success: true });
    }
  );
});
