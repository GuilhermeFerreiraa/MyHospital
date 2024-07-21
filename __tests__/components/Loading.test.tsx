import React from 'react';
import Loading from '@/components/loading';
import colors from 'tailwindcss/colors';

const ReactTestRenderer = require('react-test-renderer');

describe('Loading Component', () => {
	it('renders correctly', () => {
		const tree = ReactTestRenderer.create(<Loading />).toJSON();
		expect(tree).toMatchSnapshot();
	});

	it('contains an ActivityIndicator with correct properties', () => {
		const component = ReactTestRenderer.create(<Loading />);
		const instance = component.root;

		const activityIndicator = instance.findByType('ActivityIndicator');
		expect(activityIndicator.props.color).toBe(colors.white);
		expect(activityIndicator.props.size).toBe(24);
	});
});
