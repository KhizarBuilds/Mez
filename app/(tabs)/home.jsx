import { View, Text, Image, Platform, ImageBackground, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import banner from "../../assets/images/homeBanner.png";
import { SafeAreaView } from 'react-native-safe-area-context'
import logo from "../../assets/images/dinetimelogo.png";
import { FlatList } from 'react-native-web';
import restaurants from '../../store/restaurants';

export default function Home() {
  const renderItems = ({ item }) => (
    <TouchableOpacity>
      <Image
      resizeMode='cover'
      source={{uri: item.image}}
      className="h-28 mt-2 mb-1 rounded-lg"
      />
      <Text> {item.name} </Text>
    </TouchableOpacity>
  
  );
  return (
    <SafeAreaView style={{ backgroundColor: "#2b2b2b", flex: 1 }}>
      <View className="flex items-center mb-4">
        <View className="bg-[#5f5f5f] w-11/12 rounded-lg shadow-lg justify-between items-center p-4">
          <View className="flex flex-row justify-between items-center w-full">
            <Text className="text-base font-semibold text-white">
              Welcome to 
            </Text>
            <Image resizeMode="cover" className="w-20 h-12" source={logo} />
          </View>
        </View>
      </View>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <ImageBackground
          source={banner}
          className="w-full h-64 justify-center"
          imageStyle={{ borderRadius: 16 }}
          resizeMode="cover"
        >
          <View className="bg-black/50 p-4 rounded-2xl mx-4">
            <Text className="text-center text-3xl font-bold text-white">
              Dine with your loved ones
            </Text>
          </View>
        </ImageBackground>
      </ScrollView>
      {
        restaurants.length > 0 ?
        <FlatList
          data={restaurants}
          renderItem={renderItems}
          horizontal
          contentContainerStyle={{ padding: 16 }}
          showsHorizontalScrollIndicator={false}
          scrollEnabled={true}
        />
: null
      }





      }
    </SafeAreaView>
  );
}