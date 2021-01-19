import React, { useCallback, useState } from 'react';
import { Form, Dropdown, DropdownProps } from 'semantic-ui-react';
import { NewEntry, EntryType } from '../types';
import AddHealthCheckForm from './AddHealthCheckForm';
import AddHospitalForm from './AddHospitalForm';
import AddOccupationalForm from './AddOccupationalForm';

interface Props {
  onSubmit: (values: NewEntry) => void;
  onCancel: () => void;
}

const typeOptions = [
  { key: EntryType.Hospital, value: EntryType.Hospital, text: "Hospital" },
  { key: EntryType.HealthCheck, value: EntryType.HealthCheck, text: "Health Check" },
  { key: EntryType.OccupationalHealthcare, value: EntryType.OccupationalHealthcare, text: "Occupational Healthcare" }
];

const baseInitialValues = {
  date: '',
  description: '',
  specialist: '',
};

const hospitalInitialValues: NewEntry = {
  ...baseInitialValues,
  type: EntryType.Hospital,
  discharge: { date: '', criteria: ''}
};

const healthCheckInitialValues: NewEntry = {
  ...baseInitialValues,
  type: EntryType.HealthCheck,
  healthCheckRating: 0
};

const occupationalInitialValues: NewEntry = {
  ...baseInitialValues,
  type: EntryType.OccupationalHealthcare,
  sickLeave: {
    startDate: '',
    endDate: '',
  },
  employerName: ''
};

const AddEntryWrapper: React.FC<Props> = ({ onSubmit, onCancel }) => {
  const [ entryType, setEntryType ] = useState<EntryType>(EntryType.HealthCheck);
  const changeType = (_e: React.SyntheticEvent,
    { value }: DropdownProps
  ): void => {
    if (value) setEntryType(value as EntryType);
  };
  const entryForm = useCallback(() => {
    switch (entryType) {
      case EntryType.HealthCheck:
        return (
          <AddHealthCheckForm
            initialValues={healthCheckInitialValues}
            onCancel={onCancel}
            onSubmit={onSubmit} 
          />
      );
      case EntryType.Hospital:
        return (
          <AddHospitalForm
            initialValues={hospitalInitialValues}
            onCancel={onCancel}
            onSubmit={onSubmit} 
          />
      );
      case EntryType.OccupationalHealthcare:
        return (
          <AddOccupationalForm
            initialValues={occupationalInitialValues}
            onCancel={onCancel}
            onSubmit={onSubmit} 
          />
      );
      default: 
        return null;
    }
  }, [entryType, onCancel, onSubmit]);

  return (
    <div>
      <Form>
        <Form.Field>
          <label>Entry Type</label>
          <Dropdown
            fluid
            onChange={changeType}
            options={typeOptions}
            selection
            value={entryType}
          />
        </Form.Field>
      </Form>
      {entryForm()}
    </div>
  );
};

export default AddEntryWrapper;






