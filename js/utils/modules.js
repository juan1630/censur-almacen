const contentModules = document.querySelector("#content-modules");
const user = JSON.parse(localStorage.getItem('user') || '');
const titleSaludo = document.querySelector('#title-saludo');
titleSaludo.innerHTML += user.nombre;
const idUser = user._id;

const getModules = () => {

    fetch(`https://blooming-sea-53514.herokuapp.com/modulos/${idUser}`, {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        }
    })
    .then(resp => resp.json())
    .then(data => {
        data.usuario.forEach(modulo => {
            console.log(modulo)
            contentModules.innerHTML += `
            <div class="col-sm-6 col-md-4">
                <div class="card">
                    <p>
                        ${modulo.modules.nameModule}
                    </p>
                </div>
            </div>`;
        });
    })
}


getModules()