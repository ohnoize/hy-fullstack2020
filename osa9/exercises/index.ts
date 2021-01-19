/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import express from 'express';
const app = express();
import { bmiCalculator } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

app.use(express.json());


app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (_req, res) => {
  const height = Number(_req.query.height);
  const weight = Number(_req.query.weight);

  if (isNaN(height) || isNaN(weight)) throw new Error('malformatted parameters');

  const bmiHere = {
    weight: weight,
    height: height,
    bmi: bmiCalculator(height, weight)
  };
  res.send(bmiHere);
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const body = req.body;
  if (!body) {
    res.json({ error: 'parameters missing'});
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const hours = body.daily_exercises;
  if (!hours) {
    res.json({ error: 'parameters missing'});
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const target = body.target;
  if (!target) {
    res.json({ error: 'parameters missing'});
  }

  if (typeof target !== 'number') {
    res.json({ error: 'malformatted parameters' });
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  if (hours.filter((a: number) => isNaN(Number(a))).length > 0) {
    res.json({ error: 'malformatted parameters' });
  }

  res.json(calculateExercises(hours, target));
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Connected to port ${PORT}`);
});