import { JobData } from "@/components/card";

export function add(jobs: JobData[], newCandidacy: JobData): JobData[] {
	const existingJob = jobs.find(({ id }) => newCandidacy.id === id);

	if (existingJob) {
		return jobs.map((job) =>
			job.id === existingJob.id ? { ...job, ...newCandidacy } : job
		);
	}

	return [...jobs, newCandidacy];
}

export function remove(jobs: JobData[], candidacyRemoveId: string): JobData[] {
	return jobs.filter((job) => job.id !== candidacyRemoveId);
}
