import {createSlice, createEntityAdapter, createAsyncThunk} from '@reduxjs/toolkit'


export const fetchComments = createAsyncThunk(
    'comments/fetchComments',
    async (_, {dispatch}) => {
     return await fetch('https://jsonplaceholder.typicode.com/comments?_limit=10')
        .then((res) =>  res.json() )
        //O salvando data in una const data e poi chiamando il reducer   
        // dispatch(setAllComments(data))
        
    }
)


const commentsAdapter = createEntityAdapter({
    selectId: (comment) => comment.id, 

})



const commentsSlice = createSlice({

    name: 'comments',
    initialState: commentsAdapter.getInitialState({loading:false}),
    reducers: {
       // setAllComments: commentsAdapter.setAll,
    },
    extraReducers: {
        [fetchComments.pending]: (state) => {
            state.loading = true;
        },
        [fetchComments.fulfilled]: (state, {payload}) => {
            state.loading = false;
            commentsAdapter.setAll(state, payload)
        },
        [fetchComments.rejected]: (state) => {
            state.loading = false;
        }
    }

})

export const commentsSelectors = commentsAdapter.getSelectors((state) => state.comments)

//export const { setAllComments } = commentsSlice.actions

export default commentsSlice.reducer