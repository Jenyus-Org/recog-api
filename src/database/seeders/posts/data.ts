import * as faker from "faker/locale/de_CH";

const getPostToFlairs = () => {
  return [...Array(Math.floor(Math.random() * 3) + 1)].map(() => ({
    flair: {
      id: Math.floor(Math.random() * 5) + 1,
    },
  }));
};

export const getData = () => {
  return [...Array(10)].map(() => ({
    title: faker.lorem.sentence(),
    body: faker.lorem.text(),
    author: { id: Math.floor(Math.random() * 2) + 1 },
    postToFlairs: getPostToFlairs(),
  }));
};
