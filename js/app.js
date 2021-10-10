const btnLogin = document.querySelector('#btn-login');


btnLogin.addEventListener('click', (e) => {

    const inputNombre  = document.querySelector('#nombreTxt').value;
    const inputPassword  = document.querySelector('#passwordTxt').value;
    
        const user = {
            nombre: inputNombre,
            password: inputPassword
        }

    e.preventDefault();

    fetch('https://blooming-sea-53514.herokuapp.com/login/TLYC01', {
        method: 'POST',
        body:JSON.stringify(user),
        headers:{
            'Content-Type': 'application/json'
        }
    })
    .then( resp => resp.json() )
    .then( data => {
            console.log(data);
        if(data.ok) {
            localStorage.setItem('user', JSON.stringify(data.personal))
            window.location.href = './pages/modules.html';
        }
    })
    .catch(error => {
        console.error(error);
    })
});

//  este codigo obtiene la latitud y la longitud
// const getLocation  = () => {
    
//     if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition( position => {
//            if(position.coords.latitud >= 18.825300 && position.coords.latitude <= 18.825300 ) { //18.825216
//             alert('No Se puede')
//            }else {
//                console.log(position)
//             alert('Si se puede')

//            }
//         })
//     }
// }

/***
 * 
 * 
 * 18.5718 985902.9
 */

// getLocation();