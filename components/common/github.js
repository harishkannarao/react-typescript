import { executeGet } from "./api";

export function getRepoData(owner, name, successHandler, errorHandler) {
    executeGet(
        process.env.NEXT_PUBLIC_API_BASE_URL + "/repos/" + owner + "/" + name, 
        {}, 
        successHandler, 
        errorHandler
    );
}