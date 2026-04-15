import { useRouter } from "expo-router";
import { Text, View, TouchableOpacity, ScrollView, Image, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import logo from "../assets/images/dinetimelogo.png";
const entryImg= require("../assets/images/Frame.png");
// const logo = require("../assets/images/dinetimelogo.png");

export default function Index() {
  const router = useRouter(); 
  return (
  <SafeAreaView className="flex-1 bg-[#2b2b2b]">
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
     <View className="m-2 flex justify-center items-center">
      <Image source={logo} style = {{width: 300, height: 300}} />
      <View className="w-3/4">
      <TouchableOpacity onPress={()=> router.push("/signup")}
       className="p-2 my-2 bg-[#f49b33] text-black rounded-lg">
        <Text className = "text-lg font-semibold text-center"> Sign Up </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=> router.push("/home")}
       className="p-2 my-2 bg-[#2b2b2b] border border-[#f49b33] rounded-lg">
        <Text className = "text-lg font-semibold text-[#f49b33] text-center"> Guest User </Text>
      </TouchableOpacity>
      </View>
      <View className="flex-row items-center justify-center my-4">
        <View className="border-b-2 border-[#f49b33] w-24 mr-2" />
        <Text className="text-base font-semibold text-white">or</Text>
        <View className="border-b-2 border-[#f49b33] w-24 ml-2" />
      </View>
      <TouchableOpacity className="flex flex-row justify-center items-center"
        onPress={()=> router.push("/signin")}>
        <Text className="text-white font-semibold text-center ">
          Already have an account?
        </Text>
        <Text className="text-base font-semibold underline text-[#f49b33] ">
          Sign In
        </Text>
      </TouchableOpacity>
     </View>
     <View  className="flex-1">
      <Image source={entryImg} 
       className="w-full h-full"
       resizeMode="contain" />
     </View>
     <StatusBar barStyle={"light-content"} backgroundColor={"#2b2b2b"} />
    </ScrollView>
  </SafeAreaView>
  );
}
