import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Alert, Button, FormGroup } from 'react-bootstrap';
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

const SecondFloor = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    selectedDate: '',
    sumOfTimeTakenforInitialAssessment: '',
    totalNumberOfAdmissions: '',
    numberOfInPatients: '',
    numberOfPatientsDischarged: '',
    sumOfTimeTakenForDischarge: '',
    totalNumberOfMedicationErrors: '',
    totalNumberOfMedicationErrorsRemarks: '',
    totalNumberOfOpportunitiesOfMedicationErrors: '',
    numberOfMedicationChartsReviewed: '',
    numberOfMedicationChartsReviewedRemarks: '',
    numberOfPatientsDevelopingAdverseDrugReactions: '',
    numberOfPatientsDevelopingAdverseDrugReactionsRemarks: '',
    adverseDrugReactionsRemarks: '',
    numberOfPatientsWhoDevelopNewOrWorseningOfPressureUlcer: '',
    numberOfPatientsWhoDevelopNewOrWorseningOfPressureUlcerRemarks: '',
    numberOfPatientFalls: '',
    numberOfPatientFallsRemarks: '',
    numberOfTransfusionReaction: '',
    numberOfTransfusionReactionRemarks: '',
    numberOfUnitsTransfused: '',
    numberOfUnitsTransfusedRemarks: {},
    sumOfTimeTakenForBloodAndBloodComponents: '',
    numberOfUrinaryCatheterAssociatedUtisInThatMonth: '',
    numberOfUrinaryCatheterAssociatedUtisInThatMonthRemarks: '',
    numberOfUrinaryCatheterDaysInThatMonth: '',
    numberCentralLineAssociatedBloodStreamInfectionsInAMonth: '',
    numberCentralLineAssociatedBloodStreamInfectionsInAMonthRemarks: '',
    numberOfCentralLineDaysInThatMonth: '',
    numberOfSurgicalSiteInfectionsInAGivenMonth: '',
    numberOfSurgicalSiteInfectionsInAGivenMonthRemarks: '',
    totalNumberOfBloodAndBloodComponentsCrossMatchedOrReserved: '',
    numberOfNearMissReported: '',
    numberOfNearMissReportedRemarks: '',
    numberOfIncidentsReported: '',
    numberOfIncidentsReportedRemarks: '',
    numberOfBedsOccupied: '',
    numberOfNursingStaff: '',
    totalNumberOfHandoversDoneAppropriately: '',
    totalNumberOfHandoverOpportunities: '',
    numberOfRestraintInjuriesOrStrangulation: '',
    numberOfRestraintInjuriesOrStrangulationRemarks: '',
    totalNumberOfRestraintPatientsDays: '',
    totalNumberOfRestraintPatientsDaysRemarks: '',
    numberOfPatientsOnIVTherapy: '',
    totalNumberOfPatientWhoDevelopsphlebitisOrExtravasation: '',
    totalNumberOfPatientWhoDevelopsphlebitisOrExtravasationRemarks: '',
    numberOfParenteralExposures: '',
    numberOfParenteralExposuresRemarks: '',
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

  const [validated, setValidated] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [error, setError] = useState('');

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
      setFormData((prevFormData) => ({
        ...prevFormData,
        numberOfUnitsTransfusedRemarks: {
          ...prevFormData.numberOfUnitsTransfusedRemarks,
          [id]: value,
        },
      }));
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
          name,
        };
        const response = await fetch('http://127.0.0.1:8000/SecondFloor/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formDataWithUser),
        });
  
        if (response.status === 400) {
          const errorText = await response.json();
          if (errorText.error === 'Data already exists for this date.') {
            setError('Data already exists for this date.');
          } else {
            throw new Error(errorText.error || 'Failed to submit data');
          }
        } else {
          setFormSubmitted(true); // Display success message
          setError(''); // Clear any previous errors
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
       <h2 className="text-center">Second Floor</h2>
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
          <Col>
            <Form.Group controlId="sumOfTimeTakenforInitialAssessment">
              <Form.Label>Sum of Time Taken for Initial Assessment (Minutes)</Form.Label>
              <Form.Control type="text" value={formData. sumOfTimeTakenforInitialAssessment} onChange={handleChange} required />
            </Form.Group>
          </Col>
        </Row>
        
        <Row className="mb-3">
          <Col>
            <Form.Group controlId="totalNumberOfAdmissions">
              <Form.Label>Total Number of Admissions</Form.Label>
              <Form.Control type="text" value={formData.totalNumberOfAdmissions} onChange={handleChange} required />
            </Form.Group>
          </Col>
        </Row>
        
        <Row className="mb-3">
          <Col>
            <Form.Group controlId="numberOfInPatients">
              <Form.Label>Number of In-Patients</Form.Label>
              <Form.Control type="text" value={formData.numberOfInPatients} onChange={handleChange} required />
            </Form.Group>
          </Col>
        </Row>
        
        <Row className="mb-3">
          <Col>
            <Form.Group controlId="numberOfPatientsDischarged">
              <Form.Label>Number of Patients Discharged</Form.Label>
              <Form.Control type="text" value={formData.numberOfPatientsDischarged} onChange={handleChange} required />
            </Form.Group>
          </Col>
        </Row>
        
        <Row className="mb-3">
          <Col>
            <Form.Group controlId="sumOfTimeTakenForDischarge">
              <Form.Label>Sum of Time Taken for Discharge(Minutes)</Form.Label>
              <Form.Control type="text" value={formData.sumOfTimeTakenForDischarge} onChange={handleChange} required />
            </Form.Group>
          </Col>
        </Row>
        
        <Row className="mb-3">
          <Col>
            <Form.Group controlId="totalNumberOfMedicationErrors">
              <Form.Label>Total Number of Medication Errors</Form.Label>
              <Form.Control type="text" value={formData.totalNumberOfMedicationErrors} onChange={handleChange} required />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="totalNumberOfMedicationErrorsRemarks">
              <Form.Label>Remarks</Form.Label>
              <Form.Control type="text" value={formData.totalNumberOfMedicationErrorsRemarks} onChange={handleChange} required />
            </Form.Group>
          </Col>
        </Row>
        
        <Row className="mb-3">
          <Col>
            <Form.Group controlId="totalNumberOfOpportunitiesOfMedicationErrors">
              <Form.Label>Total Number of Opportunities of Medication Errors</Form.Label>
              <Form.Control type="text" value={formData.totalNumberOfOpportunitiesOfMedicationErrors} onChange={handleChange} required />
            </Form.Group>
          </Col>
        </Row>
        
        <Row className="mb-3">
          <Col>
            <Form.Group controlId="numberOfMedicationChartsReviewed">
              <Form.Label>Number of Medication Charts Reviewed</Form.Label>
              <Form.Control type="text" value={formData.numberOfMedicationChartsReviewed} onChange={handleChange} required />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="numberOfMedicationChartsReviewedRemarks">
              <Form.Label>Remarks</Form.Label>
              <Form.Control type="text" value={formData.numberOfMedicationChartsReviewedRemarks} onChange={handleChange} required />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col sm>
            <Form.Group controlId="numberOfPatientsDevelopingAdverseDrugReactions">
              <Form.Label>Number of Patients Developing Adverse Drug Reaction's</Form.Label>
              <Form.Control type="text" value={formData.numberOfPatientsDevelopingAdverseDrugReactions} onChange={handleChange} required />
            </Form.Group>
          </Col>
          <Col sm>
            <Form.Group controlId="numberOfPatientsDevelopingAdverseDrugReactionsRemarks">
              <Form.Label>Remarks</Form.Label>
              <Form.Control type="text" value={formData.numberOfPatientsDevelopingAdverseDrugReactionsRemarks} onChange={handleChange} required />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col>
            <Form.Group controlId="numberOfPatientsWhoDevelopNewOrWorseningOfPressureUlcer">
              <Form.Label>Number of Patients Who Develop New / Worsening of Pressure Ulcer</Form.Label>
              <Form.Control type="text" value={formData.numberOfPatientsWhoDevelopNewOrWorseningOfPressureUlcer} onChange={handleChange} required />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="numberOfPatientsWhoDevelopNewOrWorseningOfPressureUlcerRemarks">
              <Form.Label>Remarks</Form.Label>
              <Form.Control type="text" value={formData.numberOfPatientsWhoDevelopNewOrWorseningOfPressureUlcerRemarks} onChange={handleChange} required />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col>
            <Form.Group controlId="numberOfUnitsTransfused">
              <Form.Label>Number of Units Transfused</Form.Label>
              <Form.Control type="text" value={formData.numberOfUnitsTransfused} onChange={handleChange} required />
            </Form.Group>
          </Col>
        </Row>

        {Array.from({ length: formData.numberOfUnitsTransfused || 0 }).map((_, index) => (
          <Row className="mb-3" key={index}>
            <Col>
              <Form.Group controlId={`transfusion-reaction-${index}`}>
                <Form.Label>{`Transfusion Reaction ${index + 1}`}</Form.Label>
                <Form.Control
                  type="text"
                  value={formData.numberOfUnitsTransfusedRemarks[`transfusion-reaction-${index}`] || ''}
                  onChange={handleChange}
                  maxLength={MAX_CHAR_LIMIT}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId={`transfusion-reaction-remarks-${index}`}>
                <Form.Label>{`Remarks ${index + 1}`}</Form.Label>
                <Form.Control
                  type="text"
                  value={formData.numberOfUnitsTransfusedRemarks[`transfusion-reaction-remarks-${index}`] || ''}
                  onChange={handleChange}
                  maxLength={MAX_CHAR_LIMIT}
                />
              </Form.Group>
            </Col>
          </Row>
        ))}

        <Row className="mb-3">
          <Col>
            <Form.Group controlId="numberOfTransfusionReaction">
              <Form.Label>Number of Transfusion Reactions</Form.Label>
              <Form.Control type="text" value={formData.numberOfTransfusionReaction} onChange={handleChange} required />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="numberOfTransfusionReactionRemarks">
              <Form.Label>Remarks</Form.Label>
              <Form.Control type="text" value={formData.numberOfTransfusionReactionRemarks} onChange={handleChange} required />
            </Form.Group>
          </Col>
        </Row>
        
        <Row className="mb-3">
          <Col>
            <Form.Group controlId="sumOfTimeTakenForBloodAndBloodComponents">
              <Form.Label>Sum of Time Taken for Blood & Blood Components(Minutes)</Form.Label>
              <Form.Control type="text" value={formData.sumOfTimeTakenForBloodAndBloodComponents} onChange={handleChange} required />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col>
            <Form.Group controlId="numberOfUrinaryCatheterAssociatedUtisInThatMonth">
              <Form.Label>Number of uninary cather associated UTI's In a month</Form.Label>
              <Form.Control type="text" value={formData.numberOfUrinaryCatheterAssociatedUtisInThatMonth} onChange={handleChange} required />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="numberOfUrinaryCatheterAssociatedUtisInThatMonthRemarks">
              <Form.Label>Remarks</Form.Label>
              <Form.Control type="text" value={formData.numberOfUrinaryCatheterAssociatedUtisInThatMonthRemarks} onChange={handleChange} required />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col>
            <Form.Group controlId="numberOfUrinaryCatheterDaysInThatMonth">
              <Form.Label>Number of Urinary Catheter Days in that Month</Form.Label>
              <Form.Control type="text" value={formData.numberOfUrinaryCatheterDaysInThatMonth} onChange={handleChange} required />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
         <Col>
            <Form.Group controlId="numberCentralLineAssociatedBloodStreamInfectionsInAMonth">
              <Form.Label>Number Central Line - Associated Blood Stream Infections in a Month</Form.Label>
              <Form.Control type="text" value={formData.numberCentralLineAssociatedBloodStreamInfectionsInAMonth} onChange={handleChange} required />
            </Form.Group>
            </Col>

            <Col>
            <Form.Group controlId="numberCentralLineAssociatedBloodStreamInfectionsInAMonthRemarks">
              <Form.Label>Remarks</Form.Label>
              <Form.Control type="text" value={formData.numberCentralLineAssociatedBloodStreamInfectionsInAMonthRemarks} onChange={handleChange} required />
            </Form.Group>
            </Col>
            </Row> 

             <Row className="mb-3">
            <Form.Group controlId="numberOfCentralLineDaysInThatMonth">
              <Form.Label>Number of Central Line Days in that Month
            </Form.Label>
              <Form.Control type="text" value={formData.numberOfCentralLineDaysInThatMonth} onChange={handleChange} required />
            </Form.Group>
            </Row> 
      
        <Row className="mb-3">
          <Col>
            <Form.Group controlId="numberOfSurgicalSiteInfectionsInAGivenMonth">
              <Form.Label>Number of Surgical Site Infections in a Given Month
            </Form.Label>
              <Form.Control type="text" value={formData.numberOfSurgicalSiteInfectionsInAGivenMonth} onChange={handleChange} required />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="numberOfSurgicalSiteInfectionsInAGivenMonthRemarks">
              <Form.Label>Remarks
            </Form.Label>
              <Form.Control type="text" value={formData.numberOfSurgicalSiteInfectionsInAGivenMonthRemarks} onChange={handleChange} required />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col>
            <Form.Group controlId="totalNumberOfBloodAndBloodComponentsCrossMatchedOrReserved">
              <Form.Label>Total No of Blood & Blood Components Cross-Matched/ Reserved</Form.Label>
              <Form.Control type="text" value={formData.totalNumberOfBloodAndBloodComponentsCrossMatchedOrReserved} onChange={handleChange} required />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col>
            <Form.Group controlId="numberOfPatientFalls">
              <Form.Label>Number of Patient Falls</Form.Label>
              <Form.Control type="text" value={formData.numberOfPatientFalls} onChange={handleChange} required />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="numberOfPatientFallsRemarks">
              <Form.Label>Remarks</Form.Label>
              <Form.Control type="text" value={formData.numberOfPatientFallsRemarks} onChange={handleChange} required />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col>
            <Form.Group controlId="numberOfNearMissReported">
              <Form.Label>Number of Near Misses Reported</Form.Label>
              <Form.Control type="text" value={formData.numberOfNearMissReported} onChange={handleChange} required />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="numberOfNearMissReportedRemarks">
              <Form.Label>Remarks</Form.Label>
              <Form.Control type="text" value={formData.numberOfNearMissReportedRemarks} onChange={handleChange} required />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col>
            <Form.Group controlId="numberOfIncidentsReported">
              <Form.Label>Number of Incidents Reported</Form.Label>
              <Form.Control type="text" value={formData.numberOfIncidentsReported} onChange={handleChange} required />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="numberOfIncidentsReportedRemarks">
              <Form.Label>Remarks</Form.Label>
              <Form.Control type="text" value={formData.numberOfIncidentsReportedRemarks} onChange={handleChange} required />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col>
            <Form.Group controlId="numberOfBedsOccupied">
              <Form.Label>Number of Bed Occupied</Form.Label>
              <Form.Control type="text" value={formData.numberOfBedsOccupied} onChange={handleChange} required />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col>
            <Form.Group controlId="numberOfNursingStaff">
              <Form.Label>Number of Nursing Staff </Form.Label>
              <Form.Control type="text" value={formData.numberOfNursingStaff} onChange={handleChange} required />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
            <Form.Group controlId="totalNumberOfHandoversDoneAppropriately">
              <Form.Label>Total No of Handovers Done Appropriately</Form.Label>
              <Form.Control type="text" value={formData.totalNumberOfHandoversDoneAppropriately} onChange={handleChange} required />
            </Form.Group>
            </Row>

            <Row className="mb-3">
            <Form.Group controlId="totalNumberOfHandoverOpportunities">
              <Form.Label>Total Number of Handover Opportunities</Form.Label>
              <Form.Control type="text" value={formData.totalNumberOfHandoverOpportunities} onChange={handleChange} required />
            </Form.Group>
          
        </Row>
        <Row className="mb-3">
          <Col>
            <Form.Group controlId="numberOfRestraintInjuriesOrStrangulation">
              <Form.Label>Number of Restraint Injuries /Strangulatio</Form.Label>
              <Form.Control type="text" value={formData.numberOfRestraintInjuriesOrStrangulation} onChange={handleChange} required />
              </Form.Group>
              </Col>   
          <Col>
            <Form.Group controlId="numberOfRestraintInjuriesOrStrangulationRemarks">
              <Form.Label>Remarks</Form.Label>
              <Form.Control type="text" value={formData.numberOfRestraintInjuriesOrStrangulationRemarks} onChange={handleChange} required />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col>
            <Form.Group controlId="totalNumberOfRestraintPatientsDays">
              <Form.Label>Number of Restraint Patient Days</Form.Label>
              <Form.Control type="text" value={formData.totalNumberOfRestraintPatientsDays} onChange={handleChange} required />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="totalNumberOfRestraintPatientsDaysRemarks">
              <Form.Label>Remarks</Form.Label>
              <Form.Control type="text" value={formData.totalNumberOfRestraintPatientsDaysRemarks} onChange={handleChange} required />
            </Form.Group>
          </Col>
        </Row>
        
        <Row className="mb-3">
          <Col>
            <Form.Group controlId="numberOfPatientsOnIVTherapy">
              <Form.Label>Number of Patients on IV Therapy</Form.Label>
              <Form.Control type="text" value={formData.numberOfPatientsOnIVTherapy} onChange={handleChange} required />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col>
            <Form.Group controlId="totalNumberOfPatientWhoDevelopsphlebitisOrExtravasation">
              <Form.Label>Total No of patient who develops phlebitis/Extravasation</Form.Label>
              <Form.Control type="text" value={formData.totalNumberOfPatientWhoDevelopsphlebitisOrExtravasation} onChange={handleChange} required />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="totalNumberOfPatientWhoDevelopsphlebitisOrExtravasationRemarks">
              <Form.Label>Remarks</Form.Label>
              <Form.Control type="text" value={formData.totalNumberOfPatientWhoDevelopsphlebitisOrExtravasationRemarks} onChange={handleChange} required />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col>
            <Form.Group controlId="numberOfParenteralExposures">
              <Form.Label>Number of Parenteral Exposures (Injury due to any sharp)</Form.Label>
              <Form.Control type="text" value={formData.numberOfParenteralExposures} onChange={handleChange} required />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="numberOfParenteralExposuresRemarks">
              <Form.Label>Remarks</Form.Label>
              <Form.Control type="text" value={formData.numberOfParenteralExposuresRemarks} onChange={handleChange} required />
            </Form.Group>
          </Col>
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

export default SecondFloor;