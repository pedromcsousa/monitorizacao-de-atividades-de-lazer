import { Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { IReading } from "../../models/Reading";
import { getHistoryFromDevice } from "../../services/Reading";
import { useQuery } from "@tanstack/react-query";
import MapHistory from "./Map";
import ExportKML from "./ExportKML";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons/faArrowLeft";

type Props = {}

function History({ }: Props) {
    let { tag } = useParams();
    const navigate = useNavigate();

    const { data: history, isError, refetch } = useQuery<Array<IReading>>({
        queryKey: ['reading', tag],
        queryFn: () => getHistoryFromDevice(tag || "")
    })

    if (!history || isError || !tag)
        return <></>

    return <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
        <Button onClick={() => navigate("/")} style={{ position: "absolute", width: "6rem", top: "1rem", left: "3rem", zIndex: 99999 }}>
            <FontAwesomeIcon icon={faArrowLeft} /> Voltar
        </Button>
        <ExportKML tag={tag} history={history} />
        <MapHistory
            refetch={refetch}
            readings={history}
        />
    </div>
}

export default History