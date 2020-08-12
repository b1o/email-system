// import { LoremIpsum } from "lorem-ipsum";
// import {getRandomNumber} from "../../helpers";
import {User} from "../../users/models/user";

export interface Email {
  emailId?: number;
  content?: string;
  subject?: string;
  from?: User;
  to?: User[];
  seen?: boolean;
}

export const toEmail = (entity): Email => {
  return {
    emailId: entity.id,
    content: entity.text,
    ...entity
  }
}


// export const createTestEmail = (): Email => {
//   const lorem = new LoremIpsum({
//     sentencesPerParagraph: {
//       max: 8,
//       min: 4
//     },
//     wordsPerSentence: {
//       max: 16,
//       min: 4
//     }
//   });
//
//   const id = Math.random();
//   const content = lorem.generateParagraphs(getRandomNumber(3, 10));
//   const subject = lorem.generateWords(getRandomNumber(2, 6));
//   const from = lorem.generateWords(2);
//   const to = [];
//   for (let i = 0; i < getRandomNumber(1, 5); i++) {
//     to.push(lorem.generateWords(2));
//   }
//   return {
//     id,
//     content,
//     subject,
//     from,
//     to,
//     seen: false
//   }
// }
