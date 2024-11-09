import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { saveStorage } from "../../helpers";

const initialState: any = {
  value: [],
};

export const savedSlice = createSlice({
  name: "saved",
  initialState,
  reducers: {
    toggleSave: (state, action: PayloadAction<any>) => {
      const isExist = state?.value?.find(
        (item: any) => item._id === action.payload._id
      );
      if (!isExist) {
        state.value = [...(state?.value || []), action?.payload];
      } else {
        state.value = state?.value.filter(
          (item: any) => item._id !== action.payload._id
        );
      }
      saveStorage("saved", state.value);
    },
    setSavedItems: (state) => {
      state.value = JSON.parse(localStorage.getItem("saved")!);
    },
  },
});

export const { toggleSave, setSavedItems } = savedSlice.actions;

export default savedSlice.reducer;
