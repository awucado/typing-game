import numbers from "../../data/numbers.json";
import sentences from "../../data/sentences.json";
import words from "../../data/words.js";

const _ = require("lodash");

export const shuffleList = (type) => {
  switch (type) {
    case "words":
      return words;
    case "numbers":
      return _.shuffle(numbers).slice(0, 50);
    case "sentences":
      // eslint-disable-next-line no-case-declarations
      let sentencesArray = _.shuffle(sentences);
      sentencesArray = sentencesArray.slice(0, 12);
      return sentencesArray;
    default:
      return _.shuffle(words).slice(0, 150);
  }
};
