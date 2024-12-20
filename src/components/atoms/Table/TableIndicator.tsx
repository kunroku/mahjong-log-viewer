import React, { useState } from 'react';
import { Text } from '@react-three/drei';
import KaitiRegular from 'src/assets/font/simkai.ttf';
import { PaiSize } from '../Pai';
import { MahjongStateConsumerProps } from 'src/features/mahjong/mahjong.slice';
import { MjaiEvents } from 'src/utils/mjai';

export const TableIndicator: React.FC<MahjongStateConsumerProps> = (props) => {
  const { player, kyoku, scores, events } = props.mahjong;
  const [scoreDiff, setScoreDiff] = useState(false);
  const kyokuIndicator = `${
    kyoku.bakaze === 'E'
      ? '東'
      : kyoku.bakaze === 'S'
      ? '南'
      : kyoku.bakaze === 'W'
      ? '西'
      : kyoku.bakaze === 'N'
      ? '北'
      : ''
  }${['', '一', '二', '三', '四'][kyoku.kyoku]}`;
  const latestPlayerEvent = [...events]
    .reverse()
    .find(
      (e) =>
        e.type === 'ankan' ||
        e.type === 'chi' ||
        e.type === 'dahai' ||
        e.type === 'daiminkan' ||
        e.type === 'kakan' ||
        e.type === 'pon' ||
        e.type === 'reach' ||
        e.type === 'tsumo',
    ) as MjaiEvents & { actor: number };
  // const latestPlayerEvent = [...events]
  //   .reverse()
  //   .find((e) => Object.keys(e).includes('actor'));
  const kiriban = latestPlayerEvent ? latestPlayerEvent.actor : -1;
  return (
    <group>
      <group position={[0, -0.32, 0]}>
        <mesh
          onClick={(e) => {
            e.stopPropagation();
            setScoreDiff(!scoreDiff);
          }}
        >
          <boxGeometry args={[PaiSize.x * 6, 0.7, PaiSize.x * 6]} />
          <meshStandardMaterial color={0x3f3f3f} />
        </mesh>
      </group>
      <group position={[0, 0.08, 0]}>
        <group rotation={[-Math.PI / 2, 0, 0]}>
          <group rotation={[0, 0, (player * Math.PI) / 2]}>
            <Text
              lineHeight={0.1}
              letterSpacing={0}
              position={[0, 0, 0.05]}
              color={0xffffff}
              font={KaitiRegular}
              fontSize={0.8}
              characters={'東南西北一二三四局'}
            >
              {kyokuIndicator && `${kyokuIndicator}局`}
            </Text>
          </group>
          {scores
            .map((score) => (scoreDiff ? scores[player] - score : score))
            .map((score) =>
              scoreDiff
                ? 0 === score
                  ? `±0`
                  : 0 <= score
                  ? `+${score}`
                  : `${score}`
                : `${score}`,
            )
            .map((score, i) => (
              <group
                key={`indicator-score-${i}`}
                rotation={[0, 0, (i * Math.PI) / 2]}
              >
                <Text
                  lineHeight={0.1}
                  letterSpacing={0}
                  position={[0, -1.6, 0.05]}
                  color={scoreDiff ? 0xff00d7 : 0xffd700}
                  fontSize={0.6}
                >
                  {score}
                </Text>
              </group>
            ))}
          {[0, 1, 2, 3].map((actor) => (
            <group
              key={`wind-${actor}`}
              rotation={[0, 0, ((4 + actor - kyoku.kyoku) * Math.PI) / 2]}
            >
              <Text
                lineHeight={0.1}
                letterSpacing={0}
                position={[-1.6, -1.6, 0.05]}
                color={
                  kiriban === (4 + actor - kyoku.kyoku) % 4
                    ? 0x4444ff
                    : 0xffffff
                }
                font={KaitiRegular}
                fontSize={0.7}
                characters="東南西北"
              >
                {['東', '南', '西', '北'][(4 + actor - kyoku.kyoku) % 4]}
              </Text>
              {/* <Text
                lineHeight={0.1}
                letterSpacing={0}
                position={[-1.6, -1.6, 0.04]}
                color={
                  kiriban === (4 + actor - kyoku.kyoku) % 4
                    ? 0xffffff
                    : 0xffffff
                }
                font={KaitiRegular}
                fontSize={0.8}
                characters="東南西北"
              >
                {['東', '南', '西', '北'][(4 + actor - kyoku.kyoku) % 4]}
              </Text> */}
            </group>
          ))}
        </group>
      </group>
    </group>
  );
};
