import { css } from 'styled-components';
import RobotoBoldWoff2 from "./fonts/Roboto-Bold.woff2"
import RobotoMediumWoff2 from "./fonts/Roboto-Medium.woff2"
import RobotoRegularWoff2 from "./fonts/Roboto-Regular.woff2"

export default css`
@font-face {
  font-family: "Roboto";
  font-style: normal;
  font-weight: 700;
  font-display: swap;
  src: url(${RobotoBoldWoff2}) format("woff2");
}
@font-face {
  font-family: "Roboto";
  font-style: normal;
  font-weight: 500;
  font-display: swap;
  src: url(${RobotoMediumWoff2}) format("woff2");
}
@font-face {
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url(${RobotoRegularWoff2}) format("woff2");
}
`