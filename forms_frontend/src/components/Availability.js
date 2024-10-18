import React, { useState } from 'react';
import { Row, Form, Col, Dropdown, Table } from 'react-bootstrap';
import './Availability.css';
import { bedOptions } from './constant';

function Availability() {
  const [selectedWard, setSelectedWard] = useState('');
  const [numberOfBedsOccupied, setNumberOfBedsOccupied] = useState(0);
  const [numberOfBedsAvailable, setNumberOfBedsAvailable] = useState(0);

  const handleWardChange = async (value) => {
    setSelectedWard(value);
    // Fetch data from backend API based on selected ward
    try {
      const response = await fetch(`http://15.207.192.151:8000/availabilityofroomsandbeds/${value}/`);
      const data = await response.json();
      setNumberOfBedsOccupied(data.numberOfBedsOccupied);
      console.log('numberOfBedsOccupied:', data.numberOfBedsOccupied);
      setNumberOfBedsAvailable(data.numberOfBedsAvailable);
      console.log('numberOfBedsAvailable:', data.numberOfBedsAvailable);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div>
      <div className="availability-container">
        <form className="availability-form">
          <h1 className="text-center mt-4">Availability</h1>
          <br/>
          <Row className="justify-content-center align-items-center mb-2">
            <Col xs="auto" className="d-flex align-items-center">
              <Form.Label className="mb-0 mr-3" style={{whiteSpace:"nowrap"}}><b>Ward</b></Form.Label>
              <Dropdown onSelect={handleWardChange} className="m-3">
                <Dropdown.Toggle variant="light" id="dropdown-basic" style={{ minWidth:"220px", backgroundColor:"white", color:"black", border:"1px solid rgb(251,240,236)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span>{selectedWard || 'Select Ward'}</span>
                  <span className="caret"></span>
                </Dropdown.Toggle>
                <Dropdown.Menu style={{ minWidth: '220px', textAlign:"center", maxHeight: '250px', overflowY: 'auto', scrollbarWidth:"thin" }}>
                  {bedOptions.map((ward, index) => (
                    <Dropdown.Item key={index} eventKey={ward}>
                      {ward}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
              <Form.Control.Feedback type="invalid">
                Ward is required.
              </Form.Control.Feedback>
            </Col>
          </Row>
          <br/>
          <Table bordered>
            <thead>
              <tr>
                <th style={{ backgroundColor: 'rgb(149,188,176)', color: '#FFFFFF' }}>No of Occupied</th>
                <th style={{ backgroundColor: 'rgb(149,188,176)', color: '#FFFFFF' }}>No of availability</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ color: 'black' }}>{numberOfBedsOccupied}</td>
                <td style={{ color: 'black' }}>{numberOfBedsAvailable}</td>
              </tr>
            </tbody>
          </Table>
        </form>
      </div>
    </div>
  );
}

export default Availability;