import React from 'react';
import {render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';

test('renders without errors', ()=>{
    render(<ContactForm />)
});

test('renders the contact form header', ()=> {
    render(<ContactForm />);

    expect(screen.getByText('Contact Form')).toBeDefined();
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    render(<ContactForm />);

    const firstNameInput = screen.getByPlaceholderText('Edd');

    userEvent.type(firstNameInput, 'Four');
    const firstNameError = screen.getByText(/firstName must have at least 5 characters/i);

    expect(firstNameError).toBeDefined();
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    render(<ContactForm />);

    const formSubmitButton = screen.getByRole('button', {name: /submit/i})

    userEvent.click(formSubmitButton);

    const errorsOnScreen = screen.getAllByText(/Error: /i);

    expect(errorsOnScreen.length).toBe(3);

});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    render(<ContactForm />);

    const firstNameInput = screen.getByPlaceholderText('Edd');
    const lastNameInput = screen.getByPlaceholderText('Burke');

    userEvent.type(firstNameInput, 'Connor');
    userEvent.type(lastNameInput, 'Lastname');
    const formSubmitButton = screen.getByRole('button', {name: /submit/i})
    userEvent.click(formSubmitButton);

    const errorsOnScreen = screen.getAllByText(/Error:/i);

    expect(errorsOnScreen.length).toBe(1);

});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    render(<ContactForm />);

    const emailInput = screen.getByPlaceholderText('bluebill1049@hotmail.com');

    userEvent.type(emailInput, 'connor');

    const emailError = screen.getByText(/Error: email must be a valid email address./i);

    expect(emailError).toBeDefined();

});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    render(<ContactForm />);

    const firstNameInput = screen.getByPlaceholderText('Edd');
    const emailInput = screen.getByPlaceholderText('bluebill1049@hotmail.com');
    const formSubmitButton = screen.getByRole('button', {name: /submit/i});

    userEvent.type(firstNameInput, 'Connor');
    userEvent.type(emailInput, 'connor@hotmail.com');
    userEvent.click(formSubmitButton);

    const lastNameError = screen.getByText(/Error: lastName is a required field./i);
    
    expect(lastNameError).toBeDefined();

});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    render(<ContactForm />);

    const firstNameInput = screen.getByPlaceholderText('Edd');
    const lastNameInput = screen.getByPlaceholderText('Burke');
    const emailInput = screen.getByPlaceholderText('bluebill1049@hotmail.com');
    const formSubmitButton = screen.getByRole('button', {name: /submit/i});

    userEvent.type(firstNameInput, 'Connor');
    userEvent.type(lastNameInput, 'Condor')
    userEvent.type(emailInput, 'connor@hotmail.com');
    userEvent.click(formSubmitButton);

    const firstNamePresent = screen.getByText('Connor');
    const lastNamePresent = screen.getByText('Condor');
    const emailPresent = screen.getByText('connor@hotmail.com');
    
    expect(firstNamePresent).toBeDefined();
    expect(lastNamePresent).toBeDefined();
    expect(emailPresent).toBeDefined();

});

test('renders all fields text when all fields are submitted.', async () => {
    render(<ContactForm />);

    const firstNameInput = screen.getByPlaceholderText('Edd');
    const lastNameInput = screen.getByPlaceholderText('Burke');
    const emailInput = screen.getByPlaceholderText('bluebill1049@hotmail.com');
    const messageInput = screen.getByRole('textbox', {name: 'Message'});
    const formSubmitButton = screen.getByRole('button', {name: /submit/i});

    userEvent.type(firstNameInput, 'Connor');
    userEvent.type(lastNameInput, 'Condor')
    userEvent.type(emailInput, 'connor@hotmail.com');
    userEvent.type(messageInput, 'My message is here!');
    userEvent.click(formSubmitButton);

    const firstNamePresent = screen.getByText('Connor');
    const lastNamePresent = screen.getByText('Condor');
    const emailPresent = screen.getByText('connor@hotmail.com');
    const messagePresent = screen.getAllByText(/My message is here!/i);
    
    expect(firstNamePresent).toBeDefined();
    expect(lastNamePresent).toBeDefined();
    expect(emailPresent).toBeDefined();
    expect(messagePresent.length).toBe(2);

});