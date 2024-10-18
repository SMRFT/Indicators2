import React, { useState, useEffect } from 'react';
import { Form, Container, Button, Row, Col, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { LuArrowUpFromDot } from 'react-icons/lu';

const StyledContainer = styled.div`
  margin: 0 auto;
  padding: 20px;
`;

function RecoveryWard() {
  const [validated, setValidated] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);

  const [formData, setFormData] = useState({
    id: '',  
    name: '',
    selectedDate: '',
    SumofTimeTakenforInitialAssessment: '',
    totalNumberOfAdmissions: '',
    numberOfBedsOccupied: '',
    totalNumberOfMedicationErrors: '',
    totalNumberOfMedicationErrorsRemarks: '',
    numberOfPatientsDevelopingAdverseDrugReactions: '',
    numberOfPatientsDevelopingAdverseDrugReactionsRemarks: '',
    numberOfNursingStaff: '',
    numberOfPatientFalls: '',
    numberOfPatientFallsRemarks: '',
    numberOfUnitsTransfused: '',
    numberOfUnitsTransfusedRemarks: {},
    numberOfTransfusionReaction: '',
    numberOfTransfusionReactionRemarks: '',
    totalNumberOfBloodAndBloodComponentsCrossMatchedOrReserved: '',
    sumOfTimeTakenForBloodAndBloodComponents: '',
    numberOfCentralLineDaysInThatMonth: '',
    numberOfNearMissReported: '',
    numberOfNearMissReportedRemarks: '',
    numberOfIncidentsReported: '',
    numberOfParenteralExposures: '',
    numberOfParenteralExposuresRemarks: '',
    totalNumberOfHandoversDoneAppropriately: '',
    totalNumberOfHandoverOpportunities: '',
    totalNumberOfPatientsDevelopingPhlebitis: '',
    numberOfRestraintInjuriesOrStrangulation: '',
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
      const adjustedDate = new Date(selectedDate.getTime() - selectedDate.getTimezoneOffset() * 60000);
      setFormData((prevFormData) => ({
        ...prevFormData,
        selectedDate: adjustedDate.toISOString().split('T')[0],
      }));
    }
  }, [selectedDate]);

  const MAX_CHAR_LIMIT = 100;

  const handleChange = (e) => {
    const { id, value } = e.target;
    
    if (value.length > MAX_CHAR_LIMIT) {
      setError(`Ensure this value has at most ${MAX_CHAR_LIMIT} characters.`);
      return;
    }
    
    if (id.includes('reaction')) {
      const index = parseInt(id.split('-')[1]);
      setFormData({
        ...formData,
        numberOfUnitsTransfusedRemarks: {
          ...formData.numberOfUnitsTransfusedRemarks,
          [`reaction-${index}`]: value,  // Updating reaction
        },
      });
    } else if (id.includes('remarks')) {
      const index = parseInt(id.split('-')[1]);
      setFormData({
        ...formData,
        numberOfUnitsTransfusedRemarks: {
          ...formData.numberOfUnitsTransfusedRemarks,
          [`remarks-${index}`]: value,  // Updating remarks
        },
      });
    } else {
      setFormData({ ...formData, [id]: value });
    }
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
        const response = await fetch('http://127.0.0.1:8000/RecoveryWard/', {
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
       <h2 className="text-center">Recovery Ward</h2>
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

        <Row className="mb-3">
          <Form.Group controlId="sumOfTimeTakenforInitialAssessment">
            <Form.Label>Sum of Time Taken for Initial Assessment (Min)</Form.Label>
            <Form.Control
              required
              type="text"
              value={formData.sumOfTimeTakenforInitialAssessment}
              onChange={handleChange}
            />
            <Form.Control.Feedback type="invalid">
              Please fill out this field
            </Form.Control.Feedback>
          </Form.Group>
        </Row>

        <Form.Group className="mb-3" controlId="totalNumberOfAdmissions">
          <Form.Label>Total Number of Admissions</Form.Label>
          <Form.Control
            required
            type="text"
            value={formData.totalNumberOfAdmissions}
            onChange={handleChange}
          />
          <Form.Control.Feedback type="invalid">
            Please fill out this field
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="numberOfNursingStaff">
          <Form.Label>Number of Nursing Staff</Form.Label>
          <Form.Control
            required
            type="text"
            value={formData.numberOfNursingStaff}
            onChange={handleChange}
          />
          <Form.Control.Feedback type="invalid">
            Please fill out this field
          </Form.Control.Feedback>
        </Form.Group>


        <Row className="mb-3">
        <Col sm='8'>
        <Form.Group  controlId="totalNumberOfMedicationErrors">
        <Form.Label>Total Number of Medication Errors</Form.Label>
          <Form.Control
            required
            type="text"
            value={formData.totalNumberOfMedicationErrors}
            onChange={handleChange}
          />
          <Form.Control.Feedback type="invalid">
            Please fill out this field
          </Form.Control.Feedback>
        </Form.Group>
        </Col>

        <Col sm='4'>
        <Form.Group  controlId="totalNumberOfMedicationErrorsRemarks">
        <Form.Label>Remarks</Form.Label>
          <Form.Control
            required
            type="text"
            value={formData.totalNumberOfMedicationErrorsRemarks}
            onChange={handleChange}
          />
          <Form.Control.Feedback type="invalid">
            Please fill out this field
          </Form.Control.Feedback>
        </Form.Group>
        </Col>
        </Row>


        <Row className="mb-3">
        <Col sm='8'>
        <Form.Group  controlId="numberOfPatientsDevelopingAdverseDrugReactions">
          <Form.Label>Number of Patients Developing Adverse Drug Reactions</Form.Label>
          <Form.Control
            required
            type="text"
            value={formData.numberOfPatientsDevelopingAdverseDrugReactions}
            onChange={handleChange}
          />
          <Form.Control.Feedback type="invalid">
            Please fill out this field
          </Form.Control.Feedback>
        </Form.Group>
        </Col>

        <Col sm='4'>
        <Form.Group  controlId="numberOfPatientsDevelopingAdverseDrugReactionsRemarks">
          <Form.Label>Remarks</Form.Label>
          <Form.Control
            required
            type="text"
            value={formData.numberOfPatientsDevelopingAdverseDrugReactionsRemarks}
            onChange={handleChange}
          />
          <Form.Control.Feedback type="invalid">
            Please fill out this field
          </Form.Control.Feedback>
        </Form.Group>
        </Col>
        </Row>

        <Row className="mb-3">
        <Col sm='8'>
        <Form.Group  controlId="numberOfPatientFalls">
          <Form.Label>Number of Patient Falls</Form.Label>
          <Form.Control
            required
            type="text"
            value={formData.numberOfPatientFalls}
            onChange={handleChange}
          />
          <Form.Control.Feedback type="invalid">
            Please fill out this field
          </Form.Control.Feedback>
        </Form.Group>
        </Col>

        <Col sm='4'>
        <Form.Group  controlId="numberOfPatientFallsRemarks">
          <Form.Label>Remarks</Form.Label>
          <Form.Control
            required
            type="text"
            value={formData.numberOfPatientFallsRemarks}
            onChange={handleChange}
          />
          <Form.Control.Feedback type="invalid">
            Please fill out this field
          </Form.Control.Feedback>
        </Form.Group>
        </Col>
        </Row>

        <Row className="mb-3">
          <Col>
            <Form.Group controlId="numberOfUnitsTransfused">
              <Form.Label>Enter the Number of Units Transfused</Form.Label>
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
          <Col sm="8">
        <Form.Group  controlId="numberOfTransfusionReaction">
          <Form.Label>Number of Transfusion Reactions</Form.Label>
          <Form.Control
            required
            type="text"
            value={formData.numberOfTransfusionReaction}
            onChange={handleChange}
          />
          <Form.Control.Feedback type="invalid">
            Please fill out this field
          </Form.Control.Feedback>
        </Form.Group>
        </Col>

        <Col sm="4">
        <Form.Group  controlId="numberOfTransfusionReactionRemarks">
          <Form.Label>Remarks</Form.Label>
          <Form.Control
            required
            type="text"
            value={formData.numberOfTransfusionReactionRemarks}
            onChange={handleChange}
          />
          <Form.Control.Feedback type="invalid">
            Please fill out this field
          </Form.Control.Feedback>
        </Form.Group>
        </Col>
        
        </Row>


        <Form.Group className="mb-3" controlId="totalNumberOfBloodAndBloodComponentsCrossMatchedOrReserved">
          <Form.Label>Total No. of Blood and Blood Components Cross Matched</Form.Label>
          <Form.Control
            required
            type="text"
            value={formData.totalNumberOfBloodAndBloodComponentsCrossMatchedOrReserved}
            onChange={handleChange}
          />
          <Form.Control.Feedback type="invalid">
            Please fill out this field
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="sumOfTimeTakenForBloodAndBloodComponents">
          <Form.Label>Time Taken for Blood and Blood Components Cross Matched (Min)</Form.Label>
          <Form.Control
            required
            type="text"
            value={formData.sumOfTimeTakenForBloodAndBloodComponents}
            onChange={handleChange}
          />
          <Form.Control.Feedback type="invalid">
            Please fill out this field
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="numberOfCentralLineDaysInThatMonth">
          <Form.Label>Number of Central Line Days in Month</Form.Label>
          <Form.Control
            required
            type="text"
            value={formData.numberOfCentralLineDaysInThatMonth}
            onChange={handleChange}
          />
          <Form.Control.Feedback type="invalid">
            Please fill out this field
          </Form.Control.Feedback>
        </Form.Group>

        <Row className="mb-3">
          <Col sm='8'>
        <Form.Group  controlId="numberOfNearMissReported">
          <Form.Label>Number of Near Miss Reported</Form.Label>
          <Form.Control
            required
            type="text"
            value={formData.numberOfNearMissReported}
            onChange={handleChange}
          />
          <Form.Control.Feedback type="invalid">
            Please fill out this field
          </Form.Control.Feedback>
        </Form.Group>
        </Col>
        
        <Col sm='4'>
          <Form.Group controlId="numberOfNearMissReportedRemarks">
            <Form.Label>Remarks</Form.Label>
            <Form.Control
            required
              type="text"
              value={formData.numberOfNearMissReportedRemarks}
              onChange={handleChange}
            />
            <Form.Control.Feedback type="invalid">
             Please fill out this field
            </Form.Control.Feedback>
          </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-3" controlId="numberOfIncidentsReported">
          <Form.Label>Number of Incidents Reported</Form.Label>
          <Form.Control
            required
            type="text"
            value={formData.numberOfIncidentsReported}
            onChange={handleChange}
          />
          <Form.Control.Feedback type="invalid">
            Please fill out this field
          </Form.Control.Feedback>
        </Form.Group>

        <Row className="mb-3">
        <Col sm='8'>
        <Form.Group  controlId="numberOfParenteralExposures">
          <Form.Label>Number of Parenteral Exposures</Form.Label>
          <Form.Control
            required
            type="text"
            value={formData.numberOfParenteralExposures}
            onChange={handleChange}
          />
          <Form.Control.Feedback type="invalid">
            Please fill out this field
          </Form.Control.Feedback>
        </Form.Group>
        </Col>


      <Col sm='4'>
      <Form.Group controlId="numberOfParenteralExposuresRemarks">
        <Form.Label>Remarks</Form.Label>
        <Form.Control
        required
          type="text"
          value={formData.numberOfParenteralExposuresRemarks}
          onChange={handleChange}
        />
        <Form.Control.Feedback type="invalid">
         Please fill out this field
         </Form.Control.Feedback>
      </Form.Group>
      </Col>
    </Row>


        <Form.Group className="mb-3" controlId="totalNumberOfHandoversDoneAppropriately">
          <Form.Label>Total No. of Handovers Done Appropriately</Form.Label>
          <Form.Control
            required
            type="text"
            value={formData.totalNumberOfHandoversDoneAppropriately}
            onChange={handleChange}
          />
          <Form.Control.Feedback type="invalid">
            Please fill out this field
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="totalNumberOfHandoverOpportunities">
          <Form.Label>Total No. of Handover Opportunities</Form.Label>
          <Form.Control
            required
            type="text"
            value={formData.totalNumberOfHandoverOpportunities}
            onChange={handleChange}
          />
          <Form.Control.Feedback type="invalid">
            Please fill out this field
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="totalNumberOfPatientsDevelopingPhlebitis">
          <Form.Label>Total No. of Patients Developing Phlebitis</Form.Label>
          <Form.Control
            required
            type="text"
            value={formData.totalNumberOfPatientsDevelopingPhlebitis}
            onChange={handleChange}
          />
          <Form.Control.Feedback type="invalid">
            Please fill out this field
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="numberOfRestraintInjuriesOrStrangulation">
          <Form.Label>Number of Restraint Injuries</Form.Label>
          <Form.Control
            required
            type="text"
            value={formData.numberOfRestraintInjuriesOrStrangulation}
            onChange={handleChange}
          />
          <Form.Control.Feedback type="invalid">
            Please fill out this field
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="numberOfBedsOccupied">
          <Form.Label>Number of Beds Occupied</Form.Label>
          <Form.Control
            required
            type="text"
            value={formData.numberOfBedsOccupied}
            onChange={handleChange}
          />
          <Form.Control.Feedback type="invalid">
            Please fill out this field
          </Form.Control.Feedback>
        </Form.Group>

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

export default RecoveryWard;