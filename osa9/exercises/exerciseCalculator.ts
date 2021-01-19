interface resultObject {
  periodLength: number,
  trainingDays: number,
  target: number,
  averageTime: number,
  success: boolean,
  rating: number,
  description: string
}

// interface exerciseArgs {
//   hours: Array<number>,
//   targ: number
// }

// export const parseArguments = (args: Array<string>): exerciseArgs => {
  
//   if (args.length < 4) throw new Error('Too few arguments');
  
//   if (args.slice(2).filter(a => isNaN(Number(a))).length > 0) throw new Error('Wrong type values');
  
//   return {
//   hours: args.slice(3).map(a => parseInt(a)),
//   targ: parseInt(args[2])
//   };
// };

export const calculateExercises = (exerciseHours: Array<number>, target: number): resultObject => {

  const averageTime = exerciseHours.reduce((a, b) => a + b) / exerciseHours.length;
  let rating = 0;

  if (averageTime < target) {
    rating = 1;
  }
  if (averageTime === target) {
    rating = 2;
  }
  if (averageTime > target) {
    rating = 3;
  }

  let description;

  switch (rating) {
    case 1:
      description = 'Need to exercise more!';
      break;
    case 2:
      description = 'Just the right amount of exercise';
      break;
    case 3:
      description = 'Made the target and more. Great Job!';
      break;
    default: description = 'Something went wrong';
  } 



  const exerciseResults: resultObject = {
    periodLength: exerciseHours.length,
    trainingDays: exerciseHours.filter(d => d > 0).length,
    target: target,
    averageTime: averageTime,
    success: (averageTime >= target),
    rating: rating,
    description: description
  };

  return exerciseResults;
};


// const { hours, targ } = parseArguments(process.argv);

// console.log(calculateExercises(hours, targ));