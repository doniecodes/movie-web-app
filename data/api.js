 /* Get actors page. */
 export async function getActors (url){
    const res = await fetch(url);
    if(!res.ok){
        throw {
            message : "Could not fetch resources.",
            statusText : res.statusText,
            status : res.status
        }
    }
    const data = await res.json();
    return data.results;
 }

 /* get favourites */
 export async function getFavourites (){
    /* const res = await fetch(url);
    if(!res.ok){
        throw {
            message : "Could not fetch resources.",
            statusText : res.statusText,
            status : res.status
        }
    }
    const data = await res.json();
    return data.results; */

    return ("Nothing on favourites yet.")
 }