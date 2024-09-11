import { useEffect, useState } from "react";
import { useUser } from "./UseUser";

function useCheckAuth() {
    const { user, login } = useUser();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchAuthentication() {
            try {
                const response = await fetch(
                    "http://localhost:9000/api/v1/auth",
                    {
                        credentials: "include",
                    }
                );

                if (response.status === 401) {
                    console.log("Unauthorized");
                    return;
                }

                if (response.ok) {
                    const data = await response.json();
                    login(data.user);
                } else {
                    console.log(`Server error: ${response.satus}`);
                }
            } catch (error) {
                console.log(`Fetch error: ${error.message}`);
            } finally {
                setIsLoading(false);
            }
        }
        setTimeout(() => {
            fetchAuthentication();
        }, 2000);
    }, []);

    return [user, isLoading];
}

export {useCheckAuth};