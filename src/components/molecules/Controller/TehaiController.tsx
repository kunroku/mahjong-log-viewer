import React from 'react';
import {
  tehaiControllerPaiTransition,
  tehaiControllerTsumoPaiTransition,
  nakiTransition,
  PaiTransition,
} from 'src/utils/pai-transition';
import { ConfigStateConsumerProps } from 'src/features/config/config.slice';
import { MahjongStateConsumerProps } from 'src/features/mahjong/mahjong.slice';
import { Pai } from 'src/components/atoms/Pai';

export type TehaiControllerProps = MahjongStateConsumerProps &
  ConfigStateConsumerProps;

export const TehaiController: React.FC<TehaiControllerProps> = (props) => {
  const { mahjong } = props;
  const tehai = mahjong.tehais[mahjong.player];
  return (
    <group>
      <mesh position={[0, 0.8, 9.52]} rotation={[-Math.PI * 0.26, 0, 0]}>
        <planeGeometry args={[20.7, 2.7]} />
        <meshBasicMaterial transparent opacity={1} color={0x550000} />
      </mesh>
      <group
        position={[0, 1.16, 0]}
        rotation={[0, (-Math.PI / 2) * mahjong.player, 0]}
      >
        <group scale={1.16} position={[0, 0.25, 0]}>
          <group position={[0, 0, 0]}>
            <group position={[0, 0, 0]}>
              {tehai.pai
                .map((pai, i) => {
                  const transition = tehaiControllerPaiTransition(
                    mahjong.player,
                    i,
                    true,
                  );
                  return { pai, transition };
                })
                .map(
                  ({ pai, transition }, i) =>
                    pai && (
                      <Pai
                        key={`tehai-menzen-pai-${i}`}
                        pai={pai}
                        castShadow
                        position={transition.position}
                        rotation={transition.rotation}
                      />
                    ),
                )}
              {tehai.tsumo &&
                (({ position, rotation }) => (
                  <Pai
                    pai={tehai.tsumo}
                    castShadow
                    position={position}
                    rotation={rotation}
                  />
                ))(
                  tehaiControllerTsumoPaiTransition(
                    mahjong.player,
                    tehai.pai.length,
                    true,
                  ),
                )}
            </group>
            <group position={[0, 0, 0]}>
              <group
                position={
                  [
                    [1.2, 5.8, 3.23],
                    [3.23, 5.8, -1.2],
                    [-1.2, 5.8, -3.23],
                    [-3.23, 5.5, 1.2],
                  ][mahjong.player] as PaiTransition['position']
                }
                rotation={
                  [
                    [Math.PI * 0.25, 0, 0],
                    [0, 0, -Math.PI * 0.25],
                    [-Math.PI * 0.25, 0, 0],
                    [0, 0, Math.PI * 0.25],
                  ][mahjong.player] as PaiTransition['rotation']
                }
              >
                <group scale={0.9} position={[0, 0, 0]}>
                  {tehai.naki.map((naki, i) => (
                    <group key={`tehai-naki-item-${i}`}>
                      {naki.type === 'ankan'
                        ? [...naki.consumed]
                        : [naki.pai, ...naki.consumed]
                            .map((pai, j) => {
                              const transition = nakiTransition(
                                mahjong.player,
                                tehai.naki,
                                i,
                                j,
                              );
                              return { pai, transition };
                            })
                            .map(({ pai, transition }, j) => (
                              <Pai
                                key={`naki-pai-${i}-${j}`}
                                pai={pai}
                                castShadow
                                position={transition.position}
                                rotation={transition.rotation}
                              />
                            ))}
                    </group>
                  ))}
                </group>
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  );
};
