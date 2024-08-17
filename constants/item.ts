import { getItemDetails } from "@/api/endpoints";
import { Item } from "@/shared/types";
import { QueryFunction } from "@tanstack/react-query";

export const getItemDetailsQueryKey = (itemId: number | string) => [
  "storyDetails",
  itemId,
];

export const getItemQueryFn: QueryFunction<Item> = async ({ queryKey }) => {
  const itemId = queryKey.at(-1);
  if (typeof itemId !== "string" && typeof itemId !== "number") {
    throw new Error(
      `Expected last queryKey item to be an id, instead got ${itemId}`
    );
  }
  const res = await getItemDetails(itemId);
  const details = await res.json();

  return details;
};
