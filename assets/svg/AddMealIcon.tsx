import * as React from 'react';
import {SvgNavIconProps} from './props';
import Svg, {Line, Path, Rect} from 'react-native-svg';
import {View} from 'react-native';

const AddMealIcon: React.FC<SvgNavIconProps> = ({color, size}) => (
  <Svg width={size} height={size} viewBox="0 0 55 55 " fill={color || 'white'}>
    <Rect width={size} height={size} rx={size} fill="#5CA08E" />
    <Line
      x1={size / 2}
      y1="13"
      x2={size / 2}
      y2={size - 13}
      stroke={color || 'white'}
      strokeWidth={4}
    />
    <Line
      x1="13"
      y1={size / 2}
      x2={size - 13}
      y2={size / 2}
      stroke={color || 'white'}
      strokeWidth={4}
    />
  </Svg>
);
export default AddMealIcon;
