import axios from "axios";
import Cookies from "js-cookie";

const useLogout = () => {
    const token = Cookies.get("token");
    const id = Cookies.get("id");

    console.log(
        "---------------------token-------------------------------",
        token
    );
    console.log("--------------------id--------------------------------", id);

    const logout = async () => {
        try {
            await axios.post(`http://localhost:8080/api/users/logout`, {
                token: token,
                identity: id,
            });

            localStorage.removeItem("token");
            localStorage.removeItem("isLoggedIn");
            localStorage.removeItem("userType");
            Cookies.remove("token");
            Cookies.remove("refresh_token");
            Cookies.remove("id_token");
        } catch (error) {
            console.error("Error while logging out:", error);
        }
    };

    return logout;
};

export default useLogout;
