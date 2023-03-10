import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';

import { snapshotFrequency } from './constants/fields';

import type { Days, SnapshotPolicy, SnapshotPolicyEntry } from './types/policy';

type Props = {
  data: SnapshotPolicy;
};

interface IDictionary {
  [index: string]: string;
}

const nameFromPreview = (snapshotNamePreview: string, currentPolicy: SnapshotPolicyEntry): string => {
  let previewName = snapshotNamePreview.replace(/{ID}/g, currentPolicy.id.toString());
  previewName = previewName.replace(/{Policy}/g, currentPolicy.policy_name);
  previewName = previewName.replace(/{Directory}/g, currentPolicy.source_file_path);
  return previewName;
}

function FormView(props: Props) {
  const { data: snapshotData } = props;
  const [hasEveryDay, setHasEveryDay] = useState<boolean>(false);
  const [snapshotNamePreview, setSnapshotNamePreview] = useState<string>(nameFromPreview(snapshotData.entries[0].snapshot_name_template, snapshotData.entries[0]));
  const [currentPolicyName, setCurrentPolicyName] = useState<string>(snapshotData.entries[0].policy_name);
  const [currentPolicy, setCurrentPolicy] = useState<SnapshotPolicyEntry>(snapshotData.entries[0]);

  const handlePolicyChange = (policyName: string) => {
    const selectedPolicy = snapshotData.entries.filter(_=>_.policy_name === policyName)[0];
    setCurrentPolicyName(policyName);
    setCurrentPolicy(selectedPolicy);
    setSnapshotNamePreview(nameFromPreview(selectedPolicy.snapshot_name_template, selectedPolicy));  
  };

  const handleSnapshotNamePreview = (snapshotNamePreview: string) => {
    setSnapshotNamePreview(nameFromPreview(snapshotNamePreview, currentPolicy));  
  };

  const selectAllDayCheckboxes = () => {
    const dayCheckboxes = document.getElementsByName('on_day');
    const day = Array.from(dayCheckboxes as unknown as HTMLInputElement[]);

    day.forEach((day: HTMLInputElement) => {
      day.checked = true
    });
  }

  const checkboxDayCount = () => {
    const dayCheckboxes = document.getElementsByName('on_day');
    const dayCount = Array.from(dayCheckboxes).filter((_:any)=>_.checked).length;
    setHasEveryDay(dayCount === 7);
  }

  useEffect(()=>{
    checkboxDayCount()
  },[currentPolicy])

  return (
    <div className="fc">
      <label className="fc-field-label" htmlFor="policy_name">
        Policy Name
      </label>

      <select value={currentPolicyName} className="fc-select" onChange={(e) => handlePolicyChange(e.target.value)} name="policy_name">
        {snapshotData.entries.map((entry: SnapshotPolicyEntry) => (
          <option value={entry.policy_name} key={entry.policy_name}>
            {entry.policy_name}
          </option>
        ))}
      </select>
      <label className="fc-field-label" htmlFor="source_file_path">
        Apply to Directory
      </label>
      <div className="input-directory">
        <div className="directory-icon">/</div>
        <input
          aria-label="Source File Path"
          className="fc-input-directory"
          name="source_file_path"
          defaultValue={currentPolicy.source_file_path}
        />
      </div>
      <div className="fc-field-label">Run Policy on the Following Schedule</div>
      <div className="sc">
        <div className="sc-row">
          <div className="sc-field-label">Select Schedule Type</div>
          <div className="sc-field">
            <select defaultValue={currentPolicy.schedule.creation_schedule.frequency} className="fc-select">
              {Object.keys(snapshotFrequency).map((frequency:string) => (
                <option key={frequency} value={frequency}>{
                  snapshotFrequency[frequency as keyof typeof snapshotFrequency]}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="sc-row">
          <div className="sc-field-label">Set to Time Zone</div>
          <div className="sc-field">
            {currentPolicy.schedule.creation_schedule.timezone}<div className="circle-blue">?</div>
          </div>
        </div>

        <div className="sc-row">
          <div className="sc-field-label">Take a Snapshot at</div>
          <div className="sc-field">
            <input aria-label="Schedule Hour" className="fc-input-sm" min={0} max={23} size={2} type="number" name="hour" defaultValue={currentPolicy.schedule.creation_schedule.hour} />
            <div className="form-time-separator">:</div>
            <input aria-label="Schedule Minute" className="fc-input-sm" min={0} max={59} size={2} type="number" name="minute" defaultValue={currentPolicy.schedule.creation_schedule.minute} />
          </div>
        </div>

        <div className="sc-row">
          <div className="sc-field-label">On the Following Day(s)</div>
          <div className="sc-field gap-wide">
            <div className="form-check fc-checkbox-container">
              <input onChange={() => {
                selectAllDayCheckboxes();
                setHasEveryDay(!hasEveryDay);
              }} checked={hasEveryDay} className="form-check-input" id="daily" type="checkbox" name="every_day" />
              <label className="noBreak" htmlFor="daily">
                Every day
              </label>
            </div>
            <div className="flex-responsive-days">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
              <div key={day} className="form-check fc-checkbox-container">
                <input
                  className="form-check-input"
                  id={`${day.toLowerCase()}_Id`}
                  type="checkbox"
                  onChange={()=>checkboxDayCount()}
                  defaultChecked={currentPolicy.schedule.creation_schedule.on_days?.includes(day.toUpperCase() as unknown as Days)}
                  name="on_day"
                  value={`${day.toLowerCase()}`}
                />
                <label htmlFor={`${day.toLowerCase()}_Id`}>{day}</label>
              </div>
            ))}
            </div>
          </div>
        </div>

        <div className="sc-row">
          <div className="sc-field-label">Delete Each Snapshot</div>
          <div className="sc-field">
            <div className="flex-responsive">
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
              <div className='flex-row'>
              <div className="ptb-1">
                <input className="fc-input-sm" size={2} min={0} max={60} type="number" name="snapshot_time_value" aria-label='Snapshot Time Value'/>
              </div>
              <select className="fc-select" name="snapshot_time_unit">
                <option>day(s)</option>
                <option>hours(s)</option>
                <option>minutes(s)</option>
              </select>
              </div>
              </div>
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
        <label className="pt-2" htmlFor="enable_locked_snapshots_id">Enable locked snapshots</label>
      </div>
      <div className="fc-field-label">Snapshot Naming Format</div>
      <input
        className="fc-input" 
        onChange={(e) => handleSnapshotNamePreview(e.target.value)}
        defaultValue={currentPolicy.snapshot_name_template}
        name="snapshot_name_format"
        aria-label="Snapshot Name Preview Input"
      />
      <div className="fc-field-sub-label">
        <div>To name your snapshot, you can use text strings and the following variables:</div>
        <div>{`{Year} {Month} {Day} {Hour} {Minutes} {Policy} {Directory} {ID}`}</div>
      </div>
      <div className="fc-snapshot-name-preview">Snapshot name preview:{snapshotNamePreview}</div>
      <div className="fc-row pt-6 form-check">
        <input
          className="form-check-input"
          id="enable_policy_id"
          type="checkbox"
          defaultChecked={currentPolicy.enabled}
          name="enable_policy"
        />
        <label className="pt-2" htmlFor="enable_policy_id">Enable policy</label>
      </div>
      <div className="fc-button-row pt-3">
        <Button className="rounded-1">Create Policy</Button>
        <a className="link" href="/">
          Cancel
        </a>
      </div>
    </div>
  );
}

export default FormView;
