import { useCandidacyStore } from "@/stores/candidacy-store";
import { FormatDate } from "@/utils/functions/format-date";
import { AntDesign, FontAwesome, MaterialIcons } from "@expo/vector-icons";
import React from "react";
import {
	Alert,
	Text,
	TouchableOpacity,
	View
} from "react-native";
import Animated, { FadeInUp } from "react-native-reanimated";
import { useToast } from "react-native-toast-notifications";
import colors from "tailwindcss/colors";
import { Button } from "./button";
import { ToastMessage } from "./toast";
import { useRouter } from "expo-router";

export type JobData = {
	id: string;
	created_at: string;
	role: string;
	requirement: string;
	schedule: {
		starts_at: string;
		ends_at: string;
	};
	shift_type: string;
	candidacy_sent?: boolean;
}

type JobProps = {
	data: JobData
};

const Card = ({ data }: JobProps) => {
	const toast = useToast();
	const router = useRouter();
	const Date = new FormatDate();
	const { addCandidacy, removeCandidacy } = useCandidacyStore();

	const handleApplyJob = (data: JobData) => {

		Alert.alert(
			'Confirmar Candidatura',
			`Deseja se candidatar á vaga de ${data.role}?`,
			[
				{
					text: 'Cancelar',
					style: 'cancel',
				},
				{
					text: 'Sim',
					onPress: async () => {
						ToastMessage.update(toast, 'Candidatura enviada com sucesso!', 'Enviando candidatura..')
						setTimeout(() => {
							addCandidacy(data);
						}, 2000);
					},
				},
			],
			{ cancelable: false }
		);

	};

	const handleCancelAplicationJob = (data: JobData) => {

		Alert.alert(
			'Cancelar Candidatura',
			`Deseja cancelar candidatura á vaga de ${data.role}?`,
			[
				{
					text: 'Cancelar',
					style: 'cancel',
				},
				{
					text: 'Sim',
					onPress: async () => {
						ToastMessage.update(toast, 'Candidatura removida com sucesso!', 'Removendo candidatura..')
						setTimeout(() => {
							removeCandidacy(data.id);
							router.back();
						}, 2000);
					},
				},
			],
			{ cancelable: false }
		);

	};

	return (
		<Animated.View className="w-full bg-white my-2 rounded-xl p-4" key={data.id}>

			<View className="flex-row items-center justify-between">
				<Text className="text-base font-heading text-secondary">{data.role}</Text>
				{data.candidacy_sent && (

					<TouchableOpacity
						testID="cancel-button"
						onPress={() => handleCancelAplicationJob(data)}
						className="bg-red-400 w-8 h-8 rounded-md flex-row items-center justify-center"
					>
						<FontAwesome
							size={20}
							name="trash-o"
							color={colors.white}
						/>
					</TouchableOpacity>
				)}
			</View>

			<View className="flex-row gap-x-2">
				<Text className="text-sm font-subtitle text-secondary">
					Data:
				</Text>
				<Text className="text-sm font-body text-gray-700">
					{Date.formatDate(data.schedule.starts_at)}
				</Text>
			</View>

			<View className="flex-row gap-x-2">
				<Text className="text-sm font-subtitle text-secondary">
					Horário:
				</Text>
				<Text className="text-sm font-body text-gray-700">{`${Date.formatHour(data.schedule.starts_at)}h`}</Text>
			</View>

			<View className="flex-row gap-x-2">
				<Text className="text-sm font-subtitle text-secondary">
					Turno:
				</Text>
				<Text className="text-sm font-body text-gray-700">{data.shift_type}</Text>
			</View>

			<Text className="text-sm font-body text-gray-700">{data.requirement}</Text>

			{!data.candidacy_sent ? (
				<Button testID="apply-button" className="bg-secondary w-full mt-4" onPress={() => handleApplyJob(data)}>
					<Button.Icon>
						<AntDesign name="pluscircleo" size={24} color={colors.white} />
					</Button.Icon>
					<Button.Text>
						Candidatar-me
					</Button.Text>
				</Button>
			) : (
				<Animated.View
					entering={FadeInUp.delay(200)}
					className="bg-primary h-12 w-full flex-row items-center justify-center gap-x-4 mx-auto mt-4 rounded-lg "
				>
					<MaterialIcons
						name="check-circle-outline"
						size={24}
						color={colors.white}
					/>
					<Text className="text-white font-heading text-center text-base mx-2">
						Já se candidatou!
					</Text>
				</Animated.View>
			)}
		</Animated.View >
	);
}

export default Card;
