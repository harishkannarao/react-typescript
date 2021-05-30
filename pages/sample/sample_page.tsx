import Head from 'next/head'

export function SamplePage() {
    return (
        <div>
            <Head>
                <title data-testid="title">Sample</title>
            </Head>
            <div data-testid="message">This is a sample page</div>
        </div>
    );
}

export default SamplePage;