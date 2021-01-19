/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { NewPatient, Gender, NewEntry, NewBaseEntry, EntryType, Discharge, SickLeave, HealthCheckRating } from './types';

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const isString = (text: any): text is string => {
  return typeof text === 'string' || text instanceof String;
};



const parseName = (name: any): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing name');
  }
  return name;
};

const parseSpecialist = (specialist: any): string => {
  if (!specialist || !isString(specialist)) {
    throw new Error('Incorrect or missing specialist');
  }
  return specialist;
};


const parseDescription = (description: any): string => {
  if (!description || !isString(description)) {
    throw new Error('Incorrect or missing description');
  }
  return description;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: any): string => {
  
  if (!date || !isDate(date)) {
    throw new Error('Incorrect or missing date');
  }
  return date;
};


const parseSSN = (ssn: any): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error('Incorrect or missing SSN');
  }
  return ssn;
};

const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

const parseGender = (gender: any): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error('Incorrect or missing gender');
  }
  return gender;
};

const parseOccupation = (occupation: any): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error('Incorrect or missing occupation');
  }
  return occupation;
};

const parseDiagnosisCodes = (codes: any): string[] => {
  if (!codes) {
    return [];
  } else if (!Array.isArray(codes) || codes.filter(c => typeof c !== 'string').length < 0) {
    throw new Error('Incorrect entry');
  }
  return codes;
};

const parseDischarge = (discharge: any): Discharge => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  if (!Object.prototype.hasOwnProperty.call(discharge, 'date') || !Object.prototype.hasOwnProperty.call(discharge, 'criteria')) {
    throw new Error('Incorrect discharge data');
  }
  return discharge;
};

const parseSickLeave = (sickLeave: any): SickLeave => {
  if (!Object.prototype.hasOwnProperty.call(sickLeave, 'startDate') || !Object.prototype.hasOwnProperty.call(sickLeave, 'endDate')) {
    throw new Error('Incorrect sick leave data');
  }
  return sickLeave;
};

const parseEmployer = (employer: any): string => {
  if (!employer || !isString(employer)) {
    throw new Error('Incorrect or missing employer');
  }
  return employer;
};

const isHealthCheckRating = (rating: any): rating is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(rating);
};

const parseHealthCheckRating = (rating: any): HealthCheckRating => {
  if (!isHealthCheckRating(rating)) {
    throw new Error('Incorrect health check rating');
  }
  return rating;
};



// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const toNewPatient = (object: any): NewPatient => {
  return {
    name: parseName(object.name),
    dateOfBirth: parseDate(object.dateOfBirth),
    ssn: parseSSN(object.ssn),
    gender: parseGender(object.gender),
    occupation: parseOccupation(object.occupation),
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    entries: object.entries,
  };
};

const isType = (text: any): text is EntryType => {
  return isString(text) || (text === ('Hospital' || 'HealthCheck' || 'OccupationalHealthcare'));
};

const parseType = (type: any): EntryType => {
  if (!type || !isType(type)) {
    throw new Error('Invalid type');
  }
  return type;
} ;

const toNewBaseEntry = (object: any): NewBaseEntry => {
  const newBaseEntry: NewBaseEntry = {
    type: parseType(object.type),
    description: parseDescription(object.description),
    date: parseDate(object.date),
    specialist: parseSpecialist(object.specialist),
  };

  if (object.diagnosisCodes) {
    newBaseEntry.diagnosisCodes = parseDiagnosisCodes(object.diagnosisCodes);
  }

  return newBaseEntry;
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const toNewEntry = (object: any): NewEntry => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const newBaseEntry = toNewBaseEntry(object) as NewEntry;
  
  switch (newBaseEntry.type) {
    case EntryType.Hospital:
      return {
        ...newBaseEntry,
        discharge: parseDischarge(object.discharge)
      };
    case EntryType.HealthCheck:
      return {
        ...newBaseEntry,
        healthCheckRating: parseHealthCheckRating(object.healthCheckRating)
        };
    case EntryType.OccupationalHealthcare:
      const newEntry = {
        ...newBaseEntry,
        employerName: parseEmployer(object.employerName),
        sickLeave: parseSickLeave(object.sickLeave)
      };
      return newEntry;
      
    default: 
      return assertNever(newBaseEntry);
  }
};


