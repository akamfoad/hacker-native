import { Posts } from "@/components/posts/Posts";
import { Colors } from "@/constants/Colors";
import { Stack } from "expo-router";
import { Platform, StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
  return (
    <>
      <Stack.Screen
        options={{
          title: "Home",
          headerTitle: () => (
            <View style={styles.nameContainer}>
              <Text style={styles.dimmedText}>{"{"}</Text>
              <Text style={styles.name}>HACKER_NEWS</Text>
              <Text style={styles.dimmedText}>{"}"}</Text>
            </View>
          ),
        }}
      />

      <Posts />
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
