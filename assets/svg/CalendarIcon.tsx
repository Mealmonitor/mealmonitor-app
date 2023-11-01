import * as React from 'react';
import {SvgNavIconProps} from './props';
import Svg, {Circle, G, Path} from 'react-native-svg';
import {View} from 'react-native';

const CalendarIcon: React.FC<SvgNavIconProps> = ({color, size}) => (
  <Svg fill="#ffffff" width={size} height={size} viewBox="0 0 612 612">
    <G id="SVGRepo_bgCarrier" stroke-width="0" />

    <G
      id="SVGRepo_tracerCarrier"
      stroke-linecap="round"
      stroke-linejoin="round"
    />

    <G id="SVGRepo_iconCarrier">
      <G>
        <G>
          <Path d="M153,114.75h1.592c15.845,0,28.688-12.842,28.688-28.688V76.5V28.688C183.28,12.842,170.437,0,154.592,0H153 c-15.845,0-28.688,12.842-28.688,28.688V76.5v9.562C124.312,101.908,137.155,114.75,153,114.75z" />
          <Path d="M449.438,114.75h1.592c15.846,0,28.688-12.842,28.688-28.688V76.5V28.688C479.717,12.842,466.875,0,451.029,0h-1.592 c-15.845,0-28.688,12.842-28.688,28.688V76.5v9.562C420.75,101.908,433.593,114.75,449.438,114.75z" />
          <Path d="M535.5,76.5h-27.096v9.562c0,31.638-25.737,57.375-57.375,57.375h-1.592c-31.638,0-57.375-25.737-57.375-57.375V76.5 H211.967v9.562c0,31.638-25.738,57.375-57.375,57.375H153c-31.638,0-57.375-25.737-57.375-57.375V76.5H76.5 C34.253,76.5,0,110.753,0,153v382.5C0,577.747,34.253,612,76.5,612h459c42.247,0,76.5-34.253,76.5-76.5V153 C612,110.753,577.747,76.5,535.5,76.5z M573.75,535.5c0,21.104-17.146,38.25-38.25,38.25h-459c-21.085,0-38.25-17.146-38.25-38.25 v-306h535.5V535.5z" />
          <Circle cx="153" cy="325.125" r="47.019" />
          <Circle cx="306" cy="325.125" r="47.019" />
          <Circle cx="459" cy="325.125" r="47.019" />
          <Circle cx="153" cy="478.125" r="47.019" />
          <Circle cx="306" cy="478.125" r="47.019" />
          <Circle cx="459" cy="478.125" r="47.019" />
        </G>
      </G>
    </G>
  </Svg>
);
export default CalendarIcon;