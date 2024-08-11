import { getItemDetails } from "@/api/endpoints";
import { useQuery } from "@tanstack/react-query";
import { Link, router, useLocalSearchParams } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";

export default function ItemDetails() {
  const { itemId } = useLocalSearchParams();

  if (typeof itemId !== "string") {
    return router.replace("/");
  }

  const { data } = useQuery({
    queryKey: ["storyDetails", itemId],
    queryFn: async () => {
      const res = await getItemDetails(Number.parseInt(itemId, 10));
      const details = await res.json();

      return details;
    },
  });

  return (
    <View style={{ padding: 22 }}>
      <Pressable
        onPress={() => {
          router.replace("/");
        }}
        style={{ flexDirection: "row", alignItems: "center", gap: 4 }}
      >
        <ArrowLeft color="#000" width={20} />
        <Text
          style={{
            fontSize: 16,
          }}
        >
          Back
        </Text>
      </Pressable>
      <Text>{JSON.stringify(data, null, 4)}</Text>
    </View>
  );
}
