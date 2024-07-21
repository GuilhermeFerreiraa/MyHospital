import { forwardRef } from "react";
import {
	Image,
	Text,
	TouchableOpacity,
	TouchableOpacityProps,
	View
} from "react-native";
import { JobOfferProps } from "@/utils/data";
import React from "react";

type JobProps = TouchableOpacityProps & {
	data: JobOfferProps;
	showCandidaciesOnly: boolean;
};

const Job = forwardRef<TouchableOpacity, JobProps>(
	({ data, ...rest }, ref) => {
		return (
			<TouchableOpacity
				ref={ref}
				className="w-full flex-row items-center pb-4 bg-white p-2 rounded-xl mb-2"
				{...rest}
				testID="job-component"
			>
				<Image
					source={{ uri: data.thumbnail }}
					className="w-20 h-20 rounded-lg"
					testID="job-thumbnail"
				/>
				<View className="flex-1 ml-3">
					<View className="flex-row items-center">
						<Text numberOfLines={1} className="text-slate-900 w-full flex-1 font-subtitle text-base" testID="job-title">
							{data.title}
						</Text>
					</View>
					<Text className="text-slate-800 text-sm leading-5 mt-0.5" testID="job-description">
						{data.description}
					</Text>
					<Text className="text-primary text-sm leading-5 mt-0.5" testID="job-number-role">
						{`${data.job_quantity}x vagas disponíveis`}
					</Text>
				</View>
			</TouchableOpacity>
		);
	}
);

export default Job;
