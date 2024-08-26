import type { QueryFunction } from "@tanstack/react-query";

import type { User } from "@/shared/types";
import { getUserDetails } from "@/api/endpoints";

export const getUserDetailsQueryKey = (userId: number | string) => [
  "userDetails",
  userId,
];

export const getUserQueryFn: QueryFunction<User> = async ({ queryKey }) => {
  const userId = queryKey.at(-1);
  if (typeof userId !== "string" && typeof userId !== "number") {
    throw new Error(
      `Expected last queryKey item to be an id, instead got ${userId}`
    );
  }
  const res = await getUserDetails(userId);
  const details = await res.json();

  return details;
};
