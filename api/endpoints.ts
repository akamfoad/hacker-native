import { Item } from "@/shared/types";

interface TypedResponse<T> extends Response {
  json(): Promise<T>;
}

export const getTopStories = () => {
  return fetch("https://hacker-news.firebaseio.com/v0/topstories.json", {
    method: "GET",
  }) as Promise<TypedResponse<number[]>>;
};

export const getItemDetails = (id: number) => {
  return fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`, {
    method: "GET",
  }) as Promise<TypedResponse<Item>>;
};
