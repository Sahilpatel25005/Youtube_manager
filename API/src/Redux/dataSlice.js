import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiCall from "../components/Apicall";

// ******************************* LIST FUNCTION ******************************************************

export const getUser = createAsyncThunk("getUser", async () => {
  try {
    const res = await apiCall("/listdata");
    return res;
  } catch (error) {
    throw error.message;
  }
});

// ****************************** ADD FUNCTION ******************************************************

export const addUser = createAsyncThunk(
  "addUser",
  async ({ newid, newname, newtime }, thunkAPI) => {
    try {
      await apiCall("/addvideo", "POST", {
        id: newid,
        name: newname,
        time: newtime,
      });
      return { id: newid, name: newname, time: newtime };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// ************************** UPDATE FUNCTION ******************************************************

export const updateuser = createAsyncThunk(
  "updateuser",
  async ({ newid, newname, newtime }, thunkAPI) => {
    try {
      const res = await apiCall("/updatevideo", "PUT", {
        id: newid,
        name: newname,
        time: newtime,
      });
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// *************************** DELETE FUNCTION ******************************************************

export const deleteuser = createAsyncThunk("deleteuser", async ({ id }) => {
  try {
    const res = await apiCall("/deletevideo", "DELETE", { id: id });
    return res;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

// *************************** DATA SLICE ******************************************************

export const dataSlice = createSlice({
  name: "data",
  initialState: {
    datas: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder.addCase(getUser.pending, (state) => {
      state.loading = true;
    }),
      builder.addCase(getUser.fulfilled, (state, action) => {
        state.loading = false;
        state.datas = action.payload;
      }),
      builder.addCase(getUser.rejected, (state, action) => {
        state.loading = true;
        state.datas.push(action.payload);
      });
    builder.addCase(addUser.pending, (state) => {
      state.loading = true;
    }),
      builder.addCase(addUser.fulfilled, (state, action) => {
        state.loading = false;
        if (Array.isArray(action.payload)) {
          state.datas = [...state.datas, ...action.payload];
        } else {
          state.datas.push(action.payload);
        }
      }),
      builder.addCase(addUser.rejected, (state, action) => {
        state.loading = true;
        state.datas = action.payload;
      });
    builder.addCase(updateuser.pending, (state) => {
      state.loading = true;
    }),
      builder.addCase(updateuser.fulfilled, (state, action) => {
        state.loading = false;

        const updatedItem = state.datas.find(
          (item) => item.id == action.payload.id
        );
        updatedItem.id = action.payload.id;
        updatedItem.name = action.payload.name;
        updatedItem.time = action.payload.time;
      }),
      builder.addCase(updateuser.rejected, (state, action) => {
        state.loading = true;
        state.datas = action.payload;
      });
    builder.addCase(deleteuser.pending, (state) => {
      state.loading = true;
    }),
      builder.addCase(deleteuser.fulfilled, (state, action) => {
        state.loading = false;
        state.datas = state.datas.filter((item) => item.id !== action.payload);
      }),
      builder.addCase(deleteuser.rejected, (state, action) => {
        state.loading = true;
        state.datas.push(action.payload);
      });
  },
});

export const { addData, listdata, updateData } = dataSlice.actions;
export default dataSlice.reducer;
