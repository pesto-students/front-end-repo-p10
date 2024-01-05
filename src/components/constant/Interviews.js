export const INTERVIEW_TYPE = {
    UPCOMING: "UPCOMING",
    PASSED: "PASSED",
    FAILED: "FAILED",
    CANCELLED: "CANCELLED",
}
export const INTERVIEW_TABS = [
    {
        label: "Upcoming",
        route: "/upcoming",
        key: INTERVIEW_TYPE.UPCOMING,
        count:0,
    },
    {
        label: "Passed",
        route: "/passed",
        key: INTERVIEW_TYPE.PASSED,
        count:0,
    },
    {
        label: "Failed",
        route: "/failed",
        key: INTERVIEW_TYPE.FAILED,
        count:0,
    },
    {
        label: "Cancelled",
        route: "/cancelled",
        key: INTERVIEW_TYPE.CANCELLED,
        count:0,
    },
];

export const INTERVIEW_TABLE_ROW = [
    {
        label: "S.No.",
    },
    {
        label: "Candidate",
    },
    {
        label: "Client",
    },
    {
        label: "Interviewer",
    },
    {
        label: "Date",
    },
    {
        label: "Score",
    },
    {
        label: "Action",
    },
]