import { Button } from "@/components/button";
import Loading from "@/components/loading";
import { ToastMessage } from "@/components/toast";
import { useAuthStore } from '@/stores/auth-store';
import { Feather } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import { Formik } from "formik";
import React, { useState } from "react";
import { Image, KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View } from "react-native";
import Animated, { FadeIn, FadeInUp } from "react-native-reanimated";
import { useToast } from "react-native-toast-notifications";
import colors from "tailwindcss/colors";
import * as Yup from 'yup';

const img_nourse_ = require('@/assets/icons/nourse.png');

const SignInSchema = Yup.object().shape({
	email: Yup.string()
		.email('*Email inválido')
		.required('*E-mail obrigatório'),
	password: Yup.string()
		.min(8, '*Senha inválida.')
		.required('*Senha Obrigatória'),
});

export default function SignIn() {
	const router = useRouter();
	const toast = useToast();
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const { signIn } = useAuthStore();

	const handleSubmit = async (values: { email: string, password: string }, { resetForm }: { resetForm: () => void }) => {

		setIsLoading(true);

		try {
			await SignInSchema.validate(values, { abortEarly: false });

			await signIn({
				email: values.email,
				password: values.password
			});

			router.replace('(app)')

			resetForm();
			ToastMessage.success(toast, "Bem vindo!")
		} catch (err: any) {
			ToastMessage.error(toast, err.message)
		}
		finally {
			setIsLoading(false);
		}
	};

	return (
		<KeyboardAvoidingView className="flex-1" behavior={Platform.OS == 'ios' ? "padding" : "height"}>
			<Animated.View entering={FadeInUp.delay(500)} className="flex-1 bg-secondary px-3">
				<View className="flex-1 flex-col items-center justify-center">
					<Image
						resizeMode="contain"
						source={img_nourse_}
						className="w-32 h-32"
					/>
					<Animated.View
						entering={FadeIn.delay(500)}
						className="h-14 bg-primary rounded-xl w-3/4 flex-row items-center justify-center gap-x-1 shadow-xl mb-6">
						<Animated.Text
							entering={FadeIn.delay(600)}
							className="text-white font-heading text-xl font-bold text-center"
						>
							Encontre
						</Animated.Text>
						<Animated.Text
							entering={FadeIn.delay(700)}
							className="text-white font-heading text-xl font-bold text-center"
						>
							as
						</Animated.Text>
						<Animated.Text
							entering={FadeIn.delay(800)}
							className="text-white font-heading text-xl font-bold text-center"
						>
							melhores
						</Animated.Text>
						<Animated.Text
							entering={FadeIn.delay(900)}
							className="text-white font-heading text-xl font-bold text-center"
						>
							vagas!
						</Animated.Text>
					</Animated.View>

					<Formik
						initialValues={{ email: '', password: '' }}
						validationSchema={SignInSchema}
						onSubmit={handleSubmit}
					>
						{({ handleChange, handleBlur, handleSubmit, resetForm, values, errors, touched }) => (
							<View className="w-full">
								<View className="flex-row items-center justify-between">
									<Text className="text-white font-bold text-base">
										E-mail:
									</Text>

									{errors.email && touched.email && (
										<Text className="text-white font-semibold text-sm">{errors.email}</Text>
									)}
								</View>


								<TextInput
									textContentType='oneTimeCode'
									className='border-slate-200 border-2 bg-slate-100 rounded-lg px-4 py-3 text-sm my-2'
									placeholder="E-mail"
									placeholderTextColor={colors.slate[400]}
									keyboardType="email-address"
									keyboardAppearance="dark"
									returnKeyType="next"
									secureTextEntry={false}
									onChangeText={handleChange('email')}
									onBlur={handleBlur('email')}
									importantForAutofill="no"
									value={values.email}
								/>

								<View className="flex-row items-center justify-between">
									<Text className="text-white font-bold text-base">
										Senha:
									</Text>

									{touched.password && errors.password &&
										<Text className="text-white font-semibold text-sm">{errors.password}</Text>
									}
								</View>

								<TextInput
									textContentType='password'
									onChangeText={handleChange('password')}
									onBlur={handleBlur('password')}
									value={values.password}
									returnKeyType="done"
									placeholderTextColor={colors.slate[400]}
									returnKeyLabel="Entrar"
									keyboardAppearance="dark"
									keyboardType="ascii-capable"
									importantForAutofill="no"
									secureTextEntry
									onSubmitEditing={handleSubmit as any}
									placeholder="********"
									className='border-slate-200 border-2 bg-slate-100 rounded-lg px-4 py-3 font-body text-sm my-2'
								/>

								<Button className='bg-primary rounded-lg mt-8' onPress={handleSubmit as any}>
									<Button.Icon>
										<Feather name="log-in" color={colors.white} size={20} />
									</Button.Icon>
									<Button.Text>
										Entrar
									</Button.Text>
								</Button>
								<View className="flex-row items-center justify-center mt-4">
									<TouchableOpacity
										onPress={() => {
											resetForm();
											router.push('sign-up');
										}}>
										<Text className="text-white font-subtitle mt-4">
											Não possui uma conta?{" "}
											<Link href='sign-in'>
												<Text className="underline text-sm font-heading">
													Registre-se
												</Text>
											</Link>
										</Text>
									</TouchableOpacity>
								</View>
							</View>
						)}
					</Formik>

				</View>
			</Animated.View>
			{isLoading && <Loading />}
		</KeyboardAvoidingView >
	);
}
