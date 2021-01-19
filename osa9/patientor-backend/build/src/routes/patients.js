"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
const express_1 = __importDefault(require("express"));
const patientsService_1 = __importDefault(require("../services/patientsService"));
const utils_1 = require("../utils");
const router = express_1.default.Router();
router.get('/', (_req, res) => {
    res.send(patientsService_1.default.getPatients());
});
router.get('/:id', (req, res) => {
    const id = req.params.id;
    const foundPatient = patientsService_1.default.findPatient(id);
    res.json(foundPatient);
});
router.post('/', (req, res) => {
    try {
        const newPatientEntry = utils_1.toNewPatient(req.body);
        const addedPatient = patientsService_1.default.addPatient(newPatientEntry);
        res.json(addedPatient);
    }
    catch (e) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        res.status(400).send(e.message);
    }
});
router.post('/:id/entries', (req, res) => {
    try {
        const id = req.params.id;
        const entry = utils_1.toNewEntry(req.body);
        const newEntry = patientsService_1.default.addEntry(id, entry);
        res.json(newEntry);
    }
    catch (e) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        res.status(400).send(e.message);
    }
});
exports.default = router;
