import React,{useState} from 'react';
import { Col, Container, Row } from 'reactstrap';
import MatTable from './components/MatTable';
import  AddJobsForms from './components/AddJobsForms';

const MaterialTable = () =>{
  const [showForm, setShowForm ] = useState(false)
  
  function closeForm(){
    setShowForm(false)
  }
  function openForm(){
    setShowForm(true)
  }
  return(
  <Container>
    <Row>
      <Col md={12}>
        <h3 className="page-title">Material Table <img onClick={ openForm } style={{width:'40px', marginLeft:'1%'}} alt='add' src='https://www.pngfind.com/pngs/m/673-6732463_transparent-new-icon-png-add-info-icon-png.png' />
             </h3>
        <h3 className="page-subhead subhead">Use this elements, if you want to show some hints or additional
          information
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
