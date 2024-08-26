import { Stack } from "expo-router";
import { useMemo, useState } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";

import { Posts } from "@/components/posts/Posts";
import { Option, StoriesSelect } from "@/components/Select";

import {
  MAP_STORY_TYPE_TO_ICON,
  StoryType,
  storyTypes,
} from "@/constants/stories";
import { Colors } from "@/constants/Colors";

export default function HomeScreen() {
  const [storyType, setStoryType] = useState<StoryType>("topstories");

  const storyOptions: Option[] = useMemo(() => {
    return storyTypes.map(({ label, type }) => ({
      id: type,
      label,
      icon: MAP_STORY_TYPE_TO_ICON[type],
    }));
  }, []);

  return (
    <>
      <Stack.Screen
        options={{
          title: "Home",
          headerTitle: () => (
            <View style={styles.nameContainer}>
              <Text style={styles.dimmedText}>{"{"}</Text>
              <Text style={styles.name}>HACKER_NATIVE</Text>
              <Text style={styles.dimmedText}>{"}"}</Text>
            </View>
          ),
        }}
      />

      <Posts storyType={storyType} />
      <StoriesSelect
        value={storyType}
        onChange={setStoryType}
        options={storyOptions}
      />
    </>
  );
}
const styles = StyleSheet.create({
  nameContainer: {
    backgroundColor: Colors.accent,
    flexDirection: "row",
    alignItems: "center",
  },
  dimmedText: {
    color: "#fcc29d",
    fontSize: 22,
    lineHeight: 22,
  },
  name: {
    color: "#fcfcfb",
    marginHorizontal: 2,
    fontSize: 18,
    fontFamily: Platform.select({
      ios: "Menlo",
      android: "monospace",
      default: "monospace",
    }),
  },
});
