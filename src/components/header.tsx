import { useAuthStore } from "@/stores/auth-store";
import { useCandidacyStore } from "@/stores/candidacy-store";
import { Feather } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import colors from "tailwindcss/colors";


export default function Header() {
	const router = useRouter();
	const { signOut } = useAuthStore();
	const { clear } = useCandidacyStore();

	const logOut = () => {
		Alert.alert(
			'Confirmar Logout',
			'Tem certeza que deseja sair?',
			[
				{
					text: 'Cancelar',
					style: 'cancel',
				},
				{
					text: 'Sim',
					onPress: async () => {
						await signOut();
						clear();
						router.replace('/')
					},
				},
			],
			{ cancelable: false }
		);
	}

	return (
		<View testID="header-container" className="flex items-center">
			<View className="flex-row items-center justify-between px-3 py-3 bg-secondary w-[100%] rounded-lg shadow-md">
				<View className="flex-col items-start justify-center gap-y-2">
					<Text testID="header-welcome-text" className="text-white text-left text-xl font-heading">
						Olá!
					</Text>
					<Link className="underline" href="candidacy" asChild>
						<Text testID="header-welcome-text" className="text-white text-left text-sm font-heading">
							Ver candidaturas
						</Text>
					</Link>
				</View>
				<View className="flex-row gap-x-4 items-center">
					<TouchableOpacity
						onPress={logOut}
						className="w-8 h-8 flex-row items-center justify-center"
						testID="logout-button"
					>
						<Feather
							name="log-out"
							color={colors.white}
							size={24}
						/>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
}
