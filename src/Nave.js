import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Outlet } from "react-router-dom";
import Cookies from 'universal-cookie';

const cookies = new Cookies()

function Nave() {
    const renderLogButton = () => {
        if(!cookies.get('username')){
            return <Nav.Link href="/login">Log In</Nav.Link>;
        }
        else{
            return <Nav.Link href="/logout">Log Out</Nav.Link>;
        }
    }

    return (
        <>
            <Navbar bg="primary" variant="dark">
                <Container>
                    <Navbar.Brand href="/">QS</Navbar.Brand>

                    <Nav className="me-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/add">Add Data</Nav.Link>
                        
                        {renderLogButton()}

                    </Nav>
                </Container>
            </Navbar>
            
            <Outlet />
      </>
    );

    }
    
export default Nave;