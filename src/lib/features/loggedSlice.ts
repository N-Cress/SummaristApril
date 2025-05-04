import { createSlice } from '@reduxjs/toolkit';

interface LoggedState {
    value: boolean;
}

const initialState: LoggedState = {
    value: false
}

const loggedSlice = createSlice({
    name: 'logged',
    initialState,
    reducers: {
        setLogged: (state, action) => {
            state.value = action.payload
        }
    }
})

export const { setLogged } = loggedSlice.actions
export default loggedSlice.reducer