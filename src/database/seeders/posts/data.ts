import { Post } from "src/posts/post.entity";
import * as faker from "faker/locale/de_CH";
import { User } from "src/users/user.entity";

export const getData = () => {
  const posts: Partial<Post>[] = [
    {
      title: faker.lorem.sentence(),
      body: faker.lorem.text(),
      author: { id: 1 } as User,
    },
    {
      title: faker.lorem.sentence(),
      body: faker.lorem.text(),
      author: { id: 1 } as User,
    },
    {
      title: faker.lorem.sentence(),
      body: faker.lorem.text(),
      author: { id: 1 } as User,
    },
    {
      title: faker.lorem.sentence(),
      body: faker.lorem.text(),
      author: { id: 1 } as User,
    },
    {
      title: faker.lorem.sentence(),
      body: faker.lorem.text(),
      author: { id: 1 } as User,
    },
    {
      title: faker.lorem.sentence(),
      body: faker.lorem.text(),
      author: { id: 1 } as User,
    },
    {
      title: faker.lorem.sentence(),
      body: faker.lorem.text(),
      author: { id: 2 } as User,
    },
    {
      title: faker.lorem.sentence(),
      body: faker.lorem.text(),
      author: { id: 2 } as User,
    },
    {
      title: faker.lorem.sentence(),
      body: faker.lorem.text(),
      author: { id: 2 } as User,
    },
    {
      title: faker.lorem.sentence(),
      body: faker.lorem.text(),
      author: { id: 2 } as User,
    },
    {
      title: faker.lorem.sentence(),
      body: faker.lorem.text(),
      author: { id: 2 } as User,
    },
    {
      title: faker.lorem.sentence(),
      body: faker.lorem.text(),
      author: { id: 2 } as User,
    },
  ];

  return posts;
};
