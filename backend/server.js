import express from "express";
import connection from "./config/db.js";
import path from "path";

const app = express();
const PORT = 5000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("haiiii");
});

connection.connect(function (err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

//Fetch Data From DB
app.get("/api/data", (req, res) => {
  // console.log('ethy')
  connection.query(
    "SELECT * FROM customer ORDER BY CustomerID DESC",
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
      } else {
        // console.log(result)
        res.send(result);
      }
    }
  );
});

//Fetch Data From DB using id
app.get("/api/data/:id", async (req, res) => {
  connection.query(
    "SELECT * FROM customer WHERE ResidentsPermitID = ?",
    [req.params.id],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
      } else {
        // console.log(result)
        res.send(result);
      }
    }
  );
  /*  try {
    const SELECT_QUERY = `SELECT * FROM customer WHERE ResidentsPermitID = '${req.params.id}'`;
    const [rows, fields] = await connection.execute(SELECT_QUERY);
    res.send(rows[0]);
  } catch (err) {
    console.error("Error fetching data from the database: " + err.message);
    res.status(500).send("Internal Server Error");
  } */
});

//Delete Data from Db
app.delete("/api/data/:id", (req, res) => {
  const { id } = req.params;
  const DELETE_QUERY = `DELETE FROM customer WHERE CustomerID = '${id}'`;
  connection.query(DELETE_QUERY, [id], (err, result) => {
    if (err) throw err;
    res.send(result);
    console.log(result);
  });
});

//POST Data To DB
app.post("/api/data", (req, res) => {
  const {
    CustomerName,
    ResidentsPermitID,
    CustomerMobile,
    HouseName,
    AreaNumber,
    StreetNumber,
    StreetName,
    BuildNumber,
    LocationGPS,
    LocationName,
    State,
    District,
    Country,
  } = req.body;

  connection.query(
    "INSERT INTO Customer (CustomerName, ResidentsPermitID, CustomerMobile, HouseName, AreaNumber, StreetNumber, StreetName, BuildNumber, LocationGPS, LocationName, State, District, Country) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [
      CustomerName,
      ResidentsPermitID,
      CustomerMobile,
      HouseName,
      AreaNumber,
      StreetNumber,
      StreetName,
      BuildNumber,
      LocationGPS,
      LocationName,
      State,
      District,
      Country,
    ],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log();
        res.send({ status: 200 });
      }
    }
  );
});

//POST Data To DB
app.put("/api/data", (req, res) => {
  const {
    CustomerName,
    ResidentsPermitID,
    CustomerMobile,
    HouseName,
    AreaNumber,
    StreetNumber,
    StreetName,
    BuildNumber,
    LocationGPS,
    LocationName,
    State,
    District,
    Country,
  } = req.body;

  const UPDATE_QUERY = `
  UPDATE Customer
  SET 
    CustomerName = ?,
    ResidentsPermitID = ?,
    CustomerMobile = ?,
    HouseName = ?,
    AreaNumber = ?,
    StreetNumber = ?,
    StreetName = ?,
    BuildNumber = ?,
    LocationGPS = ?,
    LocationName = ?,
    State = ?,
    District = ?,
    Country = ?
  WHERE ResidentsPermitID = ?
`;
  connection.query(
    UPDATE_QUERY,
    [
      CustomerName,
      ResidentsPermitID,
      CustomerMobile,
      HouseName,
      AreaNumber,
      StreetNumber,
      StreetName,
      BuildNumber,
      LocationGPS,
      LocationName,
      State,
      District,
      Country,
      ResidentsPermitID,
    ],
    (err, result) => {
      if (err) {
        throw err;
      } else {
        res.send("Success");
      }
    }
  );
});
/* const __dirname = path.dirname(new URL(import.meta.url).pathname); */

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "/frontend/build")));

app.get("*", (req, res) =>
  res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
);

// app.use(express.static(path.join(__dirname, '/frontend/build')))

// app.get('*', (req, res) =>
//   res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
// )

// Your API endpoints and routes go here

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
