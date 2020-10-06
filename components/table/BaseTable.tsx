import { Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@material-ui/core";
import { useState } from "react";

type Props = {
    records: {[propName: string]: () => (string | number), id: () => number}[],
    header: {title: string, accessor: string}[],
    onLastPage: (data) => void
}

export default function BaseTable({records, header, onLastPage}: Props){
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    if(records.length <= rowsPerPage) onLastPage({rowsPerPage});

    const handleChangePage = (e: unknown, newPage: number) => {
        setPage(newPage);
        if(newPage >= records.length/rowsPerPage-1){
            onLastPage({rowsPerPage});
        }
    };

    const handleChangeRowsPerPage = (e) => {
        setRowsPerPage(+e.target.value);
        setPage(0);
        if(records.length <= rowsPerPage) onLastPage({rowsPerPage});
    }

    return (<><TableContainer>
        <Table stickyHeader aria-label="table">
            <TableHead>
                <TableRow>
                {
                    header.map((col, i) => (<TableCell key={i}>
                        {col.title}
                    </TableCell>))
                }
                </TableRow>
            </TableHead>
            <TableBody>
            {
                records.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(rec => (<TableRow key={rec.id()} hover >{
                    header.map((col, i) => (<TableCell key={i}>{
                        rec[col.accessor]()
                    }</TableCell>))    
                }</TableRow>))
            }
            </TableBody>
        </Table>
    </TableContainer>
    <TablePagination
        rowsPerPageOptions={[5, 10, 25, 100]}
        component="div"
        count={records.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
    />
</>);
}