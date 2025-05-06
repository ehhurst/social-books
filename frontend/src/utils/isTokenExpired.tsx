import { jwtDecode } from "jwt-decode";
// helper method to check token expiration
export function isTokenExpired(token:string | null):boolean {

    if (!token) return true;
    try {
        const decoded: {exp:number} = jwtDecode(token);
        const now=Date.now() / 1000;
        return decoded.exp < now;
    } catch (exception) {
        return true;
    }
}

