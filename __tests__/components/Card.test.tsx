import Card from '@/components/card';
import { fireEvent, render } from '@testing-library/react-native';
import { useRouter as useRouterOriginal } from 'expo-router';
import React from 'react';
import { Alert } from 'react-native';
import renderer from 'react-test-renderer';

jest.mock('@/components/toast', () => ({
	ToastMessage: {
		update: jest.fn(),
	},
}));

jest.mock('react-native-toast-notifications', () => ({
	useToast: jest.fn(() => ({
	})),
}));

jest.mock('expo-router', () => ({
	useRouter: jest.fn(),
}));

const mockAddCandidacy = jest.fn();
const mockRemoveCandidacy = jest.fn();
jest.mock('@/stores/candidacy-store', () => ({
	useCandidacyStore: () => ({
		addCandidacy: mockAddCandidacy,
		removeCandidacy: mockRemoveCandidacy,
	}),
}));

jest.spyOn(Alert, 'alert').mockImplementation((title, message, buttons) => {
	if (buttons && buttons.length > 1 && buttons[1].onPress) {
		// Simulate clicking 'Sim'
		buttons[1].onPress();
	}
});

beforeEach(() => {
	jest.useFakeTimers();
});

afterEach(() => {
	jest.useRealTimers();
});

const mockJobData = {
	id: 'fdb298a4-9ddb-42df-86ec-fc1641f68dc7',
	created_at: '2024-07-16T22:07:33.270Z',
	role: 'Enfermeiro',
	requirement: 'Experiência de no mínimo 1 ano em clínicas.',
	schedule: {
		starts_at: '2025-04-18T19:53:19.302Z',
		ends_at: '2025-04-19T07:53:19.302Z',
	},
	shift_type: 'Noturno',
	candidacy_sent: false,
};

describe('Card Component', () => {
	test('renders correctly with given data', () => {
		const tree = renderer.create(<Card data={mockJobData} />).toJSON();
		expect(tree).toMatchSnapshot();
	});

	test('calls handleApplyJob when apply button is pressed', () => {
		const { getByTestId } = render(<Card data={mockJobData} />);

		fireEvent.press(getByTestId('apply-button'));

		jest.runAllTimers();
		expect(mockAddCandidacy).toHaveBeenCalledWith(mockJobData);
	});

	test('calls handleCancelAplicationJob when cancel button is pressed', () => {
		const mockRouterBack = jest.fn();

		(useRouterOriginal as jest.Mock).mockReturnValue({ back: mockRouterBack });

		const { getByTestId } = render(<Card data={{ ...mockJobData, candidacy_sent: true }} />);

		fireEvent.press(getByTestId('cancel-button'));

		jest.runAllTimers();
		expect(mockRemoveCandidacy).toHaveBeenCalledWith(mockJobData.id);
		expect(mockRouterBack).toHaveBeenCalled();
	});
});
