import React from 'react';
import { useAppDispatch } from 'src/app/hooks';
import { select } from 'src/features/attention/attention.slice';

export const BlankController: React.FC = () => {
  const scale = 6.5;
  const dispatch = useAppDispatch();
  return (
    <group name={`blank-controller`}>
      <mesh
        position={[2, 1.2, -30]}
        onPointerOver={(e) => {
          e.stopPropagation();
          dispatch(select(undefined));
        }}
      >
        <planeGeometry args={[5 * scale, 3 * scale]} />
        <meshBasicMaterial transparent opacity={1} color={0x111111} />
      </mesh>
    </group>
  );
};
