import React, { useState, useEffect } from 'react';
import { Row, Form, Button, Alert } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
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

function FrontOffice() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [validated, setValidated] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    selectedDate: '',
    sumTotalPatientInTimeForConsultation: '',
    NumberOfOutPatients: '',
    OutPatientECHS: '',
    OutPatientESI: '',
    OutPatientRailway: '',
    OutPatientTNCM: '',
    OutPatientPAY: '',
    totalNumberOfOutPatients: 0,
    InPatientECHS: '',
    InPatientESI: '',
    InPatientRailway: '',
    InPatientTNCM: '',
    InPatientPAY: '',
    totalNumberOfInPatients: 0,
    MRI: '',
    CT: '',
    USG: '',
    ECHO: '',
    LAB: '',
    Xray: '',
    sumOfTotalPatientReportingtime: 0,
    DialysisInsurance: '',
    DialysisPay: '',
    DialysisTotal: 0,
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
      const adjustedDate = new Date(selectedDate.getTime() - selectedDate.getTimezoneOffset() * 60000);
      setFormData((prevFormData) => ({
        ...prevFormData,
        selectedDate: adjustedDate.toISOString().split('T')[0],
      }));
    }
  }, [selectedDate]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    const updatedValue = parseInt(value, 10) || 0;

    setFormData((prevFormData) => {
      const updatedFormData = { ...prevFormData, [id]: updatedValue };

      const totalNumberOfOutPatients = ['OutPatientECHS', 'OutPatientESI', 'OutPatientRailway', 'OutPatientTNCM', 'OutPatientPAY']
        .reduce((sum, field) => sum + (parseInt(updatedFormData[field], 10) || 0), 0);

      const sumOfTotalPatientReportingtime = ['MRI', 'CT', 'USG', 'ECHO', 'LAB', 'Xray']
        .reduce((sum, field) => sum + (parseInt(updatedFormData[field], 10) || 0), 0);

      const totalNumberOfInPatients = ['InPatientECHS', 'InPatientESI', 'InPatientRailway', 'InPatientTNCM', 'InPatientPAY']
        .reduce((sum, field) => sum + (parseInt(updatedFormData[field], 10) || 0), 0);

      const DialysisTotal = ['DialysisInsurance', 'DialysisPay']
        .reduce((sum, field) => sum + (parseInt(updatedFormData[field], 10) || 0), 0);

      return {
        ...updatedFormData,
        totalNumberOfOutPatients,
        sumOfTotalPatientReportingtime,
        totalNumberOfInPatients,
        DialysisTotal,
      };
    });
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
        const response = await fetch('http://127.0.0.1:8000/FrontOffice/', {
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
        setError(error.message || 'Failed to submit data');
      }
    }
  
    setValidated(true);
  };
  

  return (
    <StyledContainer className="NumericalData">
      <h1 className="text-center mb-4">Front Office</h1>
      <div style={{ float: "right" }} className='mt-3'>
        <div><b>ID: </b>{formData.id}</div>
        <div><b>Name: </b>{formData.name}</div>
      </div>
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
        <Form.Group className="mb-3" controlId="sumTotalPatientInTimeForConsultation">
          <Form.Label>Sum total Patient - in time for Consultation</Form.Label>
          <Form.Control
            required
            type="text"
            value={formData.sumTotalPatientInTimeForConsultation}
            onChange={handleChange} />
          <Form.Control.Feedback type="invalid">
            Please fill out this field
          </Form.Control.Feedback>
        </Form.Group>
        <br />

        <Form.Group className="mb-3" controlId="NumberOfOutPatients">
          <Form.Label>Number of OP Patients</Form.Label>
          <Form.Control
            required
            type="text"
            value={formData.NumberOfOutPatients}
            onChange={handleChange} />
          <Form.Control.Feedback type="invalid">
            Please fill out this field
          </Form.Control.Feedback>
        </Form.Group>
        <br />
        <h4 className="text-center mb-4" style={{ backgroundColor: "#EBB099", color: "white" }}>Total No of Out-Patients</h4>

        <Form.Group className="mb-3" controlId="OutPatientECHS">
          <Form.Label>ECHS</Form.Label>
          <Form.Control
            required
            type="text"
            value={formData.OutPatientECHS}
            onChange={handleChange} />
          <Form.Control.Feedback type="invalid">
            Please fill out this field
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="OutPatientESI">
          <Form.Label>ESI</Form.Label>
          <Form.Control
            required
            type="text"
            value={formData.OutPatientESI}
            onChange={handleChange} />
          <Form.Control.Feedback type="invalid">
            Please fill out this field
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="OutPatientRailway">
          <Form.Label>Railway</Form.Label>
          <Form.Control
            required
            type="text"
            value={formData.OutPatientRailway}
            onChange={handleChange} />
          <Form.Control.Feedback type="invalid">
            Please fill out this field
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="OutPatientTNCM">
          <Form.Label>TNCM</Form.Label>
          <Form.Control
            required
            type="text"
            value={formData.OutPatientTNCM}
            onChange={handleChange} />
          <Form.Control.Feedback type="invalid">
            Please fill out this field
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="OutPatientPAY">
          <Form.Label>PAY</Form.Label>
          <Form.Control
            required
            type="text"
            value={formData.OutPatientPAY}
            onChange={handleChange} />
          <Form.Control.Feedback type="invalid">
            Please fill out this field
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="totalNumberOfOutPatients">
          <Form.Label>Total Number of Out Patients</Form.Label>
          <Form.Control
            type="text"
            value={formData.totalNumberOfOutPatients}
            readOnly />
        </Form.Group>

        <h4 className="text-center mb-4" style={{ backgroundColor: "#EBB099", color: "white" }}>Total No of In-Patients</h4>

        <Form.Group className="mb-3" controlId="InPatientECHS">
          <Form.Label>ECHS</Form.Label>
          <Form.Control
            required
            type="text"
            value={formData.InPatientECHS}
            onChange={handleChange} />
          <Form.Control.Feedback type="invalid">
            Please fill out this field
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="InPatientESI">
          <Form.Label>ESI</Form.Label>
          <Form.Control
            required
            type="text"
            value={formData.InPatientESI}
            onChange={handleChange} />
          <Form.Control.Feedback type="invalid">
            Please fill out this field
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="InPatientRailway">
          <Form.Label>Railway</Form.Label>
          <Form.Control
            required
            type="text"
            value={formData.InPatientRailway}
            onChange={handleChange} />
          <Form.Control.Feedback type="invalid">
            Please fill out this field
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="InPatientTNCM">
          <Form.Label>TNCM</Form.Label>
          <Form.Control
            required
            type="text"
            value={formData.InPatientTNCM}
            onChange={handleChange} />
          <Form.Control.Feedback type="invalid">
            Please fill out this field
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="InPatientPAY">
          <Form.Label>PAY</Form.Label>
          <Form.Control
            required
            type="text"
            value={formData.InPatientPAY}
            onChange={handleChange} />
          <Form.Control.Feedback type="invalid">
            Please fill out this field
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="totalNumberOfInPatients">
          <Form.Label>Total Number of In Patients</Form.Label>
          <Form.Control
            type="text"
            value={formData.totalNumberOfInPatients}
            readOnly />
        </Form.Group>

        <h4 className="text-center mb-4" style={{ backgroundColor: "#EBB099", color: "white" }}>Sum of total patients reporting time</h4>

        <Form.Group className="mb-3" controlId="MRI">
          <Form.Label>MRI</Form.Label>
          <Form.Control
            required
            type="text"
            value={formData.MRI}
            onChange={handleChange} />
          <Form.Control.Feedback type="invalid">
            Please fill out this field
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="CT">
          <Form.Label>CT</Form.Label>
          <Form.Control
            required
            type="text"
            value={formData.CT}
            onChange={handleChange} />
          <Form.Control.Feedback type="invalid">
            Please fill out this field
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="USG">
          <Form.Label>USG</Form.Label>
          <Form.Control
            required
            type="text"
            value={formData.USG}
            onChange={handleChange} />
          <Form.Control.Feedback type="invalid">
            Please fill out this field
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="ECHO">
          <Form.Label>ECHO</Form.Label>
          <Form.Control
            required
            type="text"
            value={formData.ECHO}
            onChange={handleChange} />
          <Form.Control.Feedback type="invalid">
            Please fill out this field
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="LAB">
          <Form.Label>LAB</Form.Label>
          <Form.Control
            required
            type="text"
            value={formData.LAB}
            onChange={handleChange} />
          <Form.Control.Feedback type="invalid">
            Please fill out this field
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="Xray">
          <Form.Label>Xray</Form.Label>
          <Form.Control
            required
            type="text"
            value={formData.Xray}
            onChange={handleChange} />
          <Form.Control.Feedback type="invalid">
            Please fill out this field
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="sumOfTotalPatientReportingtime">
          <Form.Label>Sum of total patients reporting time</Form.Label>
          <Form.Control
            type="text"
            value={formData.sumOfTotalPatientReportingtime}
            readOnly />
        </Form.Group>

        <h4 className="text-center mb-4" style={{ backgroundColor: "#EBB099", color: "white" }}>Dialysis</h4>

        <Form.Group className="mb-3" controlId="DialysisInsurance">
          <Form.Label>Insurance</Form.Label>
          <Form.Control
            required
            type="text"
            value={formData.DialysisInsurance}
            onChange={handleChange} />
          <Form.Control.Feedback type="invalid">
            Please fill out this field
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="DialysisPay">
          <Form.Label>PAY</Form.Label>
          <Form.Control
            required
            type="text"
            value={formData.DialysisPay}
            onChange={handleChange} />
          <Form.Control.Feedback type="invalid">
            Please fill out this field
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="DialysisTotal">
          <Form.Label>Dialysis Total</Form.Label>
          <Form.Control
            type="text"
            value={formData.DialysisTotal}
            readOnly />
        </Form.Group>

        <button variant="primary" type="submit">
          Save
        </button>
      </Form>
      {formSubmitted && (
        <Alert variant="success" className="mt-3">
          Form submitted successfully!
        </Alert>
      )}
      {error && (
        <Alert variant="danger" className="mt-3">
          {error}
        </Alert>
      )}
    </StyledContainer>
  );
}

export default FrontOffice;
