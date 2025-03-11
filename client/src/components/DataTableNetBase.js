import React, { memo } from "react";
import DataTable from 'datatables.net-react';
import DT from 'datatables.net-bs5';
import 'datatables.net-responsive-bs5';
 
DataTable.use(DT);

const DataTableNetBase = (props) => {

    // const [tableData, setTableData] = useState(props.data);
    return (
        <>
        <DataTable 
            data={props.data} 
            className="table table-bordered table-striped table-hover"
            options={{
                paging: false,
                ...props.options
            }}
           slots={props.slots}
        >
            {props.children}
        </DataTable>

        </>
    );
}
export default memo(DataTableNetBase);