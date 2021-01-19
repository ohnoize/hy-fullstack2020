import patients from '../../data/patients';
import { Patient, NewPatient, Entry, NewEntry } from '../types';

const getPatients = (): Omit<Patient, 'ssn'>[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
    entries,
  }));
};

const findPatient = (id: string): Patient | undefined => {
  const foundPatient = patients.find(p => p.id === id);
  return foundPatient;
};

const addEntry = (id: string, entry: NewEntry): Entry => {
  const targetPatient = patients.find(p => p.id === id);
  const updatedEntry = {
    ...entry,
    id: (Math.random() * 100000).toString()
  };
  if (targetPatient) {
  
  patients.forEach(patient => {
    if (patient.id === id) {
      patient.entries = [ ...targetPatient.entries, {...updatedEntry}];
    }
  });
  return updatedEntry;
} throw new Error('Something went wrong');
};


const addPatient = (entry: NewPatient): Patient => {
  const newPatient = { 
    id: (Math.random() * 100000).toString(),
    ...entry
   };
  patients.push(newPatient);
  return newPatient;
};

export default { getPatients, addPatient, findPatient, addEntry };

