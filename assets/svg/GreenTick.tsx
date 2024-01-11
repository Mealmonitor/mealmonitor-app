import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { SvgNavIconProps } from "./props";
const GreenTick: React.FC<SvgNavIconProps> = ({ size }) => (
  <Svg width={size || 20} height={size || 19} viewBox="0 0 20 19" fill="none">
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M19.5499 0.164757C20.0112 0.468456 20.1389 1.0886 19.8352 1.54989L8.64288 18.5499C8.47133 18.8105 8.18801 18.976 7.87679 18.9976C7.56557 19.0192 7.26211 18.8943 7.05626 18.6598L0.248622 10.9079C-0.115807 10.4929 -0.074826 9.86105 0.340156 9.49662C0.755138 9.1322 1.38698 9.17318 1.7514 9.58816L7.69362 16.3547L18.1648 0.450093C18.4685 -0.0111931 19.0886 -0.138943 19.5499 0.164757Z"
      fill="#6ED59F"
    />
  </Svg>
);
export default GreenTick;
