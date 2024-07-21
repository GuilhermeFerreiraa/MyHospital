import Card from "@/components/card";
import { useCandidacyStore } from "@/stores/candidacy-store";
import { JOBS } from "@/utils/data";
import { Entypo, FontAwesome6, Ionicons } from "@expo/vector-icons";
import { Redirect, useLocalSearchParams, useRouter } from "expo-router";
import { Image, ImageBackground, Platform, Text, TouchableOpacity, View } from "react-native";
import Animated, { FadeInUp } from 'react-native-reanimated';
import colors from "tailwindcss/colors";

interface JobProps {
	showCandidaciesOnly: boolean;
}

const img_background = require('@/assets/background.png')

export default function JobId({ showCandidaciesOnly }: JobProps) {
	const { id } = useLocalSearchParams<{ id: string }>();
	const { candidacies } = useCandidacyStore();
	const router = useRouter();

	const job = JOBS.find((item) => item.id === id);

	if (!job) {
		return <Redirect href="(app)" />;
	}

	const updatedShifts = job.shifts.map((shift) => {
		const hasCandidacy = candidacies.some((candidacy) => candidacy.id === shift.id);
		return {
			...shift,
			candidacy_sent: hasCandidacy,
		};
	});

	const displayedShifts = showCandidaciesOnly
		? updatedShifts.filter(shift => shift.candidacy_sent)
		: updatedShifts;

	return (
		<ImageBackground
			source={require('@/assets/background.png')}
			defaultSource={img_background}
			className={`flex-1 ${Platform.OS == "android" && "mt-6"}`}
		>
			<Animated.ScrollView
				className="flex-1"
				alwaysBounceVertical={false}
				entering={FadeInUp.delay(200)}
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{ paddingBottom: 10 }}
			>
				<View className="relative shadow-md">
					<Image
						resizeMode="cover"
						className="w-full h-52"
						source={{ uri: job.thumbnail }}
					/>
					<TouchableOpacity
						onPress={() => router.back()}
						className="absolute shadow-md pr-1 w-10 h-10 top-3 left-3 rounded-full bg-gray-100 flex-1 items-center justify-center">
						<Ionicons
							name="chevron-back-sharp"
							size={28}
							color={colors.gray[900]}
						/>
					</TouchableOpacity>
				</View>

				<View className="px-5 pt-5 mt-2 flex-1">
					<View className="flex-col justify-start items-start bg-white rounded-lg px-4 py-2 shadow-lg gap-y-2 mb-2">
						<View className="flex-row items-start justify-center">
							<FontAwesome6 name="hospital" size={24} color={colors.slate[800]} />
							<Text className="ml-3 text-secondary text-lg font-bold" numberOfLines={1}>{job.title}</Text>
						</View>

						<View className="flex-row items-start justify-center pl-1">
							<Entypo
								name="location-pin"
								size={24}
								color={colors.slate[800]}
							/>

							<View className="flex-col items-start justify-start px-3">
								<Text className="text-slate-800 text-sm font-subtitle">Sobre o Hospital:</Text>
								<Text className="text-slate-800 font-body text-sm leading-6 my-2">
									{job.description}
								</Text>
							</View>
						</View>

						<View className="flex-row items-center justify-center pl-1">
							<FontAwesome6 name="suitcase" size={24} color="#23b0ba" />
							<Text className="ml-3 text-primary text-sm font-body">{job.job_quantity}x vagas disponíveis</Text>
						</View>
					</View>

					<Text className="text-lg font-heading text-secondary">
						Confira as Vagas:
					</Text>

					{displayedShifts.map((item, index) => <Card data={item} key={index} />)}
				</View>
			</Animated.ScrollView>
		</ImageBackground>
	);
}
