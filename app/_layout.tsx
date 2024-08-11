import { Header } from "@/components/Header";
import { Colors } from "@/constants/Colors";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

const queryClient = new QueryClient();

export default function Layout() {
  const safeArea = useSafeAreaInsets();
  return (
    <>
      <SafeAreaProvider style={{ backgroundColor: "#fff5ee" }}>
        <StatusBar style="inverted" backgroundColor={Colors.accent} />
        <QueryClientProvider client={queryClient}>
          <View
            style={{ backgroundColor: Colors.accent, height: safeArea.top }}
          />
          <Header />
          <Slot />
        </QueryClientProvider>
      </SafeAreaProvider>
    </>
  );
}
