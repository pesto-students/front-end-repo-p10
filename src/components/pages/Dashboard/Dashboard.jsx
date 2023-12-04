import { Box, Typography } from "@material-ui/core";
import "./Dashboard.scss";
import TopHeader from "../../common/TopHeader";
import { HEADERS } from "../../constant/Header";
import { Line } from "react-chartjs-2";
import Chart from 'chart.js/auto';
const statsData = [
    {
        label: "Total Interviews",
        count: "10",
        route: "",
        key: "TOTAL_INTEVIEWS",
    },
    {
        label: "Upcoming",
        count: "5",
        route: "",
        key: "UPCOMING",
    },
    {
        label: "Completed Interviews",
        count: "10",
        route: "",
        key: "COMPLETED_INTERVIEWS",
    },
    {
        label: "Average Score",
        count: "80%",
        route: "",
        key: "AVERAGE_SCORE",
    },
];

const chartData = {
    labels: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sept","Oct","Nov","Dec"],
    datasets: [
      {
        label: "Interviews",
        data: [2400, 1800, 3300, 3000, 1600,2400, 1800, 2100, 3000, 1600, 2500, 1600],
        fill: false,
        borderColor: "#261958",
      },
    ],
  };

  const options = {
    legend: {
        display: false,
            labels: {
                display: false
            }
        },
        scales: {
            xAxes: [
              {
                gridLines: {
                  color: '#ff0000',
                  borderDash: [1, 3],
                },
                display: false, // this will hide vertical lines
              },
            ],
          },
    }
const Dashboard = () => {
    const {DASHBOARD} = HEADERS;
    return <Box className="dashboard-main-container">
            <TopHeader header={DASHBOARD}/>
            <Box className="wrapper">
                <Box className="stats-main">
                    {
                        statsData?.map(({label,count,route,key})=>{
                            return (
                                <Box key={key} className="single">
                                    <Typography className="head">{label}</Typography>
                                    <Typography className="count">{count}</Typography>
                                    <Typography className="view">View All</Typography>
                                </Box>
                            )
                        })
                    }
                    
                </Box>
                <Box className="chart-main">
                    <Line data={chartData} />
                </Box>
            </Box>
    </Box>
}
export default Dashboard;