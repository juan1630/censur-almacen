const STATIC_CACHE    = 'static-v1';
const DYNAMIC_CACHE   = 'dynamic-v1';
const INMUTABLE_CACHE = 'inmutable-v1';


const APP_SHELL = [
    '/',
    'index.html',
    'pages/modules.html',
    'pages/scanner.html',
    'index.css',
    'css/modules.css',
    'css/scanner.css',
    'js/app.js',
    'js/scanner.js',
    'js/utils/modules.js',
    'js/include.js'
];


const APP_SHELL_INMUTABLE = [
    'https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/css/bootstrap.min.css',
    'assets/img/Recurso 1.png',
    "https://unpkg.com/html5-qrcode@2.0.13/dist/html5-qrcode.min.js",
    "https://cdn.jsdelivr.net/npm/sweetalert2@11"
]



self.addEventListener('install', (e)=> {
    // agreganmos al cache el app_shell
    const cache_static = caches.open( STATIC_CACHE ).then( cache => cache.addAll( APP_SHELL ) );

    const cache_inmutable = caches.open( DYNAMIC_CACHE ).then( cache =>  cache.addAll( APP_SHELL_INMUTABLE ));

    e.waitUntil(Promise.all([cache_static, cache_inmutable]));
});


self.addEventListener('activate', (e)=> {
    const respuesta =caches.keys()
        .then( keys => {
            keys.forEach(key => {

                if(key !== STATIC_CACHE && key.includes('static')){
                    return caches.delete(key);
                }

                if(key !== DYNAMIC_CACHE && key.includes('dynamic')){
                    return caches.delete(key);
                }
            });
    });
    e.waitUntil( respuesta )
});

self.addEventListener('fetch', (e)=> {
    // console.log(e);
    let respuesta = caches.match( e.request )
    .then( resp => {
        
        if( resp) {
        
         actualizarCaheDinamico( e.request, resp);
        return resp;

        }else{
            return fetch( e.request ).then( newResponse => {
                return  actualizarCaheDinamico(e.request, newResponse);
            });
        }
    });

    e.respondWith( respuesta );
})


const actualizarCaheDinamico = (req, resp) => {
    if(resp.ok) {
        return caches.open( DYNAMIC_CACHE)
        .then( cache => {
            cache.put(req, resp);
            return resp;
        });

    }else {
        return resp;
    }
}