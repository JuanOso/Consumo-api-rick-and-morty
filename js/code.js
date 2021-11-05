localStorage.clear()
let cards = document.getElementById('tarjetas')


function ejecutador () {
    let urlApi = 'https://rickandmortyapi.com/api/character'
    /* console.log(urlApi) */
    let api = fetch(urlApi,  { method: 'GET',
    mode: 'cors', // <---
    cache: 'default'
 })
api.then(so => so.json())
    .then(data_cards => {

        for (const personaje of data_cards.results) {
            cards.innerHTML += `
            <div class="card mb-3 mx-3 text-white bg-dark mb-3 rounded-3" style="width: 570px">
            <div class="row g-0">
              <div class="col-md-4">
                <img src="${personaje.image}" class="img-fluid rounded-start w-100" alt="">
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <h4 class="card-title text-center mb-4">${personaje.name}</h5>
                  <ul>
                      <li>Estado: <span class="fw-bold">${personaje.status}</span></li>
                      <li>Especie: <span class="fw-bold">${personaje.species} </span></li>
                      <li>Location: <span class="fw-bold">${personaje.location.name}</span></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
            `
        }
        let contador = 2
        localStorage.setItem("pagina_" + contador, data_cards.info.next)
        localStorage.setItem('contador', contador)
    }).catch(error => console.log(error))
}


ejecutador()

function ejecutador2 () {
    let contador_actual = localStorage.getItem('contador')
    let urlApi = localStorage.getItem('pagina_' + contador_actual)
    let api = fetch(urlApi)
    
    api.then(so => so.json())
        .then(data_cards => {
    
            for (const personaje of data_cards.results) {
                cards.innerHTML += `
                <div class="card mb-3 mx-3 text-white bg-dark" style="width: 570px">
                <div class="row g-0">
                  <div class="col-md-4">
                    <img src="${personaje.image}" class="img-fluid rounded-start w-100" alt="">
                  </div>
                  <div class="col-md-8">
                    <div class="card-body">
                      <h4 class="card-title text-center mb-4">${personaje.name}</h5>
                      <ul>
                          <li>Estado: <span class="fw-bold">${personaje.status}</span></li>
                          <li>Especie: <span class="fw-bold">${personaje.species} </span></li>
                          <li>Location: <span class="fw-bold">${personaje.location.name}</span></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
                `
            }
            contador = parseInt(contador_actual) + 1
            localStorage.setItem("pagina_" + contador, data_cards.info.next)
            localStorage.setItem('contador', parseInt(contador_actual)+1)

        }).catch(error => console.log(error))
    }






