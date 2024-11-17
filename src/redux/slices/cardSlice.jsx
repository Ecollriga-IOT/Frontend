import { createSlice } from "@reduxjs/toolkit";
import { fetchCards, fetchCardById, updateCardDto } from "../thunks/cardThunks";


  const cardSlice = createSlice({
    name: 'cards',
    initialState: {
        items: [],
        loading: false,
        status: "idle",
        error: null,
        isPlanPurchased: JSON.parse(localStorage.getItem("isPlanPurchased")) || false,
    },
    reducers: {
      purchasePlan(state) {
        state.isPlanPurchased = true;
        localStorage.setItem("isPlanPurchased", JSON.stringify(true));
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchCards.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(fetchCards.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.items = action.payload; 
        })
        .addCase(fetchCards.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.payload;
        })
        .addCase(fetchCardById.pending, (state) => {
          state.status = 'loading';
          state.card = null; 
        })
        .addCase(fetchCardById.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.card = action.payload; 
        })
        .addCase(fetchCardById.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.payload;
        })
        .addCase(updateCardDto.pending, (state) => {
          state.status = "loading";
        })
        .addCase(updateCardDto.fulfilled, (state, action) => {
          state.status = "succeeded";
          // Actualiza la tarjeta en la lista de `items`
          const updatedCardIndex = state.items.findIndex(
            (item) => item.id === action.payload.id
          );
          if (updatedCardIndex !== -1) {
            state.items[updatedCardIndex] = action.payload;
          }
        })
        .addCase(updateCardDto.rejected, (state, action) => {
          state.status = "failed";
          state.error = action.payload;
        });
        
    },
  });

  export const { purchasePlan } = cardSlice.actions;
  export default cardSlice.reducer;