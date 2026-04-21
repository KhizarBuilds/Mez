import { View, Text, Image, Platform, ImageBackground, ScrollView,FlatList, TouchableOpacity, ActivityIndicator } from 'react-native'
import banner from "../../assets/images/homeBanner.png";
import { SafeAreaView } from 'react-native-safe-area-context'
import { useRouter } from 'expo-router';
import logo from "../../assets/images/dinetimelogo.png";
import React, { use, useEffect, useState } from "react";
import { db } from "../../config/firebaseConfig";
import { restaurants } from '../../store/restaurants';
import { collection, query, getDocs } from 'firebase/firestore';
import uploadData from '../../config/bulkupload';

export default function Home() {
  const router = useRouter();
  const [restaurants, setRestaurants] = useState([]);

  const renderItems = ({ item }) => (

    <TouchableOpacity
    onPress={() => router.push(`/restaurant/${item.name}`)}
    className = "bg-[#5f5f5f] max-w-xs max-h-64 justify-center rounded-lg  p-4 mx-4">
      <View className="items-center">
      <Image
      resizeMode="cover"
      source={{uri: item.image}}
      className="h-28 w-full mt-2 mb-1 rounded-lg"
      />
      </View>
      <Text className="text-white text-lg mb-2 font-bold text-left">{item.name} </Text>
      <Text className="text-white text-base mb-2 text-left">{item.address} </Text>
      <Text className="text-white text-base mb-2 text-left">Open: {item.opening} - Close: {item.closing} </Text>
    </TouchableOpacity>
  );

  const getRestaurants = async () => {
    const q = query(collection(db, "restaurants"));
    const res = await getDocs(q);

    res.forEach((item) => {
      setRestaurants((prev) => [...prev,item.data()]);
    });
  }
  useEffect(() => {
    getRestaurants();
  },[]);

  return (
    <SafeAreaView style={[
      { backgroundColor: "#2b2b2b", flex: 1 },
    Platform.OS === "android" && { paddingBottom: 25 },
    Platform.OS === "ios" && { paddingBottom: 20 },
    ]}
    >
      <View className="flex items-center mb-4">
        <View className="bg-[#5f5f5f] w-11/12 rounded-lg shadow-lg justify-between items-center p-4 mx-4 shadow-md">
          <View className="flex flex-row items-center ">

            <Text className= {`text-base h-10
            ${Platform.OS == "ios" ? "pt-[8px]" : "pt-1"}
           align-middle text-white`}
         >
              Welcome to {" "}
            </Text>
            <Image resizeMode="cover" className="w-20 h-12" source={logo} />
          </View>
        </View>
      </View>
      <ScrollView stickyHeaderIndices={[0]}>
        <ImageBackground
          source={banner}
          className=" mb-4 w-full bg-[#2b2b2b] h-64 justify-center"
          imageStyle={{ borderRadius: 16 }}
          resizeMode="cover"
        >
          <View className="bg-black/50 p-4 rounded-2xl mx-4">
            <Text className="text-center text-3xl font-bold text-white">
              Dine with your loved ones
            </Text>
          </View>
        </ImageBackground>
        <View className="p-4 bg-[#2b2b2b] flex-row items-center">
          <Text className="text-3xl text-white mr-2 font-semibold">
            Special Discount%
          </Text>
        </View>
           {restaurants.length > 0 ?(
      <FlatList data={restaurants} 
      renderItem={renderItems}
       horizontal 
       contentContainerStyle={{ padding: 16 }} 
       showsHorizontalScrollIndicator={false}
        scrollEnabled={true}
        />
      ):(
        <ActivityIndicator animating color="#fb9b33" />
      )}

    <View className="p-4 bg-[#2b2b2b] flex-row items-center">
          <Text className="text-3xl text-[#fb9b33] mr-2 font-semibold">
            Our Restaurants
          </Text>
        </View>
           {restaurants.length === 0 ?(
         <ActivityIndicator animating color="#fb9b33" />
      ):(
      <FlatList data={restaurants} 
      renderItem={renderItems}
       horizontal 
       contentContainerStyle={{ padding: 16 }} 
       showsHorizontalScrollIndicator={false}
        scrollEnabled={true}
        />

      )
    }
      </ScrollView>
    </SafeAreaView>
  )
}