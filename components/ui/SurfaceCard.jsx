import React from "react";
import { View } from "react-native";
import { AppTheme } from "../../theme/colors";

const SurfaceCard = ({ children, className = "" }) => {
  const borderRadius = AppTheme?.radius?.lg ?? 18;

  return (
    <View
      style={{ borderRadius }}
      className={`bg-white border border-[#F1D3D3] ${className}`}
    >
      {children}
    </View>
  );
};

export default SurfaceCard;
