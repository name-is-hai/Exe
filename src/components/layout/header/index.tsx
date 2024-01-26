import { useEffect, useState } from "react";
import { NavMenu } from "./Nav-Menu"
import { SignInSignUp } from "./UserNav/SignInSignUp"
import { UserNav } from "./UserNav/UserDropdown"

export function Header() {
    const [isAuth, setIsAuth] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedToken = localStorage.getItem('user_token');
        if (storedToken) {
            setIsAuth(storedToken);
        }
        setLoading(false);
    }, []);
    return (
        <div className="flex items-center justify-between px-6 py-3 bg-primary-900">
            <h2 className="text-2xl font-bold tracking-tight">Finance Dashboard</h2>
            <NavMenu className="mr-11" />
            {/* <SignInSignUp /> */}
            {loading ? null : isAuth ? <UserNav className="ml-32" /> : <SignInSignUp />}
        </div>
    )
}