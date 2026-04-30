import Ionicons from "@expo/vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { addDoc, collection } from "firebase/firestore";
import { Formik } from "formik";
import { useState } from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";
import { db } from "../../config/firebaseConfig";
import validationSchema from "../../utils/guestFormSchema";
import ThemedInput from "../ui/ThemedInput";
import PrimaryButton from "../ui/PrimaryButton";
import SurfaceCard from "../ui/SurfaceCard";

const FindSlots = ({
  date,
  selectedNumber,
  slots,
  selectedSlot,
  setSelectedSlot,
  restaurant,
}) => {
  const [slotsVisible, setSlotsVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [formVisible, setFormVisible] = useState(false);
  const normalizedSlots = Array.isArray(slots)
    ? slots
    : Array.isArray(restaurant?.slot)
      ? restaurant.slot
      : [];
  const handlePress = () => {
    setSlotsVisible(!slotsVisible);
  };

  const handleBooking = async () => {
    const userEmail = await AsyncStorage.getItem("userEmail");
    if (userEmail) {
      try {
        await addDoc(collection(db, "bookings"), {
          email: userEmail,
          slot: selectedSlot,
          date: date.toISOString(),
          guests: selectedNumber,
          restaurant: restaurant,
        });

        alert("Booking successfully Done!");
      } catch (error) {
        console.log(error);
      }
    } else {
      setFormVisible(true);
      setModalVisible(true);
    }
  };
  const handleCloseModal = () => {
    setModalVisible(false);
  };
  const handleSlotPress = (slot) => {
    let prevSlot = selectedSlot;
    if (prevSlot === slot) {
      setSelectedSlot(null);
    } else {
      setSelectedSlot(slot);
    }
  };
  const handleFormSubmit = async (values) => {
    try {
      await addDoc(collection(db, "bookings"), {
        ...values,
        slot: selectedSlot,
        date: date.toISOString(),
        guests: selectedNumber,
        restaurant: restaurant,
      });

      alert("Booking successfully Done!");
      setModalVisible(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View className="flex-1">
      <View className={`flex ${selectedSlot != null && "flex-row"} `}>
        <View className={`${selectedSlot != null && "flex-1"}`}>
          <TouchableOpacity onPress={handlePress}>
            <Text className="text-center text-lg font-semibold text-white bg-[#9E0708] p-3 my-3 mx-2 rounded-xl">
              Find Slots
            </Text>
          </TouchableOpacity>
        </View>
        {selectedSlot != null && (
          <View className="flex-1">
            <TouchableOpacity onPress={handleBooking}>
              <Text className="text-center text-white text-lg font-semibold bg-[#AA2D2B] p-3 my-3 mx-2 rounded-xl">
                Book Slot
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      {slotsVisible && (
        <SurfaceCard className="flex-wrap flex-row mx-2 p-2">
          {normalizedSlots.map((slot, index) => (
            <TouchableOpacity
              key={index}
              className={`m-2 p-4 rounded-xl items-center justify-center ${
                selectedSlot && selectedSlot !== slot ? "opacity-50" : ""
              }`}
              style={{
                backgroundColor: selectedSlot === slot ? "#9E0708" : "#FDF3F3",
              }}
              onPress={() => handleSlotPress(slot)}
              disabled={
                selectedSlot === slot || selectedSlot === null ? false : true
              }
            >
              <Text
                className={`font-bold ${
                  selectedSlot === slot ? "text-white" : "text-[#9E0708]"
                }`}
              >
                {slot}
              </Text>
            </TouchableOpacity>
          ))}
        </SurfaceCard>
      )}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        style={{
          flex: 1,
          justifyContent: "flex-end",
          margin: 0,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        }}
      >
        <View className="flex-1 bg-[#00000080] justify-end">
          <View className="bg-white mx-4 rounded-t-2xl p-4 pb-6 border border-[#F1D3D3]">
            {formVisible && (
              <Formik
                initialValues={{ fullName: "", phoneNumber: "" }}
                validationSchema={validationSchema}
                onSubmit={handleFormSubmit}
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
                    <View>
                      <Ionicons
                        name="close-sharp"
                        size={30}
                        color={"#9E0708"}
                        onPress={handleCloseModal}
                      />
                    </View>
                    <Text className="text-[#9E0708] mt-4 mb-2 font-semibold">Name</Text>
                    <ThemedInput
                      onChangeText={handleChange("fullName")}
                      value={values.fullName}
                      onBlur={handleBlur("fullName")}
                    />

                    {touched.fullName && errors.fullName && (
                      <Text className="text-red-500 text-xs mb-2">
                        {errors.fullName}
                      </Text>
                    )}
                    <Text className="text-[#9E0708] mt-4 mb-2 font-semibold">
                      Phone Number
                    </Text>
                    <ThemedInput
                      onChangeText={handleChange("phoneNumber")}
                      value={values.phoneNumber}
                      onBlur={handleBlur("phoneNumber")}
                    />

                    {touched.phoneNumber && errors.phoneNumber && (
                      <Text className="text-red-500 text-xs mb-2">
                        {errors.phoneNumber}
                      </Text>
                    )}

                    <PrimaryButton title="Submit" onPress={handleSubmit} className="mt-10" />
                  </View>
                )}
              </Formik>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default FindSlots;
