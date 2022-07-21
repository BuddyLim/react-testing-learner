import { useEffect, useState } from "react"
import './login.css'
import { useNavigate  } from 'react-router-dom'
import { Amplify, Auth } from "aws-amplify";

export const compliantPasswordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/ 

export default function LoginIndex(){
  const navigate = useNavigate()

  const [emailInput, setEmailInput] = useState("")

  const [passwordInput, setPasswordInput] = useState("")
  const [isCompliantPassword, setIsCompliantPassword] = useState(true)

  const [isLoginAttempt, setLoginAttempt] = useState(false)

  useEffect(() =>{
    /**
     * Refer to jest.config.js and setupTests.js to
     * configure loading envs into testing env
     */
    //Using Chinapress to test the login component
    Amplify.configure({
      Auth: {
        mandatorySignIn: true,
        region: process.env.REACT_APP_AWS_COGNITO_REGION,
        userPoolId: process.env.REACT_APP_AWS_COGNITO_USER_POOL_ID,
        userPoolWebClientId: process.env.REACT_APP_AWS_COGNITO_APP_CLIENT_ID,
      },
    });
  }, [])

  const trimText = (text) =>{
    return text.replace(/ /g, "")
  }

  const handleEmailChange = (e) =>{
    setEmailInput(trimText(e.target.value))
  }

  const handlePasswordChange = (e) =>{
    setPasswordInput(trimText(e.target.value))
  }

  const handlePasswordBlur = () =>{
    const currentlyCompliant = compliantPasswordRegex.test(passwordInput)
    currentlyCompliant === false && isCompliantPassword === true && setIsCompliantPassword(false)
  }

  const handlePasswordFocus = () =>{
    isCompliantPassword === false && setIsCompliantPassword(true)
  }

  const handleUserSignIn = async (e) =>{
    e.preventDefault()
    setLoginAttempt(true)
    await Auth.signIn(emailInput, passwordInput).then((e) => {
      handleAfterSignIn(e)
      navigate('/')
    })
    .catch((e) =>{
      handleAfterSignIn(e)
    })
  }

  const handleAfterSignIn = (e) =>{
    console.log(e)
    setLoginAttempt(false)
  }

  return(
    <div className="login">
      <form onSubmit={handleUserSignIn} className="login__form">
        <div className="form-example">
          <input value={emailInput} onChange={handleEmailChange} type="email" name="email" id="email" aria-label="email-input" required/>
        </div>
        <div className="form-example">
          <input value={passwordInput} onFocusCapture={handlePasswordFocus} onBlurCapture={handlePasswordBlur} onChange={handlePasswordChange} type="password" name="password" id="password" aria-label="password-input" required/>
          {!isCompliantPassword && <div className="login__alert-text" aria-label="password-noncompliance">Password is not compliant!</div>}
        </div>
        <div className="form-example">
          <button disabled={isLoginAttempt} aria-label="login-button" type="submit">Login!</button>
        </div>
      </form>
    </div>
  )
}