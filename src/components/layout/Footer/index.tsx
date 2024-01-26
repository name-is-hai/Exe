export function Footer() {
    return (
        <footer className="py-6 md:px-8 md:py-0">
            <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
                <p className="text-sm leading-loose text-center text-balance text-muted-foreground md:text-left">
                    Built by <a href="https://www.facebook.com/nameishai" target="_blank" rel="noreferrer" className="font-medium underline underline-offset-4">nameishai</a>
                    . The source code is available on <a href="https://github.com/name-is-hai/Exe" target="_blank" rel="noreferrer" className="font-medium underline underline-offset-4">
                        GitHub
                    </a>.
                </p>
            </div>
        </footer>
    )
}