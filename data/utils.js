import { redirect } from "react-router-dom";

export async function authRequired (request) {
    const isLoggedIn = false;
    const pathname = new URL(request.url).pathname;

    if(!isLoggedIn){
        const response = redirect(`/signup?message=You must log in first.&redirectTo=${pathname}`)
        response.body = true
        return response
    }
}