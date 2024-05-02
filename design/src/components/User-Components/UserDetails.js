import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

function UserDetails() {
  const [users, setUsers] = useState([]);
  const [filterValue, setFilterValue] = useState('');
  const { userId } = useParams();
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get('http://localhost:3005/users');
        setUsers(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUsers();
  }, [userId]);

  const filterUsers = () => {
    const filteredUsers = users.filter(user => {
      return (
        user.uniqueNumber.toLowerCase().includes(filterValue.toLowerCase()) ||
        user.fullName.toLowerCase().includes(filterValue.toLowerCase())
      );
    });
    setUsers(filteredUsers);
  };

  const handleDataEntry = (fullName, amount) => {
    navigate('/UserData', { state: { fullName, amount } }); // Use navigate instead of history.push
  };

  return (
    <div className='Main-table'>
      <h1>User Information</h1>
      <div className='Filter-Div'>
        <input
          type="text"
          value={filterValue}
          onChange={(e) => setFilterValue(e.target.value)}
          placeholder="Filter"
        />
        <button onClick={filterUsers}>Filter</button>
      </div>
      <table className='Table-Content'>
        <thead>
          <tr className='Table-Row'>
            <th>Unique Number</th>
            <th>Full Name</th>
            <th>Phone Number</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id}>
              <td>{user.uniqueNumber}</td>
              <td>{user.fullName}</td>
              <td>{user.phoneNumber}</td>
              <td className='td-Link'>
                <Link to={`/user/${user._id}`}>
                  <span>View details</span>
                </Link>
                <button onClick={() => handleDataEntry(user.fullName, user.amount)}>Data Entry</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserDetails;
