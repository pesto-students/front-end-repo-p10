import { CLIENTS_LIST_TABLE_ROW } from "../../constant/Clients";

const tableData = [
   {
        companyName: "Razorpay",
        userName: "Aman",
        email: "aman@razorpay.com",
        phoneNo: "+91 9898765575",
        status: "ACTIVE",
        createdAt: {
            date: "01/02/2023",
            time: "10:40 pm",
        }
   },
   {
    companyName: "Bhart pe",
    userName: "Vijay",
    email: "vijay@bhartpe.com",
    phoneNo: "+91 9898765575",
    status: "ACTIVE",
    createdAt: {
        date: "01/02/2023",
        time: "10:40 pm",
    }
},
{
    companyName: "Razorpay",
    userName: "Aman",
    email: "aman@razorpay.com",
    phoneNo: "+91 9898765575",
    status: "ACTIVE",
    createdAt: {
        date: "01/02/2023",
        time: "10:40 pm",
    }
},
{
companyName: "Bhart pe",
userName: "Vijay",
email: "vijay@bhartpe.com",
phoneNo: "+91 9898765575",
status: "ACTIVE",
createdAt: {
    date: "01/02/2023",
    time: "10:40 pm",
}
},
];

const ClientsListTable = () => {
    return (
            <table className="table-main">
                <thead>
                    {
                        CLIENTS_LIST_TABLE_ROW?.map(({label}) => {
                            return (
                                <th>{label}</th>
                            )
                        })
                    }
                </thead>
                <tbody>
                    {
                        tableData?.map(({userName,companyName,email,phoneNo,status,createdAt},index)=>{
                            return (
                                <tr>
                                        <td>{index+1}.</td>
                                        <td>{userName}</td>
                                        <td>{companyName}</td>
                                        <td>{email}</td>
                                        <td>{status}</td>
                                        <td>{createdAt?.date}</td>
                                        <td>edit</td>
                                    </tr>
                            )
                        })
                    }
                </tbody>
            </table>
    )
}
export default ClientsListTable;