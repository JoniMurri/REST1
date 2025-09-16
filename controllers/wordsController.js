//Tämä tiedosto käsittelee toimintalogiikan, eli mitä tehdään kun reitit kutsutaan.
import {
  loadDictionary,
  saveWord,
  deleteWordByFin,
} from "../models/wordsModel.js";
// controllers/wordsController.js
//const { loadDictionary, saveWord } = require("../models/wordsModel");

// Hae kaikki sanat
export const getAllWords = async (req, res) => {
  try {
    const dictionary = await loadDictionary();
    res.json(dictionary);
  } catch (error) {
    console.error("Virhe kaikkien sanojen hakemisessa:", error);
    res.status(500).json({ message: "Palvelin virhe." });
  }
};

// Hae sana parametrilla
export const getWordByProp = async (req, res) => {
  try {
    const dictionary = await loadDictionary();
    const prop = req.params.prop;

    const result = dictionary.find((word) => word.fin === prop);

    if (result) {
      // Palautetaan vain englanninkielinen vastine
      res.json({ eng: result.eng });
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    console.error("Virhe haettaessa sanaa:", error);
    res.status(500).json({ message: "Palvelin virhe." });
  }
};

export const deleteWord = async (req, res) => {
  try {
    const fin = req.params.fin;
    await deleteWordByFin(fin);
    res.json({ message: `Sana '${fin}' poistettu onnistuneesti.` });
  } catch (error) {
    console.error("Virhe sanan poistamisessa:", error);
    res.status(500).json({ message: "Palvelin virhe." });
  }
};

// Ohjain (controller) sanan lisäämiseen
export const addWord = async (req, res) => {
  try {
    // Tieto saapuu pyynnön rungossa (req.body), koska käytämme POST-metodia.
    const { fin, eng } = req.body;
    console.log("Received new word:", fin, eng);

    // Varmista, että molemmat sanat ovat olemassa
    if (!fin || !eng) {
      return res.status(400).json({
        message: "Molemmat suomenkielinen ja englanninkielinen sana tarvitaan.",
      });
    }

    // Tallenna uusi sana
    await saveWord(fin, eng);

    console.log(`Sanat '${fin}' ja '${eng}' lisättiin tiedostoon.`);
    res.status(201).json({ message: "Sana lisätty onnistuneesti." });
  } catch (error) {
    console.error("Virhe uuden sanan lisäämisessä:", error);
    res.status(500).json({ message: "Palvelin virhe." });
  }
};
