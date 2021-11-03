import { createContext } from 'react';

 const AuthContext = createContext({
    zooOpen: false,
    zooId: null,
    zoo: null,
    handleZooChange: (newZoo) => {},
    handleZooOpen: () => {},
    handleZooClose: () => {}
});

export default AuthContext;