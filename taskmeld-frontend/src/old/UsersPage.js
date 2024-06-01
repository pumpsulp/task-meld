import React from 'react';
import UserList from '../components/UserList';
import UserForm from './UserForm';

const UsersPage = () => (
  <div>
    <h1>Users</h1>
    <UserForm />
    <UserList />
  </div>
);

export default UsersPage;