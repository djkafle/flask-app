import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import DashboardCustomizeRounded from "@mui/icons-material/DashboardCustomizeRounded";
import EditIcon from "@mui/icons-material/Edit";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import AddTransaction from "../AddTransaction/AddTransaction";
import "./TransactionsList.css";

const TransactionsList = () => {
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState([]);
  const [editTransactionData, setEditTransactionData] = useState(null);

  const fetchTransactions = async () => {
    try {
      const response = await axios.get("http://finance-backend-service:8000/transactions/");
      setTransactions(response.data);
      console.log("Transactions:", response.data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  const handleEditTransaction = async (id) => {
    try {
      const response = await axios.get(
        `http://finance-backend-service:8000/transactions/${id}/`
      );
      console.log("Edit transaction data:", response.data);
      setEditTransactionData(response.data);
      setShowAddTransaction(true);
    } catch (error) {
      console.error("Error fetching transaction data:", error);
    }
  };

  const handleDeleteTransaction = async (id) => {
    try {
      await axios.delete(`http://finance-backend-service:8000/transactions/${id}/`);
      console.log("Deleted transaction:", id);
      fetchTransactions();
    } catch (error) {
      console.error("Error deleting transaction:", error);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const columns = [
    { field: "rid", headerName: "ID", flex: 1 },
    { field: "type", headerName: "Type", flex: 1 },
    { field: "category", headerName: "Category", flex: 1 },
    { field: "description", headerName: "Description", flex: 1 },
    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      sortable: true,
      flex: 1,
    },
    {
      field: "actions",
      headerName: "Actions",
      renderCell: (params) => (
        <div>
          <Button
            onClick={() => handleEditTransaction(params.row.id)}
            startIcon={<EditIcon style={{ color: "green" }} />}
          ></Button>
          <Button
            onClick={() => handleDeleteTransaction(params.row.id)}
            startIcon={<DeleteRoundedIcon style={{ color: "red" }} />}
          ></Button>
        </div>
      ),
      flex: 1,
    },
  ];

  const rows = transactions.map((transaction, index) => ({
    id: transaction.id,
    rid: index + 1,
    type: transaction.type,
    category: transaction.category,
    description: transaction.description,
    amount: transaction.amount,
  }));

  const paginationModel = { page: 0, pageSize: 5 };

  const [showAddTransaction, setShowAddTransaction] = useState(false);

  const handleAddTransactionClick = () => {
    setEditTransactionData(null);
    setShowAddTransaction(true);
  };

  const handleFormSubmit = () => {
    setShowAddTransaction(false);
    fetchTransactions();
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
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
          startIcon={<DashboardCustomizeRounded />}
          onClick={() => navigate("/")}
        >
          Dashboard
        </Button>
        <Button
          className=""
          variant="contained"
          onClick={handleAddTransactionClick}
          sx={{ backgroundColor: "#1BCFB4", color: "#fff" }}
        >
          Add Transaction
        </Button>
      </div>
      {showAddTransaction && (
        <AddTransaction
          editTransactionData={editTransactionData}
          onFormSubmit={handleFormSubmit}
        />
      )}

      <div
        style={{
          margin: "20px",
          width: "full",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Paper
          className="trans-table-child"
          sx={{ flex: 1, display: "flex", flexDirection: "column" }}
        >
          <DataGrid
            rows={rows}
            columns={columns}
            getRowId={(row) => row.id}
            initialState={{ pagination: { paginationModel } }}
            pageSizeOptions={[5, 10]}
            sx={{ flex: 1, border: 0 }}
          />
        </Paper>
      </div>
    </div>
  );
};

export default TransactionsList;
