import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Icon, Segment, Button } from 'semantic-ui-react';
import AddEntryModal from "../AddEntryModal";
import { apiBaseUrl } from "../constants";
import { useStateValue } from '../state';
import { Patient, Entry, EntryType, NewEntry } from "../types";
import { updatePatient } from '../state';

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};


const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  switch (entry.type) {
    case EntryType.Hospital:
      return (
        <div>
          <h2>{entry.date}{"  "}<Icon name='ambulance'/></h2>
          <p>Description: {entry.description}</p>
          <p>Discharge date: {entry.discharge.date}</p>
          <p>Discharge criteria: {entry.discharge.criteria}</p>
        </div>
      );
    case EntryType.OccupationalHealthcare:
      return (
        <div>
          <h2>{entry.date}{"  "}<Icon name='expand arrows alternate' />{entry.employerName}</h2>
          <p>Description: {entry.description}</p>
          {entry.sickLeave ? <p>Sick leave from {entry.sickLeave.startDate} to {entry.sickLeave.endDate}</p> : null}
        </div>
      );
    case EntryType.HealthCheck:
      return (
        <div>
          <h2>{entry.date}{"  "}<Icon name='stethoscope' /></h2>
          <p>Description: {entry.description}</p>
          <p>Healthcheck rating: {entry.healthCheckRating}</p>
        </div>
      );
    default:
      return assertNever(entry);
  } 
};

const SinglePatientPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [ patient, setPatient ] = React.useState<Patient | undefined>();
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();
  const [{ diagnoses }] = useStateValue();
  const [{ patients }, dispatch] = useStateValue();

  const openModal = (): void => {
    setModalOpen(true);
    console.log('open sesame');
  };


  const closeModal = (): void => {
    setError(undefined);
    setModalOpen(false);
  };
  
  
  React.useEffect(() => {
    const fetchPatient = async () => {
      const { data: patientFromApi } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
      
      setPatient(patientFromApi);
    };
    fetchPatient();
  }, [patients]);

  if (!patient) return null;
 
  const submitNewEntry = async (values: NewEntry) => {
    const body = { ...values };
    // console.log(body);
    try {
      const { data: updatedPatient } = await axios.post<Patient>(
        `${apiBaseUrl}/patients/${patient.id}/entries`,
        body
      );
      dispatch(updatePatient(updatedPatient));
      closeModal();
    } catch (e) {
      console.error(e.response.data);
      setError(e.response.data.error);
    }
  };

  return (
    <div className="App">
      <h2>{patient?.name} {patient?.gender === 'male' ? <Icon name='mars' /> : <Icon name='venus' />}</h2>
      <p>Ssn: {patient?.ssn}</p>
      <p>Occupation: {patient?.occupation}</p>
      <h3>Entries</h3>
      <Button onClick={() => openModal()}>Add new entry</Button>
      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
      />
      {patient?.entries.map(p => 
          <>
          <Segment raised>
            <EntryDetails entry={p} />
          
          <ul>
            {p.diagnosisCodes?.map(c => <li key={c}>
              {c} {Object.values(diagnoses).filter(d => d.code === c).map(d => d.name)}
            </li>
            )}
          </ul>
          </Segment></>
        )}
        
    </div>
  );
};

export default SinglePatientPage;