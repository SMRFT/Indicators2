import React, { useState, useEffect } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { RawDataOptions } from './constant';
import * as XLSX from 'xlsx';

function transposeData(data) {
  const transposedData = {};
  data.forEach(item => {
    Object.keys(item).forEach(key => {
      if (key !== 'selectedDate' && key !== 'ward' && key !== '_id') {
        const formattedKey = key.split(/(?=[A-Z])/).map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
        if (!transposedData[formattedKey]) {
          transposedData[formattedKey] = [];
        }
        const formattedValue = typeof item[key] === 'object' && item[key] !== null 
          ? JSON.stringify(item[key], null, 2) 
          : item[key];
        transposedData[formattedKey].push(formattedValue);
      }
    });
  });
  return transposedData;
}

function MasterDataReport() {
  const [selectedWard, setSelectedWard] = useState("First Floor Raw Data");
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [exportData, setExportData] = useState([]);
  const [isViewClicked, setIsViewClicked] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchExportData();
  }, [selectedWard, selectedDate, selectedMonth]);

  const fetchExportData = () => {
    let apiUrl = `http://127.0.0.1:8000/get_export_rawdata/?ward=${selectedWard}`;
    if (selectedDate) {
      const isoDate = selectedDate.toISOString();
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
          // Filter out the 'id' field
          const filteredData = data.map(({ id, ...rest }) => rest);
          setExportData(filteredData);
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
      _id: item._id ? { $oid: item._id } : undefined
    }));
  
    fetch('http://127.0.0.1:8000/update-export_rawdata/', {
      method: 'POST',
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
        } else {
          console.error('Error updating data:', data);
        }
      })
      .catch(error => console.error('Error updating data:', error));
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
              {RawDataOptions.map((ward, index) => (
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
              className="form-control"
              placeholderText="Select Date"
            />
          </div>
        </Col>
        <Col xs={12} md={4}>
          <div className="input-group">
            <div style={{ cursor: 'pointer' }} onClick={() => document.getElementById('monthPicker').click()}>
              <i style={{ fontSize: "130%", color: "rgb(149,188,176)", marginRight: "10px", marginTop: "5px" }} className="fa fa-calendar"></i>
            </div>
            <DatePicker
              id="monthPicker"
              selected={selectedMonth}
              onChange={date => setSelectedMonth(date)}
              dateFormat="MM/yyyy"
              showMonthYearPicker
              className="form-control"
              placeholderText="Select Month"
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
      <Row>
      <Col xs={12} className='mt-2'>
      {exportData.length > 0 ? (
        <div className="table-responsive" style={{ overflowX: 'auto', overflowY: 'auto', maxHeight: '300px', scrollbarWidth: 'thin' }}>
          <table className="table table-bordered" style={{ marginLeft: 'auto', marginRight: 'auto', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: 'rgb(149,188,176)', color: "white" }}>Field</th>
                {exportData.map((item, index) => (
                  <th key={index} style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: 'rgb(149,188,176)', color: "white" }}>{formatDate(item.selectedDate)}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Object.keys(exportData[0]).map((field, index) => {
                if (field !== 'selectedDate' && field !== 'ward' && field !== '_id') {
                  return (
                    <tr key={index}>
                      <td>{field}</td>
                      {exportData.map((item, colIndex) => (
                        <td key={colIndex}>
                          {Array.isArray(item[field]) ? (
                            item[field].map((obj, idx) => (
                              <div key={idx}>
                                <p>Patient Name: {obj.patientName}</p>
                                <p>Age: {obj.age}</p>
                                <p>UHID No: {obj.uhidNo}</p>
                                <p>Patient Time to be Ward Time Entered In Ward Transfer Sheet By Dmo: {obj.wardTransferSheet}</p>
                                <p>Assesment Completed Time By Dmo: {obj.timeByDmo}</p>
                                <p>Time Hr/ Mts By Dmo: {obj.timeHrsmts}</p>
                                <p>Care Plan Documented By Dmo Yes / No: {obj.carePlanPlanDoc}</p>
                                <p>Nutrition Assesment Completed By Dmo Yes / No: {obj.nutritionAssessment}</p>
                                <p>Name of the Doctor Who perform Initial Assesment: {obj.initialAssessment}</p>
                                <p>Patient Time to Entered With Transfer Sheet By Dmo: {obj.transferSheet}</p>
                                <p>Assessment Completed Time By Nurse: {obj.assessmentCompletedTimeBy}</p>
                                <p>Nursing Care Plan Documented Yes / No: {obj.nursingCarePlan}</p>
                                <p>Name Of The Primary Consultant: {obj.primaryConsultant}</p>
                                <p>Name Of The Staff Sign - Id No: {obj.staffSign}</p>
                                <p>Incharge Staff Name - Id No: {obj.inchargeStaffName}</p>
                              </div>
                            ))
                          ) : (
                            <div>{item[field]}</div>
                          )}
                        </td>
                      ))}
                    </tr>
                  );
                }
                return null;
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <center>
          <div style={{ marginTop: "100px" }}><b>No data available</b></div>
        </center>
      )}

    </Col>
    </Row>
    </Container>
  );
}

export default MasterDataReport;
