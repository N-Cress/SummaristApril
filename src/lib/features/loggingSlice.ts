import { createSlice } from '@reduxjs/toolkit';

interface LoggingState {
    value: boolean;
}

const initialState: LoggingState = {
    value: false
}

const loggingSlice = createSlice({
    name: 'logging',
    initialState,
    reducers: {
        setLogging: (state, action) => {
            state.value = action.payload
        }
    }
})

export const { setLogging } = loggingSlice.actions
export default loggingSlice.reducer