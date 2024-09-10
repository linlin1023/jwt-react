import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const registerUser = createAsyncThunk(
    "user/register",
    async (data) => {
        const response = await axios.post("http://localhost:3000/api/v1/users/register", data)
        return response.data;
    }
)
// acync action creator
export const loginUser = createAsyncThunk(
    "user/login" , // async action type,
    async (data) => { //async action payload creator,
        const response = await axios.post("http://localhost:3000/api/v1/users/login", data)
        
        localStorage.setItem("auth_token", response.data.access_token);
        localStorage.setItem("firstName", JSON.stringify(response.data.data.firstName));
        localStorage.setItem("lastName", JSON.stringify(response.data.data.lastName));
        localStorage.setItem("email", JSON.stringify(response.data.data.email));
        localStorage.setItem("isAuthenticated", JSON.stringify(true));

        return response.data;
    }
);

const changeValue = (state, action) => {
    state.data[action.payload.name] = action.payload.value;
}



const userSlice = createSlice({
    name: "user",
    initialState: {
        auth_token: localStorage.getItem("auth_token") || "",
        data: {
            firstName: localStorage.getItem("firstName") || "",
            lastName: localStorage.getItem("lastName") || "",
            email: localStorage.getItem("email") || "",
        },
        isAuthenticated: Boolean(localStorage.getItem("isAuthenticated")) || false,
    },
    reducers:{
        changeFirstName: changeValue, 
        changeLastName: changeValue,
        changeEmail: changeValue,
        changePassword: changeValue,
    },
    extraReducers: (builder) => {
        builder.addCase(registerUser.fulfilled, (state, action) => {
            console.log(action.payload);
            state.data.email = action.payload.data.email;
            state.data.firstName = action.payload.data.firstName;
            state.data.lastName = action.payload.data.lastName;
            state.data.id = action.payload.data.id;
            state.auth_token = action.payload.access_token;
            state.isAuthenticated = true;
        });
        builder.addCase(registerUser.rejected, (state) => {
            state.isAuthenticated = false;
        });
        builder.addCase(loginUser.fulfilled, (state, action) => {
            console.log(action.payload)
            state.data.email = action.payload.data.email;
            state.data.firstName = action.payload.data.firstName;
            state.data.lastName = action.payload.data.lastName;
            state.data.id = action.payload.data.id;
            state.auth_token = action.payload.access_token;
            state.isAuthenticated = true;
        });
        builder.addCase(loginUser.rejected, (state) => {
            state.isAuthenticated = false;
        });
    }
});

///  action generator, invoke them with action payload, it will generate the action with correct action type and paylaod
export const {changeFirstName, changeLastName, changeEmail} = userSlice.actions;
export default userSlice.reducer;