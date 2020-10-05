import { useMemo } from "react";
import { ClientInterface } from "../../abstractions/interface/model/Client";
import BaseTable from "./BaseTable";

type Props = {
    clients: ClientInterface[]
}

export default function ClientTable({clients}: Props){
    const records = useMemo(() => {
        return clients.map(client => ({
            id: () => (client.id),
            fullName: () => `${client.firstName} ${client.lastName}`,
            createDate: () => new Date(+client.createDate).toLocaleString()
        }));
    }, [clients]);

    return <BaseTable records={records} header={[
        {
            title: 'Полное имя',
            accessor: 'fullName'
        },
        {
            title: 'Дата регистрации',
            accessor: 'createDate'
        }
    ]}/>;
}