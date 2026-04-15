import React from 'react'
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Text, View, TouchableOpacity, ScrollView, Image, StatusBar, TextInput } from "react-native";
import {Formik} from "formik"

import logo from "../../assets/images/dinetimelogo.png";
import ValidationSchema from '../../utils/AuthSchema';
const entryImg= require("../../assets/images/Frame.png");

const Signup = () => {
  const router = useRouter();
  const handleSignup = ()=>{

  }
  return (
    <SafeAreaView className= {'bg-[#2b2b2b]'}>
        <ScrollView contentContainerStyle= {{ height: "100%" }}>
         <View className="m-2 flex justify-center items-center">
          <Image source={logo} style = {{width: 200, height: 100}} />
          <Text className="text-lg font-bold mb-10 text-center text-white ">
            Let&apos;s get you started!</Text>
            </View>
            <View className="w-5/6 mx-auto">
            <Formik initialValues={{email :"", password: ""}}
             validationSchema={ValidationSchema} 
             onSubmit={handleSignup}>
            {({handleChange,handleBlur, handleSubmit,errors, touched , values})=>(
                <View className="w-full">
                <Text className= "text-[#f49b33] mt-4 mb-2">Email</Text>
                <TextInput
                  className="h-10 w-full border border-white text-white rounded px-2"
                  keyboardType="email-address"
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                />

                {touched.email && errors.email &&(
                 <Text className="text-red-500 text-sm mb-2">
                {errors.email}
                </Text>
                )}
                 <Text className= "text-[#f49b33] mt-4 mb-2">Password</Text>
                <TextInput
                  className="h-10 w-full border border-white text-white rounded px-2"
                  secureTextEntry
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                />

                {touched.password && errors.password &&(
                 <Text className="text-red-500 text-sm mb-2">
                {errors.password}
                </Text>
                )}
                 <TouchableOpacity onPress={()=> router.push("/signup")}
                  className="p-2 my-2 bg-[#f49b33] text-black rounded-lg mt-10">
                 <Text className = "text-lg font-semibold text-center"> Sign Up </Text>
                 </TouchableOpacity>
              </View>
            )}
            </Formik>

            <View >
              <TouchableOpacity className="flex flex-row justify-center mt-5 p-2 items-center"
              onPress={()=> router.push("/signin")}>
              <Text className="text-white font-semibold text-center ">
                Already have an account? {" "}
              </Text>
              <Text className="text-base font-semibold underline text-[#f49b33] ">
               Sign In
              </Text>
              </TouchableOpacity>
              <Text className="text-center text-base font-semibold mb-4 text-white">
                <View className="border-b-2 border-[#f49b33] p-2 mb-1 w-24"/> or {" "} 
                <View className="border-b-2 border-[#f49b33] p-2 mt-1 w-24"/>   
              </Text>
               <TouchableOpacity className="flex flex-row justify-center mB-5 p-2 items-center"
              onPress={()=> router.push("/home")}>
              <Text className="text-white font-semibold text-center ">
                Be a - {""}
              </Text>
              <Text className="text-base font-semibold underline text-[#f49b33] ">
               Guest User
              </Text>
              </TouchableOpacity>
            </View>
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

export default Signup
