import {
  Text,
  View,
  Platform,
  Pressable,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import * as Haptics from "expo-haptics";
import RenderHTML from "react-native-render-html";
import { router, usePathname } from "expo-router";
import { formatDistanceToNowStrict } from "date-fns";
import { useQueryClient } from "@tanstack/react-query";
import { MessageSquareText } from "lucide-react-native";

import type { Item } from "@/shared/types";
import { Colors } from "@/constants/Colors";
import { getItemDetailsQueryKey, getItemQueryFn } from "@/constants/item";

export const Comment = (item: Item) => {
  const QC = useQueryClient();
  const pathname = usePathname();
  const { width: windowWidth } = useWindowDimensions();

  return (
    <View
      style={{
        borderStartColor: Colors.accent,
        borderStartWidth: 3,
        paddingStart: 14,
      }}
    >
      <View style={{ flexDirection: "row", gap: 8, alignItems: "center" }}>
        <Pressable
          disabled={pathname.startsWith(`/users/${item.by}`)}
          onPress={() => router.push(`/users/${item.by}`)}
        >
          <Text
            style={{
              fontSize: 14,
              fontWeight: 500,
              fontFamily: Platform.select({
                ios: "Menlo",
                android: "monospace",
                default: "monospace",
              }),
            }}
          >
            {item.by}
          </Text>
        </Pressable>
        {item.time && (
          <Text>
            {formatDistanceToNowStrict(new Date(item.time * 1000), {
              addSuffix: true,
            })}
          </Text>
        )}
      </View>
      {typeof item.text === "string" && (
        <View
          style={{
            marginVertical: 16,
          }}
        >
          <RenderHTML
            source={{ html: item.text }}
            baseStyle={{
              fontSize: 15,
              lineHeight: 22,
              fontWeight: 400,
            }}
            contentWidth={windowWidth}
          />
        </View>
      )}
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
            <Text style={{ fontSize: 18, lineHeight: 18 }}>▲</Text>{" "}
            {item.score || 0}
          </Text>
        </Pressable>
        <Pressable
          style={StyleSheet.compose(styles.baseButton, styles.button)}
          onPress={async () => {
            await QC.prefetchQuery({
              queryKey: getItemDetailsQueryKey(item.id),
              queryFn: getItemQueryFn,
            });
            router.push({ pathname: `../${item.id.toString()}` });
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
            {item.kids?.length || 0}
          </Text>
        </Pressable>
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
