import { View, Text, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebaseConfig";
import PrimaryButton from "../../components/ui/PrimaryButton";
import SurfaceCard from "../../components/ui/SurfaceCard";

export default function profile() {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState(null);
  useEffect(() => {
    const fetchUserEmail = async () => {
      const email = await AsyncStorage.getItem("userEmail");
      setUserEmail(email);
    };

    fetchUserEmail();
  }, []);
  const handleLogout = async () => {
    try {
      await signOut(auth);
      await AsyncStorage.removeItem("userEmail");
      setUserEmail(null);

      Alert.alert("Logged out", "You have been logged out successfully.");
      router.push("/signin");
    } catch (error) {
      Alert.alert("Logged Error", "Error while logging out");
    }
  };
  const handleSignup = () => {
    router.push("/signup");
  };
  return (
    <View className="flex-1 justify-center items-center bg-[#F8EDED] px-6">
      <Text className="text-2xl text-[#9E0708] font-semibold mb-4">
        User Profile
      </Text>
      {userEmail ? (
        <SurfaceCard className="w-full p-5 items-center">
          <Text className="text-[#2A2A2A] text-base mb-2">Signed in as</Text>
          <Text className="text-[#9E0708] text-lg font-semibold mb-6">{userEmail}</Text>
          <PrimaryButton title="Logout" onPress={handleLogout} className="w-40" />
        </SurfaceCard>
      ) : (
        <SurfaceCard className="w-full p-5 items-center">
          <Text className="text-[#2A2A2A] text-base mb-4 text-center">
            Create an account to manage your bookings and profile.
          </Text>
          <PrimaryButton title="Sign Up" onPress={handleSignup} className="w-40" />
        </SurfaceCard>
      )}
    </View>
  );
}