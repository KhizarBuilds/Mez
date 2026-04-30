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
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import logo from "../../assets/images/dinetimelogo.png";
const entryImg = require("../../assets/images/Frame.png");
import { Formik } from "formik";
import validationSchema from "../../utils/authSchema";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { auth } from "../../config/firebaseConfig";
import { AppTheme } from "../../theme/colors";
import ThemedInput from "../../components/ui/ThemedInput";
import PrimaryButton from "../../components/ui/PrimaryButton";
import SurfaceCard from "../../components/ui/SurfaceCard";
const Signup = () => {
  const router = useRouter();
  const db = getFirestore();
  const handleGuest = async () => {
    await AsyncStorage.setItem("isGuest", "true");
    router.push("/home");
  };
  const handleSignin = async (values) => {
    try {
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      const user = userCredentials.user;

      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists()) {
        console.log("User data:", userDoc.data());
        await AsyncStorage.setItem("userEmail", values.email);
        await AsyncStorage.setItem("isGuest", "false");
        router.push("/home");
      } else {
        console.log("No such Doc");
      }
    } catch (error) {
      console.log(error);

      if (error.code === "auth/invalid-credential") {
        Alert.alert(
          "Signin Failed!",
          "Incorrect credentials. Please try again.",
          [{ text: "OK" }]
        );
      } else {
        Alert.alert(
          "Sign in Error",
          "An unexpected error occurred. Please try again later.",
          [{ text: "OK" }]
        );
      }
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
              onSubmit={handleSignin}
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

                  <PrimaryButton title="Sign In" onPress={handleSubmit} className="mt-8" />
                </View>
              )}
            </Formik>
            <View className="flex justify-center items-center">
              <TouchableOpacity
                className="flex flex-row justify-center mt-5 p-2 items-center"
                onPress={() => router.push("/signup")}
              >
                <Text className="text-[#2A2A2A] font-semibold">New User? </Text>
                <Text className="text-base font-semibold underline text-[#9E0708]">
                  Sign up
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