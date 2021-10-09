var url = window.location.href;


if( url.includes('localhost')  ) {
    
    var swLocation = '../sw.js'
}else {
        swLocation = '../censur-almacen/sw.js'
}   
navigator.serviceWorker.register( swLocation );