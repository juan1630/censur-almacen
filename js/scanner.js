
if( localStorage.getItem('user')  != null ) {


    const html5QrcodeScanner = new Html5QrcodeScanner("reader", { fps: 10, qrbox: {width: 250, height: 250} }, false);

    const qrCodeSuccessCallback =  (decodedText, decodedResult) => {

        if(decodedText){

                // validamos que sea un codigo QR que pertenece a censur 
                if(decodedText.includes("https://blooming-sea-53514.herokuapp.com/")){
            // hacemos la peticion del tipo POST a la API
                    fetch( decodedText, {
                        method: 'POST'
                    })
                        .then(   resp => resp.json())
                        .then( data => {
                            // respuesta de la API
                        if(data.ok ) {

                            if(data.data.status != 'STOCK') {
                                // validamos que el Qr tenga el status de vendido
                                html5QrcodeScanner.stop()
                                .then( resp => {
                                    
                                    Swal.fire('El código ya ha sido usado', 'Intenta con otro codigo', 'error');
                                });
                            }else {

                                stopScanning();
                            }            
                        }
                    });
            
                }else {
        
                    Swal.fire('Codgio Qr invalido', 'Ingresa un código de censur', 'error');
                    html5QrcodeScanner.stop()
                    .then( resp =>{
                        window.location.href = '../modules.html';
                    })
                }
        
            
        }
        
    };
    
    html5QrcodeScanner.render(qrCodeSuccessCallback);

}else {
    
    window.location.href = '../index.html';
}



const stopScanning = async () => {

//hacemos el stock del scanner para que no se cicle
    try {
        const data = await html5QrcodeScanner.stop()

        if(data) {
            Swal.fire('Venta realizada','El producto se vendió', 'success');
           // window.location.href = '../index.html';
        }
    } catch (error) {
        console.log(error);
        window.location.href = '../pages/modules.html';
    }

   return
}