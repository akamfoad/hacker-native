import { Comments } from "@/components/comments/comments";
import { Colors } from "@/constants/Colors";
import { getItemDetailsQueryKey, getItemQueryFn } from "@/constants/item";
import { useQuery } from "@tanstack/react-query";
import { formatDistanceToNowStrict } from "date-fns";
import * as Haptics from "expo-haptics";
import { router, useLocalSearchParams } from "expo-router";
import { ArrowLeft, Link2, MessageSquareText } from "lucide-react-native";
import {
  Linking,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import RenderHTML from "react-native-render-html";

export default function ItemDetails() {
  const { itemId } = useLocalSearchParams();
  const { width: windowWidth } = useWindowDimensions();

  if (typeof itemId !== "string") {
    return router.replace("/");
  }

  const { data: item } = useQuery({
    queryKey: getItemDetailsQueryKey(itemId),
    queryFn: getItemQueryFn,
  });

  return (
    <View style={styles.page}>
      <Pressable onPress={() => router.replace("/")} style={styles.backButton}>
        <ArrowLeft color={Colors.accent} width={20} strokeWidth={3} />
        <Text style={styles.backButtonText}>Back</Text>
      </Pressable>
      {item && (
        <Comments id={item.id} kids={item.kids}>
          <View style={{ gap: 10 }}>
            <Text style={{ color: "black", fontSize: 20, fontWeight: 500 }}>
              {item.title}
            </Text>
          </View>
          <View
            style={{
              height: 1,
              // backgroundColor: "#e2e8f0",
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
                {item.score}
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
        </Comments>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    paddingTop: 22,
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
    backgroundColor: "#f1f1f1",
  },
});
