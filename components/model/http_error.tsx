import { AxiosResponse } from "axios";

export interface HttpError<R = any>{
    response: AxiosResponse<R>;
}