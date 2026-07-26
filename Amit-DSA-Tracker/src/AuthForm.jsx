import { useState } from "react";
const AuthForm = ({ setIsLoggedIn }) => {
    const [isLoginMode, setIsLoginMode] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const BASE_URL = "http://localhost:3000";  // local backend, jb deplpy krege tb rendr url

        const url = isLoginMode 
        ? `${BASE_URL}/users/login` 
        : `${BASE_URL}/users/signup`;

        const body = isLoginMode
        ? { email, password }
        : { name, email, password };

        // fetch call method, header, body
        try {
            const response = await fetch(url, {
                method: "POST", // GET nhi , kyuki ham bhej rhe hain , mang nhi rhe hain
                headers: {
                    "Content-Type": "application/json" // server ko batata hai ki body JSON format main hai

                },
                body: JSON.stringify(body) // object ko String banata hai , kyki HTTP Body sirf string carry karta hai 
            });

            const data = await response.json();

            if (isLoginMode && data.token) {
                localStorage.setItem("token", data.token);  // token save kiya taki refreshs ke bad login seate bhi rhe
                setIsLoggedIn(true);
            }

             setName("");
             setEmail("");
             setPassword("");
            // console.log(data);  // abhi ke liye check krne ke liye , baad me UI update krege 
        } catch (error) {
            console.log("Auth error:", error);  // network fail ya server doun jaisi case ko handle krne ke liye 
        }
    };

    return ( 
        <div>
            <h2>{isLoginMode ? "Login" : "Sign Up"}</h2>

            {!isLoginMode && (
                <input 
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                />
            )}
            <input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />

            <input
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />

            <button onClick={handleSubmit}>{isLoginMode ? "Login" : "Sign Up"}</button>
            <p onClick = {() => setIsLoginMode(!isLoginMode)} >
                {isLoginMode ? "New user? Sign up" : "Already have an account? Login"}
            </p>
        </div>
    );
};

export default AuthForm;
