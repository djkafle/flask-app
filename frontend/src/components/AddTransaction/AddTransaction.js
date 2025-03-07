import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  Card,
  FormLabel,
  MenuItem,
  Select,
  TextareaAutosize,
} from "@mui/material";
import "./AddTransaction.css";
import PropTypes from "prop-types";

const AddTransaction = ({ editTransactionData, onFormSubmit }) => {
  const [type, setType] = useState("expense");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (editTransactionData) {
      setType(editTransactionData.type);
      setCategory(editTransactionData.category);
      setAmount(editTransactionData.amount);
      setDescription(editTransactionData.description);
    }
  }, [editTransactionData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const transaction = {
      type,
      category,
      amount: parseFloat(amount),
      description,
      date: new Date().toISOString(),
      id : editTransactionData ? editTransactionData.id : 0  // Add id to the transaction object if it is an edit operation
    };

    try {
      if (editTransactionData) {
        await axios.put(
          `http://finance-backend-service:8000/transactions/${editTransactionData.id}/`,
          transaction
        );
        alert("Transaction updated successfully!");
      } else {
        await axios.post("http://finance-backend-service:8000/transactions/", transaction);
        alert("Transaction added successfully!");
      }
      // Reset the form
      setType("expense");
      setCategory("");
      setAmount("");
      setDescription("");
      onFormSubmit();
    } catch (error) {
      console.error("Error saving transaction:", error);
      alert("Error saving transaction");
    }
  };

  const validateForm = () => {
    if (!category || !amount || isNaN(amount) || parseFloat(amount) <= 0) {
      alert("Please fill out all fields correctly.");
      return false;
    }
    return true;
  };

  return (
    <div className="addtransaction_container">
      <form
        onSubmit={(e) => {
          if (validateForm()) {
            handleSubmit(e);
          }
        }}
      >
        <Card className="addtransaction_card">
          <div className="addtransaction_form">
            <FormLabel>Type:</FormLabel>
            <Select
              className="select_type"
              value={type}
              label="Type"
              onChange={(e) => setType(e.target.value)}
            >
              <MenuItem key="expense" value={"expense"}>
                Expense
              </MenuItem>
              <MenuItem key="income" value={"income"}>
                Income
              </MenuItem>
            </Select>
          </div>
          <div className="addtransaction_form">
            <FormLabel>Category:</FormLabel>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            />
          </div>
          <div className="addtransaction_form">
            <FormLabel>Amount:</FormLabel>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>
          <div className="addtransaction_form">
            <FormLabel>Description:</FormLabel>
            <TextareaAutosize
              className="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="addtransaction_buttons">
            <Button className="saveBtn" type="submit">
              {editTransactionData ? "Update" : "Save"}
            </Button>
            <Button
              className="cancelBtn"
              type="button"
              onClick={() => {
                setType("expense");
                setCategory("");
                setAmount("");
                setDescription("");
                onFormSubmit();
              }}
            >
              Cancel
            </Button>
          </div>
        </Card>
      </form>
    </div>
  );
};
AddTransaction.propTypes = {
  editTransactionData: PropTypes.shape({
    type: PropTypes.string,
    category: PropTypes.string,
    amount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    description: PropTypes.string,
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }),
  onFormSubmit: PropTypes.func.isRequired,
};

export default AddTransaction;
