import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    youtube: [],
    loadingYt: false
}

export const youtubeSlice = createSlice({
    name: "youtube",
    initialState,

    reducers: {
        fetchingYoutube: state => {
            state.loadingYt = true
        },
        fetchedYoutube: (state, actions) => {
            state.youtube = actions.payload,
            state.loadingYt = false
        },
        fetchingYoutubeError: state => {
            state.loadingYt = false
        }
    }
})


export const { fetchingYoutube, fetchedYoutube, fetchingYoutubeError } = youtubeSlice.actions
export default youtubeSlice.reducer