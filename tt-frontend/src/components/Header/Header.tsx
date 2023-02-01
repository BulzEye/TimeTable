import { Container } from "react-bootstrap";
import "./Header.css";

const Header = () => {
    return ( 
        <header>
            <Container className="d-flex justify-content-between py-3">
                <h1 className="">TimeTable</h1>

            </Container>
        </header>
     );
}
 
export default Header;