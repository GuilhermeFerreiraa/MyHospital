import { Redirect, router, Stack } from "expo-router";
import { ImageBackground, SafeAreaView, StatusBar } from "react-native";

import {
	Inter_400Regular,
	Inter_500Medium,
	Inter_600SemiBold,
	Inter_700Bold,
} from '@expo-google-fonts/inter';
import { useFonts } from "expo-font";
import Loading from "@/components/loading";

import { Amplify } from 'aws-amplify';
import awsconfig from '@/aws-exports';
import { ToastProvider } from "react-native-toast-notifications";
import { useAuthStore } from "@/stores/auth-store";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
Amplify.configure(awsconfig);

export const unstable_settings = {
	initialRouteName: 'index',
};

const RootLayout = () => {
	const [fontsLoaded] = useFonts({
		Inter_400Regular,
		Inter_500Medium,
		Inter_600SemiBold,
		Inter_700Bold,
	});

	if (!fontsLoaded) {
		return <Loading />
	}

	return (
		<ToastProvider>
			<StatusBar animated barStyle="dark-content" />
			<Stack screenOptions={{ headerShown: false }}>
				<Stack.Screen name="index" options={{ headerShown: false }} />
				<Stack.Screen name="sign-in" options={{ headerShown: false }} />
				<Stack.Screen name="sign-up" options={{ headerShown: false, }} />
				<Stack.Screen name="confirm-code" options={{ headerShown: false }} />
			</Stack>
		</ToastProvider>
	)
}

export default RootLayout;