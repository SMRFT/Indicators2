import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styled from 'styled-components';

const StyledContainer = styled.div`
  margin: 0 auto;
  padding: 20px;
`;

const MAX_CHAR_LIMIT = 255;

const OTForm = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    selectedDate: '',
    numberOfUnplannedReturnToOTOrReexploration: '',
    numberOfUnplannedReturnToOTOrReexplorationRemarks: '',
    numberOfPatientsWhoUnderwentSurgeriesInTheOT: '',
    numberOfSurgeriesWhereTheProcedureWasFollowed: '',
    numberOfSurgeriesPlannedInTheOt: '',
    numberOfTransfusionReactions: '',
    numberOfTransfusionReactionsRemarks: '',
    numberOfUnitsTransfused: '',
    numberOfUnitsTransfusedRemarks: '',
    timeTakenForReceivingBloodFromBloodBank: '',
    numberOfPatientsWhoDidReceiveAppropriateProphylacticAntibiotic: '',
    numberOfCasesReScheduledOrCanceled: '',
    numberOfCasesReScheduledOrCanceledRemarks: '',
    numberOfSurgicalSiteInfections: '',
    numberOfSurgeriesWhereProceduresWereFollowed: '',
    numberOfDayCareOPCases: '',
    numberOfDayCareIPCases: '',
    numberOfMinorCases: '',
    numberOfParenteralExposures: '',
    numberOfParenteralExposuresRemarks: '',
  });

  const [validated, setValidated] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [error, setError] = useState('');

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
      const adjustedDate = new Date(selectedDate.getTime() - selectedDate.getTimezoneOffset() * 60000);
      setFormData((prevFormData) => ({
        ...prevFormData,
        selectedDate: adjustedDate.toISOString().split('T')[0],
      }));
    }
  }, [selectedDate]);

  useEffect(() => {
    let errorTimeout;
    if (error) {
      errorTimeout = setTimeout(() => {
        setError('');
      }, 3000);
    }
    return () => {
      clearTimeout(errorTimeout);
    };
  }, [error]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    if (value.length > MAX_CHAR_LIMIT) {
      setError(`Ensure this value has at most ${MAX_CHAR_LIMIT} characters.`);
      return;
    }
    if (id.includes('reaction') || id.includes('remarks')) {
      const index = parseInt(id.split('-')[1]);
      setFormData({
        ...formData,
        numberOfUnitsTransfusedRemarks: {
          ...formData.numberOfUnitsTransfusedRemarks,
          [id]: value,
        },
      });
    } else {
      setFormData({ ...formData, [id]: value });
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setFormData({ ...formData, selectedDate: date });
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
        const response = await fetch('http://127.0.0.1:8000/OT/', {
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
       <h2 className="text-center">OT(Operation Theatre)</h2>
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
        <br />

        <Row className="mb-3">
          <Col sm='8'>
            <Form.Group controlId="numberOfUnplannedReturnToOTOrReexploration">
              <Form.Label>Number of Unplanned Return to OT or Re-exploration (within 30 days)</Form.Label>
              <Form.Control required type="text" value={formData.numberOfUnplannedReturnToOTOrReexploration} onChange={handleChange} />
              <Form.Control.Feedback type="invalid">Please fill out this field</Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col sm='4' className='mt-4'>
            <Form.Group controlId="numberOfUnplannedReturnToOTOrReexplorationRemarks">
              <Form.Label>Remarks</Form.Label>
              <Form.Control required type="text" value={formData.numberOfUnplannedReturnToOTOrReexplorationRemarks} onChange={handleChange} />
              <Form.Control.Feedback type="invalid">Please fill out this field</Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Form.Group controlId="numberOfPatientsWhoUnderwentSurgeriesInTheOT">
            <Form.Label>Number of Patients who Underwent Surgeries in the OT</Form.Label>
            <Form.Control required type="text" value={formData.numberOfPatientsWhoUnderwentSurgeriesInTheOT} onChange={handleChange} />
            <Form.Control.Feedback type="invalid">Please fill out this field</Form.Control.Feedback>
          </Form.Group>
        </Row>
        
        <Row className="mb-3">
          <Form.Group controlId="numberOfSurgeriesWhereTheProcedureWasFollowed">
            <Form.Label>Number of Surgeries where the Procedure was Followed (WHO Checklist)</Form.Label>
            <Form.Control required type="text" value={formData.numberOfSurgeriesWhereTheProcedureWasFollowed} onChange={handleChange} />
            <Form.Control.Feedback type="invalid">Please fill out this field</Form.Control.Feedback>
          </Form.Group>
        </Row>
        
        <Row className="mb-3">
          <Form.Group controlId="numberOfSurgeriesPlannedInTheOt">
            <Form.Label>Number of Surgeries planned in the OT</Form.Label>
            <Form.Control required type="text" value={formData.numberOfSurgeriesPlannedInTheOt} onChange={handleChange} />
            <Form.Control.Feedback type="invalid">Please fill out this field</Form.Control.Feedback>
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Col>
            <Form.Group controlId="numberOfUnitsTransfused">
              <Form.Label>Number of Units Transfused</Form.Label>
              <Form.Control
                required
                value={formData.numberOfUnitsTransfused}
                onChange={handleChange}
              />
              <Form.Control.Feedback type="invalid">Please fill out this field</Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        {Array.from({ length: parseInt(formData.numberOfUnitsTransfused) }, (_, index) => (
          <Row key={index} className="mb-3">
            <Col sm="8">
              <Form.Group controlId={`reaction-${index}`}>
                <Form.Label>Transfusion Reaction {index + 1}</Form.Label>
                <Form.Control
                  required
                  type="text"
                  value={formData.numberOfUnitsTransfusedRemarks[`reaction-${index}`] || ''}
                  onChange={handleChange}
                />
                <Form.Control.Feedback type="invalid">Please fill out this field</Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col sm="4">
              <Form.Group controlId={`remarks-${index}`}>
                <Form.Label>Remarks {index + 1}</Form.Label>
                <Form.Control
                  required
                  type="text"
                  value={formData.numberOfUnitsTransfusedRemarks[`remarks-${index}`] || ''}
                  onChange={handleChange}
                />
                <Form.Control.Feedback type="invalid">Please fill out this field</Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
        ))}

        <Row className="mb-3">
        <Col sm='8'>
          <Form.Group controlId="numberOfTransfusionReactions">
            <Form.Label>Number of Transfusion Reactions</Form.Label>
            <Form.Control required type="text" value={formData.numberOfTransfusionReactions} onChange={handleChange} />
            <Form.Control.Feedback type="invalid">Please fill out this field</Form.Control.Feedback>
          </Form.Group>
          </Col>
          <Col sm='4'>
              <Form.Group controlId="numberOfTransfusionReactionsRemarks">
                <Form.Label>Remarks</Form.Label>
                <Form.Control required type="text" value={formData.numberOfTransfusionReactionsRemarks} onChange={handleChange} />
                <Form.Control.Feedback type="invalid">Please fill out this field</Form.Control.Feedback>
              </Form.Group>
            </Col>
        </Row>

        <Row className="mb-3">
          <Form.Group controlId="timeTakenForReceivingBloodFromBloodBank">
            <Form.Label>Time taken for Receiving blood from blood bank</Form.Label>
            <Form.Control required type="text" value={formData.timeTakenForReceivingBloodFromBloodBank} onChange={handleChange} />
            <Form.Control.Feedback type="invalid">Please fill out this field</Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group controlId="numberOfPatientsWhoDidReceiveAppropriateProphylacticAntibiotic">
            <Form.Label>Number of patients who received appropriate Prophylactic Antibiotic</Form.Label>
            <Form.Control required type="text" value={formData.numberOfPatientsWhoDidReceiveAppropriateProphylacticAntibiotic} onChange={handleChange} />
            <Form.Control.Feedback type="invalid">Please fill out this field</Form.Control.Feedback>
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Col sm='8'>
            <Form.Group controlId="numberOfCasesReScheduledOrCanceled">
              <Form.Label style={{whiteSpace:'nowrap'}}>Number of cases Rescheduled or Canceled</Form.Label>
              <Form.Control required type="text" value={formData.numberOfCasesReScheduledOrCanceled} onChange={handleChange} />
              <Form.Control.Feedback type="invalid">Please fill out this field</Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col sm='4'>
            <Form.Group controlId="numberOfCasesReScheduledOrCanceledRemarks">
              <Form.Label>Remarks</Form.Label>
              <Form.Control required type="text" value={formData.numberOfCasesReScheduledOrCanceledRemarks} onChange={handleChange} />
              <Form.Control.Feedback type="invalid">Please fill out this field</Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Form.Group controlId="numberOfSurgicalSiteInfections">
            <Form.Label>Number of Surgical Site Infections</Form.Label>
            <Form.Control required type="text" value={formData.numberOfSurgicalSiteInfections} onChange={handleChange} />
            <Form.Control.Feedback type="invalid">Please fill out this field</Form.Control.Feedback>
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group controlId="numberOfSurgeriesWhereProceduresWereFollowed">
            <Form.Label>Number of Surgeries where Procedures were followed (Correct Patient, Correct Surgery)</Form.Label>
            <Form.Control required type="text" value={formData.numberOfSurgeriesWhereProceduresWereFollowed} onChange={handleChange} />
            <Form.Control.Feedback type="invalid">Please fill out this field</Form.Control.Feedback>
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group controlId="numberOfDayCareOPCases">
            <Form.Label>Number of Day Care OP Cases</Form.Label>
            <Form.Control required type="text" value={formData.numberOfDayCareOPCases} onChange={handleChange} />
            <Form.Control.Feedback type="invalid">Please fill out this field</Form.Control.Feedback>
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group controlId="numberOfDayCareIPCases">
            <Form.Label>Number of Day Care IP Cases</Form.Label>
            <Form.Control required type="text" value={formData.numberOfDayCareIPCases} onChange={handleChange} />
            <Form.Control.Feedback type="invalid">Please fill out this field</Form.Control.Feedback>
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group controlId="numberOfMinorCases">
            <Form.Label>Number of Minor Cases</Form.Label>
            <Form.Control required type="text" value={formData.numberOfMinorCases} onChange={handleChange} />
            <Form.Control.Feedback type="invalid">Please fill out this field</Form.Control.Feedback>
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Col sm='8'>
            <Form.Group controlId="numberOfParenteralExposures">
              <Form.Label style={{whiteSpace:'nowrap'}}>Number of Parenteral Exposures</Form.Label>
              <Form.Control required type="text" value={formData.numberOfParenteralExposures} onChange={handleChange} />
              <Form.Control.Feedback type="invalid">Please fill out this field</Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col sm='4'>
            <Form.Group controlId="numberOfParenteralExposuresRemarks">
              <Form.Label>Remarks</Form.Label>
              <Form.Control required type="text" value={formData.numberOfParenteralExposuresRemarks} onChange={handleChange} />
              <Form.Control.Feedback type="invalid">Please fill out this field</Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <button variant="primary" type="submit" className="mb-3">
          Save
        </button>

        {formSubmitted && !error && (
          <Alert variant="success">
            Form submitted successfully.
          </Alert>
        )}

        {error && (
          <Alert variant="danger">
            {error}
          </Alert>
        )}
      </Form>
    </StyledContainer>
  );
};

export default OTForm;