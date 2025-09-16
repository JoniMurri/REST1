// models/wordsModel.js
import { promises as fs } from "fs";
import path from "path";

const dictionaryFile = path.resolve("sanakirja.txt");

// Lataa sanakirja tiedostosta
// Lukee sanakirjan tiedostosta ja palauttaa sen Promise-olion.
// @returns {Promise<Array<object>>} - Promise-olio, joka sisältää sanakirjan.
// moduulitasolla oleva kokoelma
let dictionary = [];

export const loadDictionary = async () => {
  try {
    const data = await fs.readFile(dictionaryFile, "utf8");

    const splitLines = data.split(/\r?\n/);

    dictionary.length = 0; // tyhjennetään moduulitasolla oleva taulukko
    splitLines.forEach((line) => {
      if (line.trim() === "") return;
      const words = line.split(" ");
      const word = {
        fin: words[0],
        eng: words[1],
      };
      dictionary.push(word); // päivitetään moduulitasolla oleva taulukko
    });
    return dictionary; // palautetaan moduulitasolla oleva taulukko
  } catch (error) {
    if (error.code === "ENOENT") {
      // jos tiedostoa ei löydy → palautetaan tyhjä taulukko
      dictionary.length = 0;
      return dictionary;
    }
    console.error("Virhe sanakirjan lukemisessa:", error);
    throw error;
  }
};

// Lisää uusi rivi tiedostoon
export const saveWord = async (fin, eng) => {
  const newEntry = `${fin} ${eng}\n`;
  const words = newEntry.split(" ");
  //ja poista mahdollinen rivinvaihto:
  const word = {
    fin: words[0],
    eng: words[1].split("\n")[0], // Poistetaan mahdollinen rivinvaihto
  };
  // kirjoitetaan tiedostoon
  await fs.appendFile(dictionaryFile, newEntry, "utf8");
  // päivitetään moduulitasolla oleva kokoelma
  dictionary.push(word);
};

export const deleteWordByFin = async (fin) => {
  try {
    // Ladataan tiedostosta
    const loadedDictionary = await loadDictionary();

    // Suodatetaan pois sana, jonka fin vastaa parametria
    const filteredDictionary = loadedDictionary.filter(
      (word) => word.fin !== fin
    );

    // Tallennetaan tiedosto uudestaan
    const data =
      filteredDictionary.map((word) => `${word.fin} ${word.eng}`).join("\n") +
      "\n";
    await fs.writeFile(dictionaryFile, data, "utf8");

    // Päivitetään moduulitasolla oleva kokoelma
    dictionary.length = 0; // tyhjennetään vanha
    dictionary.push(...filteredDictionary); // lisätään uudet

    return filteredDictionary.length !== loadedDictionary.length; // true jos poistettiin
  } catch (error) {
    console.error("Virhe sanan poistamisessa:", error);
    throw error;
  }
};
