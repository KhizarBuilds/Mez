import React from 'react'
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Text, View, TouchableOpacity, ScrollView, Image, StatusBar, TextInput } from "react-native";
import {Formik} from "formik"

import logo from "../../assets/images/dinetimelogo.png";
import ValidationSchema from '../../utils/AuthSchema';
const entryImg= require("../../assets/images/Frame.png");

const Signin = () => {
  const router = useRouter();
  const handleSignin = ()=>{

  }
  return (
    <SafeAreaView className="flex-1 bg-[#2b2b2b]">
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
         <View className="m-2 flex justify-center items-center">
          <Image source={logo} style = {{width: 200, height: 100}} />
          <Text className="text-lg font-bold mb-10 text-center text-white ">
            Welcome Back!</Text>
            </View>
            <View className="w-5/6 mx-auto">
            <Formik initialValues={{email :"", password: ""}}
             validationSchema={ValidationSchema}
             onSubmit={handleSignin}>
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
                 <TouchableOpacity onPress={handleSubmit}
                  className="p-2 my-2 bg-[#f49b33] text-black rounded-lg mt-10">
                 <Text className = "text-lg font-semibold text-center"> Sign In </Text>
                 </TouchableOpacity>
              </View>
            )}
            </Formik>
        <View >
           <TouchableOpacity className="flex flex-row justify-center mt-5 p-2 items-center"
              onPress={()=> router.push("/signup")}>
                      <Text className="text-white font-semibold text-center ">
                        New User? {" "}
                      </Text>
                      <Text className="text-base font-semibold underline text-[#f49b33] ">
                       Sign Up
                      </Text>
                      </TouchableOpacity>
                      <View className="flex-row items-center justify-center mb-4">
                        <View className="border-b-2 border-[#f49b33] w-24 mr-2" />
                        <Text className="text-base font-semibold text-white">or</Text>
                        <View className="border-b-2 border-[#f49b33] w-24 ml-2" />
                      </View>
                       <TouchableOpacity className="flex flex-row justify-center mb-5 p-2 items-center"
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

export default Signin

