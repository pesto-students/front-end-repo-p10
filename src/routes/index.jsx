import { Suspense, lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Loader from "../components/common/Loader";
import { ProtectedRoute } from "./protected";

const Login = lazy(() => import("../components/pages/Login/Login"));
const SuperAdmin = lazy(() => import("../components/pages/SuperAdmin/SuperAdmin"));
const Dashboard = lazy(() => import("../components/pages/Dashboard/Dashboard"));
const InterviewsList = lazy(() =>
  import("../components/pages/Interviews/Interviews")
);
const InterviewAdd = lazy(() =>
  import("../components/pages/Interviews/AddInterview")
);
const QuestionBankList = lazy(() =>
  import("../components/pages/QuestionBank/QuestionBank")
);
const QuestionAdd = lazy(() =>
  import("../components/pages/QuestionBank/AddQuestion")
);
const ClientList = lazy(() => import("../components/pages/Clients/Clients"));
const ClientAdd = lazy(() => import("../components/pages/Clients/AddClient"));
const Profile = lazy(() => import("../components/pages/Profile/Profile"));
const CodeEditor = lazy(() =>
  import("../components/pages/CodeEditor/CodeEditor")
);
const TestQuestionList = lazy(() =>
  import("../components/pages/CodeEditor/TestQuestionList")
);
const Evaluate = lazy(() =>
import("../components/pages/Evaluate/Evaluate")
);
const RouteContainer = ({ isAuthenticated }) => {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route
          path="/login"
          element={<Login isAuthenticated={isAuthenticated} />}
        />
        <Route
          path="/super-login"
          element={<SuperAdmin isAuthenticated={isAuthenticated} />}
        />
        <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/interviews/:tab?" element={<InterviewsList />} />
          <Route path="/interviews/add" element={<InterviewAdd />} />
          <Route path="/question-bank" element={<QuestionBankList />} />
          <Route path="/question-bank/add" element={<QuestionAdd />} />
          <Route path="/clients" element={<ClientList />} />
          <Route path="/clients/add" element={<ClientAdd />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/code-editor" element={<CodeEditor />} />
          <Route path="/evaluate/:uuid?" element={<Evaluate />} />
        </Route>

        <Route path="/code-editor/:uuid?" element={<TestQuestionList />} />
        <Route
        path="*"
        element={<Navigate to="/dashboard" replace />}
      />
      </Routes>
    </Suspense>
  );
};
export default RouteContainer;
