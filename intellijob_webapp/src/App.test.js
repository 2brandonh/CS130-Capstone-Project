import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Signup from './components/Signup/Signup';
import UserSavedHome from './components/UserSaved/UserSavedHome';
import ResumeReview from './components/ResumeReview/ResumeReview';
import JobseekerHome from './components/Jobseeker/JobseekerHome';
import EmployerHome from './components/Employer/EmployerHome';

import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

it('Sign in rendered', () => {
  render(<App />);
  expect(screen.getByText('Learn React')).toBeInTheDocument();
});

it('renders UserSavedHome without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<UserSavedHome />, div);
});

it('renders Signup without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Signup />, div);
});

it('renders ResumeReview without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ResumeReview />, div);
});

it('renders JobseekerHome without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<JobseekerHome />, div);
});

it('renders EmployerHome without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<EmployerHome />, div);
});