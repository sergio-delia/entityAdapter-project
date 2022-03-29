import {createSlice, createEntityAdapter, createAsyncThunk} from '@reduxjs/toolkit'


export const fetchComments = createAsyncThunk(
    'comments/fetchComments',
    async (_, {dispatch}) => {
     const data = await fetch('http://localhost:3001/comments')
        .then((res) =>  res.json() );

        const tags = data.reduce((prev, curr) => [...prev, curr.tags], []).flat()
        const likes = data.reduce((prev, curr) => [...prev, curr.likes], []).flat()
        const comments = data.map(({id, body}) => ({id, body}));
        console.log({comments, tags, likes});
        return {comments,likes, tags};
    }
)


const commentsAdapter = createEntityAdapter({
    selectId: (comment) => comment.id, 

});

const likesAdapter = createEntityAdapter({
    selectId: (like) => like.id, 

})

const tagsAdapter = createEntityAdapter({
    selectId: (tag) => tag.id, 

})


export const deleteComment = createAsyncThunk('comments/deleteComment',
async (id) =>{
    await fetch(`http://localhost:3001/comments/${id}`, {
        method: 'DELETE'
    });
    return id;
})



export const patchComment = createAsyncThunk(
    'comments/patchComent',
    async ({id, newObj }) =>{
        await fetch(`http://localhost:3001/comments/${id}`, {
            method: 'PATCH',
            body: JSON.stringify(newObj)
        }).then(res => res.json());
        return {id: id, changes: newObj}
    }
)


const commentsSlice = createSlice({

    name: 'comments',
    initialState: commentsAdapter.getInitialState({
        loading:false, 
        likes: likesAdapter.getInitialState(),
        tags: tagsAdapter.getInitialState()
    }),
    reducers: {
        setAllComments: commentsAdapter.setAll,
        setOneComment: commentsAdapter.removeOne,
        setManyComments:commentsAdapter.addMany,
        updateOneComment: commentsAdapter.updateOne,
        removeAllLikes: (state) =>{
            likesAdapter.removeAll(state.likes)
        },
        removeTagById: (state, {payload}) =>{
            //1105ba8b-aa81-4d84-9098-4d187fa2499f
            const tagId = payload;
            tagsAdapter.removeOne(state.tags, tagId)
        }
    },
    extraReducers: {
        [fetchComments.pending]: (state) => {
            state.loading = true;
        },
        [fetchComments.fulfilled]: (state, {payload}) => {
            state.loading = false;
            commentsAdapter.setAll(state, payload.comments)
            likesAdapter.setAll(state.likes, payload.likes)
            tagsAdapter.setAll(state.tags, payload.tags)
        },
        [fetchComments.rejected]: (state) => {
            state.loading = false;
        },
        [deleteComment.pending]: (state) => {
            state.loading = true;
        },
        [deleteComment.fulfilled]: (state, {payload:id}) => {
            state.loading = false;
            commentsAdapter.removeOne(state, id)
        },
        [deleteComment.rejected]: (state) => {
            state.loading = false;
        },
        [patchComment.rejected]: (state) => {
            state.loading = false;
        },
        [patchComment.pending]: (state) => {
            state.loading = true;
        },
        [patchComment.fulfilled]: (state, {payload}) => {
            state.loading = false;
            commentsAdapter.updateOne(state, {id: payload.id, changes: payload.changes})
        }
    }

})

export const commentsSelectors = commentsAdapter.getSelectors((state) => state.comments)

export const { setAllComments, setManyComments, setOneComment, updateOneComment, removeAllLikes, removeTagById } = commentsSlice.actions

export default commentsSlice.reducer