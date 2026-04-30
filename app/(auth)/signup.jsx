import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StatusBar,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import logo from "../../assets/images/dinetimelogo.png";
const entryImg = require("../../assets/images/Frame.png");
import { Formik } from "formik";
import validationSchema from "../../utils/authSchema";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { auth } from "../../config/firebaseConfig";
import { AppTheme } from "../../theme/colors";
import ThemedInput from "../../components/ui/ThemedInput";
import PrimaryButton from "../../components/ui/PrimaryButton";
import SurfaceCard from "../../components/ui/SurfaceCard";
const Signup = () => {
  const router = useRouter();
  const db = getFirestore();

  const getSignupErrorMessage = (code) => {
    switch (code) {
      case "auth/email-already-in-use":
        return "This email address is already in use. Please use a different email.";
      case "auth/invalid-email":
        return "Please enter a valid email address.";
      case "auth/weak-password":
        return "Password is too weak. Please use at least 6 characters.";
      case "auth/network-request-failed":
        return "Network error. Please check your internet connection and try again.";
      default:
        return "An unexpected error occurred. Please try again later.";
    }
  };

  const handleGuest = async () => {
    await AsyncStorage.setItem("isGuest", "true");
    router.push("/home");
  };

  const handleSignup = async (values) => {
    let userCredentials;

    try {
      userCredentials = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
    } catch (error) {
      console.error("Signup auth error:", error?.code, error?.message);
      Alert.alert("Signup Failed!", getSignupErrorMessage(error?.code), [
        { text: "OK" },
      ]);
      return;
    }

    try {
      const user = userCredentials.user;

      await setDoc(doc(db, "users", user.uid), {
        email: values.email,
        createdAt: new Date(),
      });
      
    } catch (error) {
      console.error("Profile save error:", error?.code, error?.message);
      Alert.alert(
        "Profile Save Error",
        "Your account was created, but profile data could not be saved. Please try again.",
        [{ text: "OK" }]
      );
    }

    try {
      await AsyncStorage.setItem("userEmail", values.email);
      await AsyncStorage.setItem("isGuest", "false");
      router.push("/home");
    } catch (error) {
      console.error("Local storage error:", error?.message);
      Alert.alert(
        "Storage Error",
        "Account created, but we could not persist local session data.",
        [{ text: "OK" }]
      );
      router.push("/home");
    }
  };
  return (
    <SafeAreaView className={`bg-[#F8EDED]`}>
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="m-2 flex justify-center items-center">
          <Image source={logo} style={{ width: 200, height: 100 }} />
          <Text className="text-lg text-center text-[#2A2A2A] font-bold mb-6">
            Let's get you started
          </Text>

          <SurfaceCard className="w-5/6 p-4">
            <Formik
              initialValues={{ email: "", password: "" }}
              validationSchema={validationSchema}
              onSubmit={handleSignup}
            >
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors,
                touched,
              }) => (
                <View className="w-full">
                  <Text className="text-[#9E0708] mt-2 mb-2 font-semibold">Email</Text>
                  <ThemedInput
                    keyboardType="email-address"
                    onChangeText={handleChange("email")}
                    value={values.email}
                    onBlur={handleBlur("email")}
                  />

                  {touched.email && errors.email && (
                    <Text className="text-red-500 text-xs mb-2">
                      {errors.email}
                    </Text>
                  )}
                  <Text className="text-[#9E0708] mt-4 mb-2 font-semibold">Password</Text>
                  <ThemedInput
                    secureTextEntry
                    onChangeText={handleChange("password")}
                    value={values.password}
                    onBlur={handleBlur("password")}
                  />

                  {touched.password && errors.password && (
                    <Text className="text-red-500 text-xs mb-2">
                      {errors.password}
                    </Text>
                  )}

                  <PrimaryButton title="Sign Up" onPress={handleSubmit} className="mt-8" />
                </View>
              )}
            </Formik>
            <View className="flex justify-center items-center">
              <TouchableOpacity
                className="flex flex-row justify-center mt-5 p-2 items-center"
                onPress={() => router.push("/signin")}
              >
                <Text className="text-[#2A2A2A] font-semibold">
                  Already a User?{" "}
                </Text>
                <Text className="text-base font-semibold underline text-[#9E0708]">
                  Sign in
                </Text>
              </TouchableOpacity>

              <Text className="text-center text-base font-semibold mb-4 text-[#6C6C6C]">
                <View className="border-b-2 border-[#B14241] p-2 mb-1 w-24" />{" "}
                or{" "}
                <View className="border-b-2 border-[#B14241] p-2 mb-1 w-24" />
              </Text>
              <TouchableOpacity
                className="flex flex-row justify-center mb-5 p-2 items-center"
                onPress={handleGuest}
              >
                <Text className="text-[#2A2A2A] font-semibold">Be a</Text>
                <Text className="text-base font-semibold underline text-[#9E0708]">
                  {" "}
                  Guest User
                </Text>
              </TouchableOpacity>
            </View>
          </SurfaceCard>
        </View>
        <View className="flex-1">
          <Image
            source={entryImg}
            className="w-full h-full"
            resizeMode="contain"
          />
        </View>
        <StatusBar barStyle={"dark-content"} backgroundColor={AppTheme.colors.background} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Signup;