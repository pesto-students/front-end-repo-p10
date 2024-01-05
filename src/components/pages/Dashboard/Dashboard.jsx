import { Box, Typography } from "@material-ui/core";
import "./Dashboard.scss";
import TopHeader from "../../common/TopHeader";
import { HEADERS } from "../../constant/Header";
import { Line } from "react-chartjs-2";
import Chart from 'chart.js/auto';
import Navbar from "../../common/Navbar/index";
import { useEffect, useState } from "react";
import { getInterviewStatsAPI } from "../../../services/interview";
import { toast } from "react-toastify";
import { INTERVIEW_TYPE } from "../../constant/Interviews";
import { getGraphDataAPI } from "../../../services/dashboard";
const {UPCOMING, PASSED, FAILED, CANCELLED} = INTERVIEW_TYPE;
let tempStatsData = [
    {
        label: "Upcoming",
        count: "0",
        route: "",
        key: UPCOMING,
    },
    {
        label: "Passed",
        count: "0",
        route: "",
        key: PASSED,
    },
    {
        label: "Failed",
        count: "0",
        route: "",
        key: FAILED,
    },
    {
        label: "Cancelled",
        count: "0%",
        route: "",
        key: CANCELLED,
    },
];

const chartData = {
    labels: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sept","Oct","Nov","Dec"],
    datasets: [
      {
        label: "Interviews",
        data: [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
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
const LIMIT = 10;

const Dashboard = () => {
    const {DASHBOARD} = HEADERS;
    const [interviewStats, setInterviewStats] = useState();
    const [statsData,setStatsData] = useState(tempStatsData); 
    const [graphData,setGraphData] = useState([]);

    const getInterviewStats = () => {
        getInterviewStatsAPI()
          .then((res) => {
            const data = res.data?.data;
            setInterviewStats(data);
          })
          .catch((error) => {
            toast.error(
              error?.data?.message || error?.data?.toString() || error?.toString(),
              {
                position: "top-right",
              }
            );
          });
      };


      useEffect(()=>{
          if(interviewStats && interviewStats?.length > 0)
          {
              let copyStatsData = [...statsData]
              copyStatsData = copyStatsData?.map(item=>{
                const stat = interviewStats?.find(list=>(list?._id === item?.key));
                item.count = stat?.count || 0;
                return item;
            })
            setStatsData(copyStatsData)
        }
      },[interviewStats])
      useEffect(() => {
          getInterviewStats();
      }, []);

    return <Box className="dashboard-main-container">
            <Navbar/>
            <TopHeader header={DASHBOARD}/>
            <Box className="wrapper">
                <Box className="stats-main">
                    {
                        statsData?.map(({label="",count=0,route,key})=>{
                            return (
                                <Box key={key} className="single">
                                    <Typography className="head">{label}</Typography>
                                    <Typography className="count">{count}</Typography>
                                    {/* <Typography className="view">View All</Typography> */}
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