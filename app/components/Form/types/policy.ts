export type Days = ['SUN' | 'MON' | 'TUE' | 'WED' | 'THU' | 'FRI' | 'SAT'];

export type PolicyTypes = 'snapshotPolicy';

export interface SnapshotPolicy {
  entries: SnapshotPolicyEntry[];
}
export interface SnapshotPolicyEntry {
  id: number; // 11
  policy_name: string; //'mark_hourly',
  snapshot_name_template: string; //'{ID}_{Policy}_{Directory}',
  source_file_id: string; //'248284097',
  source_file_path: string; //'/home/mark/vmware_datastore/',
  schedule: {
    id: number; // 1,
    creation_schedule: {
      timezone: string; //'America/Los_Angeles';
      frequency: string; // 'SCHEDULE_DAILY_OR_WEEKLY',
      hour: number; // 2
      minute: number; // 0
      on_days?: Days[];
      day_of_month?: number; // 1,
      window_start_hour?: number; // 0;
      window_start_minute?: number; // 0;
      window_end_hour?: number; //23;
      window_end_minute?: number; //59;
      fire_every_interval?: string; // 'FIRE_IN_MINUTES',
      fire_every?: number; // 45,
    };
    expiration_time_to_live: string; // '4days',
  };
  enabled: boolean; //true,
  owners: string[];
}
