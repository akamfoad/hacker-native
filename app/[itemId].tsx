import { getItemDetails } from "@/api/endpoints";
import { Colors } from "@/constants/Colors";
import { useQuery } from "@tanstack/react-query";
import { Link, router, useLocalSearchParams } from "expo-router";
import { ArrowLeft, Link2, MessageSquareText } from "lucide-react-native";
import * as Haptics from "expo-haptics";
import {
  Linking,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { formatDistance, formatDistanceToNow, formatRelative } from "date-fns";

export default function ItemDetails() {
  const { itemId } = useLocalSearchParams();

  if (typeof itemId !== "string") {
    return router.replace("/");
  }

  const { data: item } = useQuery({
    queryKey: ["storyDetails", itemId],
    queryFn: async () => {
      const res = await getItemDetails(Number.parseInt(itemId, 10));
      const details = await res.json();

      return details;
    },
  });

  return (
    <View style={styles.page}>
      <Pressable onPress={() => router.replace("/")} style={styles.backButton}>
        <ArrowLeft color={Colors.accent} width={20} strokeWidth={3} />
        <Text style={styles.backButtonText}>Back</Text>
      </Pressable>
      <ScrollView>
        {item && (
          <>
            <View style={{ gap: 10 }}>
              <Text style={{ color: "black", fontSize: 20, fontWeight: 500 }}>
                {item.title}
              </Text>
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
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
            </View>
            <View
              style={{
                height: 1,
                backgroundColor: "#e2e8f0",
                marginVertical: 22,
              }}
            />

            <View
              style={{ flexDirection: "row", gap: 8, alignItems: "center" }}
            >
              <Text
                style={{
                  fontSize: 18,
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
                  {formatDistanceToNow(new Date(item.time * 1000), {
                    addSuffix: true,
                  })}
                </Text>
              )}
            </View>
            {typeof item.text === "string" && (
              <Text
                style={{
                  marginVertical: 16,
                  fontSize: 18,
                  fontWeight: 400,
                  fontFamily: Platform.select({
                    ios: "Menlo",
                    android: "monospace",
                    default: "monospace",
                  }),
                }}
              >
                {item.text}
              </Text>
            )}
          </>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    padding: 22,
    flex: 1,
  },
  backButton: {
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
