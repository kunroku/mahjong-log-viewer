import React from 'react';
import { useTexture } from '@react-three/drei';
import BumpMapTable from 'src/assets/svg/table.bump.svg';
import { useAppSelector } from 'src/app/hooks';
import { selectColor } from 'src/features/color/color.slice';

export const TableRaxaMesh: React.FC = () => {
  const [bumpMap] = useTexture([BumpMapTable]);
  const color = useAppSelector(selectColor);
  return (
    <group>
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[18, 18]} />
        <meshLambertMaterial color={color.tableRaxa} bumpMap={bumpMap} />
      </mesh>
    </group>
  );
};

useTexture.preload(BumpMapTable);
