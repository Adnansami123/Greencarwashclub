import { useReducer } from "react";
import InvoiceProductContext from "./invoiceproducts-context";

const defaultState = {
  items: [],
  itemcount: 1,
  paymentPendingInvoiceItems: [],
  paymentPendingInvoiceItemCount: 1,
};

const ProductReducer = (state, action) => {

  if (action.type === 'ADD') {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );

    const existingCartItem = state.items[existingCartItemIndex];
    let updatedItems;

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
      };
      console.log("updatedItems", ...state.items);

      updatedItems = [...state.items];
      console.log("updatedItems", updatedItems);
      updatedItems[existingCartItemIndex] = updatedItem;
    }
    else {
      state.itemcount = state.itemcount + 1;
      updatedItems = state.items.concat(action.item);
    }

    return {
      items: updatedItems,
      itemcount: state.itemcount,

    };
  }
  if (action.type === 'REMOVE') {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );

    const existingItem = state.items[existingCartItemIndex];
    //const updatedTotalAmount = state.totalAmount - existingItem.price;
    const updatedTotalAmount = 0;

    //alert(existingItem.amount + 'existingItem.amount')
    let updatedItems, updateitemcount, updateshowaddbutton;
    // if (existingItem.amount === 1) {
    updatedItems = state.items.filter(item => item.id !== action.id);

    updateitemcount = state.itemcount - 1;

    return {
      items: updatedItems,
      itemcount: updateitemcount,
    };
  }

  if (action.type === 'CLEAR') {
    return {
      items: [],
      itemcount: 1,
      paymentPendingInvoiceItems: [],
      paymentPendingInvoiceItemCount: 1,
    };
  }


  if (action.type === 'ADDPAYMENTPENDINGINVOICE') {
    console.log("ADDPAYMENTPENDINGINVOICE", state?.paymentPendingInvoiceItems);
    if (!!state?.paymentPendingInvoiceItems == false) return;
    const existingCartItemIndex = state.paymentPendingInvoiceItems.findIndex(
      (item) => item.id === action.item.id
    );

    const existingCartItem = state.paymentPendingInvoiceItems[existingCartItemIndex];
    let updatedItems;

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
      };
      console.log("updatedItems", ...state.paymentPendingInvoiceItems);

      updatedItems = [...state.paymentPendingInvoiceItems];
      console.log("updatedItems", updatedItems);
      updatedItems[existingCartItemIndex] = updatedItem;
    }
    else {
      state.paymentPendingInvoiceItemCount = state.paymentPendingInvoiceItemCount + 1;
      updatedItems = state.paymentPendingInvoiceItems.concat(action.item);
    }

    return {
      items: state.items,
      itemcount: state.itemcount,
      paymentPendingInvoiceItems: updatedItems,
      paymentPendingInvoiceItemCount: state.paymentPendingInvoiceItemCount,

    };
  }
  if (action.type === 'REMOVE') {
    const existingCartItemIndex = state.paymentPendingInvoiceItems.findIndex(
      (item) => item.id === action.id
    );

    const existingItem = state.paymentPendingInvoiceItems[existingCartItemIndex];
    //const updatedTotalAmount = state.totalAmount - existingItem.price;
    const updatedTotalAmount = 0;

    //alert(existingItem.amount + 'existingItem.amount')
    let updatedItems, updateitemcount, updateshowaddbutton;
    // if (existingItem.amount === 1) {
    updatedItems = state.paymentPendingInvoiceItems.filter(item => item.id !== action.id);

    updateitemcount = state.paymentPendingInvoiceItemCount - 1;

    return {
      items: state.items,
      itemcount: state.itemcount,
      paymentPendingInvoiceItems: updatedItems,
      paymentPendingInvoiceItemCount: updateitemcount,
    };
  }
};

const NewProductProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    ProductReducer,
    defaultState
  );

  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: 'ADD', item: item });
  };

  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({ type: 'REMOVE', id: id });
  };

  const clearCartHandler = () => {
    dispatchCartAction({ type: 'CLEAR' });
  };
  const addPaymentPendingInvoiceItemHandler = (item) => {
    dispatchCartAction({ type: 'ADDPAYMENTPENDINGINVOICE', item: item });
  };

  const removePaymentPendingInvoiceItemHandler = (id) => {
    dispatchCartAction({ type: 'REMOVEPAYMENTPENDINGINVOICE', id: id });
  };


  const cartContext = {
    items: cartState.items,
    itemcount: cartState.itemcount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
    clearCart: clearCartHandler,
    paymentPendingInvoiceItems: cartState.paymentPendingInvoiceItems,
    paymentPendingInvoiceItemCount: cartState.paymentPendingInvoiceItemCount,
    addPaymentPendingInvoiceItem: addPaymentPendingInvoiceItemHandler,
    removePaymentPendingInvoiceItem: removePaymentPendingInvoiceItemHandler,

  };

  return (
    <InvoiceProductContext.Provider value={cartContext}>
      {props.children}
    </InvoiceProductContext.Provider>
  );
};
export default NewProductProvider;