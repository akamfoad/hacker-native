import { Header } from "@/components/Header";
import { Colors } from "@/constants/Colors";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Slot, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

const queryClient = new QueryClient();

const StackHeader = () => {
  const safeArea = useSafeAreaInsets();

  return (
    <>
      <View
        style={{
          backgroundColor: Colors.accent,
          height: safeArea.top,
        }}
      />
      <Header />
    </>
  );
};
export default function Layout() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <SafeAreaProvider style={{ backgroundColor: "#fff5ee" }}>
          <Stack
            screenOptions={{
              header: StackHeader,
            }}
          />
        </SafeAreaProvider>
      </QueryClientProvider>
    </>
  );
}
