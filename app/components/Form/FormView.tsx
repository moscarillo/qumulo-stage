import React from 'react';
import { Button } from 'react-bootstrap';

import type { SnapshotPolicy } from './types/policy';

type Props = {
  data: SnapshotPolicy;
};

function FormView(props: Props) {
  const { data: snapshotData } = props;
  console.log(snapshotData);

  return (
    <div className="fc">
      <label className="fc-field-label" htmlFor="policy_name">
        Policy Name
      </label>
      <input className="fc-input" name="policy_name" value={snapshotData.entries[0].policy_name} />
      <label className="fc-field-label" htmlFor="source_file_path">
        Apply to Directory
      </label>
      <div className="input-directory">
        <div className="directory-icon">/</div>
        <input
          className="fc-input-directory"
          name="source_file_path"
          value={snapshotData.entries[0].source_file_path}
        />
      </div>
      <div className="fc-field-label">Run Policy on the Following Schedule</div>
      <div className="sc">
        <div className="sc-row">
          <div className="sc-field-label">Select Schedule Type</div>
          <div className="sc-field">
            <select className="fc-select">
              <option>Daily or Weekly</option>
            </select>
          </div>
        </div>

        <div className="sc-row">
          <div className="sc-field-label">Set to Time Zone</div>
          <div className="sc-field">
            America/Los Angeles<div className="circle-blue">?</div>
          </div>
        </div>

        <div className="sc-row">
          <div className="sc-field-label">Take a Snapshot at</div>
          <div className="sc-field">
            <input className="fc-input-sm" min={0} max={23} size={2} type="number" name="hour" />
            <div className="form-time-separator">:</div>
            <input className="fc-input-sm" min={0} max={59} size={2} type="number" name="minute" />
          </div>
        </div>

        <div className="sc-row">
          <div className="sc-field-label">On the Following Day(s)</div>
          <div className="sc-field gap-wide">
            <div className="form-check fc-checkbox-container">
              <input className="form-check-input" id="daily" type="checkbox" name="every_day" />
              <label className="noBreak" htmlFor="daily">
                Every day
              </label>
            </div>
            {['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'].map((day) => (
              <div key="day" className="form-check fc-checkbox-container">
                <input
                  className="form-check-input"
                  id={`${day.toLowerCase()}_Id`}
                  type="checkbox"
                  name={`${day.toLowerCase()}`}
                />
                <label htmlFor={`${day.toLowerCase()}_Id`}>{day}</label>
              </div>
            ))}
          </div>
        </div>

        <div className="sc-row">
          <div className="sc-field-label">Delete Each Snapshot</div>
          <div className="sc-field">
            <div className="sc-radio-fields-container">
              <div className="fc-radio-container form-check">
                <input
                  id="never_id"
                  className="form-check-input"
                  type="radio"
                  name="delete_snapshot"
                  value="never"
                />
                <label className="form-check-label" htmlFor="never_id">
                  Never
                </label>
              </div>

              <div className="fc-radio-container form-check">
                <input
                  id="automatically_id"
                  className="form-check-input"
                  type="radio"
                  name="delete_snapshot"
                  value="automatically"
                />
                <label className="form-check-label" htmlFor="automatically_id">
                  Automatically after
                </label>
              </div>
            </div>
            <div className="ptb-1">
              <input className="fc-input-sm" size={2} type="input" name="snapshot_time_value" />
            </div>
            <select className="fc-select" name="snapshot_time_unit">
              <option>day(s)</option>
            </select>
          </div>
        </div>
      </div>
      <div className="fc-field-label">Snapshot Locking</div>
      <div className="fc-field-sub-label">
        Locked snapshots cannot be deleted before the deletion schedule expires. For this feature to
        be available, snapshots must be set to automatically delete.
      </div>
      <div className="fc-row form-check">
        <input
          className="form-check-input"
          id="enable_locked_snapshots_id"
          type="checkbox"
          name="enable_locked_snapshots"
        />
        <label htmlFor="enable_locked_snapshots_id">Enable locked snapshots</label>
      </div>
      <div className="fc-field-label">Snapshot Naming Format</div>
      <input className="fc-input" name="snapshot_name_format" />
      <div className="fc-field-sub-label">
        <div>To name your snapshot, you can use text strings and the following variables:</div>
        <div>{`{Year} {Month} {Day} {Hour} {Minutes} {Policy} {Directory} {ID}`}</div>
      </div>
      <div className="fc-snapshot-name-preview">Snapshot name preview:</div>
      <div className="fc-row pt-6 form-check">
        <input
          className="form-check-input"
          id="enable_policy_id"
          type="checkbox"
          name="enable_policy"
        />
        <label htmlFor="enable_policy_id">Enable policy</label>
      </div>
      <div className="fc-button-row pt-3">
        <Button className="rounded-1">Create Policy</Button>
        <a className="link" href="">
          Cancel
        </a>
      </div>
    </div>
  );
}

export default FormView;
