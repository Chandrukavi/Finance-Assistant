// UserData.js
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';


const UserData = () => {
  const location = useLocation();
  const { fullName, amount } = location.state || {};

  // Calculate total amount with 16% increase
  const totalAmount = amount * 1.16;

  // Divide total amount by 12
  const monthlyPayment = totalAmount / 12;

  // Create an array to represent 12 weeks
  const weeks = Array.from({ length: 12 }, (_, index) => index + 1);

  // State to track paid status for each week
  const [paidWeeks, setPaidWeeks] = useState([]);

  // State for showing payment success message
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // Function to handle marking a week as paid
  const handlePaid = (week) => {
    if (!paidWeeks.includes(week)) {
      setPaidWeeks([...paidWeeks, week]);
      setPaymentSuccess(true);
      // Store paid status in local storage
      localStorage.setItem(`paidWeek-${week}`, true);
    }
  };

  // Function to close the payment success message
  const closePaymentSuccessMessage = () => {
    setPaymentSuccess(false);
  };

  // Load paid weeks from local storage on component mount
  useEffect(() => {
    const storedPaidWeeks = [];
    for (let i = 1; i <= 12; i++) {
      const isPaid = localStorage.getItem(`paidWeek-${i}`);
      if (isPaid === 'true') {
        storedPaidWeeks.push(i);
      }
    }
    setPaidWeeks(storedPaidWeeks);
  }, []);

  return (
    <div>
      {fullName && amount && (
        <div>
          <div className='user-data-head'>
          <h1>{`Name: ${fullName}`}</h1>
          <p>{`Received amount: ${amount}`}</p>
          <p>{`Total amount with 16% increase: ${totalAmount.toFixed(2)}`}</p>
          <p>{`Monthly payment (divided by 12): ${monthlyPayment.toFixed(2)}`}</p>
          </div>
        
          {paymentSuccess && (
            <div className="payment-success-popup">
              <p>Payment Successful</p>
              <button onClick={closePaymentSuccessMessage}>Close</button>
            </div>
          )}
          <table className="payment-table">
            <thead>
              <tr>
                <th>Week</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {weeks.map((week) => (
                <tr key={week}>
                  <td>{week}</td>
                  <td>{`$${monthlyPayment.toFixed(2)}`}</td>
                  <td className={paidWeeks.includes(week) ? 'paid' : 'unpaid'}>
                    {paidWeeks.includes(week) ? (
                      <span>Paid</span>
                    ) : (
                      <button onClick={() => handlePaid(week)}>Mark as Paid</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UserData;
