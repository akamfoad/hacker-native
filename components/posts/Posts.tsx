import {
  FlatList,
  Text,
  View,
  Animated,
  Easing,
  ListRenderItem,
} from "react-native";
import { getItemDetails, getTopStories } from "@/api/endpoints";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { Loader } from "lucide-react-native";
import { Colors } from "@/constants/Colors";
import { useCallback, useEffect, useMemo } from "react";
import { Spinner } from "@/components/Spinner";
import { Post } from "@/components/posts/Post";
import { Item } from "@/shared/types";
import { ITEMS_PER_PAGE } from "@/constants/pagination";

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

  return (
    <FlatList
      keyExtractor={(item) => item.id.toString()}
      data={data?.pages
        .flat()
        // .filter(({ kids, text }) => kids?.length > 0 && text !== undefined)
      }
      onEndReached={() => {
        if (hasNextPage) fetchNextPage();
      }}
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
