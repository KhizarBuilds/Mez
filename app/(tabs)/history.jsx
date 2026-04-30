import { View, Text, FlatList, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import PrimaryButton from "../../components/ui/PrimaryButton";
import SurfaceCard from "../../components/ui/SurfaceCard";
const history = () => {
  const [userEmail, setUserEmail] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const db = getFirestore();

  useEffect(() => {
    const fetchUserEmail = async () => {
      const email = await AsyncStorage.getItem("userEmail");
      setUserEmail(email);
    };

    fetchUserEmail();
  }, []);
  const fetchBookings = async () => {
    if (userEmail) {
      try {
        const bookingCollection = collection(db, "bookings");
        const bookingQuery = query(
          bookingCollection,
          where("email", "==", userEmail)
        );
        const bookingSnapshot = await getDocs(bookingQuery);

        const bookingList = bookingSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setBookings(bookingList);
        console.log("Data is here:", bookingList, bookingSnapshot);
      } catch (error) {
        console.log(error);

        Alert.alert("Error", "Could not fetch bookings");
      }
    }
    setLoading(false);
  };
  useEffect(() => {
    fetchBookings();
  }, [userEmail]);

  if (loading) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center bg-[#F8EDED]">
        <Text className="text-[#9E0708] font-semibold">Loading...</Text>
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView className="flex-1 bg-[#F8EDED]">
      {userEmail ? (
        <FlatList
          data={bookings}
          onRefresh={fetchBookings}
          refreshing={loading}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <SurfaceCard className="mx-3 my-2 p-4">
              <Text className="text-[#2A2A2A]"><Text className="font-semibold text-[#9E0708]">Date:</Text> {item.date}</Text>
              <Text className="text-[#2A2A2A]"><Text className="font-semibold text-[#9E0708]">Slot:</Text> {item.slot}</Text>
              <Text className="text-[#2A2A2A]"><Text className="font-semibold text-[#9E0708]">Guests:</Text> {item.guests}</Text>
              <Text className="text-[#2A2A2A]"><Text className="font-semibold text-[#9E0708]">Restaurant:</Text> {item?.restaurant}</Text>
              <Text className="text-[#2A2A2A]"><Text className="font-semibold text-[#9E0708]">Email:</Text> {item.email}</Text>
            </SurfaceCard>
          )}
          contentContainerStyle={{ paddingBottom: 20 }}
          ListEmptyComponent={
            <View className="mt-16 items-center px-6">
              <Text className="text-[#6C6C6C] text-base text-center">
                No bookings yet. Reserve a table and your history will appear here.
              </Text>
            </View>
          }
        />
      ) : (
        <View className="flex-1 justify-center items-center px-6">
          <Text className="text-[#2A2A2A] mb-4 text-center">
            Please sign in to view your booking history
          </Text>
          <PrimaryButton title="Sign In" onPress={() => router.push("/signin")} className="mt-4 w-40" />
        </View>
      )}
    </SafeAreaView>
  );
};

export default history;