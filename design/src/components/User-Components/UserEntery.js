import React, { useState } from "react";
import axios from "axios";

function UserEntry() {
  const [formData, setFormData] = useState({
    fullName: "",
    dateOfBirth: "",
    address: "",
    phoneNumber: "",
    emailAddress: "",
    employmentDetails: "",
    bankingInformation: "",
    creditHistory: "",
    assetsAndLiabilities: "",
    maritalStatus: "",
    uniqueNumber: "",
    document: null,
    amount: "",
    receiveDate: "",
  });

  const handleChange = (e) => {
    if (e.target.name === "document") {
      setFormData({ ...formData, [e.target.name]: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      for (let key in formData) {
        if (key === "document") {
          formDataToSend.append("document", formData[key]);
        } else {
          formDataToSend.append(key, formData[key]);
        }
      }

      const res = await axios.post(
        "http://localhost:3005/users",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(res.data);
      setFormData({
        fullName: "",
        dateOfBirth: "",
        address: "",
        phoneNumber: "",
        emailAddress: "",
        employmentDetails: "",
        bankingInformation: "",
        creditHistory: "",
        assetsAndLiabilities: "",
        maritalStatus: "",
        uniqueNumber: "",
        document: null,
        amount: "",
        receiveDate: "",
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (


    
    
    <form onSubmit={handleSubmit} 
    className="Type-Form">

<h1>Financial Audit Form</h1>
    <div className="Main-InputField">
    

      <div className="Input-Label-One"> 
        <div>
          <label htmlFor="uniqueNumber">Unique Number:</label>
          <input
            type="text"
            name="uniqueNumber"
            placeholder="Unique Number"
            value={formData.uniqueNumber}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="fullName">Full Name:</label>
          
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="dateOfBirth">Date of Birth:</label>
          
          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="Input-Label-One">
        <div>
          <label htmlFor="address">Address:</label>
         
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            type="text"
            name="phoneNumber"
            placeholder="Phone Number"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
        </div>
        <div>
         
          <label htmlFor="emailAddress">Email Address:</label>
          <input
            type="email"
            name="emailAddress"
            placeholder="Email Address"
            value={formData.emailAddress}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="Input-Label-One">
        <div>
          <label htmlFor="employmentDetails">Employment Details:</label>
          <input
            type="text"
            name="employmentDetails"
            placeholder="Employment Details"
            value={formData.employmentDetails}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="bankingInformation">Banking Information:</label>
          <input
            type="text"
            name="bankingInformation"
            placeholder="Banking Information"
            value={formData.bankingInformation}
            onChange={handleChange}
          />
        </div>
        <div>
       
          <label htmlFor="creditHistory">Credit History:</label>
          
          <input
            type="text"
            name="creditHistory"
            placeholder="Credit History"
            value={formData.creditHistory}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="Input-Label-One">  
        <div>
          <label htmlFor="assetsAndLiabilities">
            Assets and Liabilities:
          </label>
          <input
            type="text"
            name="assetsAndLiabilities"
            placeholder="Assets and Liabilities"
            value={formData.assetsAndLiabilities}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="maritalStatus">Marital Status:</label>
          
          <input
            type="text"
            name="maritalStatus"
            placeholder="Marital Status"
            value={formData.maritalStatus}
            onChange={handleChange}
          />
        </div>

        <div>
        <label htmlFor="document">Document:</label>
<input type="file" name="document" onChange={handleChange} />
        </div>
      </div>
      <div className="Input-Label-One">
        <div>
          {" "}
          <label htmlFor="amount">Amount:</label>
          <input
            type="number"
            name="amount"
            placeholder="Amount"
            value={formData.amount}
            onChange={handleChange}
          />
        </div>
        <div>
          {" "}
          <label htmlFor="receiveDate">Receive Date:</label>
          <input
            type="date"
            name="receiveDate"
            value={formData.receiveDate}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>

    <div className="Main-Button">
      <button type="submit">Submit</button>
    </div>
  </form>

     
  );
}

export default UserEntry;
