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
import { Avatar } from "@/components/Avatar";

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
          <View style={styles.profile}>
            <Avatar text={userId} />
            <Text style={styles.username}>{userId}</Text>
            <Text style={styles.karma}>🔥 {user.karma || 0}</Text>
            {typeof user.about === "string" && (
              <RenderHTML
                source={{ html: user.about }}
                baseStyle={styles.about}
                contentWidth={windowWidth}
              />
            )}
          </View>
          <Text style={styles.recentActivitiesLabel}>Recent activities:</Text>
        </Activities>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1 },
  profile: { alignItems: "center", marginTop: 22 },
  username: {
    marginTop: 22,
    color: "#030712",
    fontSize: 20,
    fontWeight: "600",
    fontFamily: Platform.select({
      ios: "Menlo",
      android: "monospace",
      default: "monospace",
    }),
  },
  karma: {
    marginVertical: 10,
    color: "#1f2937",
    fontSize: 16,
    fontWeight: "500",
    fontFamily: Platform.select({
      ios: "Menlo",
      android: "monospace",
      default: "monospace",
    }),
  },
  about: {
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
  },
  recentActivitiesLabel: {
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
  },
});
