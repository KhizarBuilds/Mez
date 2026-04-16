import { View, Text, Image, Platform, ImageBackground, ScrollView } from 'react-native'
import React from 'react'
import banner from "../../assets/images/homeBanner.png";
import { SafeAreaView } from 'react-native-safe-area-context'
import logo from "../../assets/images/dinetimelogo.png";


export default function Home() {
  return (
    <SafeAreaView style ={{backgroundColor:"#2b2b2b"}}>
      <View className="flex items-center">
        <View className="bg-[#5f5f5f] w-11/12 rounded-lg shadow-lg justify-between items-center" >
        <View className="flex flex-row">
         <Text className={`text-base h-10 
          pt-${Platform.OS === "ios" ? 'pt-8' : 'pt-[6.5]'} align-middle text-white`}>
            {""}
          Welcome to Dinetime</Text>
         <Image resizeMode="cover" className={"w-20 h-12"} source={logo} />
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
    </SafeAreaView>
  );
}