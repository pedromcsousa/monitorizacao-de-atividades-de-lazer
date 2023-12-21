import { Popup, Marker, MapContainer, TileLayer, Polyline } from "react-leaflet"
import { INewReadingSocket, SocketEvents, socket } from "../../components/socket"
import { useEffect, useRef } from "react"
import { IReading } from "../../models/Reading"
import { LatLngTuple } from "leaflet"
import { formatDate } from "../../utils/data"

interface IMapHistoryProps {
    refetch: () => void,
    readings: Array<IReading>
}

export default function MapHistory(props: IMapHistoryProps) {
    const mapRef = useRef<L.Map>(null);

    useEffect(() => {
        function onReadingEvent(data: INewReadingSocket) {
            if (data.deviceId === props.readings[0].device._id)
                props.refetch()
            //if (mapRef.current)
            //mapRef.current.setView([data.location.longitude, data.location.latitude])
        }

        //socket.on('connect', onConnect);
        //socket.on('disconnect', onDisconnect);
        socket.on(SocketEvents.reading, onReadingEvent);

        return () => {
            //socket.off('connect', onConnect);
            //socket.off('disconnect', onDisconnect);
            socket.off(SocketEvents.reading, onReadingEvent);
        };
    }, []);

    const center: LatLngTuple = [props.readings[0].longitude, props.readings[0].latitude];

    useEffect(() => {
        if (mapRef.current)
            mapRef.current.setView(center)
    }, [center]);

    return <MapContainer
        ref={mapRef}
        center={center}
        zoom={9}
        style={{ width: "100%", height: "100%" }}>
        <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Polyline
            pathOptions={{ color: "red" }}
            positions={props.readings.map(r => ([r.longitude, r.latitude]))}
        />
        {
            props.readings.map(r => {
                return <Marker
                    key={"marker_device_" + r.createdAt.toString()}
                    position={[r.longitude, r.latitude]}
                >
                    <Popup>
                        <small>Create At: {formatDate(new Date(r.createdAt))}</small>
                    </Popup>
                </Marker>
            })
        }
    </MapContainer>
}