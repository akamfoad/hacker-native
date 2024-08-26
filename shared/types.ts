// FIXME change these to subtypes depending on the item type

export type Item = {
  id: number;
  deleted: boolean;
  type: "job" | "story" | "comment" | "poll" | "pollopt";
  by: string;
  time: number;
  text: string;
  dead: boolean;
  parent: number;
  poll: number;
  kids: number[];
  url: string;
  score: number;
  title: string;
  parts: number[];
  descendants: number;
};

export type User = {
  id: string;
  karma: number;
  about: string;
  created: number;
  submitted: number[];
};
