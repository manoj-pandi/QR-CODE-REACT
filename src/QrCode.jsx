import { useState } from "react";
import "./QrCode.css"

export const QrCode = () => {
    const [img, setImg ]= useState("");
    const [loading, setLoading] = useState(false);
    const [qrData, setQrData] = useState("");
    const [qrSize, setQrSize] = useState ("");
    async function generateQR() {
        setLoading(true);
        try {
            const url = `https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}x${qrSize}&data=${encodeURIComponent(qrData)}`;
            setImg(url);
        }
        catch (error) {
            console.error("Error generating QR code", error);
        }
        finally {
            setLoading(false);
        }

    }
    function downloadQR() {
        fetch(img).then((response) => response.blob()).then((blob) => {
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = "QRcode.png";
            document.body.appendChild(link);
            link.click();
            document.removeChild(link);
        })
        .catch((error) => {
            console.error("Error downloading QR code", error);
        });
        
     }
    return (
        <div className="app-container">
            <h1>QR CODE GENERATOR USING <span> REACT</span></h1>
            {loading && <p>Please Wait...</p>}
           {img && <img className="qr-code-image" src={img} alt="" />} 
            <div>
                <label htmlFor="dataInput" className="input-label">Data for QR Code:</label>
                <input type="text" id="dataInput" value={qrData} placeholder="Enter data for QR code"  onChange={(e)=> setQrData(e.target.value)}/>
                <label htmlFor="sizeInput" className="input-label">Image size (e.g.,150):</label>
                <input type="text" value={qrSize} id="sizeInput" placeholder="Enter your Image Size" onChange={(e)=>setQrSize(e.target.value)} />
                <button className="generate-btn" disabled={loading } onClick={generateQR}>Generate QR Code </button>
                <button className="download-btn" onClick={downloadQR}>Download QR Code</button>

            </div>
            <p className="footer ">Designed By <a href="https://www.linkedin.com/in/a-manoj-pandi/">Manoj Pandi A</a></p>
        </div>
    );
};
