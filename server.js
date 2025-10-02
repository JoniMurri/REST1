//Kaikki pyynnöt tulevat tämän tiedoston kautta.
import express from "express";
import wordsRoutes from "./routes/wordsRoute.js";
import cors from "cors";
// app.js
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS kaikille
app.use(cors()); // sallii kaikki domainit ja kaikki metodit dev-ympäristössä

app.use(
  cors({
    origin: "http://localhost:5173", // React-sovellus
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);
// Routes

app.use("/words", wordsRoutes);

// Käynnistä serveri
app.listen(3001, () => {
  console.log("Server listening on port 3001");
});
