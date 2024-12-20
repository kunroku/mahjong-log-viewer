import React, { useState } from 'react';
import { Text } from '@react-three/drei';
import SawarabiMincho from 'src/assets/font/sawarabi-mincho-medium.otf';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import { init, update } from 'src/features/mahjong/mahjong.slice';
import {
  selectConfig,
  update as updateConfig,
} from 'src/features/config/config.slice';
import { StartGameLog, MjaiEvents } from 'src/utils/mjai';
import demo from 'src/constants/demo_2.json';
import { serialize } from 'src/utils/serialize';

export type DebugControllerProps = {
  changeMode: () => void;
};

export const DebugController: React.FC<DebugControllerProps> = (props) => {
  const { changeMode } = props;
  const dispatch = useAppDispatch();
  const config = useAppSelector(selectConfig);
  const [timer, setTimer] = useState<NodeJS.Timer | null>(null);
  const activateDemo = () => {
    if (timer) {
      clearInterval(timer);
    }
    const log = serialize(demo.events);
    const startGameLog = log.shift();
    dispatch(init(startGameLog as StartGameLog));
    const newTimer = setInterval(() => {
      const event = log.shift();
      if (event) {
        dispatch(update(event as MjaiEvents));
      }
    }, 500);
    setTimer(newTimer);
  };
  return (
    <group name={`debug-controller`}>
      <Text
        color={0xfafafa}
        maxWidth={10}
        lineHeight={1}
        letterSpacing={0.02}
        font={SawarabiMincho}
        fontSize={0.3}
        anchorX="center"
        anchorY="middle"
        position={[-6.4, 4, 0.2]}
      >
        {'モード'}
      </Text>
      <Text
        color={0xfafafa}
        maxWidth={10}
        lineHeight={1}
        letterSpacing={0.02}
        font={SawarabiMincho}
        fontSize={0.3}
        anchorX="center"
        anchorY="middle"
        position={[-6.4, 3, 0.2]}
      >
        {'開局'}
      </Text>
      <Text
        color={0xfafafa}
        maxWidth={10}
        lineHeight={1}
        letterSpacing={0.02}
        font={SawarabiMincho}
        fontSize={0.3}
        anchorX="center"
        anchorY="middle"
        position={[-6.4, 2, 0.2]}
      >
        {'手牌位置'}
      </Text>
      <mesh position={[-6.4, 4, 0]} onClick={changeMode}>
        <planeGeometry args={[1.3, 0.4]} />
        <meshBasicMaterial transparent opacity={0.7} color={0x227777} />
      </mesh>
      <mesh position={[-6.4, 3, 0]} onClick={activateDemo}>
        <planeGeometry args={[1.3, 0.4]} />
        <meshBasicMaterial transparent opacity={0.7} color={0x772277} />
      </mesh>
      <mesh
        position={[-6.4, 2, 0]}
        onClick={() => {
          dispatch(
            updateConfig({
              selectTrigger: (config.selectTrigger + 1) % 2,
            }),
          );
        }}
      >
        <planeGeometry args={[1.3, 0.4]} />
        <meshBasicMaterial transparent opacity={0.7} color={0x772222} />
      </mesh>
    </group>
  );
};
