import * as faker from "faker/locale/de_CH";

const getPostToFlairs = () => {
  return [...Array(Math.floor(Math.random() * 3) + 1)].map(() => ({
    flair: {
      id: Math.floor(Math.random() * 5) + 1,
    },
  }));
};

export const getData = () => {
  return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((id) => ({
    id,
    title: faker.lorem.sentence(),
    body: faker.lorem.text(),
    author: { id: Math.floor(Math.random() * 2) + 1 },
    postToFlairs: getPostToFlairs(),
  }));
};
