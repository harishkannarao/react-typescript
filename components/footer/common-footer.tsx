import { NextRouter } from "next/router";

type FooterProps = {
    router: NextRouter;
}

export function Footer(props: {router: NextRouter}) {
    const router = props.router;
    return (
        <footer className="bg-light text-center text-lg-start">
            <p data-testid="common-footer">Common Footer</p>
            <p>
                Pathname: <span data-testid="footer-pathname">{router.pathname}</span>
                <br />
                    Query: <span data-testid="footer-query">{JSON.stringify(router.query)}</span>
                <br />
                    Basepath: <span data-testid="footer-base-path">{router.basePath}</span>
            </p>
        </footer>
    )
}