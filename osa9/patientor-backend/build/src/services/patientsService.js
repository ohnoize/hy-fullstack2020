"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const patients_1 = __importDefault(require("../../data/patients"));
const getPatients = () => {
    return patients_1.default.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
        entries,
    }));
};
const findPatient = (id) => {
    const foundPatient = patients_1.default.find(p => p.id === id);
    return foundPatient;
};
const addEntry = (id, entry) => {
    const targetPatient = patients_1.default.find(p => p.id === id);
    const updatedEntry = Object.assign(Object.assign({}, entry), { id: (Math.random() * 100000).toString() });
    if (targetPatient) {
        patients_1.default.forEach(patient => {
            if (patient.id === id) {
                patient.entries = [...targetPatient.entries, Object.assign({}, updatedEntry)];
            }
        });
        return updatedEntry;
    }
    throw new Error('Something went wrong');
};
const addPatient = (entry) => {
    const newPatient = Object.assign({ id: (Math.random() * 100000).toString() }, entry);
    patients_1.default.push(newPatient);
    return newPatient;
};
exports.default = { getPatients, addPatient, findPatient, addEntry };
