import React from 'react';



const Storage = React.createContext({
    selectedMap: "map",
    // @ts-ignore
    SetSelectedMap: (prop:string) => {}
});

export default Storage;