// models/wordsModel.js
import { promises as fs } from "fs";
import path from "path";

const dictionaryFile = path.resolve("sanakirja.txt");

// Lataa sanakirja tiedostosta
// Lukee sanakirjan tiedostosta ja palauttaa sen Promise-olion.
// @returns {Promise<Array<object>>} - Promise-olio, joka sisältää sanakirjan.

export const loadDictionary = async () => {
  try {
    const data = await fs.readFile(dictionaryFile, "utf8");

    const splitLines = data.split(/\r?\n/);

    const dictionary = [];
    splitLines.forEach((line) => {
      if (line.trim() === "") return; // ohitetaan tyhjät rivit
      const words = line.split(" ");
      const word = {
        fin: words[0],
        eng: words[1],
      };
      dictionary.push(word);
    });

    return dictionary;
  } catch (error) {
    if (error.code === "ENOENT") {
      // jos tiedostoa ei löydy → palautetaan tyhjä taulukko
      return [];
    }
    console.error("Virhe sanakirjan lukemisessa:", error);
    throw error;
  }
};

// Lisää uusi rivi tiedostoon
export const saveWord = async (fin, eng) => {
  try {
    const newEntry = `${fin},${eng}\n`;
    await fs.appendFile(dictionaryFile, newEntry, "utf8");
  } catch (error) {
    console.error("Virhe sanan tallentamisessa:", error);
    throw error; // Heitetään virhe eteenpäin käsittelyyn
  }
};
