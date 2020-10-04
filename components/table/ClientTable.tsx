import { useMemo } from "react";
import BaseTable from "./BaseTable";

type Props = {
    clients: {id: number, firstName: string, lastName: string, registrationTime: string}[]
}

export default function ClientTable({clients}: Props){
    const records = useMemo(() => {
        return clients.map(client => ({
            id: () => (client.id),
            fullName: () => `${client.firstName} ${client.lastName}`,
            createDate: () => client.registrationTime.toString()
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