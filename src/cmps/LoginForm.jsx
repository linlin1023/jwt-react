import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { changeEmail, loginUser } from '../store/user/user.slice';


function LoginForm() {
  const {isAuthenticated} = useSelector(state => state.user);
  const {email} = useSelector(state => state.user.data);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [password,setPassword] = useState('');

  useEffect(()=>{
    if(isAuthenticated){
      navigate("/post")
    }
  }, [isAuthenticated]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("login form submitted");
    dispatch(loginUser({email, password}))
  }

  return (
    <Form>
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
        <Form.Control 
              type="password" 
              placeholder="Password"  
              value={password}
              onChange={(e)=>{setPassword(e.target.value)}}
        />
      </Form.Group>
      <Button variant="primary" type="submit" onClick={handleSubmit}>
        Submit
      </Button>
    </Form>
  );
}

export default LoginForm;