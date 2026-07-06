module.exports = {
  expo: {
    name: "TravFood",
    slug: "TravFood",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#06B2BE"
    },
    assetBundlePatterns: [
      "**/*"
    ],
    ios: {
      supportsTablet: true
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff"
      },
      package: "com.hanzala_k200277.TravFood",
      config: {
        googleMaps: {
          apiKey: process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY
        }
      }
    },
    web: {
      favicon: "./assets/favicon.png"
    },
    extra: {
      eas: {
        projectId: "d36a82df-d94b-4702-8b34-cc2c98a099a8"
      }
    },
    plugins: [
      [
        "expo-location",
        {
          locationAlwaysAndWhenInUsePermission: "Allow Explore Place to use your location."
        }
      ],
      [
        "expo-image-picker",
        {
          cameraPermission: "Allow $(PRODUCT_NAME) to open the camera",
          microphonePermission: false
        }
      ]
    ]
  }
};
