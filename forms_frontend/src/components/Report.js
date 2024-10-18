import React, { useState, useEffect } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { wardOptions } from './constant';
import * as XLSX from 'xlsx';
import Alert from 'react-bootstrap/Alert';

function transposeData(data) {
  const transposedData = {};
  data.forEach(item => {
    Object.keys(item).forEach(key => {
      const formattedKey = key.split(/(?=[A-Z])/).map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
      if (!transposedData[formattedKey]) {
        transposedData[formattedKey] = [];
      }
      let formattedValue = typeof item[key] === 'string'
        ? item[key].split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
        : String(item[key]).charAt(0).toUpperCase() + String(item[key]).slice(1);
      transposedData[formattedKey].push(formattedValue);
    });
  });
  return transposedData;
}


function Report() {
  const [selectedWard, setSelectedWard] = useState("First Floor"); // Default value set to "First Floor"
  const [selectedDate, setSelectedDate] = useState(null); // Default value set to null
  const [selectedMonth, setSelectedMonth] = useState(new Date()); // Default value set to current month and year
  const [exportData, setExportData] = useState([]);
  const [isViewClicked, setIsViewClicked] = useState(true); // Set to true by default
  const [isEditing, setIsEditing] = useState(false); // Track if the table is in edit mode
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);

  useEffect(() => {
    fetchExportData();
  }, [selectedWard, selectedDate, selectedMonth]);

  const fetchExportData = () => {
    let apiUrl = `http://127.0.0.1:8000/get-export-data/?ward=${selectedWard}`;
    if (selectedDate) {
      const isoDate = new Date(selectedDate.getTime() + 24 * 60 * 60 * 1000).toISOString();
      apiUrl += `&date=${isoDate}`;
    } else if (selectedMonth) {
      const year = selectedMonth.getFullYear();
      const month = selectedMonth.getMonth() + 1;
      apiUrl += `&year=${year}&month=${month}`;
    }
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data)) {
          setExportData(data); // Remove filtering of the 'id' field here
        } else {
          console.error('Error fetching data:', data);
        }
      })
      .catch(error => console.error('Error fetching data:', error));
  };
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };

  const handleDownloadButtonClick = () => {
    if (exportData.length === 0) {
      console.error('No data available to download.');
      return;
    }
    const transposedData = transposeData(exportData);
    const headers = ['Indicators', ...exportData.map(item => formatDate(item.selectedDate))];
    const worksheetData = Object.entries(transposedData).map(([field, values]) => [field, ...values]);
    const excelData = [headers, ...worksheetData];
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet(excelData);
    XLSX.utils.book_append_sheet(wb, ws, 'ExportData');
    XLSX.writeFile(wb, 'Indicator_Report.xlsx');
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    const updatedData = exportData.map(item => ({
      ...item,
      selectedDate: new Date(item.selectedDate).toISOString(),
    }));
  
    // Check if any changes have been made
    const changesMade = JSON.stringify(updatedData) !== JSON.stringify(exportData);
  
    fetch('http://127.0.0.1:8000/update-export-data/', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          fetchExportData();
          setIsEditing(false);
          setShowSuccessAlert(true);
          setTimeout(() => setShowSuccessAlert(false), 5000);
        } else {
          console.error('Error updating data:', data);
          setShowErrorAlert(true);
          setTimeout(() => setShowErrorAlert(false), 5000);
        }
      })
      .catch(error => {
        console.error('Error updating data:', error);
        setShowErrorAlert(true);
        setTimeout(() => setShowErrorAlert(false), 5000);
      });
  };
  

  const handleInputChange = (field, colIndex, value) => {
    const updatedData = [...exportData];
    const key = Object.keys(updatedData[colIndex]).find(key =>
      key.split(/(?=[A-Z])/).map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') === field
    );
    if (key) {
      updatedData[colIndex][key] = value;
      setExportData(updatedData);
    }
  };

  const handleSelect = ward => setSelectedWard(ward);

  return (
    <Container style={{ marginLeft: "230px" }}>
      <h1 className="text-center mt-4">{selectedWard} Report</h1>
      <br />
      <Row className="mb-4" style={{ marginLeft: "10px" }}>
        <Col xs={12} md={4}>
          <Dropdown id="wardSelect" onSelect={handleSelect} className="custom-dropdown">
            <Dropdown.Toggle id="dropdown-basic" style={{ minWidth: "200px", backgroundColor: "white", color: "black", border: "1px solid #DEE2E6", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span>{selectedWard || 'Select Ward'}</span>
              <span className="caret"></span>
            </Dropdown.Toggle>
            <Dropdown.Menu style={{ minWidth: '200px', textAlign: "center", maxHeight: '250px', overflowY: 'auto', scrollbarWidth: "thin" }}>
              {wardOptions.map((ward, index) => (
                <Dropdown.Item key={index} eventKey={ward}>
                  {ward}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </Col>
        <Col xs={12} md={4}>
          <div className="input-group">
            <div style={{ cursor: 'pointer' }} onClick={() => document.getElementById('datePicker').click()}>
              <i style={{ fontSize: "130%", color: "rgb(149,188,176)", marginRight: "10px", marginTop: "5px" }} className="fa fa-calendar"></i>
            </div>
            <DatePicker
              id="datePicker"
              selected={selectedDate}
              onChange={date => setSelectedDate(date)}
              dateFormat="dd/MM/yyyy"
              placeholderText="Select a Date"
              className="form-control"
              style={{ display: 'inline-block', width: 'calc(100% - 40px)' }}
            />
          </div>
        </Col>
        <Col xs={12} md={4}>
          <div className="input-group">
            <div style={{ cursor: 'pointer' }} onClick={() => document.getElementById('monthYearPicker').click()}>
              <i style={{ fontSize: "130%", color: "rgb(149,188,176)", marginRight: "10px", marginTop: "5px" }} className="fa fa-calendar"></i>
            </div>
            <DatePicker
              id="monthYearPicker"
              selected={selectedMonth}
              onChange={date => setSelectedMonth(date)}
              dateFormat="MM/yyyy"
              showMonthYearPicker
              placeholderText="Select Month and Year"
              className="form-control"
              style={{ display: 'inline-block', width: 'calc(100% - 40px)' }}
            />
          </div>
        </Col>
      </Row>
      <Row>
        <Col xs={12} md={12} className="text-right" style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
          <i
            className={`fa ${isEditing ? 'fa-save' : 'fa-edit'}`}
            onClick={isEditing ? handleSaveClick : handleEditClick}
            style={{ fontSize: "200%", color: "rgb(149,188,176)", cursor: "pointer", marginRight: '15px' }}
            title={isEditing ? 'Save' : 'Edit'}
          ></i>
          <i
            style={{ fontSize: "200%", color: "rgb(149,188,176)", cursor: "pointer", marginRight: '30px' }}
            title='Download'
            className="fa fa-download"
            onClick={handleDownloadButtonClick}>
          </i>
        </Col>
      </Row>
      {showSuccessAlert && <Alert variant="success" className="text-center mt-3" style={{ width: '50%', margin: 'auto' }}>Successfully updated.</Alert>}
      {showErrorAlert && <Alert variant="danger" className="text-center mt-3" style={{ width: '50%', margin: 'auto' }}>Failed to update. Please try again.</Alert>}
      <Container className='mt-2'>
        {isViewClicked && exportData && exportData.length > 0 ? (
          <div className="table-responsive" style={{ overflowX: 'auto', overflowY: 'auto', maxHeight: '300px', scrollbarWidth: 'thin' }}>
            <table className="table table-bordered" style={{ marginLeft: 'auto', marginRight: 'auto', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: 'rgb(149,188,176)', color: "white" }}>Indicators</th>
                  {exportData.map((item, index) => (
                    <th key={index} style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: 'rgb(149,188,176)', color: "white" }}>{formatDate(item.selectedDate)}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Object.entries(transposeData(exportData)).map(([field, values], rowIndex) => (
                  <tr key={rowIndex} style={{ backgroundColor: rowIndex % 2 === 0 ? 'grey' : 'whitesmoke' }}>
                    <td style={{ padding: '8px', textAlign: 'left' }}>{field}</td>
                    {values.map((value, colIndex) => (
                      <td key={colIndex} style={{ padding: '8px' }}>
                        {isEditing ? (
                          <input
                            type="text"
                            value={value}
                            onChange={(e) => handleInputChange(field, colIndex, e.target.value)}
                          />
                        ) : (
                          value
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <center>
            <div style={{ marginTop: "100px" }}><b>No data available</b></div>
          </center>
        )}
      </Container>
    </Container>
  );
}

export default Report;
