import {useState} from 'react';
import {Goal, Meal} from '../../app/api/domain';

export const calculateGoal = (
  weight,
  selectedMetabolism,
  selectedGoal,
): Goal => {
  let tableValue;

  if (selectedGoal === 'loseWeight') {
    if (selectedMetabolism === 'Slow') tableValue = 22;
    if (selectedMetabolism === 'Moderate') tableValue = 24;
    if (selectedMetabolism === 'Fast') tableValue = 26;
  }
  if (selectedGoal === 'increaseMuscleMass') {
    if (selectedMetabolism === 'Slow') tableValue = 29;
    if (selectedMetabolism === 'Moderate') tableValue = 31;
    if (selectedMetabolism === 'Fast') tableValue = 33;
  }
  if (selectedGoal === 'gainWeight') {
    if (selectedMetabolism === 'Slow') tableValue = 35;
    if (selectedMetabolism === 'Moderate') tableValue = 43;
    if (selectedMetabolism === 'Fast') tableValue = 70;
  }

  const totalEnergy = weight * tableValue;
  const proteinsTarget = weight * 2;
  const fatsTarget = weight * 1;

  return {
    weight: weight,
    targetCalories: totalEnergy,
    targetProteins: proteinsTarget,
    targetFats: fatsTarget,
    targetCarbs: (totalEnergy - proteinsTarget * 4 - fatsTarget * 9) / 4,
    targetFibres: null,
  };
};

export const getPerDay = (meals: Meal[], nutriVal: string) => {
  return (
    (meals
      .map(meal => {
        return meal.foodList
          ? meal.foodList.reduce((sum, current) => sum + current[nutriVal], 0)
          : 0;
      })
      .reduce((a, b) => a + b, 0) *
      100) /
    meals
      .map(meal => {
        return meal.foodList
          ? meal.foodList.reduce(
              (sum, current) =>
                sum + current.proteins + current.carbs + current.fats,
              0,
            )
          : 0;
      })
      .reduce((a, b) => a + b, 0)
  );
};
