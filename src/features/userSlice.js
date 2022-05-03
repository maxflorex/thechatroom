import { createSlice } from '@reduxjs/toolkit'
import { buildCreateApi } from '@reduxjs/toolkit/dist/query'
import appApi from '../services/appApi'

export const userSlice = createSlice({
    name: 'user',
    initialState: null,
    reducers: {
        addNotifications: (state, { payload }) => { },
        resetNotifications: (state, { payload }) => { },

    },
    extraReducers: (builder) => {
        // SAVE USER AFTER SIGNUP
        builder.addMatcher(appApi.endpoints.signupUser.matchFulfilled, (state, { payload }) => payload)
        // SAVE USER AFTER LOGIN
        builder.addMatcher(appApi.endpoints.loginUser.matchFulfilled, (state, { payload }) => payload)
        // LOGOUT - DESTROY USER SESSION
        builder.addMatcher(appApi.endpoints.logoutUser.matchFulfilled, () => null)
    }
})

export const { addNotifications, resetNotifications } = userSlice.actions
export default userSlice.reducer