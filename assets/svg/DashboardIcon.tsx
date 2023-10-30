import * as React from 'react';
import {SvgNavIconProps} from './props';
import Svg, {Path} from 'react-native-svg';
import {View} from 'react-native';

const DashboardIcon: React.FC<SvgNavIconProps> = ({color, size}) => (
  <Svg width={size} height={size} viewBox="0 0 31 31" fill={color || 'white'}>
    <Path
      fill={color || 'white'}
      stroke={'white'}
      strokeWidth={0.3}
      d="M27.844 3.005c0 .658-.536 1.194-1.194 1.194H8.148a1.196 1.196 0 0 1-1.195-1.194c0-.659.536-1.195 1.195-1.195h18.507c.66.006 1.19.537 1.19 1.195ZM8.148 8.475h18.507a1.2 1.2 0 0 1 1.195 1.196c0 .658-.536 1.194-1.195 1.194H8.148A1.196 1.196 0 0 1 6.953 9.67c0-.658.536-1.195 1.195-1.195Zm0 6.666h18.507a1.2 1.2 0 0 1 1.195 1.195c0 .658-.536 1.194-1.195 1.194H8.148a1.196 1.196 0 0 1-1.195-1.195c0-.658.536-1.194 1.195-1.194Zm0 6.665h18.507a1.2 1.2 0 0 1 1.195 1.195c0 .658-.536 1.194-1.195 1.194H8.148a1.196 1.196 0 0 1-1.195-1.194c0-.659.536-1.195 1.195-1.195ZM.15 3.005C.15 1.852 1.083.92 2.235.92a2.089 2.089 0 0 1 0 4.176A2.089 2.089 0 0 1 .15 3.005Zm0 6.665c0-1.153.933-2.085 2.085-2.085 1.153 0 2.085.932 2.085 2.085a2.084 2.084 0 0 1-2.085 2.085A2.084 2.084 0 0 1 .15 9.67Zm0 6.665a2.084 2.084 0 1 1 4.17 0 2.084 2.084 0 0 1-2.085 2.085A2.084 2.084 0 0 1 .15 16.335Zm0 6.66a2.084 2.084 0 1 1 4.17 0 2.084 2.084 0 0 1-2.085 2.085A2.084 2.084 0 0 1 .15 22.995Z"
    />
  </Svg>
);
export default DashboardIcon;
