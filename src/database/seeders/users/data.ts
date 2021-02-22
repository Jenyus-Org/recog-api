import * as bcrypt from "bcrypt";
import { DeepPartial } from "typeorm";
import { User } from "../../../users/user.entity";

export const getData = () => {
  const users: DeepPartial<User>[] = [
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
