import React from 'react';
import axios from 'axios';
import  { useState, useEffect }  from 'react';
import { useParams} from 'react-router-dom';


function UserDetailPage() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`http://localhost:3005/users/${userId}`);
        console.log('User ID:', userId);
        console.log('API Response:', res.data);
        setUser(res.data);
      } catch (err) {
        setError(err.message || 'Something went wrong!');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className='Main-Table'>
    <table>
    <tr>
      <th>Field</th>
      <th>Value</th>
    </tr>
    {user.uniqueNumber && <tr><td>Unique Number</td><td>{user.uniqueNumber}</td></tr>}
    {user.fullName && <tr><td>FullName</td><td>{user.fullName}</td></tr>}
    {user.dateOfBirth && <tr><td>Date of Birth</td><td>{user.dateOfBirth}</td></tr>}
    {user.address && <tr><td>Address</td><td>{user.address}</td></tr>}
    {user.phoneNumber && <tr><td>Phone Number</td><td>{user.phoneNumber}</td></tr>}
    {user.emailAddress && <tr><td>Email Address</td><td>{user.emailAddress}</td></tr>}
    {user.employmentDetails && <tr><td>Employment Details</td><td>{user.employmentDetails}</td></tr>}
    {user.bankingInformation && <tr><td>Banking Information</td><td>{user.bankingInformation}</td></tr>}
    {user.creditHistory && <tr><td>Credit History</td><td>{user.creditHistory}</td></tr>}
    {user.assetsAndLiabilities && <tr><td>Assets and Liabilities</td><td>{user.assetsAndLiabilities}</td></tr>}
    {user.maritalStatus && <tr><td>Marital Status</td><td>{user.maritalStatus}</td></tr>}
    
  </table>
  </div>
  );
}

export default UserDetailPage;