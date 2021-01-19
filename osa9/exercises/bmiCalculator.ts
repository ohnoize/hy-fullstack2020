interface bmiValues {
  height: number,
  weight: number
}

const parseArgs = (args: Array<string>): bmiValues => {
  return {
    height: Number(args[2]),
    weight: Number(args[3])
  };
};

export const bmiCalculator = (height: number, weight: number): string => {
  const heightInM = height / 100;
  const bmi = weight / Math.pow(heightInM, 2);
  
  if (bmi <= 18.5) {
    return 'Underweight';
  }
  else if (bmi <= 25) {
    return 'Normal (healthy weight)';
  }
  else if (bmi > 25) {
    return 'Overweight';
  }
  return '';
};

const { height, weight } = parseArgs(process.argv);

console.log(bmiCalculator(height, weight));

