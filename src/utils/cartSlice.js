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
            state.items = state.items.filter(item => item.card.info.id !== itemId);
            //  state.items.pop();
        },
        clearCart : (state) => {
            state.items = [];
        },
    },
});

export const {addItem,removeItem,clearCart} = cartSlice.actions;

export default cartSlice.reducer;

