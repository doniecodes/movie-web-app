 // Get actors page.
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

 // Check if User Exists Before Creating User
 export async function existingUsers (){
    const res = await fetch(`/api`);
    const data = await res.json();
    return data;
}

// Create User
export async function createUser (creds){
    const res = await fetch("/api", {
        method : "post",
        headers: {"Content-Type" : "application/json"},
        body: JSON.stringify(creds)
    });
    
    if(!res.ok){
        throw {
            message : "Could not create account, try refreshing.",
            statusText : res.statusText,
            status : res.status,
        }
    }

    const data = await res.json();
    return data;
}



// Login User
export async function loginUser (){
    const res = await fetch(`/api`);

    if(!res.ok){
        throw {
            message : "Could not create account, try refreshing.",
            statusText : res.statusText,
            status : res.status,
        }
    }
    
    const data = await res.json();
    return data;
}