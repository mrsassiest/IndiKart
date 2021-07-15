import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { register } from '../actions/userActions'
import firebase from './../firebase1'
import swal from 'sweetalert';

const RegisterScreen = ({ location, history }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [number, setNumber] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)
  const [otpFlag,setOtpFlag] = useState(false)

  const dispatch = useDispatch()
  const phone=""
  const userRegister = useSelector((state) => state.userRegister)
  const { loading, error, userInfo } = userRegister
  console.log("location",location)
  const redirect = location.search ? location.search.split('=')[1] : '/'

  useEffect(() => {
    if (userInfo) {
      history.push(redirect)
    }
  }, [history, userInfo, redirect])

  const submitHandler = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setMessage('Passwords do not match')
    } else {
      dispatch(register(name, email, number, password))
    }
  }
  const configureCaptcha = () => {
    console.log("Digvijay")
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      "sign-in-button",
      {
        size: "invisible",
        callback: (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          this.onSignInSubmit();
          console.log("Recaptca varified");
        },
        defaultCountry: "IN",
      }
    );
  };

  const onSubmitOTP = (e) => {
    e.preventDefault();
    const code = document.getElementById("otp").value;
    console.log(code);
    window.confirmationResult
      .confirm(code)
      .then((result) => {
        const user = result.user;
        console.log(JSON.stringify(user));
        swal("OTP verified", "", "success", {
          timer: 2000,
          buttons: false,
        });
        setOtpFlag(false)
        this.setState({ isVerified: true });
        // ...
      })
      .catch((error) => {
        // User couldn't sign in (bad verification code?)
        // ...
      });
  };
  const handleSendOtp=(e)=> {
    e.preventDefault();
    const p = document.getElementById("phone").value;
    if (p.length !== 10) {
      swal("Invalid Phone number", "Plaese enter a valid phone number", "warning", {
          timer: 2000,
          buttons: false,
        });
      return;
    }
    setOtpFlag(true)
    configureCaptcha();
    const phoneNumber = "+91" + p;
    console.log(phoneNumber);
    const appVerifier = window.recaptchaVerifier;
    
    firebase
      .auth()
      .signInWithPhoneNumber(phoneNumber, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        swal("OTP sent", "Please Check your phone", "success", {
          timer: 2000,
          buttons: false,
        });
        this.setState({ showOtpPanel: true });
        // ...
      })
      .catch((error) => {
        // Error; SMS not sent
        // ...
        alert("SMS not sent!!Please try after some time");
      });
  }     
  return (
    <FormContainer>
      <h1>Sign up as User</h1>
      {message && <Message variant='danger'>{message}</Message>}
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='name'>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type='name'
            placeholder='Enter name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='number'>
          <div id="sign-in-button"></div>
          <Form.Label>Mobile Number</Form.Label>
          <Form.Control
            type='input'
            name="phone"
            id="phone"
            placeholder='Enter Number'
            value={number}
            pattern="[0-9]{10}"
            onChange={(e) => setNumber(e.target.value)}
          ></Form.Control>
          <Button onClick={handleSendOtp}>Send OTP</Button>
        </Form.Group>
        {
            otpFlag === true ? 
            <Form.Group controlId='number'>
         
            <Form.Label>Enter OTP</Form.Label>
            <Form.Control
              type='input'
              name="otp"
              id="otp"
              placeholder='Enter Number'
            ></Form.Control>
            <Button onClick={onSubmitOTP}>Verify OTP</Button>
          </Form.Group> : null
          }
       
        <Form.Group controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='confirmPassword'>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Confirm password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary'>
          Register
        </Button>
      </Form>

      <Row className='py-3'>
        <Col>
          Have an Account?{' '}
          <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
            Login
          </Link>
        </Col>
      </Row>
    </FormContainer>
  )
}

export default RegisterScreen
