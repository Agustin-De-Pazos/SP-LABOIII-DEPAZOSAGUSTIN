
const loader = document.getElementById("spinner");

const URL = "http://localhost:3000/Monstruos";
const $seccionTabla = document.getElementById("tabla");

export const getMonstruos = async ()=>{
    loader.classList.remove("oculto");
    try {
        const res = await fetch(URL);
        if(!res.ok){
            console.log("CACA");
            throw res;
        }
        return await res.json()
    }
    catch(res){
        
        console.error(`Error ${res.status}: ${res.statusText}`);
    }

    /* fetch(URL)
    .then(response => response.ok?response.json():Promise.reject(response))
    .then(data => console.log(data))
    .catch(reason => console.error(`Error ${reason.status}: ${reason.statusText}`))
    .finally(() => loader.classList.add("oculto")) */
}

export function getMonstruo(id){
    const xhr = new XMLHttpRequest();

    loader.classList.remove("oculto");
    $seccionTabla.setAttribute("Hidden", true);
    //setear evento ready state change

    xhr.onreadystatechange = ()=>{
        if(xhr.readyState == 4){

            if(xhr.status >= 200 && xhr.status < 300)
            {
                const data = JSON.parse(xhr.responseText);
                console.log(data);
            }
            else{
                console.error(`ERROR ${xhr.status}: ${xhr.statusText}`);
            }
            
        }
    }

    //open peticion configura

    xhr.open("GET", URL + `/${id}`, true);

    //enviar
    try{
        xhr.send();
    }
    catch(error){
        console.log(error);
    }
}

export function postMonstruo(monstruo){
    
    const xhr = new XMLHttpRequest();
    $seccionTabla.setAttribute("Hidden", true);
    loader.classList.remove("oculto");
    //setear evento ready state change

    xhr.onreadystatechange = ()=>{
        if(xhr.readyState == 4){

            if(xhr.status >= 200 && xhr.status < 300)
            {
                const data = JSON.parse(xhr.responseText);
                console.log(data);
            }
            else{
                console.error(`ERROR ${xhr.status}: ${xhr.statusText}`);
            }
            loader.classList.add("oculto");
        }
    }

    
    //open peticion configura
    
    xhr.open("POST", URL, true);
    
    //seteo la cabecera

    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

    //enviar
    try{
        xhr.send(JSON.stringify(monstruo));
    }
    catch(error){
        console.log(error);
    }
}

export function deleteMonstruo(id){
    const xhr = new XMLHttpRequest();

    $seccionTabla.setAttribute("Hidden", true);
    loader.classList.remove("oculto");
    //setear evento ready state change

    xhr.onreadystatechange = ()=>{
        if(xhr.readyState == 4){

            if(xhr.status >= 200 && xhr.status < 300)
            {
                const data = JSON.parse(xhr.responseText);
                console.log(data);
            }
            else{
                console.error(`ERROR ${xhr.status}: ${xhr.statusText}`);
            }
        }
    }

    //open peticion configura

    xhr.open("DELETE", URL + `/${id}`, true);

    //enviar
    try{
        xhr.send();
    }
    catch(error){
        console.log(error);
    }
}


export function updateMonstruo(monstruo,id){
    

    const xhr = new XMLHttpRequest();
    $seccionTabla.setAttribute("Hidden", true);
    loader.classList.remove("oculto");
    //setear evento ready state change

    xhr.onreadystatechange = ()=>{
        if(xhr.readyState == 4){

            if(xhr.status >= 200 && xhr.status < 300)
            {
                const data = JSON.parse(xhr.responseText);
                console.log(data);
            }
            else{
                console.error(`ERROR ${xhr.status}: ${xhr.statusText}`);
            }
            //
        }
    }

    
    //open peticion configura
    
    xhr.open("PATCH", URL + `/${id}`, true);
    
    //seteo la cabecera

    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

    //enviar
    try{
        xhr.send(JSON.stringify(monstruo));
    }
    catch(error){
        console.log(error);
    }
}