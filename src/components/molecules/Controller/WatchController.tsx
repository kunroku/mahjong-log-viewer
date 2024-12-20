import React from 'react';
import { Text } from '@react-three/drei';
import SawarabiMincho from 'src/assets/font/sawarabi-mincho-medium.otf';
import { useAppDispatch } from 'src/app/hooks';
import {
  MahjongStateConsumerProps,
  changePlayer,
} from 'src/features/mahjong/mahjong.slice';
import {
  ConfigStateConsumerProps,
  update as updateConfig,
} from 'src/features/config/config.slice';

export type WatchControllerProps = MahjongStateConsumerProps &
  ConfigStateConsumerProps;

export const WatchController: React.FC<WatchControllerProps> = (props) => {
  const { mahjong, config } = props;
  const dispatch = useAppDispatch();
  const changeViewFrom = (player: number) => {
    dispatch(changePlayer(player));
  };
  const changeTehaiOpen = (tehaiOpen: boolean) => {
    dispatch(updateConfig({ tehaiOpen: tehaiOpen }));
  };

  return (
    <group name={`watch-controller`}>
      <group position={[0, -2.98, 0]}>
        {/* 視点移動 */}
        <Text
          color={0xbbbbbb}
          maxWidth={10}
          lineHeight={1}
          letterSpacing={0.02}
          font={SawarabiMincho}
          fontSize={0.3}
          characters={'上家'}
          anchorX="center"
          anchorY="middle"
          position={[-4.2, 0, 0]}
        >
          {'上家'}
        </Text>
        <mesh
          position={[-4.2, 0, -0.01]}
          onClick={(e) => {
            e.stopPropagation();
            changeViewFrom((mahjong.player + 3) % 4);
          }}
        >
          <planeGeometry args={[1.3, 0.35]} />
          <meshBasicMaterial transparent opacity={0.7} color={0x335533} />
        </mesh>
        <Text
          color={0xbbbbbb}
          maxWidth={10}
          lineHeight={1}
          letterSpacing={0.02}
          font={SawarabiMincho}
          fontSize={0.3}
          characters={'上家'}
          anchorX="center"
          anchorY="middle"
          position={[4.2, 0, 0]}
        >
          {'下家'}
        </Text>
        <mesh
          position={[4.2, 0, -0.01]}
          onClick={(e) => {
            e.stopPropagation();
            changeViewFrom((mahjong.player + 1) % 4);
          }}
        >
          <planeGeometry args={[1.3, 0.35]} />
          <meshBasicMaterial transparent opacity={0.7} color={0x335533} />
        </mesh>
        {/* 手牌公開 */}
        <Text
          color={0xbbbbbb}
          maxWidth={10}
          lineHeight={1}
          letterSpacing={0.02}
          font={SawarabiMincho}
          fontSize={0.3}
          characters={'手牌'}
          anchorX="center"
          anchorY="middle"
          position={[-2.8, 0, 0]}
        >
          {'手牌'}
        </Text>
        <mesh
          position={[-2.8, 0, -0.01]}
          onClick={(e) => {
            e.stopPropagation();
            changeTehaiOpen(!config.tehaiOpen);
          }}
        >
          <planeGeometry args={[1.3, 0.35]} />
          <meshBasicMaterial transparent opacity={0.7} color={0x335533} />
        </mesh>
      </group>
    </group>
  );
};