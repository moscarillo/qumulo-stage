import React from 'react';
import { Form } from '../../components/Form';

function Main() {
  return (
    <div className="main">
      <div className="main-header">Edit Snapshot Policy</div>
      <Form formType="snapshotPolicy" />
    </div>
  );
}

export default Main;
