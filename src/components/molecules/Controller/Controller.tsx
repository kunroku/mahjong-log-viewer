import React from 'react';
import { MatchController } from './MatchController';
import { LogController } from './LogController';
import { WatchController } from './WatchController';
import { DebugController } from './DebugController';
import { BlankController } from './BlankController';
import { useAppDispatch } from 'src/app/hooks';
import {
  GAME_MODE,
  changeMode,
  MahjongStateConsumerProps,
} from 'src/features/mahjong/mahjong.slice';
import { ConfigStateConsumerProps } from 'src/features/config/config.slice';

export type ControllerProps = MahjongStateConsumerProps &
  ConfigStateConsumerProps;

export const Controller: React.FC<ControllerProps> = (props) => {
  const { mahjong } = props;
  const dispatch = useAppDispatch();
  const { mode } = mahjong;
  return (
    <group>
      <group scale={0.275}>
        <BlankController />
        <group position={[0, 0, 0]}>
          {mode === GAME_MODE.MATCH && <MatchController />}
          {mode === GAME_MODE.LOG && <LogController {...props} />}
          {mode === GAME_MODE.WATCH && <WatchController {...props} />}
        </group>
        <group position={[0, 0, 0]}>
          {/* debug */}
          <group>
            <DebugController
              changeMode={() => dispatch(changeMode((mode + 1) % 3))}
            />
          </group>
        </group>
      </group>
    </group>
  );
};
