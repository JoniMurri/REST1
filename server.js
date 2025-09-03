//Kaikki pyynnöt tulevat tämän tiedoston kautta.
import express from "express";
import wordsRoutes from "./routes/wordsRoute.js";
// app.js
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

// Routes

app.use("/words", wordsRoutes);

// Käynnistä serveri
app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
