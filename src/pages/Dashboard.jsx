import { useNavigate } from "react-router-dom";
import DashboardLayout from "../layout/dashboardLayout";

const Dashboard = () => {
    const navigate = useNavigate();
    
    return (
        <div>
         <DashboardLayout/>
        </div>
    );
};

export default Dashboard;
