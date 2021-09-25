import { useState, useEffect } from "react";
import { useToken } from "./useToken";

export const useUser = () => {
    const [token] = useToken();

    const getPayloadFromToken = token => {
        const encodedPayload = token.split('.')[1];
        return JSON.parse(atob(encodedPayload));
    };

    const [user, setUser] = useState(() => {
        if (!token)
            return null
        return getPayloadFromToken(token);
    });

    //watch token for changes -> update the user on change
    useEffect(() => {
        if (!token) {
            setUser(null);
        } else {
            setUser(getPayloadFromToken(token));
        }
    }, [token]);

    return user;
}