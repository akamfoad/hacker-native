import {
  Text,
  View,
  Platform,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import { useQuery } from "@tanstack/react-query";
import RenderHTML from "react-native-render-html";
import { router, Stack, useLocalSearchParams } from "expo-router";

import { Activities } from "@/components/posts/user-activities/UserActivities";

import { getUserDetailsQueryKey, getUserQueryFn } from "@/constants/user";

export default function UserDetails() {
  const { userId } = useLocalSearchParams();
  const { width: windowWidth } = useWindowDimensions();

  if (typeof userId !== "string") {
    return router.back();
  }

  const { data: user } = useQuery({
    queryKey: getUserDetailsQueryKey(userId),
    queryFn: getUserQueryFn,
  });

  return (
    <View style={styles.page}>
      <Stack.Screen options={{ title: userId.slice(0, 100) }} />
      {user && (
        <Activities id={userId} submitted={user.submitted}>
          <View style={{ alignItems: "center", marginTop: 22 }}>
            <View
              style={{
                width: 42,
                height: 42,
                borderRadius: 42,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#d4d4d8",
              }}
            >
              <Text
                style={{
                  color: "#030712",
                  textTransform: "uppercase",
                  fontSize: 22,
                  fontWeight: "600",
                  fontFamily: Platform.select({
                    ios: "Menlo",
                    android: "monospace",
                    default: "monospace",
                  }),
                }}
              >
                {userId.charAt(0)}
              </Text>
            </View>
            <Text
              style={{
                marginTop: 22,
                color: "#030712",
                fontSize: 20,
                fontWeight: "600",
                fontFamily: Platform.select({
                  ios: "Menlo",
                  android: "monospace",
                  default: "monospace",
                }),
              }}
            >
              {userId}
            </Text>
            <Text
              style={{
                marginVertical: 10,
                color: "#1f2937",
                fontSize: 16,
                fontWeight: "500",
                fontFamily: Platform.select({
                  ios: "Menlo",
                  android: "monospace",
                  default: "monospace",
                }),
              }}
            >
              🔥 {user.karma || 0}
            </Text>
            {typeof user.about === "string" && (
              <RenderHTML
                source={{ html: user.about }}
                baseStyle={{
                  fontSize: 14,
                  lineHeight: 22,
                  fontWeight: 400,
                  marginVertical: 16,
                  color: "#1f2937",
                  fontFamily: Platform.select({
                    ios: "Menlo",
                    android: "monospace",
                    default: "monospace",
                  }),
                }}
                contentWidth={windowWidth}
              />
            )}
          </View>
          <Text
            style={{
              fontFamily: Platform.select({
                ios: "Menlo",
                android: "monospace",
                default: "monospace",
              }),
              marginTop: 14,
              marginBottom: 22,
              fontSize: 18,
              color: "#0f172a",
              fontWeight: "700",
            }}
          >
            Recent activities:
          </Text>
        </Activities>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
});
