import { Header } from "@/components/Header";
import { Colors } from "@/constants/Colors";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
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
  const safeArea = useSafeAreaInsets();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <SafeAreaProvider style={{ backgroundColor: "#fff5ee" }}>
          <Stack
            screenOptions={{
              headerBackground: () => (
                <View
                  style={{
                    backgroundColor: Colors.accent,
                    height: safeArea.top,
                  }}
                />
              ),
              headerBackTitleVisible: false,
              headerTintColor: "#f1f1f1",
              headerBackButtonMenuEnabled: true,
              headerStyle: {
                backgroundColor: Colors.accent,
              },
            }}
          />
        </SafeAreaProvider>
      </QueryClientProvider>
    </>
  );
}
