import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import { useEffect, useState } from "react";

// npx expo install @react-native-google-signin/google-signin
// npx expo install expo-dev-client

GoogleSignin.configure({
  webClientId:
    "967541328677-qvnqd2c33ovf15o7ag5e3s26k7vt1vq3.apps.googleusercontent.com",
  androidClientId:
    "967541328677-1rlcgiukpieg10pn9ui40kjpj462ehtk.apps.googleusercontent.com",
  iosClientId:
    "967541328677-pu8kpt9789vgb3jl49v9hsr51bs4fak8.apps.googleusercontent.com",
});

export default function App() {
  const [error, setError] = useState();
  const [userInfo, setUserInfo] = useState();

  const configureGoogleSignIn = () => {
    GoogleSignin.configure({
      webClientId:
        process.env.WEB_CLIENT_ID,
      androidClientId:
      process.env.ANDROID_CLIENT_ID,
      iosClientId:
      process.env.IOS_CLIENT_ID,
    });
  };

  useEffect(() => {
    configureGoogleSignIn();
  });

  const signIn = async () => {
    console.log("Pressed sign in");

    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      setUserInfo(userInfo);
      setError();
    } catch (e) {
      setError(e);
    }
  };

  const logout = () => {
    setUserInfo(undefined);
    GoogleSignin.revokeAccess();
    GoogleSignin.signOut();
  };

  return (
    <View style={styles.container}>
      <Text>{JSON.stringify(error)}</Text>
      {userInfo && <Text>{JSON.stringify(userInfo.user)}</Text>}
      {userInfo ? (
        <Button title="Logout" onPress={logout} />
      ) : (
        <GoogleSigninButton
          size={GoogleSigninButton.Size.Standard}
          color={GoogleSigninButton.Color.Dark}
          onPress={signIn}
        />
      )}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
