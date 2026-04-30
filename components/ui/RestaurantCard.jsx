import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import SurfaceCard from "./SurfaceCard";
import { AppTheme } from "../../theme/colors";

const RestaurantCard = ({ item, onPress }) => {
  const titleSize = AppTheme?.typography?.title ?? 18;
  const bodySize = AppTheme?.typography?.body ?? 15;

  return (
    <TouchableOpacity onPress={onPress} className="max-w-xs max-h-72 mr-4">
      <SurfaceCard className="justify-center p-4">
        <View className="items-center">
          <Image
            resizeMode="cover"
            source={{ uri: item.image }}
            className="h-32 w-full mt-1 mb-3 rounded-xl"
          />
        </View>

        <Text
          style={{ fontSize: titleSize }}
          className="text-[#2A2A2A] mb-1 font-bold text-left"
        >
          {item.name}
        </Text>
        <Text
          style={{ fontSize: bodySize }}
          className="text-[#6C6C6C] mb-3 text-left"
          numberOfLines={1}
        >
          {item.address}
        </Text>

        <View className="bg-[#FDF3F3] px-3 py-2 rounded-full self-start">
          <Text className="text-[#9E0708] text-xs font-semibold">
            Open: {item.opening} - {item.closing}
          </Text>
        </View>
      </SurfaceCard>
    </TouchableOpacity>
  );
};

export default RestaurantCard;
