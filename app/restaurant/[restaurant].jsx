import {View,Text} from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Restaurant() {
    const { restaurant } = useLocalSearchParams();
    return (
        <SafeAreaView style ={[
            { backgroundColor: "#2b2b2b", flex: 1 },
            Platform.OS === "android" && { paddingBottom: 25 },
            Platform.OS === "ios" && { paddingBottom: 20 },
        ]}>
            <Text>{restaurant}</Text>
        </SafeAreaView>

    );
}
