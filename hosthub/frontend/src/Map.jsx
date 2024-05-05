import {MapContainer , TileLayer, Marker,Popup} from "react-leaflet"
import "leaflet/dist/leaflet.css";
import "./style.css"

export default function Map() {
    return(
        <MapContainer center={[37.3352,-121.8811]} zoom={10} scrollWheelZoom={false} style={{ height: "80%" }} className=" rounded-xl">
            <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
            <Marker position={[37.3352,-121.8811]}>
            <Popup>
                A pretty CSS3 popup. <br /> Easily customizable. 
            </Popup>
        </Marker>
      </MapContainer>
    )
}