import React from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import { Button, Card, Grid2, CardContent, Typography } from "@mui/material";
import { Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
} from "chart.js";

const Dashboard = () => {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    ArcElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  const navigate = useNavigate();  
  const [totalBalance, setTotalBalance] = React.useState(0);

  //get total balance
  React.useEffect(() => {
    axios.get("http://finance-backend-service.default.svc.cluster.local:8000/transactions/transactions/total_balance")
      .then((response) => {
        setTotalBalance(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the total balance!", error);
      });
  }, []);

  const lineData = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    datasets: [
      {
        label: "Income",
        data: [500, 1000, 1500, 2000],
        borderColor: "green",
        fill: false,
      },
      {
        label: "Expenses",
        data: [400, 800, 1200, 1600],
        borderColor: "red",
        fill: false,
      },
    ],
  };

  const pieData = {
    labels: ["Food", "Utilities", "Entertainment"],
    datasets: [
      {
        data: [200, 150, 100],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  };

  const handleTransactions = () => {
    navigate("/transactions");
  };
  return (
    <div className="dashboard">
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          margin: "10px",
        }}
      >
        <Button
          variant="contained"
          sx={{
            marginRight: "10px",
            backgroundColor: "#4bcbeb",
            color: "#fff",
          }}
          onClick={handleTransactions}
        >
          Transactions
        </Button>
        <Button
          className=""
          variant="contained"
          sx={{ backgroundColor: "#1BCFB4", color: "#fff" }}
        >
          Category
        </Button>
      </div>

      
      <div style={{ margin: "20px" }}>
        <Grid2 container spacing={2} minHeight={120}>
          <Grid2
            display="flex"
            justifyContent="center"
            alignItems="stretch"
            size="grow"
          >
            <Card
              style={{
                background: "#e3e3e3",
                height: "100%",
                width: "100%",
              }}
            >
              <CardContent>
                <Typography variant="h6" color="textSecondary">
                  Total Balance
                </Typography>
                <Typography variant="h4" color="primary">
                  ${totalBalance}
                </Typography>
              </CardContent>
            </Card>
          </Grid2>

          {/* Card 2: Expenses Summary */}
          <Grid2
            display="flex"
            justifyContent="center"
            alignItems="stretch"
            size="grow"
          >
            <Card
              style={{
                background: "#e3e3e3",
                height: "100%",
                width: "100%",
              }}
            >
              <CardContent>
                <Typography variant="h6" color="textSecondary">
                  Expenses Summary
                </Typography>
                <Typography variant="h4" color="error">
                  $1,200
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Last 30 days
                </Typography>
              </CardContent>
            </Card>
          </Grid2>

          {/* Card 3: Recent Transactions */}
          <Grid2
            display="flex"
            justifyContent="center"
            alignItems="stretch"
            size="grow"
          >
            <Card
              style={{
                background: "#e3e3e3",
                height: "100%",
                width: "100%",
              }}
            >
              <CardContent>
                <Typography variant="h6" color="textSecondary">
                  Recent Transactions
                </Typography>
                <Typography variant="body1" color="textPrimary">
                  - $200 (Groceries)
                </Typography>
                <Typography variant="body1" color="textPrimary">
                  - $50 (Transport)
                </Typography>
                <Typography variant="body1" color="textPrimary">
                  + $1,000 (Salary)
                </Typography>
              </CardContent>
            </Card>
          </Grid2>
        </Grid2>
      </div>
      <div style={{ margin: "20px", marginTop: "30px" }}>
        <Grid2 container spacing={2}>
          <Grid2 size={8}>
            <Card>
              <Typography variant="h6" color="textSecondary">
                Income vs Expenses
              </Typography>
              <Line data={lineData} />
            </Card>
          </Grid2>
          <Grid2 size={4}>
            <Card>
              <Typography variant="h6" color="textSecondary">
                Category of Expenses
              </Typography>
              <Pie data={pieData} />
            </Card>
          </Grid2>
        </Grid2>
      </div>
    </div>
  );
};

export default Dashboard;
