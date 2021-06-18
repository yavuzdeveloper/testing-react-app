import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'

import Form from './Form'
import App from '../App'

import { formValidation } from './formValidation'

jest.mock('./formValidation');


test('form renders correctly', () => {
  const { getByPlaceholderText, getByRole } = render(<Form />);

  expect(getByPlaceholderText(/^first name/i)).toBeInTheDocument();
  expect(getByPlaceholderText(/last name/i)).toBeInTheDocument();
  expect(getByPlaceholderText(/password/i)).toBeInTheDocument();
  expect(getByPlaceholderText(/e-mail/i)).toBeInTheDocument();

  expect(getByRole('button', { name: /show/i })).toBeInTheDocument();
  expect(getByRole('button', { name: /register/i })).toBeInTheDocument();
});


test('password input show-hide toggle works properly', () => {
  const { getByPlaceholderText, getByRole } = render(<Form />)
  const passwordInput = getByPlaceholderText(/password/i);
  const passwordShowOrHideToggle = getByRole('button', { name: /show/i });

  expect(passwordInput.type).toEqual('password');
  userEvent.click(passwordShowOrHideToggle);
  expect(passwordInput.type).toEqual('text');

  expect(passwordShowOrHideToggle).toHaveTextContent(/hide/i);
});


test('form validation works properly', () => {
  const { getByRole, getByTestId, getByPlaceholderText } = render(<Form />);
  const errorText = getByTestId('error-text');

  formValidation.mockReturnValueOnce('error');

  expect(errorText).toHaveTextContent('');
  userEvent.click(getByRole('button', { name: /register/i }));
  expect(errorText).toHaveTextContent('error');

  userEvent.type(getByPlaceholderText(/^First Name/i), 'test');
  formValidation.mockReturnValueOnce(false);

  expect(errorText).toHaveTextContent(''); 
});


test('submit works properly', () => {   
  const mockFormData = {
    firstName: 'test name',
    lastName: 'test last name',
    password: 'test password',
    email: 'test@mail.com',
  }
  const { getByRole, getByText, getByPlaceholderText } = render(<App />)

  userEvent.paste(getByPlaceholderText(/^First Name/i), mockFormData.firstName)
  userEvent.paste(getByPlaceholderText(/last name/i), mockFormData.lastName)
  userEvent.paste(getByPlaceholderText(/password/i), mockFormData.password)
  userEvent.paste(getByPlaceholderText(/e-mail/i), mockFormData.email)

  userEvent.click(getByRole('button', { name: /register/i }))

  getByText(/Congratulations, you have successfully registered/i)
});
