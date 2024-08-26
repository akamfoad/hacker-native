import type { Item, User } from "@/shared/types";

interface TypedResponse<T> extends Response {
  json(): Promise<T>;
}

export type GetStoriesEndpoint = () => Promise<TypedResponse<number[]>>;

export const getTopStories = () => {
  return fetch("https://hacker-news.firebaseio.com/v0/topstories.json", {
    method: "GET",
  }) as Promise<TypedResponse<number[]>>;
};

export const getBestStories = () => {
  return fetch("https://hacker-news.firebaseio.com/v0/beststories.json", {
    method: "GET",
  }) as Promise<TypedResponse<number[]>>;
};

export const getAskStories = () => {
  return fetch("https://hacker-news.firebaseio.com/v0/askstories.json", {
    method: "GET",
  }) as Promise<TypedResponse<number[]>>;
};

export const getShowStories = () => {
  return fetch("https://hacker-news.firebaseio.com/v0/showstories.json", {
    method: "GET",
  }) as Promise<TypedResponse<number[]>>;
};

export const getItemDetails = (id: number | string) => {
  return fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`, {
    method: "GET",
  }) as Promise<TypedResponse<Item>>;
};

export const getUserDetails = (id: number | string) => {
  return fetch(`https://hacker-news.firebaseio.com/v0/user/${id}.json`, {
    method: "GET",
  }) as Promise<TypedResponse<User>>;
};
