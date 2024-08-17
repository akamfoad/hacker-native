import { getItemDetails } from "@/api/endpoints";
import { Comment } from "@/components/comments/comment";
import { ITEMS_PER_PAGE } from "@/constants/pagination";
import { Item } from "@/shared/types";
import { useInfiniteQuery } from "@tanstack/react-query";
import { View } from "react-native";

export const Comments = ({ id, kids }: Pick<Item, "id" | "kids">) => {
  const { data, hasNextPage, isLoading, isFetchingNextPage, fetchNextPage } =
    useInfiniteQuery({
      queryKey: [id, "comments"],
      queryFn: async ({ pageParam = 0 }) => {
        if (!kids) return [];

        const pageIds = kids.slice(pageParam, pageParam + ITEMS_PER_PAGE);
        const detailsResponses = await Promise.all(
          pageIds.map((id) => getItemDetails(id))
        );
        const posts = await Promise.all(
          detailsResponses.map((res) => res.json())
        );

        return posts;
      },
      getNextPageParam: (lastPage, allPages) => {
        if (!kids) return undefined;

        const nextPage = allPages.length * ITEMS_PER_PAGE;
        return nextPage < kids.length ? nextPage : undefined;
      },
      enabled: !!kids,
      initialPageParam: 0,
    });

  return (
    <View style={{ gap: 32 }}>
      {data?.pages.flat().map((comment) => (
        <Comment key={comment.id} {...comment} />
      ))}
    </View>
  );
};
