import { useQuery } from "@tanstack/react-query"
import { Popup, Marker, MapContainer, TileLayer } from "react-leaflet"
import { IDevice } from "../../models/Device"
import { getAllDevices } from "../../services/Device"
import { SocketEvents, socket } from "../../components/socket"
import { useEffect, useRef, useState } from "react"
import { isOnline } from "./Home"
import { Icon } from "leaflet"
import { Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { formatDate } from "../../utils/data"

interface IMapProps {
    center: [number, number]
}

export default function Map(props: IMapProps) {
    const navigate = useNavigate();

    const { data: devices, isError, refetch } = useQuery<Array<IDevice>>({
        queryKey: ['devices'],
        queryFn: getAllDevices,
        refetchInterval: 10000
    })

    const mapRef = useRef<L.Map>(null);

    const [, setIsConnected] = useState(socket.connected);

    useEffect(() => {
        function onConnect() {
            setIsConnected(true);
        }

        function onDisconnect() {
            setIsConnected(false);
        }

        function onReadingEvent() {
            refetch()
        }

        socket.on('connect', onConnect);
        socket.on('disconnect', onDisconnect);
        socket.on(SocketEvents.reading, onReadingEvent);

        return () => {
            socket.off('connect', onConnect);
            socket.off('disconnect', onDisconnect);
            socket.off(SocketEvents.reading, onReadingEvent);
        };
    }, []);

    useEffect(() => {
        if (mapRef.current)
            mapRef.current.setView(props.center)
    }, [props.center]);

    const blueIcon = new Icon({
        iconUrl:
            "https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|abcdef&chf=a,s,ee00FFFF"
    }),
        greenIcon = new Icon({
            iconUrl:
                "https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|2ecc71&chf=a,s,ee00FFFF"
        });

    function getIcon(type: "mqtt" | "lorawan") {
        switch (type) {
            case "mqtt":
                return blueIcon;
            case "lorawan":
                return greenIcon;
        }
    }

    if (!devices || isError)
        return <></>

    return <MapContainer
        ref={mapRef}
        center={props.center}
        zoom={9}
        style={{ width: "100%", height: "100%" }}>
        <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {
            devices.map(d => {
                if (d.lastLocation && isOnline(new Date(d.updatedAt)))
                    return <Marker
                        icon={getIcon(d.type)}
                        key={"marker_device_" + d._id}
                        position={[d.lastLocation?.longitude, d.lastLocation?.latitude]}
                    >
                        <Popup>
                            <h4>{d.type}</h4>
                            <small>Last communication: {formatDate(new Date(d.updatedAt))}</small>
                            <br />
                            <Button size="sm" onClick={() => navigate("/history/" + d.tag)} >History</Button>
                        </Popup>
                    </Marker>
                return null
            })
        }
    </MapContainer>
}