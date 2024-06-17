import Header from "./Header"
import "../app/globals.css"

function Layout({ children }) {
    return (
        <>
            <Header />
            <main className="max-w-5xl px-4 m-auto">
                {children}
            </main>
        </>
    )
}

export default Layout