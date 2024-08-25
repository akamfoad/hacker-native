import { Colors } from "@/constants/Colors";
import { StoryType } from "@/constants/stories";
import { BlurView } from "expo-blur";
import { ListFilter, LucideIcon } from "lucide-react-native";
import { useMemo, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Animated, { SlideInDown, SlideOutDown } from "react-native-reanimated";

export type Option = {
  id: StoryType;
  label: string;
  icon: LucideIcon;
};

type Props = {
  options: Option[];
  value: Option["id"];
  onChange: (newItem: Option["id"]) => void;
  defaultOpen?: boolean;
};

export const StoriesSelect = ({
  onChange,
  value,
  options,
  defaultOpen = false,
}: Props) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const selectedOption = useMemo(
    () => options.find((option) => option.id === value),
    [options, value]
  );

  return (
    <>
      {isOpen && (
        <>
          <BlurView
            intensity={isOpen ? 10 : 0}
            tint="systemMaterial"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
            }}
            onTouchEnd={() => setIsOpen(false)}
          />
          <Animated.View
            entering={SlideInDown}
            exiting={SlideOutDown}
            style={[styles.root]}
          >
            {options.map((item) => {
              const isSelected = value === item.id;

              return (
                <Pressable
                  key={item.id}
                  style={StyleSheet.compose(
                    styles.option,
                    isSelected ? styles.optionSelected : undefined
                  )}
                  onPress={() => {
                    onChange(item.id);
                    setIsOpen(false);
                  }}
                >
                  <item.icon
                    color={isSelected ? Colors.accent : "#18181b"}
                    fill={isSelected ? Colors.accent : "transparent"}
                  />
                  <Text style={styles.optionLabel}>{item.label}</Text>
                </Pressable>
              );
            })}
          </Animated.View>
        </>
      )}
      <Pressable
        style={styles.trigger}
        onPress={() =>
          setIsOpen((prev) => {
            const newValue = !prev;
            // if (newValue) opacity.value = withSpring(1);
            // else opacity.value = withSpring(0);
            return newValue;
          })
        }
      >
        <ListFilter color="#f1f1f1" />
        <Text style={styles.triggerLabel}>
          {selectedOption ? selectedOption.label : "Select"}
        </Text>
      </Pressable>
    </>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: "#e4e4e7",
    padding: 8,
    borderRadius: 10,
    shadowColor: "#451a03",
    shadowOffset: { height: 1, width: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    position: "absolute",
    bottom: "10%",
    right: "2%",
    minWidth: "50%",
    width: "100%",
    maxWidth: 240,
    gap: 8,
    borderWidth: 1,
    borderColor: "#d4d4d8",
  },
  trigger: {
    position: "absolute",
    bottom: "3%",
    right: "2%",
    backgroundColor: Colors.accent,
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 40,
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 48,
  },
  triggerLabel: {
    color: "#f1f1f1",
    fontSize: 18,
    lineHeight: 24,
    fontWeight: "600",
  },
  option: {
    gap: 6,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 6,
    borderWidth: 1,
    borderColor: "transparent",
    borderRadius: 10,
  },
  optionSelected: {
    borderColor: Colors.accent,
  },
  optionLabel: {
    fontSize: 18,
    fontWeight: "500",
  },
});
