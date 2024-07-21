import { ToastType } from "react-native-toast-notifications";
import colors from "tailwindcss/colors";

import { MaterialIcons } from '@expo/vector-icons';
import { styled } from 'nativewind';
import React, { useEffect } from 'react';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';

const AnimatedIcon = styled(Animated.createAnimatedComponent(MaterialIcons));

function ToastMessage() { }

function IconRefresh() {
	const rotation = useSharedValue(0);

	useEffect(() => {
		rotation.value = withRepeat(
			withTiming(360, {
				duration: 2000,
				easing: Easing.linear,
			}),
			-1,
			false
		);
	}, []);

	const animatedStyle = useAnimatedStyle(() => {
		return {
			transform: [{ rotate: `${rotation.value}deg` }],
		};
	});

	return (
		<AnimatedIcon
			name="rotate-right"
			size={24}
			color={colors.white}
			style={animatedStyle}
		/>
	);
};

function SuccessToast(toast: ToastType, message: string) {
	return toast.show(message || "Sucesso!", {
		animationType: "slide-in",
		duration: 3000,
		normalColor: colors.green[500],
		style: {
			top: 10,
			position: 'absolute'
		},
		textStyle: {
			textAlign: 'center',
			fontFamily: 'Inter_600SemiBold',
		},
		placement: "top",
		swipeEnabled: true,
		icon: <MaterialIcons name="check-circle-outline" size={24} color={colors.white} />
	})
}

function UpdateToast(toast: ToastType, message: string, loadMessage?: string) {
	let id = toast.show(loadMessage || "Enviando..", {
		animationType: "slide-in",
		duration: 5000,
		normalColor: colors.gray[600],
		style: {
			top: 10,
			position: 'absolute'
		},
		textStyle: {
			textAlign: 'center',
			fontFamily: 'Inter_600SemiBold',
		},
		placement: "top",
		swipeEnabled: true,
		icon: <IconRefresh />
	});

	setTimeout(() => {
		toast.update(id, message, {
			animationType: "slide-in",
			duration: 3000,
			normalColor: colors.green[500],
			textStyle: {
				textAlign: 'center',
				fontFamily: 'Inter_600SemiBold',
			},
			placement: "top",
			swipeEnabled: true,
			icon: <MaterialIcons name="check-circle-outline" size={24} color={colors.white} />
		})
	}, 2000);
}

function ErrorToast(toast: ToastType, message: string) {
	return toast.show(message || "Erro!", {
		animationType: "slide-in",
		duration: 3000,
		normalColor: colors.red[400],
		style: {
			top: 10,
			position: 'absolute'
		},
		textStyle: {
			textAlign: 'center',
			fontFamily: 'Inter_600SemiBold',
		},
		placement: "top",
		swipeEnabled: true,
		icon: <MaterialIcons name="error-outline" size={24} color={colors.white} />
	})
}

ToastMessage.success = SuccessToast;
ToastMessage.update = UpdateToast;
ToastMessage.error = ErrorToast;



export { ToastMessage };

