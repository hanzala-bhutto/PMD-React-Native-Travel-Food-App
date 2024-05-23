import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useProfileContext } from "../context/profilecontext";
import { useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";


const Profile = () => {

    const {profileData, profileImage, updateProfileData, updateProfileImage} = useProfileContext();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [bio, setBio] = useState('');

    const [image,setImage] = useState(null);
  
    useEffect(() => {
      setName(profileData?.name);
      setEmail(profileData?.email);
      setBio(profileData?.bio);
    }, [profileData]);

    useEffect(() => {
        // console.log('profile Image', profileImage);
        if (profileImage){
            setImage(profileImage);
        }
    },[profileImage])

    const saveData = () => {
    //   console.log(name,email,bio);
      updateProfileData({name, email, bio});
    };

    const saveImage = (data) => {
        updateProfileImage(data)
    }

    const openCamera = async () => {
        // Ask the user for the permission to access the camera
        const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
        
        if (permissionResult.granted === false) {
          alert("You've refused to allow this appp to access your camera!");
          return;
        }
        
        const result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            quality: 0.5,
        });

        // Explore the result
        // console.log(result);

        if(!result.canceled){
            setImage({uri:result.assets[0].uri});
            saveImage({uri:result.assets[0].uri});
        }        
    }



    return (
        <ScrollView>
        <View className=" bg-white flex-1 flex-col justify-start gap-y-8 py-4">
        
            <View className="flex flex-col justify-center items-center gap-4 bg-primary pb-4">
                    <Image source={image? image : require('./../../assets/user.png')} className="w-40 h-40 rounded-full"/>
                    <View className="">
                        <Text className="text-white text-center">{name}</Text>
                        <Text className="text-white text-center">{email}</Text>
                        <Text className="text-white text-center">{bio}</Text>
                    </View>
            </View>

            <TouchableOpacity className="flex flex-row justify-center" onPress={openCamera}>
                        <Text className="w-2/4 bg-primary p-2 text-white text-center text-xl rounded-md">Change Avatar</Text>
            </TouchableOpacity>

            <View className="flex flex-col justify-center gap-4 px-4">
                <View>
                    <Text>Name</Text>
                    <TextInput value={name} onChangeText={(value)=>setName(value)} placeholder="Name" className="p-2 border-2 rounded-md border-primary"/>
                </View>

                <View>
                    <Text>Email</Text>
                    <TextInput value={email} onChangeText={(value)=>setEmail(value)} placeholder="Email" className="p-2 border-2 rounded-md border-primary"/>
                </View>

                <View>
                    <Text>Bio</Text>
                    <TextInput value={bio} onChangeText={(value)=>setBio(value)} placeholder="Bio" className="p-2 border-2 rounded-md border-primary"/>
                </View>


                <TouchableOpacity onPress={()=> saveData()}>
                    <Text className="bg-primary p-2 mt-4 text-center text-white text-xl">Save</Text>
                </TouchableOpacity>
            </View>

        </View>
        </ScrollView>
    )
}

export default Profile;