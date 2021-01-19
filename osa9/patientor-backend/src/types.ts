export interface Diagnosis {
  code: string,
  name: string,
  latin?: string
}

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other'
} 

export enum EntryType {
 HealthCheck = 'HealthCheck',
 Hospital = 'Hospital',
 OccupationalHealthcare = 'OccupationalHealthcare'
}

export interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  type: EntryType;
  diagnosisCodes?: Array<Diagnosis['code']>;
} 

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

interface HealthCheckEntry extends BaseEntry {
  type: EntryType.HealthCheck;
  healthCheckRating: HealthCheckRating;
}

export type Discharge = {
  date: string,
  criteria: string,
};

interface HospitalEntry extends BaseEntry {
  type: EntryType.Hospital;
  discharge: Discharge;
}

export type SickLeave = {
  startDate: string,
  endDate: string,
};


interface OccupationalHealthcareEntry extends BaseEntry {
  type: EntryType.OccupationalHealthcare;
  employerName: string;
  sickLeave?: SickLeave;
}

export type Entry = HospitalEntry | OccupationalHealthcareEntry | HealthCheckEntry;



export interface Patient {
  id: string; 
  name: string; 
  dateOfBirth: string;
  ssn: string;
  gender: Gender; 
  occupation: string;
  entries: Entry[];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type DistributiveOmit<T, K extends keyof any> = T extends any
  ? Omit<T, K>
  : never;

export type NewBaseEntry = Omit<BaseEntry, 'id'>;
export type NewPatient = Omit<Patient, 'id'>;
export type NewEntry = DistributiveOmit<Entry, 'id'>;

export type PublicPatient = Omit<Patient, 'ssn' | 'entries'>;

