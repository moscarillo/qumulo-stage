import React from 'react';
import { snapshotData } from '../../fixtures/snapshotData';
import type { PolicyTypes, SnapshotPolicy } from './types/policy';

import FormView from './FormView';

type Props = {
  formType: PolicyTypes;
};

function Form(props: Props) {
  const { formType } = props;
  return (
    <>
      {formType === 'snapshotPolicy' && (
        <FormView data={snapshotData as SnapshotPolicy} />
      )}
    </>
  );
}

export default Form;
