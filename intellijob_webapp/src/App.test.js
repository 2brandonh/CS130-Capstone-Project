import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Signup from './components/Signup/Signup';
import UserSavedHome from './components/UserSaved/UserSavedHome';
import ResumeReview from './components/ResumeReview/ResumeReview';
import JobseekerHome from './components/Jobseeker/JobseekerHome';
import JobListing from './components/Jobseeker/JobListing';
import EmployerHome from './components/Employer/EmployerHome';

import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

it('Sign in rendered', () => {
  render(<App />);
  expect(screen.getByText('Sign In')).toBeInTheDocument();
});

it('Join rendered', () => {
  render(<App />);
  expect(screen.getByText('Join Now')).toBeInTheDocument();
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


const jobInfo = {
  position: "engineer",
  comp: 10000,
  company: "Meta",
  recruiter: "Mark",
  skills: ["work"],
  description: "Do this job",
  link: "WorkHere"
}

it('renders Job Listing based on props', () => {
  const div = document.createElement('div');
  ReactDOM.render(<JobListing jobInfo={jobInfo} user={null}/>, div);
});


it('Job Listing Prop Use is valid', () => {
  render(<JobListing jobInfo={jobInfo} user={null}/>);
  expect(screen.getByText('engineer')).toBeInTheDocument();
});

it('Job Listing Prop Use is valid', () => {
  render(<JobListing jobInfo={jobInfo} user={null}/>);
  expect(screen.getByText('Mark')).toBeInTheDocument();
});

it('Job Listing Prop Use is valid', () => {
  render(<JobListing jobInfo={jobInfo} user={null}/>);
  expect(screen.getByText('Do this job')).toBeInTheDocument();
});

it('Job Listing Prop Use is valid', () => {
  render(<JobListing jobInfo={jobInfo} user={null}/>);
  expect(screen.getByText('Meta')).toBeInTheDocument();
});



