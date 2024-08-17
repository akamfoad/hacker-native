import { getItemDetails } from "@/api/endpoints";
import { Comment } from "@/components/comments/comment";
import { Spinner } from "@/components/Spinner";
import { ITEMS_PER_PAGE } from "@/constants/pagination";
import { Item } from "@/shared/types";
import { useInfiniteQuery } from "@tanstack/react-query";
import { ReactNode, useMemo } from "react";
import { FlatList, ListRenderItem, View } from "react-native";

type Props = Pick<Item, "id" | "kids"> & {
  children: ReactNode;
};

export const Comments = ({ id, kids, children }: Props) => {
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

  const comments = useMemo(() => {
    return data?.pages.flat().filter(({ deleted }) => deleted !== true);
  }, [data]);

  return (
    <FlatList
      ListHeaderComponent={() => children}
      style={{ paddingHorizontal: 22 }}
      keyExtractor={(item) => item.id.toString()}
      data={comments}
      onEndReachedThreshold={0.5}
      onEndReached={() => {
        console.log({ hasNextPage });
        if (hasNextPage) fetchNextPage();
      }}
      contentContainerStyle={{ flexGrow: 1 }}
      renderItem={renderItem}
      ListFooterComponent={() => {
        if (!isLoading) return null;

        return (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginVertical: 15,
            }}
          >
            <Spinner />
          </View>
        );
      }}
      ItemSeparatorComponent={ItemSeparatorComponent}
    />
  );
};

const renderItem: ListRenderItem<Item> = ({ item }) => {
  return <Comment {...item} />;
};

const ItemSeparatorComponent = () => (
  <View style={{ paddingVertical: 16 }}></View>
);
