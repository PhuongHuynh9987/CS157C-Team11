import {MapContainer , TileLayer, Marker,Popup} from "react-leaflet"
import "leaflet/dist/leaflet.css";
import "./style.css"

export default function Map() {
    return(
        <MapContainer center={[52.4797, -1.90269]} zoom={10} scrollWheelZoom={false} style={{ height: "80%" }}>
            <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
            <Marker position={[52.4797, -1.90269]}>
            <Popup>
                A pretty CSS3 popup. <br /> Easily customizable. 
            </Popup>
        </Marker>
      </MapContainer>
    )
}