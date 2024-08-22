import { decode } from "html-entities";

const stripHTML = (html: string) => {
  return html.replace(/<\/?[^>]+(>|$)/g, "");
};

export const parseTitle = (html: string) => {
  return decode(stripHTML(html)).trim();
};
