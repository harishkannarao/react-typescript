import React from 'react';
import Head from 'next/head'

export class SamplePage extends React.Component {
    render() {
        return (
            <div>
                <Head>
                    <title data-testid="title">Sample</title>
                </Head>
                <div data-testid="message">This is a sample page</div>
            </div>          
        );
    }
}

export default SamplePage  