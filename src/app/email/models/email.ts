import { LoremIpsum } from "lorem-ipsum";
import {getRandomNumber} from "../../helpers";

export interface Email {
  id?: number;
  content?: string;
  subject?: string;
  from?: string;
  to?: string[];
  seen?: boolean;
}

export const createTestEmail = (): Email => {
  const lorem = new LoremIpsum({
    sentencesPerParagraph: {
      max: 8,
      min: 4
    },
    wordsPerSentence: {
      max: 16,
      min: 4
    }
  });

  const id = Math.random();
  const content = lorem.generateParagraphs(getRandomNumber(3, 10));
  const subject = lorem.generateWords(getRandomNumber(2, 6));
  const from = lorem.generateWords(2);
  const to = [];
  for (let i = 0; i < getRandomNumber(1, 5); i++) {
    to.push(lorem.generateWords(2));
  }
  return {
    id,
    content,
    subject,
    from,
    to,
    seen: false
  }
}
