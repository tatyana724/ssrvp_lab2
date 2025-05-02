import { useSelector } from "react-redux";

export const useLoginState = () => {
    const isAuthenticated = useSelector((state) => state.user.isLogin);
    return isAuthenticated;
};
