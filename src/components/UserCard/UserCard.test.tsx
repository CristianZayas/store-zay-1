import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import UserCard from './UserCard';

describe('<UserCard />', () => {
  test('should mount', () => {
    render(<UserCard />);

    const userCard = screen.getByTestId('UserCard');

    expect(userCard).toBeInTheDocument();
  });
});