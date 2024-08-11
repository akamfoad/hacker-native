import * as React from "react";
import Svg, { SvgProps, Rect, Path } from "react-native-svg";

export const Logo = (props: SvgProps) => (
  <Svg fill="none" viewBox="0 0 100 100" {...props}>
    <Rect width={100} height={100} fill="#fff" rx={4} />
    <Path
      fill="#F60"
      d="M27.8409 24.1364h7.2614L49.625 48.5795h.6136l14.5228-24.4431h7.2613L53.1023 54.9205V76.5h-6.3409V54.9205L27.8409 24.1364Z"
    />
  </Svg>
);
