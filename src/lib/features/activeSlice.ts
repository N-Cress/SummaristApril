import { createSlice } from '@reduxjs/toolkit';

interface ActiveState {
    value: string;
}

const initialState: ActiveState = {
    value: "my"
}

const activeSlice = createSlice({
    name: 'active',
    initialState,
    reducers: {
        setActive: (state, action) => {
            state.value = action.payload
        }
    }
})

export const { setActive } = activeSlice.actions
export default activeSlice.reducer