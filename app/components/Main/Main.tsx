import React from 'react';
import { Charts, Form } from '~/components';
import { capitalize } from '~/utils/strings';

type Props = {
  content: 'edit-snapshot-policy' | 'performance-metrics'
}

function Main(props: Props) {
  const { content } = props;
  return (
    <div className="main">
      <div className="main-header">{capitalize(content.replace(/-/ig,' '))}</div>
      {content === 'edit-snapshot-policy' && <Form formType="snapshotPolicy" />}
      {content === 'performance-metrics' && <Charts />}
    </div>
  );
}

export default Main;
