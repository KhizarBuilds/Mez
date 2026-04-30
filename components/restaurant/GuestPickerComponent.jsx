import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

const GuestPickerComponent = ({ selectedNumber, setSelectedNumber }) => {
  const decrement = () => {
    if (selectedNumber > 1) setSelectedNumber(selectedNumber - 1);
  };
  const increment = () => {
    if (selectedNumber < 12) setSelectedNumber(selectedNumber + 1);
  };
  return (
    <View className="flex flex-row items-center rounded-xl text-base overflow-hidden border border-[#F1D3D3]">
      <TouchableOpacity onPress={decrement} className="rounded">
        <Text className="text-[#9E0708] text-lg bg-[#FDF3F3] px-3 py-1 font-bold">
          -
        </Text>
      </TouchableOpacity>
      <Text className="px-3 text-[#9E0708] bg-white text-lg font-semibold">
        {selectedNumber}
      </Text>
      <TouchableOpacity onPress={increment} className="rounded">
        <Text className="text-[#9E0708] text-lg bg-[#FDF3F3] px-3 py-1 font-bold">
          +
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default GuestPickerComponent;