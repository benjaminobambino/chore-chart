import { useContext, useState } from "react";
import Client from "../services/api";
import { UserContext } from "../state/UserContext";

// simple "getter". note: it does nothing besides getting userId! No setting here bb.
const getUserId = async () => {
    const response = await Client.get('/api/users/me')

    const { data } = response;

    const { id } = data;

    return id
};

// samesies
const getUserInfo = async (id) => {
    const res = await Client.get(`/users/${id}`);

    const userInfo = res.data;

    return userInfo;
}

const useAuth = () => {
    const [user, setUser] = useContext(UserContext);
    const [loading, setLoading] = useState(!user);

    const isAuthenticated = user !== null;

    const logout = () => {
        localStorage.clear();
        setUser(null);
    };

    useEffect(() => {
        // write login logic
        const getAuthedUser = async () => {
            setLoading(true);
            // check token!
            const token = await checkToken();
            
            if (!token) throw 'entrance to the chores ride costs one token';
            
            // get user's ID!
            const userId = await getUserId();
            
            if (!userId) throw 'I know you not'
            
            // get user's info!
            const userInfo = await getUserInfo(userId);

            if (!userInfo) throw 'frankly by now this is my fault...'

            // set it!
            setUser(userInfo);
            setLoading(false)
        }
        
        // use it!
        getAuthedUser();
        
        // capture interval ID
        const int = setInterval(CheckSession, 240000);

        // clear interval on unmount
        return () => clearInterval(int);
    }, []);

    return [loading, isAuthenticated, user, logout];
};

export default useAuth;
