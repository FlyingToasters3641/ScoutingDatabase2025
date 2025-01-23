import { useState } from "react";
import Html5QrcodePlugin from "./Html5QrcodePlugin.js";

const Dataimport = () => {
    
    const onNewScanResult = (decodedText, decodedResult) => {
        alert(` Decoded Text: ${decodedText}`);
        console.log(`Scan result: ` + JSON.stringify(decodedResult) + `| ${decodedText}`);
    };

    return (
        <>
        <div className = "container">
            <h1>Import Scouting Data:</h1>
            <hr></hr>
            <Html5QrcodePlugin
                fps={10}
                qrbox={500}
                disableFlip={false}
                qrCodeSuccessCallback={onNewScanResult}
            />
        </div>
        </>
    );

}
export default Dataimport;