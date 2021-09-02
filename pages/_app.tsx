import 'bootstrap/dist/css/bootstrap.min.css'
import '../css/global.css'
import Head from 'next/head'
import { NextRouter, useRouter } from 'next/router'
import { Footer } from '../components/footer/common-footer'
import { AppProps } from 'next/app'
import { useState } from 'react'

function App({ Component, pageProps }: AppProps) {
    const router: NextRouter = useRouter();
    const [commonHeader, setCommonHeader] = useState<string | undefined>(undefined);
    function getCommonHeader(): string {
        return commonHeader ? commonHeader : 'Common Header';
    }
    return (
        <>
            <Head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <header data-testid="common-header" className="bg-light text-center text-lg-start">
                {getCommonHeader()}
            </header>
            <Component {...pageProps} setCommonHeader={setCommonHeader} />
            <Footer router={router} />
        </>
    )
}

export default App;