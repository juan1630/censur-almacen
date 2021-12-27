const btnlogOut = document.querySelector('#bntLogout');

const contentModules = document.querySelector("#content-modules");
const user = JSON.parse(localStorage.getItem('user') || '');
const titleSaludo = document.querySelector('#title-saludo');
titleSaludo.innerHTML += user.nombre;
const idUser = user._id;


const redirectModule = ( routeModule ) => window.location.href = routeModule;

const getModules = () => {

    // https://blooming-sea-53514.herokuapp.com/modulos/${idUser}
    fetch(`http://localhost:3200/modulos/${idUser}`, {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        }
    })
    .then(resp => resp.json())
    .then(data => {
        console.log(data)
        data.data.forEach(modulo => {
  
            contentModules.innerHTML += `
            <div class="col-sm-6 col-md-6">
                <div class="card">
                    <a class="link-text-module" href=${modulo.modules.route} >
                        <p>
                            ${modulo.modules.nameModule} 
                        </p>
                    </a>
                </div>
            </div>`;
        });
    })
}


const deleSessionStorage= () => {

    if(localStorage.getItem('user') == null ) {
        
        localStorage.removeItem('user');
    }
    window.location.href = '../index.html'
}

btnlogOut.addEventListener('click',  deleSessionStorage );

getModules();