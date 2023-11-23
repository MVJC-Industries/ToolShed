import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../../src/components/App';
import '@testing-library/jest-dom'
describe('App component', () => {
  test('renders "Hello world!"', () => {
    render(<App />);
    const headingElement = screen.getByText(/hello world/i);
    expect(headingElement).toBeInTheDocument();
  });
});