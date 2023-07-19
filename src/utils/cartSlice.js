import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name : "cart",
    initialState : {
        items : []
    },
    reducers : {
        addItem : (state,action) => {

            const newItem = action.payload;
            const existingItem = state.items.find(item=>item.card.info.id === newItem.card.info.id);

            if(existingItem){
                existingItem.quantity += 1;
            }
            else{
                state.items.push({...newItem,quantity : 1});
            }
        //    state.items.push(action.payload);
        },
        removeItem : (state,action) => {
            const itemId = action.payload;
            const existingItem = state.items.find(item => item.card.info.id === itemId);
          
            if (existingItem) {
              if (existingItem.quantity > 1) {
                existingItem.quantity -= 1;
              } else {
                // If the quantity becomes zero, remove the item from the cart
                state.items = state.items.filter(item => item.card.info.id !== itemId);
              }
            }

            //  state.items.pop();
        },
        discardItem : (state,action)=> {

            //delete item 
               const itemId = action.payload;
               state.items = state.items.filter(item => item.card.info.id !== itemId);

        },
        clearCart : (state) => {
            state.items = [];
        },
    },
});

export const {addItem,removeItem,clearCart, discardItem} = cartSlice.actions;

export default cartSlice.reducer;

