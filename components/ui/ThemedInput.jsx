import React from "react";
import { TextInput } from "react-native";
import { AppTheme } from "../../theme/colors";

const ThemedInput = ({ className = "", ...props }) => {
  const inputMinHeight = AppTheme?.controls?.inputHeight ?? 44;
  const inputFontSize = AppTheme?.typography?.body ?? 15;

  return (
    <TextInput
      style={{ minHeight: inputMinHeight, fontSize: inputFontSize }}
      className={`border border-[#F1D3D3] text-[#2A2A2A] rounded-xl px-3 bg-[#FDF3F3] ${className}`}
      placeholderTextColor="#8C8C8C"
      {...props}
    />
  );
};

export default ThemedInput;
