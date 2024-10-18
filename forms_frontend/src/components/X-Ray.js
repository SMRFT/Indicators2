import React, { useState ,useEffect} from 'react';
import { Row, Form, Col ,Alert} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styled from 'styled-components';

const StyledContainer = styled.div`
  margin: 0 auto;
  padding: 20px;
`;

const XRay = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [validated, setValidated] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    id: '',  
    name: '' ,
    selectedDate:'',
    numberOfReportingErrors:'',
    numberOfReportingErrorsRemarks:'',
    numberOfCasePerformed: "",
    numberOfTestsPerformed:"",
    numberOfStaffAdheringToSafety:"",
    numberOfStaffAudited:'',
    waitingTimeForDiagnostics:'',
    numberOfPatientsReportedInDiagnostics:'',
  });

  useEffect(() => {
    const id = localStorage.getItem('userId');
    const name = localStorage.getItem('userName');
    if (id && name) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        id,   
        name, 
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
    
      // Check if the date is selected
      if (!selectedDate) {
        setError('Please select a date');
        return; // Prevent form submission if date is not selected
      }
    
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
            const response = await fetch('http://127.0.0.1:8000/Xray/', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(formDataWithUser),
            });
            if (response.status === 400) {
              const errorText = await response.json();
              console.error('errorText:', errorText);
              if (errorText.error === 'Data already exists for this date.') {
                setError('Data already exists for this date.');
              } else {
                throw new Error(errorText.error || 'Failed to submit data');
              }
            } else {
              // Set success message after successful submission
              setFormSubmitted(true);
              setError('');
            }
          } catch (error) {
            console.error('Error:', error.message);
            setError(error.message || 'Failed to submit data');
          }
        }
      
        setValidated(true);
      };

  return (
    <StyledContainer className="NumericalData">
       <h2 className="text-center">XRay</h2>
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
              style={{ cursor: 'pointer', color: '#EBB099', fontSize: '25px' }}
              onClick={() => document.getElementById('datePicker').click()}
            />
            <DatePicker
              id="datePicker"
              selected={selectedDate}
              onChange={handleDateChange}
              className="position-absolute top-100 start-0 d-none"
              calendarClassName="position-absolute top-100 start-0"
              placeholderText="Select Date"
            />
            {selectedDate && (
              <div className="position-absolute top-100 start-0 translate-middle-y" style={{ marginLeft: '50px', marginTop: '-15px' }}>
                {selectedDate.toLocaleDateString('en-GB')}
              </div>
            )}
          </div>
        </Form.Group>
        <br/>
        <Row className="mb-3">
          <Col sm='8'>
          <Form.Group controlId="numberOfReportingErrors">
            <Form.Label>Number of Reporting Errors</Form.Label>
            <Form.Control
            required
              type="text"
              value={formData.numberOfReportingErrors}
              onChange={handleChange}
            />
            <Form.Control.Feedback type="invalid">
            Please fill out this field
          </Form.Control.Feedback>
          </Form.Group>
          </Col>
          <Col sm='4'>
            <Form.Group  controlId="numberOfReportingErrorsRemarks">
              <Form.Label>Remarks</Form.Label>
              <Form.Control
              required
                type="text"
                value={formData.numberOfReportingErrorsRemarks}
                onChange={handleChange}
              />
              <Form.Control.Feedback type="invalid">
                Please fill out this field
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Form.Group controlId="numberOfCasePerformed">
            <Form.Label>Number of Case Performed</Form.Label>
            <Form.Control
            required
              type="text"
              value={formData.numberOfCasePerformed}
              onChange={handleChange}
            />
            <Form.Control.Feedback type="invalid">
            Please fill out this field
          </Form.Control.Feedback>
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group controlId="numberOfTestsPerformed">
            <Form.Label>Number of Tests Performed</Form.Label>
            <Form.Control
            required
              type="text"
              value={formData.numberOfTestsPerformed}
              onChange={handleChange}
            />
            <Form.Control.Feedback type="invalid">
            Please fill out this field
          </Form.Control.Feedback>
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group controlId="numberOfStaffAdheringToSafety">
            <Form.Label>Number of Staff Adhering to Safety Precautions</Form.Label>
            <Form.Control
            required
              type="text"
              value={formData.numberOfStaffAdheringToSafety}
              onChange={handleChange}
            />
            <Form.Control.Feedback type="invalid">
            Please fill out this field
          </Form.Control.Feedback>
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group controlId="numberOfStaffAudited">
            <Form.Label>Number of Staff Audited</Form.Label>
            <Form.Control
            required
              type="text"
              value={formData.numberOfStaffAudited}
              onChange={handleChange}
            />
            <Form.Control.Feedback type="invalid">
            Please fill out this field
          </Form.Control.Feedback>
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group controlId="waitingTimeForDiagnostics">
            <Form.Label>Waiting time for Diagnostics</Form.Label>
            <Form.Control
            required
              type="text"
              value={formData.waitingTimeForDiagnostics}
              onChange={handleChange}
            />
            <Form.Control.Feedback type="invalid">
            Please fill out this field
          </Form.Control.Feedback>
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group controlId="numberOfPatientsReportedInDiagnostics">
            <Form.Label>Number of patients reported in Diagnostics</Form.Label>
            <Form.Control
            required
              type="text"
              value={formData.numberOfPatientsReportedInDiagnostics}
              onChange={handleChange}
            />
            <Form.Control.Feedback type="invalid">
            Please fill out this field
          </Form.Control.Feedback>
          </Form.Group>
        </Row>
              
        <button variant="primary" type="submit" className="mb-3" onClick={handleSubmit}>
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
};

export default XRay;
