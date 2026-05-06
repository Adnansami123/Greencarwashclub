import React from "react";

const AssetReplacementContext = React.createContext({
    items: [],
    itemcount:0,
    checklistitems:[],    
    assetsurveylistitems:[],    
    addItem: (item) => {},
    removeItem: (id) => {},   
    addCheckListItem: (item) => {},
    removechecklistitem: (id) => {},
    addAssetSurveyListItem: (item) => {},
    removeassetsurveyitem: (id) => {},
    
});

export default AssetReplacementContext;