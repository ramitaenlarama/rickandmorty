//https://rickandmortyapi.com/api/episode/
let $container = document.querySelector('#container');

fetch('https://rickandmortyapi.com/api/episode/')
    .then(response => response.json()) //response=> {return response.json()}
    .then(data => {
        console.log(data);


        let $selectEpis = document.createElement('select');
        let $defaultOption = document.createElement('option');
        $defaultOption.value = '';
        $defaultOption.innerText = 'Seleccioná un episodio';
        $selectEpis.appendChild($defaultOption);

        data.results.forEach(episodio => {
            //<option value="id">episodio-nombre</option>
            let $option = document.createElement('option');
            $option.value = episodio.id;
            $option.innerText = `${episodio.episode} - ${episodio.name}`

            $selectEpis.appendChild($option);
        });
        $container.appendChild($selectEpis);

        $selectEpis.addEventListener('change', function () {
            let idEpisodio = $selectEpis.value;
            let $characters = document.querySelector('.characters');

            if(idEpisodio == '' && $characters != undefined){
                $characters.innerHTML = '';
                return false;
            }

            let infoEpisodio = data.results.find(episodio => {
                return idEpisodio == episodio.id
            })

            

            if ($characters != undefined) {
                $characters.innerHTML = '';
            } else {
                $characters = document.createElement('div');
                $characters.classList.add('characters');
                $container.appendChild($characters);
            }
            console.log(infoEpisodio.characters);
            infoEpisodio.characters.forEach(urlApiPersonaje => {
                fetch(urlApiPersonaje)
                    .then(response => response.json())
                    .then(data => {
                        $box = document.createElement('div');
                        $box.classList.add('box');
                        $img = document.createElement('img');
                        $img.src = data.image;

                        $nombre = document.createElement('p');
                        $nombre.innerText = data.name;

                        $box.appendChild($img);
                        $box.appendChild($nombre);

                        $characters.appendChild($box);
                    })
                    .catch(err => {
                        $msgError = document.createElement('div');
                        $msgError.innerText = 'Hubo un error, intentalo más tarde';
                        $container.appendChild($msgError);
                    })
            })


        });

    })
    .catch(err => {
        $msgError = document.createElement('div');
        $msgError.innerText = 'Hubo un error, intentalo más tarde';
        $container.appendChild($msgError);
    })