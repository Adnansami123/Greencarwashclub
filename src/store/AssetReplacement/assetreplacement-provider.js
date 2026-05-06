import { useReducer } from "react";
import AssetReplacementContext from "./assetreplacement-context";

const defaultState = {
  items: [],
  itemcount: 1,
  checklistitems: [],
  checklistitemcount: 1,
  assetsurveylistitems: [],
  assetsurveylistitemcount: 1,
};

const AssetReducer = (state, action) => {
  if (action.type === "ADD") {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );

    const existingCartItem = state.items[existingCartItemIndex];
    let updatedItems;

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      state.itemcount = state.itemcount + 1;
      updatedItems = state.items.concat(action.item);
    }

    return {
      items: updatedItems,
      itemcount: state.itemcount,
      checklistitems: state.checklistitems,
      checklistitemcount: state.checklistitemcount,
      assetsurveylistitems: state.assetsurveylistitems,
      assetsurveylistitemcount: state.assetsurveylistitemcount,
    };
  }
  if (action.type === "REMOVE") {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );

    const existingItem = state.items[existingCartItemIndex];
    //const updatedTotalAmount = state.totalAmount - existingItem.price;
    const updatedTotalAmount = 0;

    //alert(existingItem.amount + 'existingItem.amount')
    let updatedItems, updateitemcount, updateshowaddbutton;
    // if (existingItem.amount === 1) {
    updatedItems = state.items.filter((item) => item.id !== action.id);

    updateitemcount = state.itemcount - 1;

    return {
      items: updatedItems,
      itemcount: updateitemcount,
      checklistitems: state.checklistitems,
      checklistitemcount: state.checklistitemcount,
      assetsurveylistitems: state.assetsurveylistitems,
      assetsurveylistitemcount: state.assetsurveylistitemcount,
    };
  }

  if (action.type === "CLEAR") {
    return {
      items: [],
      itemcount: 1,
      checklistitems: [],
      checklistitemcount: 1,
      assetsurveylistitems: [],
      assetsurveylistitemcount: 1,
    };
  }

  if (action.type === "ADDCHECKLIST") {
    console.log("cartCtx", action.item);
    const existingCartItemIndex = state.checklistitems.findIndex(
      (item) => item.checkListItemXid === action.item.checkListItemXid
    );
    console.log("cartCtx", existingCartItemIndex);

    const existingCartItem = state.checklistitems[existingCartItemIndex];
    console.log("cartCtx", existingCartItem);

    let updatedItems;

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
      };
      updatedItems = [...state.checklistitems];
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      state.checklistitemcount = state.checklistitemcount + 1;
      updatedItems = state.checklistitems.concat(action.item);
    }

    return {
      items: state.items,
      itemcount: state.itemcount,
      checklistitems: updatedItems,
      checklistitemcount: state.checklistitemcount,
      assetsurveylistitems: state.assetsurveylistitems,
      assetsurveylistitemcount: state.assetsurveylistitemcount,
    };
  }
  if (action.type === "REMOVECHECKLIST") {
    const existingCartItemIndex = state.checklistitems.findIndex(
      (item) => item.id === action.id
    );

    const existingItem = state.checklistitems[existingCartItemIndex];
    //const updatedTotalAmount = state.totalAmount - existingItem.price;
    const updatedTotalAmount = 0;

    //alert(existingItem.amount + 'existingItem.amount')
    let updatedItems, updateitemcount, updateshowaddbutton;
    // if (existingItem.amount === 1) {
    updatedItems = state.checklistitems.filter((item) => item.id !== action.id);

    updateitemcount = state.checklistitemcount - 1;

    return {
      items: state.items,
      itemcount: state.itemcount,
      checklistitems: updatedItems,
      checklistitemcount: updateitemcount,
      assetsurveylistitems: state.assetsurveylistitems,
      assetsurveylistitemcount: state.assetsurveylistitemcount,
    };
  }

  if (action.type === "CLEARCHECKLIST") {
    return {
      items: state.items,
      itemcount: state.itemcount,
      checklistitems: [],
      checlistitemcount: 1,
      assetsurveylistitems: state.assetsurveylistitems,
      assetsurveylistitemcount: state.assetsurveylistitemcount,
    };
  }

  //Asset Survey

  if (action.type === "ADDASSETSURVEYLIST") {
    console.log("cartCtx", action.item);
    const existingCartItemIndex = state.assetsurveylistitems.findIndex(
      (item) =>
        item.contractAssetDetailXid === action.item.contractAssetDetailXid
    );
    console.log("cartCtx", existingCartItemIndex);

    const existingCartItem = state.assetsurveylistitems[existingCartItemIndex];
    console.log("cartCtx", existingCartItem);

    let updatedItems;

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
      };
      updatedItems = [...state.assetsurveylistitems];
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      state.assetsurveylistitemcount = state.assetsurveylistitemcount + 1;
      updatedItems = state.assetsurveylistitems.concat(action.item);
    }

    return {
      items: state.items,
      itemcount: state.itemcount,
      checklistitems: state.checklistitems,
      checklistitemcount: state.checklistitemcount,

      assetsurveylistitems: updatedItems,
      assetsurveylistitemcount: state.assetsurveylistitemcount,
    };
  }
  if (action.type === "REMOVEASSETSURVEYLIST") {
    const existingCartItemIndex = state.assetsurveylistitemcount.findIndex(
      (item) => item.id === action.id
    );

    const existingItem = state.assetsurveylistitemcount[existingCartItemIndex];
    //const updatedTotalAmount = state.totalAmount - existingItem.price;
    const updatedTotalAmount = 0;

    //alert(existingItem.amount + 'existingItem.amount')
    let updatedItems, updateitemcount, updateshowaddbutton;
    // if (existingItem.amount === 1) {
    updatedItems = state.assetsurveylistitemcount.filter(
      (item) => item.id !== action.id
    );

    updateitemcount = state.assetsurveylistitemcount - 1;

    return {
      items: state.items,
      itemcount: state.itemcount,
      checklistitems: state.checklistitems,
      checklistitemcount: state.checklistitemcount,

      assetsurveylistitems: updatedItems,
      assetsurveylistitemcount: updateitemcount,
    };
  }

  if (action.type === "CLEARASSETSURVEYLIST") {
    return {
      items: state.items,
      itemcount: state.itemcount,
      checklistitems: state.checklistitems,
      checklistitemcount: state.checklistitemcount,
      assetsurveylistitems: [],
      assetsurveylistitemcount: 1,
    };
  }
};

const NewAssetProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    AssetReducer,
    defaultState
  );

  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: "ADD", item: item });
  };

  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({ type: "REMOVE", id: id });
  };

  const clearCartHandler = () => {
    dispatchCartAction({ type: "CLEAR" });
  };

  const addCheckListItemToCartHandler = (item) => {
    dispatchCartAction({ type: "ADDCHECKLIST", item: item });
  };

  const removeCheckListItemFromCartHandler = (id) => {
    dispatchCartAction({ type: "REMOVECHECKLIST", id: id });
  };

  const clearCheckListCartHandler = () => {
    dispatchCartAction({ type: "CLEARCHECKLIST" });
  };

  const addAssetSurveyListItemToCartHandler = (item) => {
    dispatchCartAction({ type: "ADDASSETSURVEYLIST", item: item });
  };

  const removeAssetSurveyListItemFromCartHandler = (id) => {
    dispatchCartAction({ type: "REMOVEASSETSURVEYLIST", id: id });
  };

  const clearAssetSurveyListCartHandler = () => {
    dispatchCartAction({ type: "CLEARASSETSURVEYLIST" });
  };

  const cartContext = {
    items: cartState.items,
    itemcount: cartState.itemcount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
    clearCart: clearCartHandler,

    checklistitems: cartState.checklistitems,
    checklistitemcount: cartState.checklistitemcount,
    addCheckListItem: addCheckListItemToCartHandler,
    removechecklistitem: removeCheckListItemFromCartHandler,
    clearCheckListCart: clearCartHandler,

    assetsurveylistitems: cartState.assetsurveylistitems,
    assetsurveylistitemcount: cartState.assetsurveylistitemcount,
    addAssetSurveyListItem: addAssetSurveyListItemToCartHandler,
    removeassetsurveyitem: removeAssetSurveyListItemFromCartHandler,
    clearAssetSurveyListCart: clearCartHandler,
  };

  return (
    <AssetReplacementContext.Provider value={cartContext}>
      {props.children}
    </AssetReplacementContext.Provider>
  );
};
export default NewAssetProvider;
