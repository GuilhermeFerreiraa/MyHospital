import { Button } from "@/components/button";
import Loading from "@/components/loading";
import { useAuthStore } from "@/stores/auth-store";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Image, ImageBackground } from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";

const img_background_ = require('@/assets/background.png');
const img_logo_ = require('@/assets/logo.png');

export default function Login() {
	const { loadUser, isAuthenticated } = useAuthStore();
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const router = useRouter();

	const handleSignIn = () => {
		router.push('sign-in')
	}

	useEffect(() => {
		(async () => {
			await loadUser();
			setIsLoading(false);

			if (isAuthenticated) {
				router.replace('/(app)')
			}
		})()
	}, []);

	return (
		<ImageBackground
			source={img_background_}
			defaultSource={img_background_}
			className="flex-1 items-center justify-center"
		>
			{isLoading ? (
				<Loading />
			) : (
				<Animated.View
					entering={FadeIn.delay(300)}
					exiting={FadeOut.delay(300)}
					className="flex-1 items-center justify-center"
				>
					<Image
						source={img_logo_}
						className="w-32 h-32"
					/>

					<Animated.Text
						className='text-secondary my-6 text-center font-bold text-xl'
					>
						Bem-vindo ao My Hospital!
					</Animated.Text>
					<Button
						className='px-12 bg-secondary rounded-xl'
						onPress={handleSignIn}
					>
						<Button.Text>
							Acessar minha conta
						</Button.Text>
					</Button>
				</Animated.View>
			)}
		</ImageBackground>
	);
}
