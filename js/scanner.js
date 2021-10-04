const html5QrCode = new Html5Qrcode("reader");
const qrCodeSuccessCallback =  (decodedText, decodedResult) => {
    // console.log( decodedText );

    console.log(decodedResult);
    fetch( decodedResult )
    .then(   resp => resp.json())
    .then( data => {
        console.log(data);
    });
  
};

