import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Group, Vector3 } from 'three';
import {
  GroupProps,
  MeshProps,
  ThreeEvent,
  useFrame,
} from '@react-three/fiber';
import { PaiName } from 'src/utils/mjai';
import { getUserAgentType, UserAgentType } from 'src/utils/user-agent';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import {
  selectAttention,
  select,
} from 'src/features/attention/attention.slice';
import { selectColor } from 'src/features/color/color.slice';
import { assets } from 'src/contexts/AssetContext';
import { nearlyEqual } from 'src/utils/nearly-equal';
import { PaiPosition, PaiRotation } from 'src/utils/pai-transition';

export const PaiSize = new Vector3(0.74, 1, 0.52);

const isMobile = getUserAgentType() === UserAgentType.MOBILE;

export type PaiBackMeshProps = MeshProps & {
  guuid?: string;
  castShadow?: boolean;
  transparent?: boolean;
};

export const PaiBackMesh: React.FC<PaiBackMeshProps> = (props) => {
  const {
    guuid,
    castShadow,
    transparent,
    onClick: onClickOrigin,
    ...meshProps
  } = props;
  const { paiBack } = useAppSelector(selectColor);
  const [geometry] = useState(assets.geometry['pai.back']);
  const [material] = useState(assets.material['pai.back'].clone());
  const attention = useAppSelector(selectAttention);
  const dispatch = useAppDispatch();
  const [isSelected, setSelected] = useState(guuid && attention.uuid === guuid);
  useEffect(() => {
    if (isSelected !== (guuid && attention.uuid === guuid)) {
      setSelected(guuid && attention.uuid === guuid);
    }
  }, [attention.uuid, guuid, isSelected]);
  const onClick = useCallback(
    (e: ThreeEvent<MouseEvent>) => {
      e.stopPropagation();
      if (isSelected) {
        dispatch(select(undefined));
        if (onClickOrigin) {
          onClickOrigin(e);
        }
      } else {
        dispatch(select(guuid));
      }
    },
    [dispatch, guuid, isSelected, onClickOrigin],
  );
  const onPointerOver = useCallback(
    (e: ThreeEvent<PointerEvent>) => {
      e.stopPropagation();
      if (!isMobile && !isSelected) {
        dispatch(select(guuid));
      }
    },
    [dispatch, guuid, isSelected],
  );
  return (
    <mesh
      {...meshProps}
      castShadow={castShadow && !transparent}
      geometry={geometry}
      material={material}
      material-color={
        (paiBack || 0xff8c11) - (isSelected ? 0x0111111 : 0x000000)
      }
      // material-color={
      //   (paiBack || 0x0e3cc9) - (isSelected ? 0x080808 : 0x000000)
      // }
      material-transparent={transparent}
      material-opacity={0.4}
      onClick={onClick}
      onPointerOver={onPointerOver}
    />
  );
};

export type PaiFrontMeshProps = MeshProps & {
  guuid?: string;
  pai: PaiName;
  color?: number;
  castShadow?: boolean;
  transparent?: boolean;
};

