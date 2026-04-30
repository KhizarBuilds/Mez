import React from "react";
import { Text, View } from "react-native";
import { AppTheme } from "../../theme/colors";

const SectionHeader = ({ title, className = "" }) => {
  const titleSize = AppTheme?.typography?.h2 ?? 22;

  return (
    <View className={`px-4 pt-2 pb-3 flex-row items-center ${className}`}>
      <Text
        style={{ fontSize: titleSize }}
        className="text-[#9E0708] mr-2 font-semibold"
      >
        {title}
      </Text>
    </View>
  );
};

export default SectionHeader;
