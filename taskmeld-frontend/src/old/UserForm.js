import React, { useState } from 'react';
import { createUser } from '../services/api';

const UserForm = () => {
  const [user, setUser] = useState({
    login: '',
    email: '',
    first_name: '',
    last_name: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createUser(user);
      setUser({ login: '', email: '', first_name: '', last_name: '', password: '' });
      setError('');
    } catch (err) {
      setError('Error creating user. Email or login may already be registered.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Login</label>
        <input type="text" name="login" value={user.login} onChange={handleChange} required />
      </div>
      <div>
        <label>Email</label>
        <input type="email" name="email" value={user.email} onChange={handleChange} required />
      </div>
      <div>
        <label>First Name</label>
        <input type="text" name="first_name" value={user.first_name} onChange={handleChange} required />
      </div>
      <div>
        <label>Last Name</label>
        <input type="text" name="last_name" value={user.last_name} onChange={handleChange} required />
      </div>
      <div>
        <label>Password</label>
        <input type="password" name="password" value={user.password} onChange={handleChange} required />
      </div>
      <button type="submit">Create User</button>
      {error && <p>{error}</p>}
    </form>
  );
};

export default UserForm;