import * as faker from "faker/locale/de_CH";
import { DeepPartial } from "typeorm";
import { Post } from "../../../posts/post.entity";

export const getData = () => {
  const posts: DeepPartial<Post>[] = [
    {
      title: faker.lorem.sentence(),
      body: faker.lorem.text(),
      author: { id: 1 },
      postToFlairs: [
        {
          flair: {
            id: Math.floor(Math.random() * 5) + 1,
          },
        },
      ],
    },
    {
      title: faker.lorem.sentence(),
      body: faker.lorem.text(),
      author: { id: 1 },
      postToFlairs: [
        {
          flair: {
            id: Math.floor(Math.random() * 5) + 1,
          },
        },
      ],
    },
    {
      title: faker.lorem.sentence(),
      body: faker.lorem.text(),
      author: { id: 1 },
      postToFlairs: [
        {
          flair: {
            id: Math.floor(Math.random() * 5) + 1,
          },
        },
      ],
    },
    {
      title: faker.lorem.sentence(),
      body: faker.lorem.text(),
      author: { id: 1 },
      postToFlairs: [
        {
          flair: {
            id: Math.floor(Math.random() * 5) + 1,
          },
        },
      ],
    },
    {
      title: faker.lorem.sentence(),
      body: faker.lorem.text(),
      author: { id: 1 },
      postToFlairs: [
        {
          flair: {
            id: Math.floor(Math.random() * 5) + 1,
          },
        },
      ],
    },
    {
      title: faker.lorem.sentence(),
      body: faker.lorem.text(),
      author: { id: 1 },
      postToFlairs: [
        {
          flair: {
            id: Math.floor(Math.random() * 5) + 1,
          },
        },
      ],
    },
    {
      title: faker.lorem.sentence(),
      body: faker.lorem.text(),
      author: { id: 2 },
      postToFlairs: [
        {
          flair: {
            id: Math.floor(Math.random() * 5) + 1,
          },
        },
      ],
    },
    {
      title: faker.lorem.sentence(),
      body: faker.lorem.text(),
      author: { id: 2 },
      postToFlairs: [
        {
          flair: {
            id: Math.floor(Math.random() * 5) + 1,
          },
        },
      ],
    },
    {
      title: faker.lorem.sentence(),
      body: faker.lorem.text(),
      author: { id: 2 },
      postToFlairs: [
        {
          flair: {
            id: Math.floor(Math.random() * 5) + 1,
          },
        },
      ],
    },
    {
      title: faker.lorem.sentence(),
      body: faker.lorem.text(),
      author: { id: 2 },
      postToFlairs: [
        {
          flair: {
            id: Math.floor(Math.random() * 5) + 1,
          },
        },
      ],
    },
    {
      title: faker.lorem.sentence(),
      body: faker.lorem.text(),
      author: { id: 2 },
      postToFlairs: [
        {
          flair: {
            id: Math.floor(Math.random() * 5) + 1,
          },
        },
      ],
    },
    {
      title: faker.lorem.sentence(),
      body: faker.lorem.text(),
      author: { id: 2 },
      postToFlairs: [
        {
          flair: {
            id: Math.floor(Math.random() * 5) + 1,
          },
        },
      ],
    },
  ];

  return posts;
};
