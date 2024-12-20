import React, {
  useContext,
  createContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';
import { AssetLoader } from 'src/utils/asset-loader';

export interface AssetContextValue {
  available: boolean;
  assets: AssetLoader;
}

export const AssetContext = createContext({} as AssetContextValue);

export const useAsset = () => useContext(AssetContext);

export const assets = new AssetLoader();

export const AssetProvider: React.FC<{ children?: ReactNode }> = (props) => {
  const [available, setAvailable] = useState(false);
  const [initialized, setInitialized] = useState(false);
  useEffect(() => {
    if (!initialized) {
      setInitialized(true);
      void assets.init(() => {
        setAvailable(true);
      });
    }
  }, [initialized]);
  return (
    <AssetContext.Provider
      value={{
        available,
        assets,
      }}
    >
      {props.children}
    </AssetContext.Provider>
  );
};
