import Head from 'next/head'
import Link from 'next/link'

export function HomePage() {
    return (
        <div>
            <Head>
                <title>Next.js!!!</title>
            </Head>
            <div data-testid="message">Welcome to Next.js!!!</div>
            <h3>
                <Link href="/customers/list/">
                    <a>Customers List</a>
                </Link>
            </h3>
        </div>
    );
}

export default HomePage;