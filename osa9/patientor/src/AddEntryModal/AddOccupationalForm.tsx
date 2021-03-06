import React from 'react';
import { NewEntry, OccupationalHealthcareEntry } from '../types';
import { useStateValue } from '../state';
import { Field, Formik, Form } from "formik";
import { Grid, Button, Header } from "semantic-ui-react";
import { TextField, DiagnosisSelection } from "../AddPatientModal/FormField";

interface Props {
  onSubmit: (values: NewEntry) => void;
  onCancel: () => void;
  initialValues: Omit<OccupationalHealthcareEntry, 'id'>;
}


export const AddOccupationalForm: React.FC<Props> = ({ initialValues, onSubmit, onCancel }) => {
  const [{ diagnoses }] = useStateValue();
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validate={values => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (!values.employerName) {
          errors.employerName = requiredError;
        }
        return errors;
      }}
      >
        {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui">
            
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <DiagnosisSelection
            setFieldValue={setFieldValue}
            setFieldTouched={setFieldTouched}
            diagnoses={Object.values(diagnoses)}
          />    
            <Field
            label="Employer Name"
            placeholder="Employer Name"
            name="employerName"
            component={TextField}
          />

          <Header size="small">Sick Leave</Header>

          <Field
            label="Start Date"
            placeholder="YYYY-MM-DD"
            name="sickLeave.startDate"
            component={TextField}
          />
          <Field
            label="End Date"
            placeholder="YYYY-MM-DD"
            name="sickLeave.endDate"
            component={TextField}
          />
            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}

    </Formik>
  );
};

export default AddOccupationalForm;
