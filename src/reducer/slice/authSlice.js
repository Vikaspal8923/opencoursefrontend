import { createSlice } from "@reduxjs/toolkit";


const initialState = {
	signupData: localStorage.getItem("signupData")
		? JSON.parse(localStorage.getItem("signupData"))
		: null,

	loading: false,

	token: localStorage.getItem("token")
		? JSON.parse(localStorage.getItem("token"))
		: null

};

const authSlice = createSlice({
	name: "auth",
	initialState,

	reducers: {
		setSignupData(state, action) {
			state.sighnupData = action.payload;
		},

		setLoading(state, action) {
			state.loading = action.payload;
		},

		setToken(state, action) {
			state.token = action.payload;
		},
		logout(state) {
			state.token = null;
			localStorage.removeItem("signupData");
			localStorage.removeItem("token");

			console.log(
				"removed token is : ",
				localStorage.getItem("token")
			);
            
		},
	},
});

export const { setSignupData, setLoading, setToken, logout } =
	authSlice.actions;
export default authSlice.reducer;
