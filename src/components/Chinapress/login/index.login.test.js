import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import LoginIndex, { compliantPasswordRegex } from './index.login';
// import { CognitoUserPool } from 'amazon-cognito-identity-js';
import { Auth } from "aws-amplify";
import {
  BrowserRouter as Router,
  MemoryRouter,
} from "react-router-dom";
import { AppRoutes } from '../../../App';

const setup = () =>{
  render(<LoginIndex/>, {wrapper: Router});

  const emailInput = screen.getByLabelText('email-input')
  const passwordInput = screen.getByLabelText('password-input')
  const loginButton = screen.getByLabelText('login-button')

  const typeEmailInput = value =>  userEvent.type(emailInput, value)
  const typePasswordInput = value =>  {
    //Focus the input
    userEvent.type(passwordInput, value)
    //Defocus the input  
    userEvent.tab()
  }
  const loginSubmit = () =>  userEvent.click(loginButton)
  const clearEmailInput = () => userEvent.clear(emailInput)
  const clearPasswordInput = () => userEvent.clear(passwordInput)

  return {
    emailInput,
    passwordInput,
    loginButton,
    typeEmailInput,
    typePasswordInput,
    loginSubmit,
    clearEmailInput,
    clearPasswordInput
  }
}

test('Renders Login page', () => {
  const utils = setup()
  expect(utils.loginButton).toBeInTheDocument();
});

test('Login page: Should render what is being typed inside', () => {
  const utils = setup()
  utils.typeEmailInput('aaaaaa')
  expect(utils.emailInput).toHaveValue('aaaaaa')

  utils.typePasswordInput('aaaaaa')
  expect(utils.passwordInput).toHaveValue('aaaaaa')
})

test('Login page: Should trim additional whitespace', () => {
  const utils = setup()

  utils.typeEmailInput(' aaa aaa ')
  expect(utils.emailInput).toHaveValue('aaaaaa')
  utils.typePasswordInput(' aaa aaa ')
  expect(utils.passwordInput).toHaveValue('aaaaaa')
  utils.clearEmailInput()
  utils.clearPasswordInput()

  utils.typeEmailInput('      aaaaaa')
  expect(utils.emailInput).toHaveValue('aaaaaa')
  utils.typePasswordInput('      aaaaaa')
  expect(utils.passwordInput).toHaveValue('aaaaaa')
  utils.clearEmailInput()
  utils.clearPasswordInput()

  utils.typeEmailInput('      aaa aaa ')
  expect(utils.emailInput).toHaveValue('aaaaaa')
  utils.typePasswordInput('      aaa aaa ')
  expect(utils.passwordInput).toHaveValue('aaaaaa')
  utils.clearEmailInput()
  utils.clearPasswordInput()
})

test('Login page: Should ensure password compliance', () => {
  const utils = setup()
  
  utils.typePasswordInput(' aaa aaa ')
  expect(screen.getByLabelText('password-noncompliance')).toBeInTheDocument()
  utils.clearPasswordInput()

  utils.typePasswordInput('Reds123!')
  expect(screen.queryByLabelText('password-noncompliance')).not.toBeInTheDocument()
  utils.clearPasswordInput()

  utils.typePasswordInput('123124124112aa@!')
  expect(screen.getByLabelText('password-noncompliance')).toBeInTheDocument()
  utils.clearPasswordInput()

  utils.typePasswordInput('123124124112Aa@!')
  expect(screen.queryByLabelText('password-noncompliance')).not.toBeInTheDocument()
  utils.clearPasswordInput()
})

test('Login page: Should fail logging in', async () =>{
  render(
    <MemoryRouter initialEntries={['/login']}>
      <AppRoutes/>
    </MemoryRouter>
  )

  Auth.signIn = jest.fn().mockImplementation((email,password) => {
    return new Promise((resolve, reject) =>{
      compliantPasswordRegex.test(password) ? resolve() : reject()
    })
  });

  const emailInput = screen.getByLabelText('email-input')
  const passwordInput = screen.getByLabelText('password-input')
  const loginButton = screen.getByLabelText('login-button')

  expect(emailInput).toBeInTheDocument()

  userEvent.type(emailInput, 'webaweb417@ovooovo.com')
  userEvent.type(passwordInput, 'adfadfas!')
  userEvent.click(loginButton)

  await waitFor(() => {
    expect(loginButton).not.toBeDisabled()
  });

  const passwordNoncompliance = screen.getByLabelText('password-noncompliance')
  expect(passwordNoncompliance).toBeInTheDocument()
})

test('Login page: Should sucessfully log in', async () =>{
  render(
    <MemoryRouter initialEntries={['/login']}>
      <AppRoutes/>
    </MemoryRouter>
  )

  Auth.signIn = jest.fn().mockImplementation((email,password) => {
    return new Promise((resolve, reject) =>{
      compliantPasswordRegex.test(password) ? resolve() : reject()
    })
  });

  const emailInput = screen.getByLabelText('email-input')
  const passwordInput = screen.getByLabelText('password-input')
  const loginButton = screen.getByLabelText('login-button')

  userEvent.type(emailInput, 'webaweb417@ovooovo.com')
  userEvent.type(passwordInput, 'Reds123!')
  userEvent.click(loginButton)

  await waitFor(() => {
    const loginNavButton = screen.getByText('To Login')
    expect(loginNavButton).toBeInTheDocument()
  });
})






