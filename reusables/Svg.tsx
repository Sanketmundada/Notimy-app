import React from 'react';
import { SvgXml } from 'react-native-svg';

const Svg: React.FC<{ svg: string; height?: number; width?: number }> = ({
  svg,
  height = 150,
  width = 150,
}) => {
  return <SvgXml xml={svg} height={height} width={width} />;
};

export default Svg;
