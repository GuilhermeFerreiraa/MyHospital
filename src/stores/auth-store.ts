import AsyncStorage from '@react-native-async-storage/async-storage';
import { Auth } from 'aws-amplify';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import * as Haptics from 'expo-haptics';

type UserType = {
	email?: string;
	email_verified?: boolean;
	password?: string;
};

type AuthState = {
	user: UserType | null;
	isAuthenticated: boolean;
	signIn: (credentials: { email: string; password: string }) => Promise<void>;
	signUp: (credentials: { email: string; password: string }) => Promise<void>;
	confirmAccount: (credentials: { email: string; code: string }) => Promise<void>;
	resendCode: (email: string) => Promise<void>;
	signOut: () => Promise<void>;
	loadUser: () => Promise<void>;
};

export const useAuthStore = create(
	persist<AuthState>(
		(set) => ({
			user: null,
			isAuthenticated: false,
			signIn: async ({ email, password }) => {
				try {
					const user = await Auth.signIn({
						username: email,
						password: password
					});

					const userData: UserType = {
						email: user.attributes.email,
						email_verified: user.attributes.email_verified,
					};

					set({
						user: {
							email,
							password
						},
						isAuthenticated: true,
					});

					console.log("User signed in:", userData);

					Haptics.notificationAsync(
						Haptics.NotificationFeedbackType.Success
					);

				} catch (err: any) {
					console.log("signIn-error", err);
					Haptics.notificationAsync(
						Haptics.NotificationFeedbackType.Error
					);

					if (err?.code === "UserNotFoundException") {
						throw new Error('Usuário não possui cadastro.');
					} 
					else if (err?.code === "NotAuthorizedException") {
						throw new Error('E-mail ou senha incorretos. Tente novamente!');
					} 
					
					else if (err?.code === "UserNotConfirmedException") {
						throw new Error('Usuário não confirmado. Fale com o Suporte.');
					} 
					
					else {
						throw new Error(err.code);
					}
				}
			},
			signUp: async ({ email, password }) => {
				try {
					const user = await Auth.signUp({
						username: email,
						password: password,
					});

					const userData: UserType = {
						email,
						email_verified: user.userConfirmed,
					};

					set({ user: userData });

					console.log("User signed up:", userData);

					Haptics.notificationAsync(
						Haptics.NotificationFeedbackType.Success
					);

				} catch (err: any) {
					console.log('sign-up error:', err);

					Haptics.notificationAsync(
						Haptics.NotificationFeedbackType.Error
					);

					if (err?.code === "UsernameExistsException") {
						throw new Error('Já existe um usuário com este e-mail!');
					}
				}
			},
			confirmAccount: async ({ email, code }) => {
				try {
					await Auth.confirmSignUp(email, code);

					Haptics.notificationAsync(
						Haptics.NotificationFeedbackType.Success
					);

				} catch (err: any) {
					console.log("confirmAccount-error", err);
					Haptics.notificationAsync(
						Haptics.NotificationFeedbackType.Error
					);

					if (err?.code === "AuthError") {
						throw new Error('Usuário é obrigatório!');
					} else if (err?.code === "CodeMismatchException") {
						throw new Error('Código Inválido. Confira seu e-mail!');
					}
				}
			},
			resendCode: async (email) => {
				try {
					await Auth.resendSignUp(email);

					Haptics.notificationAsync(
						Haptics.NotificationFeedbackType.Success
					);

				} catch (err: any) {
					console.log("resendCode-error", err);
					Haptics.notificationAsync(
						Haptics.NotificationFeedbackType.Error
					);

					if (err?.code === "AuthError") {
						throw new Error('Usuário é obrigatório!');
					} else if (err?.code === "CodeMismatchException") {
						throw new Error('Código Inválido. Confira seu e-mail, e tente novamente!');
					}
				}
			},
			signOut: async () => {
				try {
					await Auth.signOut();
					set({ user: null, isAuthenticated: false });
				} catch (err) {
					console.log("signOut-error", err);
				}
			},
			loadUser: async () => {
				try {
					const storedState = await AsyncStorage.getItem('auth-token:token');
					if (storedState) {
						const { state } = JSON.parse(storedState);

						if (state.isAuthenticated) {
							await Auth.signIn({
								username: state.user.email,
								password: state.user.password
							});

							set({
								user: state.user,
								isAuthenticated: state.isAuthenticated
							});
						}
					}
				} catch (err) {
					console.error("Error loading user from storage:", err);
				}
			}
		}),
		{
			name: 'auth-token:token',
			storage: createJSONStorage(() => AsyncStorage),
		}
	)
);
