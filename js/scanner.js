const html5QrcodeScanner = new Html5QrcodeScanner("reader", { fps: 10, qrbox: {width: 250, height: 250} }, false);

const qrCodeSuccessCallback =  (decodedText, decodedResult) => {
    // console.log( decodedText );
    
    console.log(decodedText);
    fetch( decodedText )
    .then(   resp => resp.json())
    .then( data => {
        
        if(data.ok ) {
            
            Swal.fire('Venta realizada','El producto se vendió', 'success')
        }
    });
    
};


html5QrcodeScanner.render(qrCodeSuccessCallback);