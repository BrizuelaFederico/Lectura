import { Reading } from "./reading.js";
import { ReadingController } from "./readingController.js";
import { Database } from "./indexedDB.js";
import { ReadingScreen } from "./readingScreen.js";
import { loadSetting } from "./loadSaveSetting.js";
import { defaultSetting } from "./defaultSetting.js";

const WORD_LENGTH = 4; //1 word = 4 letter
const MARGIN_SET_LENGTH = 1.2; //This is to try to keep the same amount of words in each set.

const reading = new Reading(WORD_LENGTH, MARGIN_SET_LENGTH);
const readingScreen = new ReadingScreen();
const readingController = new ReadingController(reading, readingScreen);

const DATABASE_NAME = "ReadingDatabase";
const DATABASE_VERSION = 1;
const TABLE_NAMES = {
  SETTING: "setting",
  READING: "reading",
};
const db = new Database(DATABASE_NAME, DATABASE_VERSION, TABLE_NAMES);

loadSetting(defaultSetting);

let defaultText =
  "Esto es un texto de ejemplo. Con esta aplicación se va a poder leer archivos txt de una forma más cómoda\r\n" +
  "Al hacer click en este texto, automáticamente se va recorrer según la velocidad establecida";
let defaultNameText = "Texto de ejemplo";

readingController.loadReading(defaultNameText, defaultText);

export { reading, readingController, db, TABLE_NAMES, readingScreen };
