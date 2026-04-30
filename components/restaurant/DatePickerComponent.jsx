import { View, Text, TouchableOpacity, Platform } from "react-native";
import React, { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { AppTheme } from "../../theme/colors";

const DatePickerComponent = ({ date, setDate }) => {
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);
  };
  const handlePress = () => {
    setShow(true);
  };
  return (
    <View className="flex flex-row">
      <TouchableOpacity
        onPress={handlePress}
        className={`rounded-xl text-base ${
          Platform.OS === "android" && "px-2 py-1 justify-center bg-[#FDF3F3]"
        } `}
      >
        {Platform.OS === "android" && (
          <Text className="px-2 py-1 bg-[#FDF3F3] text-[#9E0708] font-semibold rounded-lg">
            {date.toLocaleDateString()}
          </Text>
        )}
        {Platform.OS === "android" && show && (
          <DateTimePicker
            accentColor={AppTheme.colors.accent}
            textColor={AppTheme.colors.accent}
            value={date}
            mode="date"
            onChange={onChange}
            display="default"
            minimumDate={new Date()}
            maximumDate={new Date(new Date().setDate(new Date().getDate() + 7))}
          />
        )}
        {Platform.OS == "ios" && (
          <DateTimePicker
            accentColor={AppTheme.colors.accent}
            textColor={AppTheme.colors.accent}
            value={date}
            mode="date"
            onChange={onChange}
            display="default"
            minimumDate={new Date()}
            maximumDate={new Date(new Date().setDate(new Date().getDate() + 7))}
          />
        )}
      </TouchableOpacity>
    </View>
  );
};

export default DatePickerComponent;