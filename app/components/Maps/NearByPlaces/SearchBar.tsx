import { View, Text } from "react-native";
import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Dimensions } from "react-native";
import Colors from "../../../shared/Colors";
import { Image } from "react-native";
import { TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { PROVIDER_GOOGLE } from "react-native-maps";
export default function SearchBar({setSearchText}) {
    const [searchInput,setSearchInput]=useState();

    return (
    <View>
      <LinearGradient
        // Background Linear Gradient
        colors={[Colors.WHITE, "transparent"]}
        style={{ padding: 20, width: Dimensions.get("screen").width }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ fontFamily: "Inter_700Bold", fontSize: 35 }}>
            Discover
          </Text>
          <Image
            source={require("./../../../../assets/user.png")}
            style={{ width: 50, height: 50, borderRadius: 100 }}
          />
        </View>
        <View className="flex-row items-center bg-white rounded-xl py-1 px-4 shadow-lg mt-1 border-primary"
        >
          <Ionicons name="search" size={24} color={Colors.DARK_GRAY} />
          <GooglePlacesAutocomplete
          GooglePlacesDetailsQuery={{ fields: "geometry" }}
          placeholder="Search"
          fetchDetails={true}
          onPress={(data, details = null) => {
            // 'details' is provided when fetchDetails = true
            console.log(details?.geometry?.viewport);
          }}
          query={{
            key: "AIzaSyDrTZMslf-4X5Tv69h4cel4cQyXdZXItJw",
            language: "en",
          }}
          textInputProps={{
            InputComp: TextInput,
            onChangeText: (value) => setSearchInput(value),
            onSubmitEditing: () => setSearchText(searchInput)
          }}
        />
          {/* <TextInput
            placeholder="Search"
            style={{ backgroundColor: Colors.WHITE, width: "80%" }}
            onChangeText={(value) => setSearchInput(value)}
            onSubmitEditing={() => setSearchText(searchInput)}
          /> */}
        </View>
      </LinearGradient>
    </View>
  );
}