export const PaiFrontMesh: React.FC<PaiFrontMeshProps> = (props) => {
  const {
    guuid,
    pai,
    color,
    castShadow,
    transparent,
    onClick: onClickOrigin,
    ...meshProps
  } = props;
  const [geometry] = useState(assets.geometry['pai.front']);
  const [material] = useState(assets.material['pai.front'].clone());
  const attention = useAppSelector(selectAttention);
  const dispatch = useAppDispatch();
  const [isSelected, setSelected] = useState(guuid && attention.uuid === guuid);
  useEffect(() => {
    if (isSelected !== (guuid && attention.uuid === guuid)) {
      setSelected(guuid && attention.uuid === guuid);
    }
  }, [attention.uuid, guuid, isSelected]);
  const onClick = useCallback(
    (e: ThreeEvent<MouseEvent>) => {
      e.stopPropagation();
      if (isSelected) {
        dispatch(select(undefined));
        if (onClickOrigin) {
          onClickOrigin(e);
        }
      } else {
        dispatch(select(guuid));
      }
    },
    [dispatch, guuid, isSelected, onClickOrigin],
  );
  const onPointerOver = useCallback(
    (e: ThreeEvent<PointerEvent>) => {
      e.stopPropagation();
      if (!isMobile && !isSelected) {
        dispatch(select(guuid));
      }
    },
    [dispatch, guuid, isSelected],
  );
  material.map = assets.map[pai];
  material.map.flipY = false;
  material.bumpMap = assets.bump[pai];
  material.bumpMap.flipY = false;
  return (
    <mesh
      {...meshProps}
      castShadow={castShadow && !transparent}
      geometry={geometry}
      material={material}
      material-color={(color || 0xffffff) - (isSelected ? 0x102090 : 0x000000)}
      material-transparent={transparent}
      material-opacity={0.4}
      onClick={onClick}
      onPointerOver={onPointerOver}
    />
  );
};

export type PaiProps = GroupProps & {
  pai: PaiName;
  position: PaiPosition;
  rotation: PaiRotation;
  positionBefore?: PaiPosition;
  rotationBefore?: PaiRotation;
  color?: number;
  castShadow?: boolean;
  transparent?: boolean;
  distorted?: boolean;
  onClick?: GroupProps['onClick'];
};

export const Pai: React.FC<PaiProps> = (props) => {
  const {
    pai,
    position,
    rotation,
    positionBefore,
    rotationBefore,
    color,
    castShadow,
    transparent,
    onClick,
    ...groupProps
  } = props;
  const ref = useRef<Group>(null);
  useFrame(() => {
    const positionFrames = 5;
    const rotationFrames = 3;
    if (ref.current) {
      if (position && positionBefore) {
        const diffUnit = [
          (position[0] - positionBefore[0]) / positionFrames,
          (position[1] - positionBefore[1]) / positionFrames,
          (position[2] - positionBefore[2]) / positionFrames,
        ];
        nearlyEqual(ref.current.position.x, position[0])
          ? (ref.current.position.x = position[0])
          : (ref.current.position.x += diffUnit[0]);
        nearlyEqual(ref.current.position.y, position[1])
          ? (ref.current.position.y = position[1])
          : (ref.current.position.y += diffUnit[1]);
        nearlyEqual(ref.current.position.z, position[2])
          ? (ref.current.position.z = position[2])
          : (ref.current.position.z += diffUnit[2]);
      }
      if (rotation && rotationBefore) {
        const diffUnit = [
          (rotation[0] - rotationBefore[0]) / rotationFrames,
          (rotation[1] - rotationBefore[1]) / rotationFrames,
          (rotation[2] - rotationBefore[2]) / rotationFrames,
        ];
        nearlyEqual(ref.current.rotation.x, rotation[0])
          ? (ref.current.rotation.x = rotation[0])
          : (ref.current.rotation.x += diffUnit[0]);
        nearlyEqual(ref.current.rotation.y, rotation[1])
          ? (ref.current.rotation.y = rotation[1])
          : (ref.current.rotation.y += diffUnit[1]);
        nearlyEqual(ref.current.rotation.z, rotation[2])
          ? (ref.current.rotation.z = rotation[2])
          : (ref.current.rotation.z += diffUnit[2]);
      }
    }
  });
  return (
    <group
      ref={ref}
      name={pai}
      position={positionBefore || position}
      rotation={rotationBefore || rotation}
      {...groupProps}
    >
      <PaiFrontMesh
        guuid={ref.current?.uuid}
        pai={pai}
        color={color}
        castShadow={castShadow}
        transparent={transparent}
        onClick={onClick}
      />
      <PaiBackMesh
        guuid={ref.current?.uuid}
        castShadow={castShadow}
        transparent={transparent}
      />
    </group>
  );
};
