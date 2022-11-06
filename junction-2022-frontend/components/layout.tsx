import { Footer } from './footer/footer'
import { Header } from './header/header'

export default function Layout({ children }) {
    return (
        <>
            <Header />
            <main style={{ flex: 1, maxWidth: '640px', marginLeft: 'auto', marginRight: 'auto' }}>
                {children}
            </main>
            <Footer />
        </>
    )
}