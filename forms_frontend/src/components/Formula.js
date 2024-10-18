import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';
import { CSVLink } from 'react-csv';
import './Formula.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';

const EmergencyRoomData = () => {
  const [data, setData] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    if (!selectedDate) {
      return;
    }

    const year = format(selectedDate, 'yyyy');
    const month = format(selectedDate, 'MM');

    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`http://127.0.0.1:8000/formula-data/`, {
        params: {
          year: year,
          month: month
        }
      });
      setData(response.data);
    } catch (error) {
      setError('Error fetching data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // Fetch data on component mount

  const handleFetchData = () => {
    fetchData();
  };

  const csvData = data
    ? Object.entries(data).map(([param, value]) => ({
        Parameter: param,
        Value: typeof value === 'number' ? value.toFixed(2) : value,
      }))
    : [];

  return (
    <div className="container1">
      <h1 className="text-center">Formula</h1>
      <br/>
      <div className="picker-container1">
        <label>Select Month and Year:</label>
      </div>
      <div className="input-container">
        <div className="date-picker-wrapper">
        <i style={{ fontSize: "150%", color: "rgb(149,188,176)",marginRight:"5px"}} className="fa fa-calendar"></i>
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            dateFormat="MM/yyyy"
            showMonthYearPicker
            className="form-control"
          />
        </div>
          <button onClick={handleFetchData} className="fetch-button1">Fetch Data</button>
        {data && (
          <CSVLink
            data={csvData}
            filename={`formula_data_${format(selectedDate, 'MM_yyyy')}.csv`}
            className="csv-button1"
          >
            Export CSV
          </CSVLink>
        )}
      </div>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {data && (
        <table className="data-table1">
          <thead>
            <tr>
              <th>Parameter</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(data).map(([param, value]) => (
              <tr key={param}>
                <td>{param}</td>
                <td>{typeof value === 'number' ? value.toFixed(2) : value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default EmergencyRoomData;