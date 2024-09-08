import { View, Modal, Text, Button, StyleSheet } from "react-native";
import { Stack } from "expo-router";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

import { Colors } from "@/constants/Colors";

const queryClient = new QueryClient();

export default function Layout() {
  const safeArea = useSafeAreaInsets();
  const [modalVisible, setModalVisible] = useState(false);

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
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>Expo Snack Link</Text>
                <Button
                  onPress={() => setModalVisible(!modalVisible)}
                  title="Close"
                  color={Colors.accent}
                />
              </View>
            </View>
          </Modal>
        </SafeAreaProvider>
      </QueryClientProvider>
    </>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
