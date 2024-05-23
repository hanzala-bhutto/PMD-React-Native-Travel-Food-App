import AsyncStorage from '@react-native-async-storage/async-storage';
import {createContext, useContext, useEffect, useState} from 'react';

const ProfileContext = createContext<any | null>(null);
const useProfileContext = () => useContext(ProfileContext);

const ProfileContextProvider = ({children}: any) => {
  const [profileData, setProfileData] = useState<any>(null);
  const [profileImage, setProfileImage] = useState<any>(null);

  useEffect(() => {
    AsyncStorage.getItem('profile').then((data: any) => {
      if (data) {
        setProfileData(JSON.parse(data));
      } else setProfileData({name: '', email: '', bio: ''});
    });

    AsyncStorage.getItem('profileImage').then((data: any) => {
      if (data) {
        setProfileImage(JSON.parse(data));
      } else setProfileImage(null);
    });

  }, []);

  const updateProfileData = (data: any) => {
    setProfileData(data);
    AsyncStorage.setItem('profile', JSON.stringify(data));
  };

  const updateProfileImage = (data: any) => {
    setProfileImage(data);
    AsyncStorage.setItem('profileImage', JSON.stringify(data));
  }

  return (
    <ProfileContext.Provider value={{profileData, updateProfileData, profileImage, updateProfileImage}}>
      {children}
    </ProfileContext.Provider>
  );
};

export {ProfileContextProvider, useProfileContext};
