import * as faker from "faker/locale/de_CH";

export const getData = () => {
  return [1, 2, 3, 4, 5].map((id) => ({
    id,
    value: faker.company.companyName(),
    color: faker.commerce.color(),
  }));
};
