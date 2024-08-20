import { getItemDetails, getTopStories } from "@/api/endpoints";
import { Spinner } from "@/components/Spinner";
import { Post } from "@/components/posts/Post";
import { ITEMS_PER_PAGE } from "@/constants/pagination";
import { Item } from "@/shared/types";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { FlatList, ListRenderItem, View } from "react-native";

const renderItem: ListRenderItem<Item> = ({ item }) => {
  return <Post {...item} />;
};

const ItemSeparatorComponent = () => (
  <View style={{ height: 1, backgroundColor: "#e2e8f0" }}></View>
);
export const Posts = () => {
  const topStoriesQuery = useQuery({
    queryKey: ["topStoryIds"],
    queryFn: async () => {
      const res = await getTopStories();
      const topStories = await res.json();

      return topStories;
    },
  });

  const { data, hasNextPage, fetchNextPage, isLoading } = useInfiniteQuery({
    queryKey: ["topStories"],
    queryFn: async ({ pageParam = 0 }) => {
      if (!topStoriesQuery.data) return [];

      const pageIds = topStoriesQuery.data.slice(
        pageParam,
        pageParam + ITEMS_PER_PAGE
      );
      const detailsResponses = await Promise.all(
        pageIds.map((id) => getItemDetails(id))
      );
      const posts = await Promise.all(
        detailsResponses.map((res) => res.json())
      );

      return posts;
    },
    getNextPageParam: (lastPage, allPages) => {
      if (!topStoriesQuery.data) return undefined;

      const nextPage = allPages.length * ITEMS_PER_PAGE;
      return nextPage < topStoriesQuery.data.length ? nextPage : undefined;
    },
    enabled: !!topStoriesQuery.data,
    initialPageParam: 0,
  });

  const posts = useMemo(() => {
    return data?.pages
      .flat()
      .filter(({ dead, deleted }) => dead !== true && deleted !== true);
  }, [data]);

  return (
    <FlatList
      indicatorStyle="black"
      keyExtractor={(item) => item.id.toString()}
      data={posts}
      onEndReachedThreshold={0.5}
      onEndReached={() => {
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
            <Spinner variant="dark" />
          </View>
        );
      }}
      ItemSeparatorComponent={ItemSeparatorComponent}
    />
  );
};
