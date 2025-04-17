import { createContext, useEffect, useState } from "react";
import { ContextProps, User } from "../types";
import axios from "../../axiosConfig";
import { useNavigate } from "react-router-dom";

const initialUserState:User = {username: '', first_name: '', last_name: '', goal: 0};
export const AuthStore = createContext<{currentUser:User}>({currentUser: initialUserState});
AuthStore.displayName = 'AuthContext';

function AuthContext({children} : ContextProps) {
    const token = sessionStorage.getItem("access_token")
    const [currentUser, setUser] = useState(initialUserState);



    useEffect(() => {
        if (token) {

            axios.get('/user', {
            headers: {
                    "Authorization": `Bearer ${token}`
            }
            }).then((response) => {
                const resp = response.data
                console.log(resp.username)
                const userData:User = {username: resp.username, first_name: resp.first_name, last_name: resp.last_name, goal: resp.goal}
                setUser(userData);
                sessionStorage.setItem('User', JSON.stringify({username: resp.username, first_name: resp.first_name, last_name: resp.last_name, goal: resp.goal}))
            }).catch((error) => {
                if (error.response.status === 401) {
                    (sessionStorage.removeItem("access_token"));
                    (sessionStorage.removeItem("User"));

                }
                console.log(error);
            });
            }
    }, []);

        
    function logOut(){
        sessionStorage.removeItem('User');
        sessionStorage.removeItem("access_token");
        console.log('removed tokens')
        window.location.reload();
    }

    
    return (
        <AuthStore.Provider value={{currentUser}}>{children}</AuthStore.Provider>
    )
};
export default AuthContext;
