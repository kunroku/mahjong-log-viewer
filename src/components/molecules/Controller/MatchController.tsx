import React from 'react';
import { Text } from '@react-three/drei';
import SawarabiMincho from 'src/assets/font/sawarabi-mincho-medium.otf';

export const MatchController: React.FC = () => {
  return (
    <group name={`match-controller`}>
      <Text
        color={0x24acf2}
        maxWidth={10}
        lineHeight={1}
        letterSpacing={0.02}
        font={SawarabiMincho}
        fontSize={0.3}
        anchorX="center"
        anchorY="middle"
        position={[6.2, 2, 0.2]}
      >
        {'自動和了'}
      </Text>
      <mesh
        position={[6.2, 2, 0]}
        onClick={() => {
          alert('自動和了ボタンをクリック');
        }}
      >
        <planeGeometry args={[1.3, 0.4]} />
        <meshBasicMaterial transparent opacity={0.7} color={0x227777} />
      </mesh>
      <Text
        color={0x24acf2}
        maxWidth={10}
        lineHeight={1}
        letterSpacing={0.02}
        font={SawarabiMincho}
        fontSize={0.3}
        anchorX="center"
        anchorY="middle"
        position={[6.2, 2.5, 0.2]}
      >
        {'鳴きナシ'}
      </Text>
      <mesh
        position={[6.2, 2.5, 0]}
        onClick={() => {
          alert('鳴きON/OFFボタンをクリック');
        }}
      >
        <planeGeometry args={[1.3, 0.4]} />
        <meshBasicMaterial transparent opacity={0.7} color={0x772277} />
      </mesh>
    </group>
  );
};
