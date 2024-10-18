import React, { useState ,useEffect} from 'react';
import { Row, Form, Col, Alert ,Container} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';

const StyledContainer = styled.div`
  margin: 0 auto;
  padding: 20px;
`;

function MICU() {
  const MAX_CHAR_LIMIT = 100; // Define the max character limit
  const [validated, setValidated] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    selectedDate: '',
    sumOfTimeTakenforInitialAssessment: '',
    totalNumberOfAdmissions: '',
    numberOfPatientsDischarged: '',
    numberOfInPatients: '',
    numberOfBedsOccupied: '',
    sumOfTimeTakenForDischarge: '',
    totalNumberOfMedicationErrors: '',
    totalNumberOfMedicationErrorsRemarks: '',
    totalNumberOfOpportunitiesOfMedicationErrors: '',
    numberOfMedicationChartsWithErrorProneAbbreviation: '',
    numberOfMedicationChartsWithErrorProneAbbreviationRemarks: '',
    numberOfMedicationChartsReviewed: '',
    numberOfMedicationChartsReviewedRemarks: '',
    numberOfPatientsDevelopingAdverseDrugReactions: '',
    numberOfPatientsDevelopingAdverseDrugReactionsRemarks: '',
    numberOfTransfusionReaction: '',
    numberOfTransfusionReactionRemarks: '',
    numberOfUnitsTransfused: '',
    numberOfUnitsTransfusedRemarks: {},
    sumOfTimeTakenForBloodAndBloodComponents: '',
    totalNumberOfBloodAndBloodComponentsCrossMatchedOrReserved: '',
    numberOfPatientsWhoDevelopNewOrWorseningOfPressureUlcer: '',
    numberOfPatientsWhoDevelopNewOrWorseningOfPressureUlcerRemarks: '',
    numberOfUrinaryCatheterAssociatedUtisInThatMonth: '',
    numberOfUrinaryCatheterAssociatedUtisInThatMonthRemarks: '',
    numberOfUrinaryCatheterDaysInThatMonth: '',
    numberOfUrinaryCatheterDaysInThatMonthRemarks: '',
    numberCentralLineAssociatedBloodStreamInfectionsInAMonth: '',
    numberCentralLineAssociatedBloodStreamInfectionsInAMonthRemarks: '',
    numberOfCentralLineDaysInThatMonth: '',
    numberOfSurgicalSiteInfectionsInAGivenMonth: '',
    numberOfSurgicalSiteInfectionsInAGivenMonthRemarks: '',
    numberOfNursingStaff: '',
    numberOfPatientFalls: '',
    numberOfPatientFallsRemarks: '',
    numberOfNearMissReported: '',
    numberOfNearMissReportedRemarks: '',
    numberOfIncidentsReported: '',
    numberOfIncidentsReportedRemarks: '',
    numberOfParenteralExposures: '',
    numberOfParenteralExposuresRemarks: '',
    totalNumberOfHandoversDoneAppropriately: '',
    totalNumberOfHandoverOpportunities: '',
    totalNumberOfPatientsDevelopingPhlebitis: '',
    totalNumberOfPatientsDevelopingPhlebitisRemarks: '',
    numberOfRestraintInjuriesOrStrangulation: '',
    actualDeathsInICU: '',
    actualDeathsInICURemarks: '',
    predictedDeathsInICU: '',
    numberOfVentilatorAssociatedPneumonia: '',
    numberOfVentilatorAssociatedPneumoniaRemarks: '',
    numberOfRestraintInjuriesOrStrangulationRemarks: '',
    totalNumberOfRestraintPatientsDays: '',
    numberOfPatientsOnIVTherapy: '',
    incidentsOfDelining: '',
    incidentsOfDeliningRemarks: '',
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
          [`reaction-${index}`]: value,
        },
      });
    } else if (id.includes('remarks')) {
      const index = parseInt(id.split('-')[1]);
      setFormData({
        ...formData,
        numberOfUnitsTransfusedRemarks: {
          ...formData.numberOfUnitsTransfusedRemarks,
          [`remarks-${index}`]: value,
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
        const response = await fetch('http://127.0.0.1:8000/MICU/', {
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
       <h2 className="text-center">MICU</h2>
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
          <Form.Group controlId="sumOfTimeTakenforInitialAssessment">
            <Form.Label>Sum of Time Taken for Initial Assessment (Minutes)</Form.Label>
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

        <Row className="mb-3">
        <Form.Group  controlId="totalNumberOfAdmissions">
          <Form.Label>Total Number of Admissions</Form.Label>
          <Form.Control  required
          type="text" 
          value={formData.totalNumberOfAdmissions} 
          onChange={handleChange} />
           <Form.Control.Feedback type="invalid">
            Please fill out this field
          </Form.Control.Feedback>
        </Form.Group>
        </Row>

        <Row className="mb-3">
        <Form.Group controlId="numberOfPatientsDischarged">
          <Form.Label>Number of Patients Discharged</Form.Label>
          <Form.Control 
           required
          type="text" 
          value={formData.numberOfPatientsDischarged} 
          onChange={handleChange}/>
           <Form.Control.Feedback type="invalid">
            Please fill out this field
          </Form.Control.Feedback>
        </Form.Group>
        </Row>

        <Row className="mb-3">
        <Form.Group  controlId="numberOfInPatients">
          <Form.Label>Number of IP Patients</Form.Label>
          <Form.Control type="text" 
           required
          value={formData.numberOfInPatients} 
          onChange={handleChange} />
           <Form.Control.Feedback type="invalid">
            Please fill out this field
          </Form.Control.Feedback>
        </Form.Group>
        </Row>


        <Row className="mb-3">
        <Form.Group  controlId="numberOfBedsOccupied">
          <Form.Label>Number Of Beds Occupied</Form.Label>
          <Form.Control 
           required
          type="text" value={formData.numberOfBedsOccupied} 
          onChange={handleChange} />
           <Form.Control.Feedback type="invalid">
            Please fill out this field
          </Form.Control.Feedback>
        </Form.Group>
        </Row>

        <Row className="mb-3">
        <Form.Group controlId="sumOfTimeTakenForDischarge">
          <Form.Label>Sum of Time Taken for Discharge</Form.Label>
          <Form.Control
           required
           
           type="text" value={formData.sumOfTimeTakenForDischarge} 
           onChange={handleChange} />
            <Form.Control.Feedback type="invalid">
            Please fill out this field
          </Form.Control.Feedback>
        </Form.Group>
        </Row>

    <Row className="mb-3">
  <Col sm='8'>
    <Form.Group controlId="totalNumberOfMedicationErrors">
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
  <Form.Group controlId="totalNumberOfMedicationErrorsRemarks">
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
  <Form.Group controlId="totalNumberOfOpportunitiesOfMedicationErrors">
    <Form.Label>Total Number of Opportunities of Medication Errors</Form.Label>
    <Form.Control
     required
      type="text"
      value={formData.totalNumberOfOpportunitiesOfMedicationErrors}
      onChange={handleChange}
    />
     <Form.Control.Feedback type="invalid">
            Please fill out this field
          </Form.Control.Feedback>
  </Form.Group>
</Row>

<Row className="mb-3">
  <Col sm='8'>
  <Form.Group controlId="numberOfMedicationChartsWithErrorProneAbbreviation">
    <Form.Label>Number of Medication Charts with Error Prone Abbreviation</Form.Label>
    <Form.Control
     required
      type="text"
      value={formData.numberOfMedicationChartsWithErrorProneAbbreviation}
      onChange={handleChange}
    />
     <Form.Control.Feedback type="invalid">
     Please fill out this field
      </Form.Control.Feedback>
  </Form.Group>
  </Col>

  <Col sm='4'>
            <Form.Group controlId="numberOfMedicationChartsWithErrorProneAbbreviationRemarks">
              <Form.Label>Remarks</Form.Label>
              <Form.Control
              required
                type="text"
                value={formData.numberOfMedicationChartsWithErrorProneAbbreviationRemarks}
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
        <Form.Group controlId="numberOfMedicationChartsReviewed">
          <Form.Label>Number of Medication Charts Reviewed</Form.Label>
          <Form.Control
          required
            type="text"
            value={formData.numberOfMedicationChartsReviewed}
            onChange={handleChange}
          />
          <Form.Control.Feedback type="invalid">
          Please fill out this field
          </Form.Control.Feedback>
        </Form.Group>
        </Col>

        <Col sm='4'>
        <Form.Group controlId="numberOfMedicationChartsReviewedRemarks">
          <Form.Label>Remarks</Form.Label>
          <Form.Control
          required
            type="text"
            value={formData.numberOfMedicationChartsReviewedRemarks}
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
      <Form.Group controlId="numberOfPatientsDevelopingAdverseDrugReactions">
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
        <Form.Group controlId="numberOfPatientsDevelopingAdverseDrugReactionsRemarks">
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
          <Form.Group controlId="numberOfTransfusionReaction">
            <Form.Label>Number of Transfusion Reaction</Form.Label>
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

          <Col sm='4'>
          <Form.Group controlId="numberOfTransfusionReactionRemarks">
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

<Row className="mb-3">
  <Form.Group controlId="sumOfTimeTakenForBloodAndBloodComponents">
    <Form.Label>Sum of Time Taken for Blood & Blood Components (Minutes)</Form.Label>
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
</Row>

<Row className="mb-3">
  <Form.Group controlId="totalNumberOfBloodAndBloodComponentsCrossMatchedOrReserved">
    <Form.Label>Total No of Blood & Blood Components Cross-Matched/ Reserved</Form.Label>
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
</Row>

  <Row className="mb-3">
  <Col sm='8'>
  <Form.Group controlId="numberOfPatientsWhoDevelopNewOrWorseningOfPressureUlcer">
    <Form.Label>Number of Patients Who Develop New / Worsening of Pressure Ulcer</Form.Label>
    <Form.Control
     required
      type="text"
      value={formData.numberOfPatientsWhoDevelopNewOrWorseningOfPressureUlcer}
      onChange={handleChange}
    />
     <Form.Control.Feedback type="invalid">
       Please fill out this field
    </Form.Control.Feedback>
  </Form.Group>
  </Col>
  <Col sm='4'>

  <Form.Group controlId="numberOfPatientsWhoDevelopNewOrWorseningOfPressureUlcerRemarks">
    <Form.Label>Remarks</Form.Label>
    <Form.Control
     required
      type="text"
      value={formData.numberOfPatientsWhoDevelopNewOrWorseningOfPressureUlcerRemarks}
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
  <Form.Group controlId="numberOfUrinaryCatheterAssociatedUtisInThatMonth">
    <Form.Label>Number of Urinary Catheter Associated UTIs In a Month</Form.Label>
    <Form.Control
     required
      type="text"
      value={formData.numberOfUrinaryCatheterAssociatedUtisInThatMonth}
      onChange={handleChange}
    />
     <Form.Control.Feedback type="invalid">
     Please fill out this field
    </Form.Control.Feedback>
  </Form.Group>
  </Col>

  <Col sm='4'>
  <Form.Group controlId="numberOfUrinaryCatheterAssociatedUtisInThatMonthRemarks">
    <Form.Label>Remarks</Form.Label>
    <Form.Control
     required
      type="text"
      value={formData.numberOfUrinaryCatheterAssociatedUtisInThatMonthRemarks}
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
        <Form.Group controlId="numberOfUrinaryCatheterDaysInThatMonth">
          <Form.Label>Number of Urinary Catheter Days in that Month</Form.Label>
          <Form.Control
          required
            type="text"
            value={formData.numberOfUrinaryCatheterDaysInThatMonth}
            onChange={handleChange}
          />
          <Form.Control.Feedback type="invalid">
                  Please fill out this field
                </Form.Control.Feedback>
        </Form.Group>
        </Col>

        <Col sm='4'>
        <Form.Group controlId="numberOfUrinaryCatheterDaysInThatMonthRemarks">
          <Form.Label>Remarks</Form.Label>
          <Form.Control
          required
            type="text"
            value={formData.numberOfUrinaryCatheterDaysInThatMonthRemarks}
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
      <Form.Group controlId="numberCentralLineAssociatedBloodStreamInfectionsInAMonth">
        <Form.Label>Number Central Line - Associated Blood Stream Infections in a Month</Form.Label>
        <Form.Control
        required
          type="text"
          value={formData.numberCentralLineAssociatedBloodStreamInfectionsInAMonth}
          onChange={handleChange}
        />
        <Form.Control.Feedback type="invalid">
                Please fill out this field
              </Form.Control.Feedback>
      </Form.Group>
      </Col>

      <Col sm='4'>
      <Form.Group controlId="numberCentralLineAssociatedBloodStreamInfectionsInAMonthRemarks">
        <Form.Label>Remarks</Form.Label>
        <Form.Control
        required
          type="text"
          value={formData.numberCentralLineAssociatedBloodStreamInfectionsInAMonthRemarks}
          onChange={handleChange}
        />
        <Form.Control.Feedback type="invalid">
         Please fill out this field
        </Form.Control.Feedback>
      </Form.Group>
      </Col>
    </Row>

      <Row className="mb-3">
        <Form.Group controlId="numberOfCentralLineDaysInThatMonth">
          <Form.Label>Number of Central Line Days in that Month</Form.Label>
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
      </Row>

        <Row className="mb-3">
        <Col sm='8'>
          <Form.Group controlId="numberOfSurgicalSiteInfectionsInAGivenMonth">
            <Form.Label>Number of Surgical Site Infections in a Given Month</Form.Label>
            <Form.Control
            required
              type="text"
              value={formData.numberOfSurgicalSiteInfectionsInAGivenMonth}
              onChange={handleChange}
            />
            <Form.Control.Feedback type="invalid">
            Please fill out this field
            </Form.Control.Feedback>
          </Form.Group>
          </Col>

          <Col sm='4'>
          <Form.Group controlId="numberOfSurgicalSiteInfectionsInAGivenMonthRemarks">
            <Form.Label>Remarks</Form.Label>
            <Form.Control
            required
              type="text"
              value={formData.numberOfSurgicalSiteInfectionsInAGivenMonthRemarks}
              onChange={handleChange}
            />
            <Form.Control.Feedback type="invalid">
            Please fill out this field
            </Form.Control.Feedback>
          </Form.Group>
          </Col>
        </Row>

<Row className="mb-3">
  <Form.Group controlId="numberOfNursingStaff">
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
</Row>

        <Row className="mb-3">
        <Col sm='8'>
          <Form.Group controlId="numberOfPatientFalls">
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
          <Form.Group controlId="numberOfPatientFallsRemarks">
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
          <Col sm='8'>
          <Form.Group controlId="numberOfNearMissReported">
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

      <Row className="mb-3">
      <Col sm='8'>
        <Form.Group controlId="numberOfIncidentsReported">
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
        </Col>

        <Col sm='4'>
        <Form.Group controlId="numberOfIncidentsReportedRemarks">
          <Form.Label>Remarks</Form.Label>
          <Form.Control
          required
            type="text"
            value={formData.numberOfIncidentsReportedRemarks}
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
      <Form.Group controlId="numberOfParenteralExposures">
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

<Row className="mb-3">
  <Form.Group controlId="totalNumberOfHandoversDoneAppropriately">
    <Form.Label>Total Number of Handovers Done Appropriately</Form.Label>
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
</Row>

<Row className="mb-3">
  <Form.Group controlId="totalNumberOfHandoverOpportunities">
    <Form.Label>Total Number of Handover Opportunities</Form.Label>
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
</Row>

      <Row className="mb-3">
      <Col sm='8'>
        <Form.Group controlId="totalNumberOfPatientsDevelopingPhlebitis">
          <Form.Label>Total Number of Patients Developing Phlebitis</Form.Label>
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
        </Col>

        <Col sm='4'>
        <Form.Group controlId="totalNumberOfPatientsDevelopingPhlebitisRemarks">
          <Form.Label>Remarks</Form.Label>
          <Form.Control
          required
            type="text"
            value={formData.totalNumberOfPatientsDevelopingPhlebitisRemarks}
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
        <Form.Group controlId="numberOfRestraintInjuriesOrStrangulation">
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
        </Col>

        <Col sm='4'>
        <Form.Group controlId="numberOfRestraintInjuriesOrStrangulationRemarks">
          <Form.Label>Remarks</Form.Label>
          <Form.Control
          required
            type="text"
            value={formData.numberOfRestraintInjuriesOrStrangulationRemarks}
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
        <Form.Group controlId="actualDeathsInICU">
          <Form.Label>Actual Deaths In ICU</Form.Label>
          <Form.Control
          required
            type="text"
            value={formData.actualDeathsInICU}
            onChange={handleChange}
          />
          <Form.Control.Feedback type="invalid">
           Please fill out this field
            </Form.Control.Feedback>
        </Form.Group>
        </Col>

        <Col sm='4'>
        <Form.Group controlId="actualDeathsInICURemarks">
          <Form.Label>Remarks</Form.Label>
          <Form.Control
          required
            type="text"
            value={formData.actualDeathsInICURemarks}
            onChange={handleChange}
          />
          <Form.Control.Feedback type="invalid">
           Please fill out this field
          </Form.Control.Feedback>
        </Form.Group>
        </Col>
      </Row>

      <Row className="mb-3">
        <Form.Group controlId="predictedDeathsInICU">
          <Form.Label>Predicted Deaths In ICU</Form.Label>
          <Form.Control
          required
            type="text"
            value={formData.predictedDeathsInICU}
            onChange={handleChange}
          />
          <Form.Control.Feedback type="invalid">
          Please fill out this field
        </Form.Control.Feedback>
        </Form.Group>
      </Row>

      <Row className="mb-3">
      <Col sm='8'>
        <Form.Group controlId="numberOfVentilatorAssociatedPneumonia">
          <Form.Label>Number Of Ventilator Associated Pneumonia</Form.Label>
          <Form.Control
          required
            type="text"
            value={formData.numberOfVentilatorAssociatedPneumonia}
            onChange={handleChange}
          />
          <Form.Control.Feedback type="invalid">
           Please fill out this field
            </Form.Control.Feedback>
        </Form.Group>
        </Col>

        <Col sm='4'>
        <Form.Group controlId="numberOfVentilatorAssociatedPneumoniaRemarks">
          <Form.Label>Remarks</Form.Label>
          <Form.Control
          required
            type="text"
            value={formData.numberOfVentilatorAssociatedPneumoniaRemarks}
            onChange={handleChange}
          />
          <Form.Control.Feedback type="invalid">
           Please fill out this field
          </Form.Control.Feedback>
        </Form.Group>
        </Col>
      </Row>

      <Row className="mb-3">
        <Form.Group controlId="totalNumberOfRestraintPatientsDays">
          <Form.Label>Total Number of Restraint Patients Days</Form.Label>
          <Form.Control
          required
            type="text"
            value={formData.totalNumberOfRestraintPatientsDays}
            onChange={handleChange}
          />
          <Form.Control.Feedback type="invalid">
          Please fill out this field
        </Form.Control.Feedback>
        </Form.Group>
      </Row>

        <Row className="mb-3">
          <Form.Group controlId="numberOfPatientsOnIVTherapy">
            <Form.Label>Number of Patients on IV Therapy</Form.Label>
            <Form.Control
            required
              type="text"
              value={formData.numberOfPatientsOnIVTherapy}
              onChange={handleChange}
            />
            <Form.Control.Feedback type="invalid">
                    Please fill out this field
                  </Form.Control.Feedback>
          </Form.Group>
        </Row>

        <Row className="mb-3">
      <Col sm='8'>
        <Form.Group controlId="incidentsOfDelining">
          <Form.Label>Incidents Of Delining</Form.Label>
          <Form.Control
          required
            type="text"
            value={formData.incidentsOfDelining}
            onChange={handleChange}
          />
          <Form.Control.Feedback type="invalid">
           Please fill out this field
            </Form.Control.Feedback>
        </Form.Group>
        </Col>

        <Col sm='4'>
        <Form.Group controlId="incidentsOfDeliningRemarks">
          <Form.Label>Remarks</Form.Label>
          <Form.Control
          required
            type="text"
            value={formData.incidentsOfDeliningRemarks}
            onChange={handleChange}
          />
          <Form.Control.Feedback type="invalid">
           Please fill out this field
          </Form.Control.Feedback>
        </Form.Group>
        </Col>
      </Row>
        <br/>

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
}

export default MICU;