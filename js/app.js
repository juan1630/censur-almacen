const btnLogin = document.querySelector('#btn-login');


btnLogin.addEventListener('click', (e) => {

    const inputNombre  = document.querySelector('#nombreTxt').value;
    const inputPassword  = document.querySelector('#passwordTxt').value;
    
        const user = {
            nombre: inputNombre,
            password: inputPassword
        }

    e.preventDefault();

    console.log(user);

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



