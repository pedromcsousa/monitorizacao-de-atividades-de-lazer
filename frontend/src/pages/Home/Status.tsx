import { isOnline } from "./Home"
import { filter } from "lodash";
import { Dispatch, SetStateAction } from "react";
import { IDevice } from "../../models/Device";

type Props = {
    devices: Array<IDevice>,
    setCenter: Dispatch<SetStateAction<[number, number]>>
}

function Status({ devices }: Props) {

    const online = filter(devices, (d: IDevice) => isOnline(new Date(d.updatedAt)));
    const offline = filter(devices, (d: IDevice) => !isOnline(new Date(d.updatedAt)));

    return <span style={{
        backgroundColor: "#16161dee",
        padding: "1rem",
        position: "absolute",
        bottom: "0",
        right: "0",
        width: "10rem",
        height: "7rem",
        borderRadius: "5px 0 0 0",
        zIndex: 99999
    }}>
        <h5 style={{ color: "green" }}>ONLINE: {online.length}</h5>
        {
            /*online.map((d: IDevice) => <ListGroup.Item
                className="hover"
                onClick={() => { if (d.lastLocation) setcenter([d.lastLocation?.longitude, d.lastLocation?.latitude]) }}
                key={"device_" + d._id}>
                {d.tag}
            </ListGroup.Item>
            )*/
        }
        <h5 style={{ color: "gray" }}>OFFLINE: {offline.length}</h5>
        {
            /*offline.map((d: IDevice) => <ListGroup.Item
                className="hover"
                onClick={() => { if (d.lastLocation) setcenter([d.lastLocation?.longitude, d.lastLocation?.latitude]) }}
                key={"device_" + d._id}
                style={{ backgroundColor: "gray", borderColor: "gray" }}
            >
                {d.tag}
            </ListGroup.Item>
            )*/
        }
    </span>
}

export default Status