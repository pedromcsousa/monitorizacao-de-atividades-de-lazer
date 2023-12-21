import { useQuery } from "@tanstack/react-query"
import { getAllDevices } from "../../services/Device"
import { IDevice } from "../../models/Device"
import Map from "./Map"
import { useEffect, useState } from "react"
import { SocketEvents, socket } from "../../components/socket"
import Status from "./Status"

export function isOnline(updatedAt: Date, refreshFrequency?: number): boolean {
    const [now, setNow] = useState(new Date().getTime() - (30 * 1000));
    useEffect(() => {
        const interval = setInterval(
            () => setNow(new Date().getTime() - (30 * 1000)),
            refreshFrequency || 5000,
        );
        return () => clearInterval(interval);
    });
    return updatedAt.getTime() >= now;
}

/*function secondsAgo(date: Date | string) {
    return new Date(date).getMinutes() - new Date().getMinutes()
}*/

export default function Home() {
    const { data: devices, isError, refetch } = useQuery<Array<IDevice>>({
        queryKey: ['devices'],
        queryFn: getAllDevices,
        refetchInterval: 10000
    })
    const [center, setcenter] = useState<[number, number]>([41.53678836934385, -8.627784648005294])

    useEffect(() => {
        function onReadingEvent() {
            refetch()
        }

        socket.on(SocketEvents.reading, onReadingEvent);

        return () => {
            socket.off(SocketEvents.reading, onReadingEvent);
        };
    }, []);

    if (!devices || isError)
        return <>ERROR</>
    else
        return <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
            <Status devices={devices} setCenter={setcenter} />
            <Map center={center} />
        </div>
}