import { getItemDetailsQueryKey, getItemQueryFn } from "@/constants/item";
import { Item } from "@/shared/types";
import { QueryClient, useQueryClient } from "@tanstack/react-query";
import * as Haptics from "expo-haptics";
import { Link, router } from "expo-router";
import { Link2, MessageSquareText } from "lucide-react-native";
import { useMemo } from "react";
import {
  Linking,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

export const Post = ({ id, title, url, score, text, kids }: Item) => {
  const QC = useQueryClient();

  const isExternal = useMemo(() => {
    return text === undefined;
  }, [text]);

  const navigateToDetails = async () => {
    await QC.prefetchQuery({
      queryKey: getItemDetailsQueryKey(id),
      queryFn: getItemQueryFn,
    });
    router.push({ pathname: `./${id.toString()}` });
  };

  return (
    <View style={{ padding: 22, gap: 12 }}>
      <Pressable
        onPress={async () => {
          // When the app title is clicked, link-only posts should be opened in the browser (currently external)
          // only when user presses Comment, we might need to do it differently
          // FIXME investigate whether it is possible to hook into authenticated actions
          // i.e liking, writing comments, hiding post etc...
          if (isExternal) Linking.openURL(url);
          else await navigateToDetails();
        }}
      >
        <Text style={{ color: "black", fontSize: 20, fontWeight: 500 }}>
          {title}
        </Text>
      </Pressable>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
        <Pressable
          style={StyleSheet.compose(styles.baseButton, styles.button)}
          onPress={async () => {
            await Haptics.notificationAsync(
              Haptics.NotificationFeedbackType.Success
            );
          }}
        >
          <Text
            style={{
              fontFamily: Platform.select({
                ios: "Menlo",
                android: "monospace",
                default: "monospace",
              }),
            }}
          >
            <Text style={{ fontSize: 18, lineHeight: 18 }}>▲</Text> {score}
          </Text>
        </Pressable>
        <Pressable
          style={StyleSheet.compose(styles.baseButton, styles.button)}
          onPress={async () => {
            await navigateToDetails();
          }}
        >
          <MessageSquareText color="black" width={16} />
          <Text
            style={{
              fontFamily: Platform.select({
                ios: "Menlo",
                android: "monospace",
                default: "monospace",
              }),
            }}
          >
            {kids?.length || 0}
          </Text>
        </Pressable>
        {url && (
          <Pressable
            style={StyleSheet.compose(styles.baseButton, styles.link)}
            onPress={() => {
              Linking.openURL(url);
            }}
          >
            <Link2 color="black" width={16} />
            <Text
              style={{
                fontSize: 13,
                fontFamily: Platform.select({
                  ios: "Menlo",
                  android: "monospace",
                  default: "monospace",
                }),
              }}
            >
              {new URL(url).host}
            </Text>
          </Pressable>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  baseButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 16,
  },
  link: { paddingHorizontal: 0, paddingVertical: 0 },
  button: {
    backgroundColor: "#e2e8f0",
    maxHeight: 32,
    minHeight: 32,
  },
});
