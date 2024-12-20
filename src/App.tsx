import React from 'react';
import { Stats } from '@react-three/drei';
import { MahjongScreen } from 'src/components/screens/Mahjong';

const App: React.FC = () => {
  return (
    <div className="App">
      <Stats showPanel={0} className="stats" />
      <MahjongScreen />
    </div>
  );
};

export default App;
