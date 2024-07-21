import { Button } from "@/components/button";
import Loading from "@/components/loading";
import { ToastMessage } from "@/components/toast";
import { useAuthStore } from "@/stores/auth-store";
import { useGlobalSearchParams, useRouter } from "expo-router";
import { Formik } from 'formik';
import { useState } from "react";
import { Image, KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View } from "react-native";
import Animated, { FadeInUp } from "react-native-reanimated";
import { useToast } from "react-native-toast-notifications";
import colors from "tailwindcss/colors";
import * as yup from 'yup';

const img_logo_ = require('@/assets/logo.png');

export default function ConfirmCode() {
	const router = useRouter();
	const toast = useToast();
	const { confirmAccount, resendCode } = useAuthStore();
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const { email } = useGlobalSearchParams<{ email: string; }>();

	const validationSchema = yup.object().shape({
		code: yup.string().required('*Código de verificação é obrigatório.').length(6, 'O código deve ter 6 dígitos.'),
	});

	const handleSubmit = async (values: { code: string }, { resetForm }: { resetForm: () => void }) => {
		if (!email) {
			ToastMessage.error(toast, 'Houve um problema. Tente mais tarde');
			return router.back();
		}

		setIsLoading(true);
		try {

			await confirmAccount({
				code: values.code,
				email: email,
			});

			router.replace('(app)/')

		} catch (err: any) {
			ToastMessage.error(toast, err.message);
		} finally {
			setIsLoading(false);
			resetForm()
		}
	};

	const handleResendCode = async () => {
		if (!email) {
			ToastMessage.error(toast, 'Houve um problema. Tente mais tarde');
			return router.back();
		}

		try {
			ToastMessage.update(toast, "Código enviado com sucesso!", "Enviando código de recuperação..")
			await resendCode(email);
		} catch (err) {
			console.log("confirm-code error: ", err);

			ToastMessage.error(toast, "Falha ao enviar o código")
		}
	}

	return (
		<KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS == 'ios' ? "padding" : "height"}>
			<Animated.View entering={FadeInUp.delay(300)} className="flex-1 bg-primary px-3">
				<View className="flex-1 flex-col items-center justify-center">
					<Image
						source={img_logo_}
						className="w-32 h-32 mb-4"
					/>
					<Text className="text-xl text-center font-heading mt-2 text-white">
						Código de verificação!
					</Text>
					<Text className="text-base text-center font-heading mb-4 mt-2 text-white">
						{`Enviamos um código para o seu e-mail ${email}.`}
					</Text>
					<Formik
						initialValues={{ code: '' }}
						onSubmit={handleSubmit}
						validationSchema={validationSchema}
					>
						{({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
							<View className="w-full">
								<Text className="text-base text-left font-bold mt-2 text-white">
									Insira o código:
								</Text>
								<TextInput
									textContentType='oneTimeCode'
									className='w-full border-slate-200 border-2 bg-slate-100 rounded-lg px-4 py-3 text-sm my-2 text-center'
									placeholder="Ex: ######"
									placeholderTextColor={colors.gray[400]}
									returnKeyType="done"
									keyboardType="number-pad"
									keyboardAppearance="dark"
									numberOfLines={1}
									maxLength={6}
									secureTextEntry={false}
									onChangeText={handleChange('code')}
									onBlur={handleBlur('code')}
									value={values.code}
									onSubmitEditing={handleSubmit as any}
								/>
								{touched.code && errors.code &&
									<Text className="text-secondary font-semibold text-sm mb-2">{errors.code}</Text>
								}

								<View className="flex-row items-center">
									<Text className="text-white font-medium text-sm">Não recebeu seu código?{" "}</Text>

									<TouchableOpacity onPress={handleResendCode}>
										<Text className="text-white font-medium text-sm underline">
											Clique aqui
										</Text>
									</TouchableOpacity>

									<Text className="text-white font-medium text-sm">
										{" "}para reenviar
									</Text>

								</View>

								<Button className='w-full bg-secondary rounded-lg mt-8' onPress={handleSubmit as any}>
									<Button.Text>
										Enviar
									</Button.Text>
								</Button>
							</View>
						)}
					</Formik>
					<TouchableOpacity onPress={() => router.replace('/')}>
						<Text className='text-white font-subtitle text-base underline mt-4'>
							Voltar para o Login
						</Text>
					</TouchableOpacity>
				</View>
			</Animated.View>
			{isLoading && <Loading />}
		</KeyboardAvoidingView>
	);
}