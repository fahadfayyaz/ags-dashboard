import React,{useState} from 'react';
import { Col, Container, Row } from 'reactstrap';
import MatTable from './components/MatTable';
import  AddJobsForms from './components/AddJobsForms';

const MaterialTable = () =>{
  const [showForm, setShowForm ] = useState(false)
  
  function closeForm(){
    setShowForm(false)
  }
  
  return(
  <Container>
    <Row>
      <Col md={12}>
        <h3 className="page-title bold-text" style={{fontSize : 32}}>Jobs Description   </h3>
        <h3 className="page-subhead subhead">
          You can add edit or remove Jobs from here
        </h3>
      </Col>
    </Row>
    <div>
     { showForm ? <AddJobsForms className='animate__backInUp' closeForm={closeForm} /> : <Row> <MatTable /> </Row> }
    </div>
  </Container>
);
}


export default MaterialTable;
