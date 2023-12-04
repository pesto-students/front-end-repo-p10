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
    },
    {
        label: "Passed",
        route: "/passed",
        key: INTERVIEW_TYPE.PASSED,
    },
    {
        label: "Failed",
        route: "/failed",
        key: INTERVIEW_TYPE.FAILED,
    },
    {
        label: "Cancelled",
        route: "/cancelled",
        key: INTERVIEW_TYPE.CANCELLED,
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