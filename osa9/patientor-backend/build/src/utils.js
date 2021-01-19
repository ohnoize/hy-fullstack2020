"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toNewEntry = exports.toNewPatient = void 0;
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-return */
const types_1 = require("./types");
const assertNever = (value) => {
    throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
};
const isString = (text) => {
    return typeof text === 'string' || text instanceof String;
};
const parseName = (name) => {
    if (!name || !isString(name)) {
        throw new Error('Incorrect or missing name');
    }
    return name;
};
const parseSpecialist = (specialist) => {
    if (!specialist || !isString(specialist)) {
        throw new Error('Incorrect or missing specialist');
    }
    return specialist;
};
const parseDescription = (description) => {
    if (!description || !isString(description)) {
        throw new Error('Incorrect or missing description');
    }
    return description;
};
const isDate = (date) => {
    return Boolean(Date.parse(date));
};
const parseDate = (date) => {
    if (!date || !isDate(date)) {
        throw new Error('Incorrect or missing date');
    }
    return date;
};
const parseSSN = (ssn) => {
    if (!ssn || !isString(ssn)) {
        throw new Error('Incorrect or missing SSN');
    }
    return ssn;
};
const isGender = (param) => {
    return Object.values(types_1.Gender).includes(param);
};
const parseGender = (gender) => {
    if (!gender || !isGender(gender)) {
        throw new Error('Incorrect or missing gender');
    }
    return gender;
};
const parseOccupation = (occupation) => {
    if (!occupation || !isString(occupation)) {
        throw new Error('Incorrect or missing occupation');
    }
    return occupation;
};
const parseDiagnosisCodes = (codes) => {
    if (!codes) {
        return [];
    }
    else if (!Array.isArray(codes) || codes.filter(c => typeof c !== 'string').length < 0) {
        throw new Error('Incorrect entry');
    }
    return codes;
};
const parseDischarge = (discharge) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    if (!Object.prototype.hasOwnProperty.call(discharge, 'date') || !Object.prototype.hasOwnProperty.call(discharge, 'criteria')) {
        throw new Error('Incorrect discharge data');
    }
    return discharge;
};
const parseSickLeave = (sickLeave) => {
    if (!Object.prototype.hasOwnProperty.call(sickLeave, 'startDate') || !Object.prototype.hasOwnProperty.call(sickLeave, 'endDate')) {
        throw new Error('Incorrect sick leave data');
    }
    return sickLeave;
};
const parseEmployer = (employer) => {
    if (!employer || !isString(employer)) {
        throw new Error('Incorrect or missing employer');
    }
    return employer;
};
const isHealthCheckRating = (rating) => {
    return Object.values(types_1.HealthCheckRating).includes(rating);
};
const parseHealthCheckRating = (rating) => {
    if (!isHealthCheckRating(rating)) {
        throw new Error('Incorrect health check rating');
    }
    return rating;
};
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const toNewPatient = (object) => {
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
exports.toNewPatient = toNewPatient;
const isType = (text) => {
    return isString(text) || (text === ('Hospital' || 'HealthCheck' || 'OccupationalHealthcare'));
};
const parseType = (type) => {
    if (!type || !isType(type)) {
        throw new Error('Invalid type');
    }
    return type;
};
const toNewBaseEntry = (object) => {
    const newBaseEntry = {
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
const toNewEntry = (object) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const newBaseEntry = toNewBaseEntry(object);
    switch (newBaseEntry.type) {
        case types_1.EntryType.Hospital:
            return Object.assign(Object.assign({}, newBaseEntry), { discharge: parseDischarge(object.discharge) });
        case types_1.EntryType.HealthCheck:
            return Object.assign(Object.assign({}, newBaseEntry), { healthCheckRating: parseHealthCheckRating(object.healthCheckRating) });
        case types_1.EntryType.OccupationalHealthcare:
            const newEntry = Object.assign(Object.assign({}, newBaseEntry), { employerName: parseEmployer(object.employerName), sickLeave: parseSickLeave(object.sickLeave) });
            return newEntry;
        default:
            return assertNever(newBaseEntry);
    }
};
exports.toNewEntry = toNewEntry;
