import { createSlice } from '@reduxjs/toolkit';

interface LoggedState {
    value: boolean;
    email: string | null;
    name: string | null;
}

const initialState: LoggedState = {
    value: false,
    email: null,
    name: null,
}

const loggedSlice = createSlice({
    name: 'logged',
    initialState,
    reducers: {
        setLogged: (state, action) => {
            state.value = action.payload
        },
        setUEmail: (state, action) => {
            state.email = action.payload
        },
        setUName: (state, action) => {
            state.name = action.payload
        }
    }
})

export const { setLogged, setUEmail, setUName } = loggedSlice.actions
export default loggedSlice.reducer