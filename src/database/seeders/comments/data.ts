import * as faker from "faker/locale/de_CH";

export const getData = () => {
  return [
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20,
  ].map((id) => ({
    id,
    body: faker.lorem.text(),
    author: { id: Math.floor(Math.random() * 2) + 1 },
    parentPost: { id: Math.floor(Math.random() * 10) + 1 },
  }));
};
