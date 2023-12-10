import React from 'react';
import {StackedBarChart} from 'react-native-svg-charts';
import * as shape from 'd3-shape';
import {StyleSheet} from 'react-native';
import {Food} from '../../../app/api/domain';

const colors = ['#ADD8F0', '#FEEA7F', '#FF9D9F'];
const keys = ['proteins', 'carbs', 'fats'];

type Props = {
  data: Food[];
};

const StackedBarChartComponent: React.FC<Props> = ({data}) => {
  // Aggregate the values for each key
  const aggregatedData = data.reduce(
    (acc, item) => ({
      proteins: acc.proteins + item.proteins,
      carbs: acc.carbs + item.carbs,
      fats: acc.fats + item.fats,
    }),
    {
      proteins: 0,
      carbs: 0,
      fats: 0,
    },
  );

  // Normalize aggregated data
  const total = keys.reduce((acc, key) => acc + aggregatedData[key], 0);
  const normalizedData = [
    {
      ...keys.reduce(
        (acc, key) => ({
          ...acc,
          [key]: (aggregatedData[key] / total) * 100,
        }),
        {},
      ),
    },
  ];

  return (
    <StackedBarChart
      style={style.container}
      keys={keys}
      colors={colors}
      data={normalizedData}
      showGrid={false}
      contentInset={{top: 30, bottom: 30}}
      horizontal={true}
      valueAccessor={({item, key}) => item[key]}
      spacingInner={0.2}
    />
  );
};

const style = StyleSheet.create({
  container: {
    height: 100,
    marginHorizontal: 20,
  },
});

export default StackedBarChartComponent;
