import { Button } from "@/components/button";
import Loading from "@/components/loading";
import { ToastMessage } from "@/components/toast";
import { useAuthStore } from "@/stores/auth-store";
import { MaterialIcons } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import { Formik } from "formik";
import React, { useState } from "react";
import { Image, KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View } from "react-native";
import Animated, { FadeInUp } from "react-native-reanimated";
import { useToast } from "react-native-toast-notifications";
import colors from "tailwindcss/colors";
import * as Yup from "yup";

type SignUpParameters = {
	password: string;
	email: string;
};

const img_logo_ = require('@/assets/logo.png');

const initialValues: SignUpParameters = {
	password: '',
	email: ''
};

const SignUpSchema = Yup.object().shape({
	email: Yup.string()
		.email('*Email inválido')
		.required('*E-mail é obrigatório'),
	password: Yup.string()
		.min(8, '*mínimo 8 caracteres')
		.required('*Senha é obrigatória'),
});

export default function SignUp() {
	const router = useRouter();
	const toast = useToast();
	const { signUp } = useAuthStore();

	const [isLoading, setIsLoading] = useState<boolean>(false);

	const handleSubmit = async (values: SignUpParameters, { resetForm }: { resetForm: () => void }) => {
		setIsLoading(true);

		try {
			await signUp({
				email: values.email,
				password: values.password,
			})

			router.replace('confirm-code')
			router.setParams({ email: values.email });

			setIsLoading(false);

			ToastMessage.success(toast, "Usuário criado com sucesso!")
			resetForm();
		} catch (err: any) {
			ToastMessage.error(toast, err.message)

		} finally {
			setIsLoading(false);
		}
	};

	return (
		<KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS == 'ios' ? "padding" : "height"}>
			<Animated.View entering={FadeInUp.delay(300)} className="flex-1 bg-primary px-3">
				<View className="flex-1 flex-col items-center justify-center">
					<Image
						source={img_logo_}
						className="w-32 h-32 mb-4"
					/>
					<Text className="text-xl text-center font-heading my-4 text-white">Vamos criar sua conta?</Text>
					<Formik
						initialValues={initialValues}
						validationSchema={SignUpSchema}
						onSubmit={handleSubmit}
					>
						{({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
							<View className="w-[100%]">
								<View className="flex-row items-center justify-between">
									<Text className="text-white font-bold text-base">
										E-mail:
									</Text>

									{touched.email && errors.email &&
										<Text className="text-secondary font-semibold text-sm">{errors.email}</Text>
									}
								</View>

								<TextInput
									textContentType='oneTimeCode'
									className='border-slate-200 border-2 bg-slate-100 rounded-lg px-4 py-3 text-sm my-2'
									placeholder="Ex: teste@teste.teste"
									keyboardType="email-address"
									keyboardAppearance="dark"
									returnKeyType="next"
									secureTextEntry={false}
									placeholderTextColor={colors.slate[400]}
									onChangeText={handleChange('email')}
									onBlur={handleBlur('email')}
									value={values.email}
								/>

								<View className="flex-row items-center justify-between">
									<Text className="text-white font-bold text-base">
										Senha:
									</Text>

									{touched.password && errors.password &&
										<Text className="text-secondary font-semibold text-sm">{errors.password}</Text>
									}
								</View>

								<TextInput
									textContentType='oneTimeCode'
									onChangeText={handleChange('password')}
									onBlur={handleBlur('password')}
									value={values.password}
									returnKeyType="done"
									placeholderTextColor={colors.slate[400]}
									returnKeyLabel="Entrar"
									keyboardAppearance="dark"
									keyboardType="default"
									secureTextEntry
									onSubmitEditing={handleSubmit as any}
									placeholder="********"
									className='border-slate-200 border-2 bg-slate-100 rounded-lg px-4 py-3 font-body text-sm my-2'
								/>

								<Button className='bg-secondary rounded-lg mt-8' onPress={handleSubmit as any}>
									<Button.Icon>
										<MaterialIcons name="navigate-next" size={20} color={colors.white} />
									</Button.Icon>
									<Button.Text>
										Criar conta
									</Button.Text>
								</Button>
							</View>
						)}
					</Formik>
					<TouchableOpacity onPress={router.back}>
						<Text className="text-white font-subtitle mt-4">
							Já possui uma conta?{" "}
							<Link href='sign-in'>
								<Text className="underline text-sm font-heading">
									Fazer Login
								</Text>
							</Link>
						</Text>
					</TouchableOpacity>
				</View>
			</Animated.View>
			{isLoading && <Loading />}
		</KeyboardAvoidingView >
	);
}
