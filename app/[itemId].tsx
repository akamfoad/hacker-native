import {
  Text,
  View,
  Linking,
  Platform,
  Pressable,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import * as Haptics from "expo-haptics";
import { useQuery } from "@tanstack/react-query";
import RenderHTML from "react-native-render-html";
import { formatDistanceToNowStrict } from "date-fns";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { ArrowRightIcon, Link2, MessageSquareText } from "lucide-react-native";

import { parseTitle } from "@/lib/text";
import { Colors } from "@/constants/Colors";
import { Comments } from "@/components/comments/comments";
import { getItemDetailsQueryKey, getItemQueryFn } from "@/constants/item";

export default function ItemDetails() {
  const { itemId } = useLocalSearchParams();
  const { width: windowWidth } = useWindowDimensions();

  if (typeof itemId !== "string") {
    return router.back();
  }

  const { data: item } = useQuery({
    queryKey: getItemDetailsQueryKey(itemId),
    queryFn: getItemQueryFn,
  });

  const { data: parentItem } = useQuery({
    queryKey: getItemDetailsQueryKey(item?.parent || 0),
    queryFn: getItemQueryFn,
    enabled: !!item?.parent && item.type === "comment",
  });

  return (
    <View style={styles.page}>
      <Stack.Screen
        options={{
          title:
            item !== undefined
              ? parseTitle((item.title || item.text).slice(0, 100))
              : "",
        }}
      />
      {item && (
        <Comments id={item.id} kids={item.kids}>
          {typeof item.title === "string" && (
            <View style={{ gap: 10, paddingTop: 22 }}>
              <Text style={{ color: "black", fontSize: 20, fontWeight: 500 }}>
                {item.title}
              </Text>
            </View>
          )}
          <View
            style={{
              height: 1,
              marginVertical: 14,
            }}
          />

          <View
            style={{
              flexDirection: "row",
              gap: 8,
              alignItems: "center",
              marginBottom: typeof item.text === "string" ? 0 : 24,
            }}
          >
            <Pressable onPress={() => router.push(`/users/${item.by}`)}>
              <Text
                style={{
                  fontSize: 16,
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
                posted{" "}
                {formatDistanceToNowStrict(new Date(item.time * 1000), {
                  addSuffix: true,
                })}
              </Text>
            )}
          </View>
          {typeof item.text === "string" && (
            <RenderHTML
              source={{ html: item.text }}
              baseStyle={{
                marginVertical: 16,
                fontSize: 17,
                lineHeight: 22,
                fontWeight: 400,
              }}
              contentWidth={windowWidth}
            />
          )}

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              marginBottom: 24,
            }}
          >
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
                await Haptics.notificationAsync(
                  Haptics.NotificationFeedbackType.Warning
                );
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
            {item.url && (
              <Pressable
                style={StyleSheet.compose(styles.baseButton, styles.link)}
                onPress={() => {
                  Linking.openURL(item.url);
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
                  {new URL(item.url).host}
                </Text>
              </Pressable>
            )}
          </View>

          {parentItem ? (
            <Pressable
              style={{
                width: "100%",
                backgroundColor: "#ffedd5",
                paddingHorizontal: 12,
                paddingVertical: 6,
                borderRadius: 8,
                gap: 4,
                marginBottom: 24,
              }}
              onPress={() => router.push(`../${parentItem.id}`)}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ color: "#431407", lineHeight: 24 }}>
                  Commented on:
                </Text>
                <ArrowRightIcon color="#431407" height={18} />
              </View>
              <Text
                style={{
                  fontFamily: Platform.select({
                    ios: "Menlo",
                    android: "monospace",
                    default: "monospace",
                  }),
                  lineHeight: 22,
                }}
              >
                {parseTitle((parentItem.title || parentItem.text).slice(0, 72))}
                {(parentItem.title || parentItem.text).length > 72 ? "..." : ""}
              </Text>
            </Pressable>
          ) : null}
        </Comments>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  backButton: {
    paddingHorizontal: 22,
    marginBottom: 22,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  backButtonText: {
    fontSize: 18,
    color: Colors.accent,
    fontWeight: 600,
  },
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
  },
});
