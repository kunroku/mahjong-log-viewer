import React from 'react';
// import { OrbitControls } from '@react-three/drei';
import { softShadows } from '@react-three/drei';
import { Controller } from 'src/components/molecules/Controller';
import { useAppSelector } from 'src/app/hooks';
import { GAME_MODE, selectMahjong } from 'src/features/mahjong/mahjong.slice';
import { selectConfig } from 'src/features/config/config.slice';
import { Table } from 'src/components/atoms/Table';
import { Board } from 'src/components/molecules/Board';
import { TehaiController } from 'src/components/molecules/Controller/TehaiController';
import { SelectTrigger } from 'src/features/config/config.api';

softShadows({
  frustum: 4.75,
  size: 0.001,
  near: 60.5,
  samples: 17,
  rings: 11,
});

export const Mahjong: React.FC = () => {
  const mahjong = useAppSelector(selectMahjong);
  const config = useAppSelector(selectConfig);
  return (
    <group>
      <ambientLight intensity={0.1} color={0xffffdd} />
      <pointLight
        // castShadow
        // shadow-mapSize-width={2 ** 11}
        // shadow-mapSize-height={2 ** 11}
        intensity={0.6}
        color={0xffffff}
        position={[0, 42, 15]}
        rotation={[0, Math.PI * 0.5 * mahjong.player, 0]}
      />
      <group position={[0, 0, 0]}>
        <group rotation={[0, (-Math.PI * mahjong.player) / 2, 0]}>
          <Table mahjong={mahjong} />
        </group>
        {/* <OrbitControls /> */}
        <Board mahjong={mahjong} config={config} />
      </group>
      <group scale={4} position={[0, 10, 11.52]} rotation={[-0.862, 0, 0]}>
        <Controller mahjong={mahjong} config={config} />
      </group>
      {config.selectTrigger === SelectTrigger.click &&
        mahjong.mode === GAME_MODE.MATCH && (
          <TehaiController mahjong={mahjong} config={config} />
        )}
    </group>
  );
};
