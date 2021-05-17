import axios, { AxiosError } from "axios";

export function Error<T = any>(props: {error: Error | AxiosError<T>}) {
    let errorMessage = (props.error as Error).message;
    if ((props.error as AxiosError).isAxiosError) {
        let axiosError = props.error as AxiosError
        errorMessage = JSON.stringify(axiosError.response)
    }
    return (
        <div data-testid="error-content">"An error has occurred: " + {errorMessage}</div>
    )
}