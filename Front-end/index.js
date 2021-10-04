const urlApi = 'http://localhost:3000/filmes';
const lista = document.getElementById('lista');

let edit = false;
let idEdit = 0;

const getFilmes = async () => {
    const response = await fetch(urlApi);
    const data = await response.json();

    data.map((filme) =>{
        lista.insertAdjacentHTML('beforeend',`
            <div class="main">
                <ul class="cards">
                    <li class="cards_item">
                        <div class="card">
                            <div class="card_imagem"><img class="imgCard" src="${filme.img}"></div>

                            <div class="card_content">
                                <h2 class="card_title">${filme.titulo}</h2>
                                <label class="checkbox">
                                    <input type="checkbox" />
                                    <svg viewBox="0 0 21 18">
                                        <symbol id="tick-path" viewBox="0 0 21 18" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M5.22003 7.26C5.72003 7.76 7.57 9.7 8.67 11.45C12.2 6.05 15.65 3.5 19.19 1.69" fill="none" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round" />
                                        </symbol>
                                        <defs>
                                            <mask id="tick">
                                                <use class="tick mask" href="#tick-path" />
                                            </mask>
                                        </defs>
                                        <use class="tick" href="#tick-path" stroke="currentColor" />
                                        <path fill="white" mask="url(#tick)" d="M18 9C18 10.4464 17.9036 11.8929 17.7589 13.1464C17.5179 15.6054 15.6054 17.5179 13.1625 17.7589C11.8929 17.9036 10.4464 18 9 18C7.55357 18 6.10714 17.9036 4.85357 17.7589C2.39464 17.5179 0.498214 15.6054 0.241071 13.1464C0.0964286 11.8929 0 10.4464 0 9C0 7.55357 0.0964286 6.10714 0.241071 4.8375C0.498214 2.39464 2.39464 0.482143 4.85357 0.241071C6.10714 0.0964286 7.55357 0 9 0C10.4464 0 11.8929 0.0964286 13.1625 0.241071C15.6054 0.482143 17.5179 2.39464 17.7589 4.8375C17.9036 6.10714 18 7.55357 18 9Z" />
                                    </svg>
                                    <svg class="lines" viewBox="0 0 11 11">
                                        <path d="M5.88086 5.89441L9.53504 4.26746" />
                                        <path d="M5.5274 8.78838L9.45391 9.55161" />
                                        <path d="M3.49371 4.22065L5.55387 0.79198" />
                                    </svg>
                                </label>

                                <p class="card_text">Nota: ${filme.nota}</p>
                                <p class="card_text">Gênero: ${filme.genero}</p>
                                
                                <button class="btn card_btn" onclick="putFilme(${filme.id})">Editar</button>
                                <button class="btn card_btn" onclick="deleteFilme(${filme.id})">Excluir</button>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        `)
    })
}



getFilmes();

const submitForm = async (evento) => {
    evento.preventDefault();

    let img = document.getElementById('img');
    let titulo = document.getElementById('titulo');
    let nota = document.getElementById('nota');
    let genero = document.getElementById('genero');


    const filme = {
        img: img.value,
        titulo: titulo.value,
        nota: nota.value,
        genero: genero.value,
    }

    if(!edit) {
        const request = new Request(`${urlApi}/add`, {
            method:'POST',
            body: JSON.stringify(filme),
            headers: new Headers({
                'Content-Type': 'application/json'})
        })

        const response = await fetch(request);
        const result = await response.json();

        if(result){
            getFilmes();
        }
    } else {
        const request = new Request(`${urlApi}/${idEdit}`, {
            method: 'PUT',
            body: JSON.stringify(filme),
            headers: new Headers({
                'Content-Type': 'application/json'})
        })

        const response = await fetch(request);
        const result = await response.json();

        if(result){
            getFilmes();
        }
    }
    img.value = '';
    titulo.value = '';
    nota.value = '';
    genero.value = '';

    lista.innerHTML = '';
}

getFilmesById = async (id) => {
    const response = await fetch(`${urlApi}/${id}`);
    return filme = response.json();
}

const putFilme = async (id) => {
    edit = true;
    idEdit = id;

    const filme = await getFilmesById(id);

    let imgEdit = document.getElementById('img');
    let tituloEdit = document.getElementById('titulo');
    let notaEdit = document.getElementById('nota');
    let generoEdit = document.getElementById('geneto');

    imgEdit.value = filme.img;
    tituloEdit.value = filme.titulo;
    notaEdit.value = filme.nota;
    generoEdit.value = filme.genero;
}


const deleteFilme = async (id) => {
    const request = new Request(`${urlApi}/${id}`, {
        method: 'DELETE',
    })

    const response = await fetch(request);
    const data = await response.json();
    
    lista.innerHTML = '';
    getFilmes();
}

