import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaSpinner } from 'react-icons/fa';

function AutoVerifier() {
  const [apiStatus, setApiStatus] = useState('');
  const [apiData, setApiData] = useState('');
  const [remainingTime, setRemainingTime] = useState(35);

  useEffect(() => {
    const checkApiStatus = async () => {
      try {
        const response = await axios.post('http://97.74.94.225:8282/besstMainApi/df/videoSection', null, {
          headers: { 'Client_ID': 'any value' }
        });
        console.log('API response:', response.data.Data); 
        if (response.status === 200) {
          setApiStatus('Active');
          setApiData(response.data.Data);
        } else {
          setApiStatus('Down');
          setApiData('');
        }
      } catch (error) {
        setApiStatus('Down');
        setApiData('');
      }
    };
    checkApiStatus();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime(prevTime => prevTime - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [remainingTime]);

  useEffect(() => {
    const apiInterval = setInterval(async () => {
      try {
        const response = await axios.post('http://97.74.94.225:8282/besstMainApi/df/videoSection', null, {
          headers: { 'Client_ID': 'any value' }
        });
        console.log('API response:', response.data); 
        if (response.status === 200) {
          setApiStatus('Active');
          setApiData(response.data.Data);
        } else {
          setApiStatus('Down');
          setApiData('');
        }
      } catch (error) {
        setApiStatus('Down');
        setApiData('');
      }
      setRemainingTime(35);
    }, 35000);
    return () => clearInterval(apiInterval);
  }, []);

  return (
    <div>
        <div className="container-fluid bg-light py-3">
  <h2 className="text-center text-primary">AutoVerifier API</h2>
</div>

      {apiStatus === '' && (
        <div className="loading text-center">
          <FaSpinner className="spinner" />
        </div>
      )}
      {apiStatus === 'Active' && (
        <div className='text-center'>
          <p>Status: {apiStatus}</p>
          <p>No of items received: {apiData?.length}</p>
        </div>
      )}
      {apiStatus === 'Down' && (
        <div className='text-center'>
          <p>Status: {apiStatus}</p>
        </div>
      )}
      <p className='text-center'>Next API call in {remainingTime} seconds</p>
    </div>
  );
}



export default AutoVerifier;
