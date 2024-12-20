import React from 'react';
import { Canvas } from '@react-three/fiber';
import { softShadows } from '@react-three/drei';
import { Mahjong } from 'src/components/containers/Mahjong';
import styles from './Mahjong.module.css';
import { useAsset } from 'src/contexts/AssetContext';
import { LoadingScreen } from '../Loading/Loading';

softShadows({
  frustum: 4.75,
  size: 0.001,
  near: 60.5,
  samples: 17,
  rings: 11,
});

export const MahjongScreen: React.FC = () => {
  const { available } = useAsset();
  const scale = 2;
  return available ? (
    <div className={styles.canvas}>
      <Canvas
        shadows
        dpr={window.devicePixelRatio < 2 ? 2 : window.devicePixelRatio}
        gl={{
          alpha: true,
          antialias: true,
        }}
        camera={{
          // fov: 24,
          // position: [0 * scale, 29.5 * scale, 22.5 * scale],
          // fov: 23,
          // position: [0 * scale, 31.5 * scale, 24.5 * scale],
          // fov: 21,
          // position: [0 * scale, 31.5 * scale, 26.5 * scale],
          // fov: 20,
          // position: [0 * scale, 33.5 * scale, 28.5 * scale],
          fov: 20,
          position: [0 * scale, 33 * scale, 28 * scale],
        }}
      >
        <group scale={scale}>
          <group position={[0, 1.5, 0]}>
            <Mahjong />
          </group>
        </group>
      </Canvas>
    </div>
  ) : (
    <LoadingScreen />
  );
};
