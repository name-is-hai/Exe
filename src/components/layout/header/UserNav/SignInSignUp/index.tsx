import { Button } from "@/components/ui/button"
import { NavLink } from "react-router-dom"

export const SignInSignUp = () => {
    return (
        <div className="flex items-center justify-between">
            <Button asChild variant="ghost" >
                <NavLink to={"/SignIn"} className="text-sm font-medium transition-colors">
                    Sign In
                </NavLink>
            </Button>
            <Button asChild variant="default" >
                <NavLink to={"/SignUp"} className="text-sm font-medium transition-colors rounded-2xl">
                    Sign Up
                </NavLink>
            </Button>
        </div>
    )
}