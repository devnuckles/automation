import axios from "axios";
import Cookies from "js-cookie";

function setResource(response) {
    try{
        axios.defaults.headers.common[
            "token"
        ] = `Bearer ${response.data.data.token}`;
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("userType", true);
        Cookies.set("token", response.data.data.access_token);
        Cookies.set("refresh_token", response.data.data.refresh_token);
        Cookies.set("id", response.data.data.id_token);
    }
    catch (error){
        console.error("Error setting resource:>>>>>>>>>>>>>>>>>>>", error);
    }
}

export { setResource };
