import { useRouter } from "expo-router";
import { Text, View, TouchableOpacity, ScrollView, Image, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import logo from "../assets/images/dinetimelogo.png";
import { AppTheme } from "../theme/colors";
import PrimaryButton from "../components/ui/PrimaryButton";
import SurfaceCard from "../components/ui/SurfaceCard";
const entryImg= require("../assets/images/Frame.png");
// const logo = require("../assets/images/dinetimelogo.png");

export default function Index() {
  const router = useRouter(); 
  return (
  <SafeAreaView className="flex-1 bg-[#F8EDED]">
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
     <View className="m-2 flex justify-center items-center">
      <Image source={logo} style = {{width: 300, height: 300}} />
      <SurfaceCard className="w-11/12 p-4">
      <PrimaryButton title="Sign Up" onPress={()=> router.push("/signup")} />
      <TouchableOpacity onPress={()=> router.push("/home")}
       className="p-3 my-2 bg-[#FDF3F3] border border-[#F1D3D3] rounded-xl">
        <Text className = "text-lg font-semibold text-[#9E0708] text-center"> Guest User </Text>
      </TouchableOpacity>
      </SurfaceCard>
      <View className="flex-row items-center justify-center my-4">
        <View className="border-b-2 border-[#B14241] w-24 mr-2" />
        <Text className="text-base font-semibold text-[#6C6C6C]">or</Text>
        <View className="border-b-2 border-[#B14241] w-24 ml-2" />
      </View>
      <TouchableOpacity className="flex flex-row justify-center items-center"
        onPress={()=> router.push("/signin")}>
        <Text className="text-[#2A2A2A] font-semibold text-center ">
          Already have an account?
        </Text>
        <Text className="text-base font-semibold underline text-[#9E0708] ">
          Sign In
        </Text>
      </TouchableOpacity>
     </View>
     <View  className="flex-1">
      <Image source={entryImg} 
       className="w-full h-full"
       resizeMode="contain" />
     </View>
     <StatusBar barStyle={"dark-content"} backgroundColor={AppTheme.colors.background} />
    </ScrollView>
  </SafeAreaView>
  );
}
