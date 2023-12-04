import { QUESTION_BANK_TABLE_ROW } from "../../constant/QuestionBank";

const tableData = [
    {
        name: "What is React?  Explain it in detail",
        description: "",
        type: "Public",
        addedBy: "Phone Pe",
        createdAt: {
            date: "01/01/2023",
            time: "10:30 AM",
        },
    },
    {
        name: "Explain advantage of using react",
        description: "",
        type: "Private",
        addedBy: "Phone Pe",
        createdAt: {
            date: "01/01/2023",
            time: "10:30 AM",
        },
    },
    {
        name: "What is Babel?",
        description: "",
        type: "Public",
        addedBy: "Bhart Pe",
        createdAt: {
            date: "01/01/2023",
            time: "10:30 AM",
        },
    },
    {
        name: "What is React?  Explain it in detail",
        description: "",
        type: "Public",
        addedBy: "Flipkart",
        createdAt: {
            date: "01/01/2023",
            time: "10:30 AM",
        },
    },
    {
        name: "Explain advantage of using react",
        description: "",
        type: "Private",
        addedBy: "Phone Pe",
        createdAt: {
            date: "01/01/2023",
            time: "10:30 AM",
        },
    },
    {
        name: "What is Babel?",
        description: "",
        type: "Public",
        addedBy: "Amazon",
        createdAt: {
            date: "01/01/2023",
            time: "10:30 AM",
        },
    },
];

const QuestionBankTable = () => {
    return (
            <table className="table-main">
                <thead>
                    {
                        QUESTION_BANK_TABLE_ROW?.map(({label}) => {
                            return (
                                <th>{label}</th>
                            )
                        })
                    }
                </thead>
                <tbody>
                    {
                        tableData?.map(({name,description, type, addedBy, createdAt},index)=>{
                            return (
                                <tr>
                                        <td>{index+1}.</td>
                                        <td>{name}</td>
                                        <td>{type}</td>
                                        <td>{addedBy}</td>
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
export default QuestionBankTable;