const userState = {
    username: "",
    isLogin: false,

};

export function userReducer(state = userState, action) {
    switch (action.type) {
        case "AUTH":
            return { ...state, isLogin: true, username: action.payload, role: action.payload };
        case "LOGOUT":
            return {...userState};
        default:
            return { ...state};
    }
}

export const authUser = (userData) => ({
    type: "AUTH",
    payload: userData,
});
