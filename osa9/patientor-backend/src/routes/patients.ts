/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from 'express';
import patientsService from '../services/patientsService';
import { toNewPatient, toNewEntry } from '../utils';
const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientsService.getPatients());
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  const foundPatient = patientsService.findPatient(id);
  res.json(foundPatient);
});

router.post('/', (req, res) => {

  try {
  const newPatientEntry = toNewPatient(req.body);
  const addedPatient = patientsService.addPatient(newPatientEntry);
  res.json(addedPatient);
  } catch (e) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    res.status(400).send(e.message);
  }
});

router.post('/:id/entries', (req, res) => {
  try {
    const id = req.params.id;
    const entry = toNewEntry(req.body);
    const newEntry = patientsService.addEntry(id, entry);
    res.json(newEntry);
  } catch (e) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    res.status(400).send(e.message);
  }
});



export default router;