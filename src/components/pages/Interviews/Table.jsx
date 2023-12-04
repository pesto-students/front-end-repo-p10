import { INTERVIEW_TABLE_ROW } from "../../constant/Interviews";

const tableData = [
    {
        candidate: {
            name: "Aman",
            email: "aman@yopmail.com",
            contact: "+91 987654321",
            pic: "/images/interviews/profile.svg",
        },
        client: {
            name: "Phone pe",
        },
        interviewer: {
            name: "Vivek singh",
        },
        scheduledDate: {
            date: "01/01/2023",
            time: "10:30 AM",
        },
        score: "80%",
        interview: null,
    },
    {
        candidate: {
            name: "Aman",
            email: "aman@yopmail.com",
            contact: "+91 987654321",
            pic: "/images/interviews/profile.svg",
        },
        client: {
            name: "Phone pe",
        },
        interviewer: {
            name: "Vivek singh",
        },
        scheduledDate: {
            date: "01/01/2023",
            time: "10:30 AM",
        },
        score: "80%",
        interview: null,
    },
    {
        candidate: {
            name: "Aman",
            email: "aman@yopmail.com",
            contact: "+91 987654321",
            pic: "/images/interviews/profile.svg",
        },
        client: {
            name: "Phone pe",
        },
        interviewer: {
            name: "Vivek singh",
        },
        scheduledDate: {
            date: "01/01/2023",
            time: "10:30 AM",
        },
        score: "80%",
        interview: null,
    },
    {
        candidate: {
            name: "Aman",
            email: "aman@yopmail.com",
            contact: "+91 987654321",
            pic: "/images/interviews/profile.svg",
        },
        client: {
            name: "Phone pe",
        },
        interviewer: {
            name: "Vivek singh",
        },
        scheduledDate: {
            date: "01/01/2023",
            time: "10:30 AM",
        },
        score: "80%",
        interview: null,
    },
];

const InteviewTable = () => {
    return (
            <table className="table-main">
                <thead>
                    {
                        INTERVIEW_TABLE_ROW?.map(({label}) => {
                            return (
                                <th>{label}</th>
                            )
                        })
                    }
                </thead>
                <tbody>
                    {
                        tableData?.map(({candidate, client, interviewer, scheduledDate, score},index)=>{
                            return (
                                <tr>
                                        <td>{index+1}.</td>
                                        <td>{candidate?.name}</td>
                                        <td>{client?.name}</td>
                                        <td>{interviewer?.name}</td>
                                        <td>{scheduledDate?.date}</td>
                                        <td>{score}</td>
                                        <td>edit</td>
                                    </tr>
                            )
                        })
                    }
                </tbody>
            </table>
    )
}
export default InteviewTable;