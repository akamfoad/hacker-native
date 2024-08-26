import { useMemo } from "react";
import { FlatList, ListRenderItem, View } from "react-native";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

import { Post } from "@/components/posts/Post";
import { Spinner } from "@/components/Spinner";

import type { Item } from "@/shared/types";
import { getItemDetails } from "@/api/endpoints";
import { ITEMS_PER_PAGE } from "@/constants/pagination";
import {
  type StoryType,
  MAP_STORY_TYPE_TO_STORY_ENDPOINTS,
} from "@/constants/stories";

const renderItem: ListRenderItem<Item> = ({ item }) => {
  return (
    <View style={{ padding: 22 }}>
      <Post {...item} />
    </View>
  );
};

const ItemSeparatorComponent = () => (
  <View style={{ height: 1, backgroundColor: "#e2e8f0" }}></View>
);

export const Posts = ({ storyType }: { storyType: StoryType }) => {
  const storyListQuery = useQuery({
    queryKey: ["storyIds", storyType],
    queryFn: async () => {
      const getItemIds = MAP_STORY_TYPE_TO_STORY_ENDPOINTS[storyType];
      const res = await getItemIds();
      const topStories = await res.json();

      return topStories;
    },
  });

  const { data, hasNextPage, fetchNextPage, isLoading } = useInfiniteQuery({
    queryKey: ["storyDetails", storyType],
    queryFn: async ({ pageParam = 0 }) => {
      if (!storyListQuery.data) return [];

      const pageIds = storyListQuery.data.slice(
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
      if (!storyListQuery.data) return undefined;

      const nextPage = allPages.length * ITEMS_PER_PAGE;
      return nextPage < storyListQuery.data.length ? nextPage : undefined;
    },
    enabled: !!storyListQuery.data,
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
