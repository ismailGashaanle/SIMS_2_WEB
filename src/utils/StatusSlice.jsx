import { createSlice } from "@reduxjs/toolkit";

const StatusSlice = createSlice({
  name: "Status",
  initialState: {
    status: null,
    message: null,
    data: null,
    loading: false
  },
  reducers: {
    // ✅ Main action to set status
    setStatus: (state, action) => {
      state.status = action.payload.status;
      state.message = action.payload.message;
      state.data = action.payload.data || null;
      state.loading = false;
    },
    // ✅ For backward compatibility (if you want to keep addStatus)
    addStatus: (state, action) => {
      state.status = action.payload;
      state.loading = false;
    },
    setStatusLoading: (state) => {
      state.loading = true;
    },
    clearStatus: (state) => {
      state.status = null;
      state.message = null;
      state.data = null;
      state.loading = false;
    }
  }
});

export default StatusSlice.reducer;
export const { 
  setStatus, 
  addStatus,  // ✅ Keep this for backward compatibility
  setStatusLoading, 
  clearStatus 
} = StatusSlice.actions;