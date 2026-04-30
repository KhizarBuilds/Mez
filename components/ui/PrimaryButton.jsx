import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { AppTheme } from "../../theme/colors";

const PrimaryButton = ({ title, onPress, className = "", textClassName = "" }) => {
  const buttonMinHeight = AppTheme?.controls?.buttonHeight ?? 50;
  const buttonFontSize = AppTheme?.typography?.button ?? 17;

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{ minHeight: buttonMinHeight }}
      className={`px-4 py-3 my-2 bg-[#9E0708] rounded-xl justify-center ${className}`}
      activeOpacity={0.85}
    >
      <Text
        style={{ fontSize: buttonFontSize }}
        className={`font-semibold text-center text-white ${textClassName}`}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default PrimaryButton;
