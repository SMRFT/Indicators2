import React, { useState, useEffect } from 'react';
import { Row, Form, Col, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styled from 'styled-components';

const StyledContainer = styled.div`
  margin: 0 auto;
  padding: 20px;
`;

const IPPharmacy = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [validated, setValidated] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    id: '',  
    name: '',
    selectedDate: '',
    numberOfStockOutEmergencyDrugs: '',
    numberOfStockOutEmergencyDrugsRemarks:'',
    totalNumberOfPrescriptionInCapitalLetters: '',
    totalNumberOfPrescriptionSampled: '',
    totalNumberOfOutPatientPrescriptionReceived: '',
    totalNumberOfInpatientPrescriptionReceived: '',
  });

  useEffect(() => {
    const id = localStorage.getItem('userId');
    const name = localStorage.getItem('userName');
    if (id && name) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        id,   // Updated field
        name, // Updated field
      }));
    }
  }, []);  

  useEffect(() => {
    if (selectedDate) {
      // Adjust date to UTC
      const adjustedDate = new Date(selectedDate.getTime() - selectedDate.getTimezoneOffset() * 60000);
      setFormData((prevFormData) => ({
        ...prevFormData,
        selectedDate: adjustedDate.toISOString().split('T')[0],
      }));
    }
  }, [selectedDate]);
  
    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };
  
    const handleDateChange = (date) => {
      setSelectedDate(date);
    };
  
    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
          e.stopPropagation();
        } else {
          try {
            const id = localStorage.getItem('userId');
            const name = localStorage.getItem('userName');
            const formDataWithUser = {
              ...formData,
              id,  
              name 
            };
            const response = await fetch('http://127.0.0.1:8000/IPPharmacy/', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(formDataWithUser),
            });
            if (response.ok) {
              console.log('Data submitted successfully');
              setFormSubmitted(true); // Update form submission status
            } else {
              const errorText = await response.text();
              throw new Error(errorText || 'Failed to submit data');
            }
          } catch (error) {
            console.error('Error:', error.message);
            if (error.message === 'Failed to submit data') {
              setError(error.message);
            } else {
              setError('Failed to submit data');
            }
          }
        }
        setValidated(true);
      };
      
    return (
      <StyledContainer className="NumericalData">
      <h2 className="text-center">IP Pharmacy</h2>
      <div style={{float:"right"}} className='mt-3'>
         <div><b>ID: </b>{formData.id}</div>
         <div><b>Name: </b>{formData.name}</div>
       </div>
      <br/>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group className="position-relative mb-3" controlId="selectedDate">        
                  <div className="position-relative">
                    <FontAwesomeIcon
                      icon={faCalendarAlt}
                      style={{ cursor: 'pointer',  color: '#EBB099',  fontSize: '25px' }}
                      onClick={() => document.getElementById('datePicker').click()}
                    />
                    <DatePicker
                      id="datePicker"
                      selected={selectedDate}
                      onChange={handleDateChange}
                      className="position-absolute top-100 start-0 d-none" // Hide the input element
                      calendarClassName="position-absolute top-100 start-0" // Position the calendar
                      placeholderText="Select Date" // Placeholder text for the date picker
                    />
                    {selectedDate && (
                      <div className="position-absolute top-100 start-0 translate-middle-y" style={{ marginLeft: '50px',marginTop:"-15px" }}>
                        {selectedDate.toLocaleDateString('en-GB')} {/* 'en-GB' for date/month/year format */}
                      </div>
                    )}
                  </div>
                </Form.Group>
                <br/>

          <Row className="mb-3">
          <Col sm='8'>
          <Form.Group controlId="numberOfStockOutEmergencyDrugs">
            <Form.Label>Number of stock out of Emergency Drugs</Form.Label>
            <Form.Control
              required
              type="text"
              value={formData.numberOfStockOutEmergencyDrugs}
              onChange={handleChange} />
            <Form.Control.Feedback type="invalid">Please fill out this field</Form.Control.Feedback>
          </Form.Group>
          </Col>

          <Col sm='4'>
            <Form.Group  controlId="numberOfStockOutEmergencyDrugsRemarks" >
              <Form.Label>Remarks</Form.Label>
              <Form.Control
              required
                type="text"
                value={formData.numberOfStockOutEmergencyDrugsRemarks}
                onChange={handleChange}
              />
              <Form.Control.Feedback type="invalid">
                Please fill out this field
              </Form.Control.Feedback>
            </Form.Group>
          </Col>

        </Row>

<Row className="mb-3">
  <Form.Group controlId="totalNumberOfPrescriptionInCapitalLetters">
    <Form.Label>Total number of Prescription in CAPITAL letters</Form.Label>
    <Form.Control
      required
      type="text"
      value={formData.totalNumberOfPrescriptionInCapitalLetters}
      onChange={handleChange} />
    <Form.Control.Feedback type="invalid">Please fill out this field</Form.Control.Feedback>
  </Form.Group>
</Row>

<Row className="mb-3">
  <Form.Group controlId="totalNumberOfPrescriptionSampled">
    <Form.Label>Total number of Prescription Sampled</Form.Label>
    <Form.Control
      required
      type="text"
      value={formData.totalNumberOfPrescriptionSampled}
      onChange={handleChange} />
    <Form.Control.Feedback type="invalid">Please fill out this field</Form.Control.Feedback>
  </Form.Group>
</Row>

<Row className="mb-3">
  <Form.Group controlId="totalNumberOfOutPatientPrescriptionReceived">
    <Form.Label>Total number of Out Patient Prescription received</Form.Label>
    <Form.Control
      required
      type="text"
      value={formData.totalNumberOfOutPatientPrescriptionReceived}
      onChange={handleChange} />
    <Form.Control.Feedback type="invalid">Please fill out this field</Form.Control.Feedback>
  </Form.Group>
</Row>

<Row className="mb-3">
  <Form.Group controlId="totalNumberOfOutPatientPrescriptionReceived">
    <Form.Label>Total number Inpatient Prescription received</Form.Label>
    <Form.Control
      required
      type="text"
      value={formData.totalNumberOfOutPatientPrescriptionReceived}
      onChange={handleChange} />
    <Form.Control.Feedback type="invalid">Please fill out this field</Form.Control.Feedback>
  </Form.Group>
</Row>
    
        <button variant="primary" type="submit" className="mb-3">
          Save
        </button>

        <Alert variant="success" show={formSubmitted}>
          Form submitted successfully.
        </Alert>

        <Alert variant="danger" show={error !== ''}>
          {error}
        </Alert>

      </Form>
    </StyledContainer>
  );
}

export default IPPharmacy;