import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { UserRegisterForm } from "./components/user-register-form"
import { NavLink } from "react-router-dom"

export default function RegisterPage() {
    return (
        <div className="container relative h-[800px] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
            <NavLink
                to="/signin"
                className={cn(
                    buttonVariants({ variant: "ghost" }),
                    "absolute left-4 top-4 md:left-8 md:top-8"
                )}
            >
                Đăng nhập
            </NavLink>
            <div className="pt-20 lg:p-8">
                <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                    <div className="flex flex-col space-y-2 text-center">
                        <h1 className="text-2xl font-semibold tracking-tight">
                            Tạo tài khoản
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Hãy nhập email của bạn để đăng ký
                        </p>
                    </div>
                    <UserRegisterForm />
                    <p className="px-8 text-sm text-center text-muted-foreground">
                        By clicking continue, you agree to our{" "}
                        <NavLink
                            to=""
                            className="underline underline-offset-4 hover:text-primary"
                        >
                            Terms of Service
                        </NavLink>{" "}
                        and{" "}
                        <NavLink
                            to=""
                            className="underline underline-offset-4 hover:text-primary"
                        >
                            Privacy Policy
                        </NavLink>
                        .
                    </p>
                </div>
            </div>
            <div className="relative flex-col hidden h-full p-10 text-white bg-muted lg:flex dark:border-r">
                <div className="absolute inset-0 bg-zinc-900" />
                <div className="relative z-20 flex items-center text-lg font-medium ms-auto">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-6 h-6 mr-2"
                    >
                        <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
                    </svg>
                    Acme Inc
                </div>
                <div className="relative z-20 mt-auto">
                    <blockquote className="space-y-2">
                        <p className="text-lg">
                            &ldquo;This library has saved me countless hours of work and
                            helped me deliver stunning designs to my clients faster than
                            ever before.&rdquo;
                        </p>
                        <footer className="text-sm">Sofia Davis</footer>
                    </blockquote>
                </div>
            </div>
        </div>
    )
}