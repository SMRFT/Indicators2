import React, { useState } from 'react';
import { Row, Form, Button, Alert, Col } from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';
import styled from 'styled-components';
import './Register.css';
// Import the department options and role from constants.js
import { role, wardOptions } from './constant';
const Register = () => {
  const [validated, setValidated] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [touchedFields, setTouchedFields] = useState({});
  const [successMessage, setSuccessMessage] = useState('');  // Success message stat
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [department, setDepartment] = useState('');
  const [designation, setDesignation] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    department: '',
    role: '',
    email: '',
    password: ''
  });
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
    setTouchedFields({ ...touchedFields, [id]: true }); // Mark field as touched
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      try {
        const response = await fetch('http://127.0.0.1:8000/registration/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        const result = await response.json();
  
        if (response.ok) {
          setFormSubmitted(true);
          setError('');  // Clear any existing errors
          setSuccessMessage(result.message || 'Registration successful!');  // Set success message
        } else {
          // Separate handling for id and email errors
          let idError = result.id ? result.id[0] : '';
          let emailError = result.email ? result.email[0] : '';
  
          // Set the combined error message if both are present, otherwise set individual errors
          setError((idError || emailError) ? `${idError} ${emailError}`.trim() : 'Registration failed. Please try again.');
          setSuccessMessage('');  // Clear success message
          setFormSubmitted(false);
        }
      } catch (error) {
        console.error('Error:', error.message);
        setError('An unexpected error occurred. Please try again.');
        setSuccessMessage('');  // Clear success message on error
      }
    }
    setValidated(true);
  };
  
  return (
    <div className='Registration'>
    <StyledContainer>
      <h1 className="text-center mb-4">Registration</h1>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Col>
            <Form.Group controlId="id">
              <Form.Label>ID</Form.Label>
              <Form.Control
                required
                type="text"
                value={formData.id}
                onChange={(e) => {setId(e.target.value);handleChange(e);}}
                pattern="[a-zA-Z0-9]+"
                isInvalid={(touchedFields.id && !formData.id) || (formData.id && !/^[a-zA-Z0-9]+$/.test(formData.id))}
                style={{border:"1px solid rgb(251,240,236)"}}
              />
              <Form.Control.Feedback type="invalid">
                {formData.id && !/^[a-zA-Z0-9]+$/.test(formData.id) ? "Please enter a valid ID." : "ID is required."}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                required
                type="text"
                value={formData.name}
                onChange={(e) => {setName(e.target.value);handleChange(e);}}
                pattern="[A-Za-z\s]+"
                isInvalid={(touchedFields.name && !formData.name) || (formData.name && !/^[A-Za-z\s]+$/.test(formData.name))}
                style={{border:"1px solid rgb(251,240,236)"}}
              />
              <Form.Control.Feedback type="invalid">
                {formData.name && !/^[A-Za-z\s]+$/.test(formData.name) ? "Please enter a valid name." : "Name is required."}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <Form.Group controlId="department">
              <Form.Label>Department</Form.Label>
              <Dropdown id="departmentSelect"onSelect={(value) => setFormData({ ...formData, department: value })} className="custom-dropdown">
                <Dropdown.Toggle variant="light" id="dropdown-basic" style={{ minWidth:"220px", backgroundColor:"white", color:"black",border:"1px solid rgb(251,240,236)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span>{formData.department || 'Select Department'}</span>
                  <span className="caret"></span> {/* Bootstrap's built-in caret icon */}
                </Dropdown.Toggle>
                <Dropdown.Menu style={{ minWidth: '220px', textAlign:"center", maxHeight: '250px', overflowY: 'auto', scrollbarWidth:"thin" }}>
                {wardOptions.map((department, index) => (
                    <Dropdown.Item key={index} eventKey={department}>
                      {department}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
              <Form.Control.Feedback type="invalid">
                Department is required.
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="role">
              <Form.Label>Role</Form.Label>
              <Dropdown id="roleselect" onSelect={(value) => setFormData({ ...formData, role: value })} className="custom-dropdown">
                <Dropdown.Toggle variant="light" id="dropdown-basic" style={{ minWidth:"220px", backgroundColor:"white", color:"black",border:"1px solid rgb(251,240,236)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span>{formData.role || 'Select Role'}</span>
                  <span className="caret"></span> {/* Bootstrap's built-in caret icon */}
                </Dropdown.Toggle>
                <Dropdown.Menu style={{ minWidth: '220px', textAlign:"center", maxHeight: '250px', overflowY: 'auto', scrollbarWidth:"thin" }}>
                {role.map((role, index) => (
                  <Dropdown.Item key={index} eventKey= {role}>
                    {role}
                  </Dropdown.Item>
                ))}
                </Dropdown.Menu>
              </Dropdown>
         <Form.Control.Feedback type="invalid">
                Role is required.
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                required
                type="email"
                value={formData.email}
                onChange={(e) => {setEmail(e.target.value);handleChange(e);}}
                isInvalid={(touchedFields.email && !formData.email) || (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))}
                autoComplete="off" // Prevent browser autocomplete
                style={{border:"1px solid rgb(251,240,236)"}}
              />
              <Form.Control.Feedback type="invalid">
                {formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) ? "Please enter a valid email address." : "Email is required."}
              </Form.Control.Feedback>
            </Form.Group>
            </Col>
            <Col>
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                required
                type="password"
                value={formData.password}
                onChange={(e) => {setPassword(e.target.value);handleChange(e);}}
                // isInvalid={(touchedFields.password && !formData.password) || (formData.password && !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(formData.password))}
                autoComplete="new-password" // Prevent browser autocomplete and generate a new password
                style={{border:"1px solid rgb(251,240,236)"}}
              />
              <Form.Control.Feedback type="invalid">
                Password is required
              </Form.Control.Feedback>
            </Form.Group>
            </Col>
          </Row>
        <center>
        <button type="submit" className="mb-3">
          Save
        </button>
        </center>
{/* Combined Error Alert */}
{error && (
  <Alert variant="danger">
    {error}
  </Alert>
)}
{/* Success Message Alert */}
{successMessage && (
  <Alert variant="success">
    {successMessage}
  </Alert>
)}
      </Form>
    </StyledContainer>
    </div>
  );
};
const StyledContainer = styled.div`
  margin: 5px auto 0;
  padding: 10px;
  max-height: 500px;
  max-width: 500px;
  align-items: center;
  background-color: white;
  border-radius: 10px;
`;
export default Register;