import axios from "axios";
import Cookies from "js-cookie";

function setResource(response) {
    axios.defaults.headers.common[
        "token"
    ] = `Bearer ${response.data.data.token}`;
    localStorage.setItem("isLoggedIn", true);
    localStorage.setItem("userType", true);
    Cookies.set("token", response.data.data.access_token);
}

export { setResource };
