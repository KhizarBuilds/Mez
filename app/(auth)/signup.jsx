import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StatusBar,
  TextInput,
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
    <SafeAreaView className={`bg-[#2b2b2b]`}>
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="m-2 flex justify-center items-center">
          <Image source={logo} style={{ width: 200, height: 100 }} />
          <Text className="text-lg text-center text-white  font-bold mb-10">
            Let's get you started
          </Text>

          <View className="w-5/6">
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
                  <Text className="text-[#f49b33] mt-4 mb-2">Email</Text>
                  <TextInput
                    className="h-10 border border-white text-white rounded px-2"
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
                  <Text className="text-[#f49b33] mt-4 mb-2">Password</Text>
                  <TextInput
                    className="h-10 border border-white text-white rounded px-2"
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

                  <TouchableOpacity
                    onPress={handleSubmit}
                    className="p-2 my-2 bg-[#f49b33]  text-black rounded-lg mt-10"
                  >
                    <Text className="text-lg font-semibold text-center">
                      Sign Up
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </Formik>
            <View className="flex justify-center items-center">
              <TouchableOpacity
                className="flex flex-row justify-center mt-5 p-2 items-center"
                onPress={() => router.push("/signin")}
              >
                <Text className="text-white font-semibold">
                  Already a User?{" "}
                </Text>
                <Text className="text-base font-semibold underline text-[#f49b33]">
                  Sign in
                </Text>
              </TouchableOpacity>

              <Text className="text-center text-base  font-semibold mb-4 text-white">
                <View className="border-b-2 border-[#f49b33] p-2 mb-1 w-24" />{" "}
                or{" "}
                <View className="border-b-2 border-[#f49b33] p-2 mb-1 w-24" />
              </Text>
              <TouchableOpacity
                className="flex flex-row justify-center mb-5 p-2 items-center"
                onPress={handleGuest}
              >
                <Text className="text-white font-semibold">Be a</Text>
                <Text className="text-base font-semibold underline text-[#f49b33]">
                  {" "}
                  Guest User
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View className="flex-1">
          <Image
            source={entryImg}
            className="w-full h-full"
            resizeMode="contain"
          />
        </View>
        <StatusBar barStyle={"light-content"} backgroundColor={"#2b2b2b"} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Signup;