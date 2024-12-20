import {
  BufferGeometry,
  Mesh,
  MeshStandardMaterial,
  Texture,
  TextureLoader,
} from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import PAI_GLB_PATH from 'src/assets/glb/pai.glb';
import TABLE_GLB_PATH from 'src/assets/glb/table.glb';
import TABLE_BUMP_PATH from 'src/assets/svg/table.bump.svg';
import { TEXTURE_PATH } from 'src/components/atoms/Pai';

export class AssetLoader {
  initialized = false;
  geometry: { [key: string]: BufferGeometry } = {};
  material: { [key: string]: MeshStandardMaterial } = {};
  map: { [key: string]: Texture } = {};
  bump: { [key: string]: Texture } = {};
  async init(callback: () => void) {
    if (this.initialized) {
      return;
    }
    try {
      console.log('[asset-loader] init');
      this.initialized = true;
      const textureLoader = new TextureLoader();
      const gltfLoader = new GLTFLoader();
      // 麻雀牌テクスチャ読み込み
      for (const key in TEXTURE_PATH) {
        const [mapPath, bumpPath] = TEXTURE_PATH[key];
        this.map[key] = await textureLoader.loadAsync(mapPath);
        this.bump[key] = await textureLoader.loadAsync(bumpPath);
      }
      // 麻雀卓バンプマップ読み込み
      this.bump['table'] = await textureLoader.loadAsync(TABLE_BUMP_PATH);
      // 麻雀牌モデル読み込み
      const pai = await gltfLoader.loadAsync(PAI_GLB_PATH);
      this.geometry['pai.front'] = (pai.scene.children[0] as Mesh).geometry;
      this.material['pai.front'] = (pai.scene.children[0] as Mesh)
        .material as MeshStandardMaterial;
      this.geometry['pai.back'] = (pai.scene.children[1] as Mesh).geometry;
      this.material['pai.back'] = (pai.scene.children[1] as Mesh)
        .material as MeshStandardMaterial;
      // 麻雀卓モデル読み込み
      const table = await gltfLoader.loadAsync(TABLE_GLB_PATH);
      this.geometry['table'] = (table.scene.children[0] as Mesh).geometry;
      this.material['table'] = (table.scene.children[0] as Mesh)
        .material as MeshStandardMaterial;
      callback();
    } catch (error) {
      console.log(error);
    }
  }
}
