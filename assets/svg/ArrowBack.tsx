import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { SvgNavIconProps } from "./props";
const ArrowBack: React.FC<SvgNavIconProps> = ({ color }) => (
  <Svg width={20} height={18} viewBox="0 0 20 18" fill="none">
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0.833328 8.99996C0.833328 8.53972 1.20642 8.16663 1.66666 8.16663H18.3333C18.7936 8.16663 19.1667 8.53972 19.1667 8.99996C19.1667 9.4602 18.7936 9.83329 18.3333 9.83329H1.66666C1.20642 9.83329 0.833328 9.4602 0.833328 8.99996Z"
      fill={color || "white"}
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M9.75592 0.910704C10.0814 1.23614 10.0814 1.76378 9.75592 2.08922L2.84517 8.99996L9.75592 15.9107C10.0814 16.2361 10.0814 16.7638 9.75592 17.0892C9.43048 17.4147 8.90284 17.4147 8.57741 17.0892L1.07741 9.58922C0.751969 9.26378 0.751969 8.73614 1.07741 8.4107L8.57741 0.910704C8.90284 0.585267 9.43048 0.585267 9.75592 0.910704Z"
      fill={color || "white"}
    />
  </Svg>
);
export default ArrowBack;
