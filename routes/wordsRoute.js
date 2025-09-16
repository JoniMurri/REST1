//Tämä opastaa reitit oikeisiin kontrolleritiedostoihin

import express from "express";
import {
  getAllWords,
  // routes/wordsRoutes.js
  getWordByProp,
  addWord,
  deleteWord,
} from "../controllers/wordsController.js";

const router = express.Router();
router.get("/", getAllWords); // GET /words
router.get("/:prop", getWordByProp); // GET /words/:prop
router.post("/", addWord); // POST /words
router.delete("/:fin", deleteWord); // DELETE /words/:fin

export default router;
