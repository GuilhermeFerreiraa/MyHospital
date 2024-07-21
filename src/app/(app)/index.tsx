import Header from "@/components/header";
import Job from "@/components/job";
import { JOBS } from "@/utils/data";
import { Link } from "expo-router";
import { FlatList, ImageBackground, Platform, StatusBar, Text } from "react-native";

const img_background = require('@/assets/background.png');

export default function Home() {
	return (
		<ImageBackground
			source={img_background}
			className={`flex-1 px-3 ${Platform.OS == "android" && "pt-8"}`}
			defaultSource={require('@/assets/background.png')}
		>
			<Header />

			<Text className="text-center font-bold text-xl my-4 text-secondary">
				Conheça nossas Unidades de Saúde
			</Text>

			<FlatList
				data={JOBS}
				keyExtractor={(i) => i.id}
				renderItem={({ item }) => (
					<Link href={`/job/${item.id}`} asChild>
						<Job data={item} showCandidaciesOnly={false} />
					</Link>
				)}
				className="flex-1 py-5"
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{ paddingBottom: 40 }}
			/>

		</ImageBackground>
	);
}
