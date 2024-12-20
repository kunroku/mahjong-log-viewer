import React, { useState } from 'react';
import { TableRaxaMesh } from './TableRaxa';
import { TableIndicator } from './TableIndicator';
import { MahjongStateConsumerProps } from 'src/features/mahjong/mahjong.slice';
import { useAppSelector } from 'src/app/hooks';
import { selectColor } from 'src/features/color/color.slice';
import { assets } from 'src/contexts/AssetContext';

export const Table: React.FC<MahjongStateConsumerProps> = (props) => {
  const { tableFrame } = useAppSelector(selectColor);
  const [geometry] = useState(assets.geometry['table']);
  const [material] = useState(assets.material['table']);
  return (
    <group>
      <TableRaxaMesh />
      <group position={[0, -0.3, 0]}>
        <mesh
          geometry={geometry}
          material={material}
          material-color={tableFrame}
        />
      </group>
      <group position={[0, 0, 0]}>
        <TableIndicator {...props} />
      </group>
    </group>
  );
};
