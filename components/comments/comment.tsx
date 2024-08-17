import { Platform, Text, useWindowDimensions, View } from "react-native";
import { Item } from "@/shared/types";
import { formatDistanceToNow, formatDistanceToNowStrict } from "date-fns";
import { Colors } from "@/constants/Colors";
import RenderHTML from "react-native-render-html";

export const Comment = (item: Item) => {
  const { width: windowWidth } = useWindowDimensions();
  return (
    <View
      style={{
        borderStartColor: Colors.accent,
        borderStartWidth: 3,
        paddingStart: 14,
      }}
    >
      <View style={{ flexDirection: "row", gap: 8, alignItems: "center" }}>
        <Text
          style={{
            fontSize: 14,
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
            {formatDistanceToNowStrict(new Date(item.time * 1000), {
              addSuffix: true,
            })}
          </Text>
        )}
      </View>
      {typeof item.text === "string" && (
        <View
          style={{
            marginVertical: 16,
          }}
        >
          <RenderHTML
            source={{ html: item.text }}
            baseStyle={{
              fontSize: 14,
              fontWeight: 400,
              fontFamily: Platform.select({
                ios: "Menlo",
                android: "monospace",
                default: "monospace",
              }),
            }}
            contentWidth={windowWidth}
          />
        </View>
      )}
    </View>
  );
};
