import axios from "axios";
import Cookies from "js-cookie";

const useLogout = () => {
    const logout = async () => {
        try {
            await axios.post(
                `http://localhost:8080/api/users/logout`,
                { token: Cookies.get("token") },
                {
                    withCredentials: true,
                }
            );

            localStorage.removeItem("token");
            localStorage.removeItem("isLoggedIn");
            localStorage.removeItem("userType");
            Cookies.remove("token");
        } catch (error) {
            console.error("Error while logging out:", error);
        }
    };

    return logout;
};

export default useLogout;
