import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const createPost = createAsyncThunk(
    "post/createPost",
    async (data, thunkAPIs) => {
        console.log(data);
        const token = localStorage.getItem("auth_token");
        const response = await axios.post("http://localhost:3000/api/v1/posts", data,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        thunkAPIs.dispatch(reset())
        return response.data;
    }
);

export const fetchPosts = createAsyncThunk(
    "post/fetchPosts",
    async () => {
        const response = await axios.get("http://localhost:3000/api/v1/posts");
        return response.data;
    }
);

const changePostReducer = (state, action)=>{
    state.post[action.payload.name] = action.payload.value;
}

const cleanErrorReducer = (state)=>{
    state.createPostError = null;
}


const INIT_STATE = {
    posts: [],
    post: {}
};


const postSlice = createSlice({
    name: "post",
    initialState: INIT_STATE,
    reducers: {
        changePost: changePostReducer, //changePost is the change post action generator, input is paylaod, outpur will be the action,
        cleanError: cleanErrorReducer,
        reset: (state) => {
            state.post.title = "";
            state.post.description ="";
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPosts.fulfilled, (state, action) => {
            console.log(action.payload);
            state.posts = action.payload;
        });

        builder.addCase(createPost.fulfilled, (state, action) => {
            console.log(action.payload);
            state.createPostError = null;
        });

        builder.addCase(createPost.rejected, (state) => {
            state.createPostError = "Error creating post";
        });
    }
});

export const {changePost, cleanError, reset} = postSlice.actions;
export default postSlice.reducer;