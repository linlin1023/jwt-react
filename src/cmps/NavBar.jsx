import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <>

      <Navbar bg="primary" data-bs-theme="dark" >
        <Container>
          <Link to="/" className='navbar-brand'>HOME</Link>
          <Nav className="me-auto">
            <Link className='nav-link' to="/post">Post</Link>
            <Link className='nav-link' to="/login">Login</Link>
            <Link className='nav-link' to="/signup">signup</Link>
          </Nav>
        </Container>
      </Navbar>

    </>
  );
}

export default NavBar;