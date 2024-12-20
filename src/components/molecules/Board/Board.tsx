import React, { useState, useEffect } from 'react';
import {
  kawaPaiTransition,
  tehaiPaiTransition,
  tehaiTsumoPaiTransition,
  tehaiControllerPaiTransition,
  tehaiControllerTsumoPaiTransition,
  tsumoyamaPaiTransition,
  wangpaiPaiTransition,
  nakiTransition,
  PaiTransition,
} from 'src/utils/pai-transition';
import { ConfigStateConsumerProps } from 'src/features/config/config.slice';
import {
  GAME_MODE,
  MahjongStateConsumerProps,
} from 'src/features/mahjong/mahjong.slice';
import { Pai } from 'src/components/atoms/Pai';
import { serialize } from 'src/utils/serialize';
import { SelectTrigger } from 'src/features/config/config.api';

export type BoardProps = MahjongStateConsumerProps & ConfigStateConsumerProps;

export const Board: React.FC<BoardProps> = (props) => {
  const [beforeProps, setBeforeProps] = useState(serialize(props));
  const [currentProps, setCurrentProps] = useState(serialize(props));
  useEffect(() => {
    if (JSON.stringify(currentProps) !== JSON.stringify(props)) {
      if (
        JSON.stringify(currentProps.mahjong) !== JSON.stringify(props.mahjong)
      ) {
      }
      setBeforeProps(currentProps);
      setCurrentProps(props);
    }
  }, [currentProps, props]);
  const { mahjong, config } = currentProps;
  const doraCount = mahjong.events.filter((e) => e.type === 'dora').length + 1;
  const agariPlayers = mahjong.events
    .map((e) => (e.type === 'hora' ? e.actor : -1))
    .filter((actor) => actor !== -1);
  const latestEvent = mahjong.events[mahjong.events.length - 1];
  const pendingKawa =
    !!latestEvent && latestEvent.type === 'dahai' ? latestEvent.actor : -1;
  return (
    <group
      name="board"
      position={[0, 0.002, 0]}
      rotation={[0, (-Math.PI * mahjong.player) / 2, 0]}
    >
      <group name="yama">
        {mahjong.yama.tsumoyama
          .map((pai, i) => {
            const transition = tsumoyamaPaiTransition(
              i,
              mahjong.mode === GAME_MODE.LOG && config.yamaOpen,
            );
            return { pai, transition };
          })
          .map(({ pai, transition }, i) => (
            <Pai
              key={`tsumoyama-pai-${i}`}
              pai={pai}
              castShadow
              position={transition.position}
              rotation={transition.rotation}
            />
          ))}
        {mahjong.yama.wanpai
          .map((pai, i) => {
            const transition = wangpaiPaiTransition(
              i,
              mahjong.mode === GAME_MODE.LOG && config.yamaOpen,
              doraCount,
            );
            return { pai, transition };
          })
          .map(({ pai, transition }, i) => (
            <Pai
              key={`wanpai-pai-${i}`}
              pai={pai}
              castShadow
              position={transition.position}
              rotation={transition.rotation}
            />
          ))}
      </group>
      <group name="tehai-menzen">
        {mahjong.tehais.map((tehai, actor) => (
          <group key={`tehai-${actor}`}>
            <group key="menzen">
              {tehai.pai
                .map((pai, i) => {
                  if (
                    mahjong.player === actor &&
                    config.selectTrigger === SelectTrigger.click &&
                    mahjong.mode === GAME_MODE.MATCH
                  ) {
                    return {
                      pai: null,
                      transition: {
                        position: [0, 0, 0],
                        rotation: [0, 0, 0],
                      } as PaiTransition,
                      beforeTransition: {
                        position: [0, 0, 0],
                        rotation: [0, 0, 0],
                      } as PaiTransition,
                    };
                  }
                  const transition =
                    mahjong.player === actor
                      ? tehaiControllerPaiTransition(actor, i, false)
                      : tehaiPaiTransition(
                          actor,
                          i,
                          config.tehaiOpen || agariPlayers.includes(actor),
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
            </group>
            <group key="tsumo">
              {mahjong.player === actor &&
              config.selectTrigger === SelectTrigger.click &&
              mahjong.mode === GAME_MODE.MATCH
                ? null
                : tehai.tsumo &&
                  (({ position, rotation }) => (
                    <Pai
                      pai={tehai.tsumo}
                      castShadow
                      position={position}
                      rotation={rotation}
                    />
                  ))(
                    mahjong.player === actor
                      ? tehaiControllerTsumoPaiTransition(
                          actor,
                          tehai.pai.length,
                          false,
                        )
                      : tehaiTsumoPaiTransition(
                          actor,
                          tehai.pai.length,
                          config.tehaiOpen || agariPlayers.includes(actor),
                        ),
                  )}
            </group>
          </group>
        ))}
      </group>
      <group name="tehai-naki">
        {mahjong.tehais.map((tehai, actor) => (
          <group key={`tehai-naki-${actor}`}>
            {tehai.naki.map((naki, i) => (
              <group key={`tehai-naki-item-${i}`}>
                {naki.type === 'ankan'
                  ? [...naki.consumed]
                  : [naki.pai, ...naki.consumed]
                      .map((pai, j) => {
                        if (
                          mahjong.player === actor &&
                          config.selectTrigger === SelectTrigger.click &&
                          mahjong.mode === GAME_MODE.MATCH
                        ) {
                          return {
                            pai: null,
                            transition: {
                              position: [0, 0, 0],
                              rotation: [0, 0, 0],
                            } as PaiTransition,
                            beforeTransition: {
                              position: [0, 0, 0],
                              rotation: [0, 0, 0],
                            } as PaiTransition,
                          };
                        }
                        const transition = nakiTransition(
                          actor,
                          tehai.naki,
                          i,
                          j,
                        );
                        return { pai, transition };
                      })
                      .map(
                        ({ pai, transition }, j) =>
                          pai && (
                            <Pai
                              key={`naki-pai-${i}-${j}`}
                              pai={pai}
                              castShadow
                              position={transition.position}
                              rotation={transition.rotation}
                            />
                          ),
                      )}
              </group>
            ))}
          </group>
        ))}
      </group>
      <group name="kawa">
        {mahjong.kawas.map((kawa, actor) => (
          <group key={`kawa-${actor}`}>
            {kawa.pai
              .map((pai, i) => {
                const secondLatestEvent =
                  beforeProps.mahjong.events[mahjong.events.length - 1];
                const pendingKawabefore =
                  !!secondLatestEvent && secondLatestEvent.type === 'dahai'
                    ? secondLatestEvent.actor
                    : -1;
                if (pendingKawa === actor && kawa.pai.length - 1 === i) {
                  const tsumogiri = mahjong.tehais[actor].tsumo === null;
                  const index = tsumogiri
                    ? -1
                    : mahjong.tehais[actor].pai.findIndex((e) => e === null);
                  const beforeTransition = tsumogiri
                    ? mahjong.player === actor
                      ? tehaiControllerTsumoPaiTransition(
                          actor,
                          beforeProps.mahjong.tehais[actor].pai.length,
                          config.selectTrigger === SelectTrigger.click &&
                            mahjong.mode === GAME_MODE.MATCH,
                        )
                      : tehaiTsumoPaiTransition(
                          actor,
                          beforeProps.mahjong.tehais[actor].pai.length,
                          true,
                        )
                    : mahjong.player === actor
                    ? tehaiControllerPaiTransition(
                        actor,
                        index,
                        config.selectTrigger === SelectTrigger.click &&
                          mahjong.mode === GAME_MODE.MATCH,
                      )
                    : tehaiPaiTransition(actor, index, true);
                  const transition = kawaPaiTransition(
                    actor,
                    i,
                    kawa.reach,
                    true,
                  );
                  return { pai, transition, beforeTransition };
                } else if (
                  pendingKawabefore === actor &&
                  kawa.pai.length - 1 === i
                ) {
                  const beforeTransition = kawaPaiTransition(
                    actor,
                    i,
                    kawa.reach,
                    true,
                  );
                  const transition = kawaPaiTransition(
                    actor,
                    i,
                    kawa.reach,
                    false,
                  );
                  return { pai, transition, beforeTransition };
                } else {
                  const transition = kawaPaiTransition(
                    actor,
                    i,
                    kawa.reach,
                    false,
                  );
                  return {
                    pai,
                    transition,
                    beforeTransition: transition,
                  };
                }
              })
              .map(({ pai, transition, beforeTransition }, i) => (
                <Pai
                  key={`kawa-pai-${i}`}
                  pai={pai}
                  castShadow
                  color={kawa.tsumogiri.includes(i) ? 0xbbbbbb : 0x000000}
                  transparent={kawa.nakare.includes(i)}
                  position={transition.position}
                  rotation={transition.rotation}
                  positionBefore={beforeTransition.position}
                  rotationBefore={beforeTransition.rotation}
                />
              ))}
          </group>
        ))}
      </group>
    </group>
  );
};
