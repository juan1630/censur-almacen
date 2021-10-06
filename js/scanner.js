
if( localStorage.getItem('user')  != null ) {

    var contador = 0;
    const html5QrcodeScanner = new Html5QrcodeScanner("reader", { fps: 10, qrbox: {width: 250, height: 250} }, false);

    const qrCodeSuccessCallback =  (decodedText, decodedResult) => {

        if( contador < 5) {
    
            contador += 1;
            if(decodedText.includes("https://blooming-sea-53514.herokuapp.com/")){
    
                fetch( decodedText )
                    .then(   resp => resp.json())
                    .then( data => {
                    if(data.ok ) {
                        if(data.data.status != 'STOCK') {
                            Swal.fire('El código ya ha sido usado', 'Intenta con otro codigo', 'error');
                            return;
                        }else {
                            Swal.fire('Venta realizada','El producto se vendió', 'success');
                            return;
                        }            
                    }
                });
        
            }else {
    
                Swal.fire('Codgio Qr invalido', 'Ingresa un código de censur', 'error');
                return;
            }
    
        } else {
    
            Swal.fire('Número maximo de veces', 'Intenta de nuevo más tarde', 'error');
            window.location.href = '../index.html';
    
        }
        
    };
    
    html5QrcodeScanner.render(qrCodeSuccessCallback);

}else {
    
    window.location.href = '../index.html';
}

