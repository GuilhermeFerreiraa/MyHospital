import React from 'react';
import renderer from 'react-test-renderer';
import Job from '@/components/job';
import { JobOfferProps } from '@/utils/data';

const mockData: JobOfferProps = {
	title: "Hospital Fort Jettborough",
	description: "Hospital Clínico localizado na região Southwest de Lake Terrence.",
	thumbnail: 'https://example.com/thumbnail.jpg',
	job_quantity: 5,
	id: '1',
	cover: 'https://example.com/thumbnail.jpg',
	shifts: []
};

describe('<Job />', () => {
	it('deve renderizar corretamente com as props fornecidas', () => {
		const tree = renderer.create(
			<Job
				data={mockData}
				showCandidaciesOnly={false}
				onPress={() => { }}
			/>
		).toJSON();

		expect(tree).toMatchSnapshot();
	});

	it('deve ter os componentes corretos e seus textos', () => {
		const component = renderer.create(
			<Job
				data={mockData}
				showCandidaciesOnly={false}
				onPress={() => { }}
			/>
		);

		const instance = component.root;

		expect(instance.findByProps({ testID: 'job-component' })).toBeDefined();

		expect(instance.findByProps({ testID: 'job-thumbnail' }).props.source.uri).toBe(mockData.thumbnail);

		expect(instance.findByProps({ testID: 'job-title' }).props.children).toBe(mockData.title);

		expect(instance.findByProps({ testID: 'job-description' }).props.children).toBe(mockData.description);

		const numberRoleText = instance.findByProps({ testID: 'job-number-role' }).props.children;
		expect(Array.isArray(numberRoleText) ? numberRoleText.join('') : numberRoleText).toBe(`${mockData.job_quantity}x vagas disponíveis`);
	});
});
