import React from 'react';
export default function Dashboard(){
  const user = JSON.parse(localStorage.getItem('user') || 'null') || { name: 'User' };
  return (
    <div style={{padding:24}}>
      <h1>Welcome, {user.name}</h1>
      <p>This is the dashboard placeholder.</p>
    </div>
  );
}
