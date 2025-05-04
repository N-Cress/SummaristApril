import { createSlice } from '@reduxjs/toolkit';

interface SubState {
    value: string
}

const initialState: SubState = {
    value: "basic"
}

const subSlice = createSlice({
    name: 'sub',
    initialState,
    reducers: {
        setSub: (state, action) => {
            state.value = action.payload
        }
    }
})

export const { setSub } = subSlice.actions
export default subSlice.reducer