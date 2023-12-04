import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import Loader from "../components/common/Loader";

const Dashboard = lazy(() => import('../components/pages/Dashboard/Dashboard'));
const InterviewsList = lazy(() => import('../components/pages/Interviews/Interviews'));
const QuestionBankList = lazy(() => import('../components/pages/QuestionBank/QuestionBank'));
const ClientList = lazy(() => import('../components/pages/Clients/Clients'));
const Profile = lazy(() => import('../components/pages/Profile/Profile'));

const RouteContainer = () => { 
    return <Suspense fallback={<Loader/>}>
               <Routes>
                    <Route path="/dashboard" element={<Dashboard/>}/>
                    <Route path="/interviews" element={<InterviewsList/>}/>
                    <Route path="/interviews/:tab" element={<InterviewsList/>}/>
                    <Route path="/question-bank" element={<QuestionBankList/>}/>
                    <Route path="/clients" element={<ClientList/>}/>
                    <Route path="/profile" element={<Profile/>}/>
                    <Route path="*" element={<Dashboard/>}/>
                </Routes>
            </Suspense>          
}
export default RouteContainer;