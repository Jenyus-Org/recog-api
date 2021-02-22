import { User } from "src/users/user.entity";

import * as bcrypt from "bcrypt";

export const getData = () => {
  const users: Partial<User>[] = [
    {
      id: 1,
      username: "Doemuu",
      firstName: "Dominik",
      lastName: "Berger",
      password: bcrypt.hashSync("test123", 10),
    },
    {
      id: 2,
      username: "Dan6erbond",
      firstName: "RaviAnand",
      lastName: "Mohabir",
      password: bcrypt.hashSync("test123", 10),
    },
  ];

  return users;
};
