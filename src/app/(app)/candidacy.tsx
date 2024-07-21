import { Button } from "@/components/button";
import Job from "@/components/job";
import { useCandidacyStore } from "@/stores/candidacy-store";
import { JOBS } from "@/utils/data";
import { FontAwesome6, MaterialIcons } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import { ImageBackground, Text, View } from "react-native";
import Animated, { FadeInUp } from "react-native-reanimated";
import colors from "tailwindcss/colors";

const img_background = require('@/assets/background.png');

export default function Candidacy() {
	const router = useRouter();
	const { candidacies } = useCandidacyStore();

	const filteredJobs = JOBS.map((job) => {

		const updatedShifts = job.shifts.filter((shift) =>
			candidacies.some((candidacy) => candidacy.id === shift.id)
		);

		return {
			...job,
			shifts: updatedShifts,
		};
	}).filter((job) => job.shifts.length > 0);

	return (
		<ImageBackground
			defaultSource={img_background}
			className="flex-1 pt-8 px-3"
			source={img_background}
		>
			<Animated.View entering={FadeInUp.delay(250)} className="flex-row items-center justify-center w-full py-4 rounded-xl bg-secondary mx-auto">
				<FontAwesome6 name="list-ul" size={24} color={colors.white} />
				<Text className="font-heading text-xl text-white ml-3">Suas Candidaturas</Text>
			</Animated.View>

			{filteredJobs.length > 0 ? (
				<View className="flex-1 pb-2">
					<Animated.FlatList
						entering={FadeInUp.delay(300)}
						data={filteredJobs}
						keyExtractor={(item) => item.id}
						renderItem={({ item }) => (
							<Link href={`/job/${item.id}`} asChild>
								<Job data={item} showCandidaciesOnly={true} />
							</Link>
						)}
						className="flex-1 p-5"
						showsVerticalScrollIndicator={false}
						contentContainerStyle={{ paddingBottom: 20 }}
					/>

					<Button className="w-full bg-secondary rounded-xl" onPress={() => router.back()}>
						<Button.Icon>
							<MaterialIcons name="search" size={24} color={colors.white} />
						</Button.Icon>
						<Button.Text>
							Buscar Vagas
						</Button.Text>
					</Button>
				</View>
			) : (
				<Animated.View entering={FadeInUp.delay(300)} className="flex-1 items-center justify-center">
					<View
						className="flex-col shadow-md rounded-xl w-full px-2 pt-4 pb-2 h items-center justify-center bg-primary gap-y-2 bottom-20"
					>
						<MaterialIcons name="info-outline" size={42} color={colors.white} />
						<Animated.Text className="mt-2 font-bold text-xl text-center text-white mb-2">
							Você ainda não se {"\n"} candidatou a nenhuma vaga
						</Animated.Text>
						<Button className="w-full bg-secondary rounded-xl" onPress={() => router.back()}>
							<Button.Icon>
								<MaterialIcons name="search" size={24} color={colors.white} />
							</Button.Icon>
							<Button.Text>
								Buscar Vagas
							</Button.Text>
						</Button>
					</View>
				</Animated.View>
			)}
		</ImageBackground>
	);
}
