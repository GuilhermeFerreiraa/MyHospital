import { JobData } from '@/components/card';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware'
import * as CandidacyInMemory from './helpers/candidacy-in-memory';
import AsyncStorage from '@react-native-async-storage/async-storage';

type CandidacyStore = {
	candidacies: JobData[];
	addCandidacy: (candidacy: JobData) => void;
	removeCandidacy: (candidacyId: string) => void;
	clear: () => void;
};

export const useCandidacyStore = create(
	persist<CandidacyStore>((set) => ({
		candidacies: [],

		addCandidacy: (candidacy: JobData) =>
			set((state) => ({
				candidacies: CandidacyInMemory.add(state.candidacies, candidacy),
			})),

		removeCandidacy: (candidacyId: string) =>
			set((state) => ({
				candidacies: CandidacyInMemory.remove(state.candidacies, candidacyId),
			})),

		clear: () => set(() => ({ candidacies: [] }))
	}), {
		name: "my-hospital:candidacies",
		storage: createJSONStorage(() => AsyncStorage),
	}))