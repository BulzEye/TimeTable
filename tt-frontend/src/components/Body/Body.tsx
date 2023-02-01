import { Container } from "react-bootstrap";
import TableItem from "../Table/TableColumn/TableItem";

const Body = () => {
    return ( 
        <Container className="py-3">
            <div className="tableContainer d-flex justify-content-center">
                <div className="tableColumn">
                    <TableItem />
                    <TableItem />
                </div>
                <div className="tableColumn">
                    <TableItem />
                    <TableItem />
                </div>
            </div>
        </Container>
     );
}
 
export default Body;