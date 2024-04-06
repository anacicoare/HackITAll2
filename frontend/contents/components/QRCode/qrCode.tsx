import React from 'react';

import QRCode from 'qrcode.react';

function qrCode() {

    const qrCodeValue: string = 'https://www.example.com'; // the value you want to generate QR code for

        return (

            <div className={'h-[150px]'}>

                <QRCode value={qrCodeValue} />

            </div>

        );

}

export default qrCode