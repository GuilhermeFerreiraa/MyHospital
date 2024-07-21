import { Stack } from "expo-router";
import { Platform, SafeAreaView } from "react-native";

export default function Layout() {
	return (
		<SafeAreaView className="flex-1 bg-transparent">
			<Stack
				screenOptions={{
					headerShown: false,
					animation: "fade_from_bottom",
					statusBarColor: "#23b0ba",
					statusBarTranslucent: true,
				}}
			>
				<Stack.Screen name="index" />
				<Stack.Screen name="candidacy" />
			</Stack>
		</SafeAreaView>
	)
}