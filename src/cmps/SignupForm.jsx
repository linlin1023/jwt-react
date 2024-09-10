import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useSelector, useDispatch } from 'react-redux';
import { registerUser, changeFirstName, changeEmail, changeLastName } from '../store/user/user.slice';
import { useNavigate } from 'react-router';

function SignupForm() {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const {firstName, lastName, email} = useSelector(state => state.user.data);
  const isAuthenticated = useSelector(state => state.user.isAuthenticated);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser({firstName, lastName, email, password}));
  };

  useEffect(()=>{
    if(isAuthenticated){
      navigate("/post")
    }
  }, [isAuthenticated])

  return (
    <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>First Name</Form.Label>
        <Form.Control 
            type="firstName" 
            placeholder="Enter first name" 
            value={firstName} 
            onChange={(e)=>{dispatch(changeFirstName({name: "firstName", value: e.target.value})); }}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Last Name</Form.Label>
        <Form.Control 
            type="lastName" 
            placeholder="Enter last name" 
            value={lastName}
            onChange={(e)=>{dispatch(changeLastName({name: "lastName", value: e.target.value})); }}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control 
            type="email" 
            placeholder="Enter email" 
            value={email}
            onChange={(e)=>{dispatch(changeEmail({name: "email", value: e.target.value})); }}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" 
            onChange = {(e)=>{setPassword(e.target.value)}}
        />
      </Form.Group>
      <Button variant="primary" type="submit" onClick={handleSubmit}>
        Submit
      </Button>
    </Form>
  );
}

export default SignupForm;