import { Logo } from "@/assets/icons/logo";
import { Colors } from "@/constants/Colors";
import { Text, View, StyleSheet, Platform } from "react-native";

export const Header = () => {
  return (
    <View style={styles.header}>
      <Logo width={52} height={52} />
      <View style={styles.nameContainer}>
        <Text style={styles.dimmedText}>{"{"}</Text>
        <Text style={styles.name}>HACKER_NEWS</Text>
        <Text style={styles.dimmedText}>{"}"}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: Colors.accent,
    flexDirection: "row",
    padding: 24,
    alignItems: "center",
  },
  nameContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 16,
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
