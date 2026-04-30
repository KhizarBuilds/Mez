import {
  View,
  Text,
  Image,
  Platform,
  ImageBackground,
  ScrollView,
  FlatList,
  ActivityIndicator,
} from "react-native";
import banner from "../../assets/images/homeBanner.png";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import logo from "../../assets/images/dinetimelogo.png";
import React, { useEffect, useState } from "react";
import { db } from "../../config/firebaseConfig";
import { collection, query, getDocs } from "firebase/firestore";
import { AppTheme } from "../../theme/colors";
import SectionHeader from "../../components/ui/SectionHeader";
import RestaurantCard from "../../components/ui/RestaurantCard";

export default function Home() {
  const router = useRouter();
  const [restaurants, setRestaurants] = useState([]);

  const renderItems = ({ item }) => (
    <RestaurantCard
      item={item}
      onPress={() => router.push(`/restaurant/${item.name}`)}
    />
  );

  const getRestaurants = async () => {
    const q = query(collection(db, "restaurants"));
    const res = await getDocs(q);

    const fetchedRestaurants = [];
    res.forEach((item) => {
      fetchedRestaurants.push(item.data());
    });
    setRestaurants(fetchedRestaurants);
  };

  useEffect(() => {
    getRestaurants();
  }, []);

  return (
    <SafeAreaView
      style={[
        { backgroundColor: AppTheme.colors.background, flex: 1 },
        Platform.OS === "android" && { paddingBottom: 25 },
        Platform.OS === "ios" && { paddingBottom: 20 },
      ]}
    >
      <View className="mx-4 mt-2 mb-4 rounded-2xl overflow-hidden">
        <View className="bg-[#9E0708] p-4">
          <View className="bg-[#AA2D2B] rounded-xl p-3">
            <View className="bg-[#B14241] rounded-xl p-3 flex flex-row items-center">
              <Text
                className={`text-base h-10
            ${Platform.OS === "ios" ? "pt-[8px]" : "pt-1"}
           align-middle text-white`}
              >
                Welcome to{" "}
              </Text>
              <Image resizeMode="cover" className="w-20 h-12" source={logo} />
            </View>
          </View>
        </View>
      </View>

      <ScrollView>
        <ImageBackground
          source={banner}
          className="mb-4 mx-4 h-56 justify-center"
          imageStyle={{ borderRadius: 16 }}
          resizeMode="cover"
        >
          <View className="bg-black/40 p-4 rounded-2xl mx-4">
            <Text className="text-center text-2xl font-bold text-white">
              Taste moments worth sharing
            </Text>
          </View>
        </ImageBackground>

        <SectionHeader title="Special Offers" />

        {restaurants.length > 0 ? (
          <FlatList
            data={restaurants}
            renderItem={renderItems}
            horizontal
            contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 8 }}
            showsHorizontalScrollIndicator={false}
            scrollEnabled
          />
        ) : (
          <ActivityIndicator animating color={AppTheme.colors.accent} />
        )}

        <SectionHeader title="Our Restaurants" className="pt-4" />

        {restaurants.length === 0 ? (
          <ActivityIndicator animating color={AppTheme.colors.accent} />
        ) : (
          <FlatList
            data={restaurants}
            renderItem={renderItems}
            horizontal
            contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 20 }}
            showsHorizontalScrollIndicator={false}
            scrollEnabled
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}