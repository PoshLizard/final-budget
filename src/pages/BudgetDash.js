import React, { useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const BudgetDash = () => {
  //state variables for total budget, expenses and their values, edit mode which toggles the modal, 
  //and temporary variables for the edit form and one for tracking the id
  const [budget, setBudget] = useState(0.0);
  const [budgetRows, setBudgetRows] = useState([]);
  const [expenseName, setExpenseName] = useState("");
  const [expenseAmount, setExpenseAmount] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [tempExpenseName, setTempExpenseName] = useState("");
  const [tempExpenseAmount, setTempExpenseAmount] = useState("");
  const [tempExpenseId, setTempExpenseId] = useState("");

  //logic to handle adding expense, creates new object and 
  //then updates the state with it and resets the name and amount
  const addExpense = () => {
    if (!expenseName || !expenseAmount) return;
    const newRow = {
      id: Date.now(),
      name: expenseName,
      amount: parseFloat(expenseAmount),
    };
    setBudgetRows((prev) => [...prev, newRow]);
    setExpenseName("");
    setExpenseAmount("");
  };

  //logic to handle removing expenses, sets the state with the previous state with the 
  //row removed according to the id
  const removeExpense = (id) => {
    setBudgetRows((prev) => prev.filter((r) => r.id !== id));
  };

  //logic to handle editing the expense, takes the id and finds it in the budgetRows
  //uses that to set the temporary variables to the values of the row
  //then sets edit mode to true which opens triggers the modal
  const editExpense = (id) => {
    const rowToEdit = budgetRows.find((row) => row.id === id);
    setTempExpenseAmount(rowToEdit.amount);
    setTempExpenseName(rowToEdit.name);
    setTempExpenseId(rowToEdit.id);
    setEditMode(true);
  }
  
  //logic to handle submitting the edit, when you click the button it sets the state
  //the updated rows that includes the new row. and resets the temp variables back to empty.
  //finally sets editmode to false to close the modal
  const submitExpense = (id) => {
    if (!tempExpenseName || !tempExpenseAmount) return;
    const updatedRows = budgetRows.map((row) => {
      if (row.id === tempExpenseId) {
        return {
          ...row,
          name: tempExpenseName,
          amount: parseFloat(tempExpenseAmount),
        };
      }
      return row;
    });
    setBudgetRows(updatedRows);
    setTempExpenseName("");
    setTempExpenseAmount("");
    setEditMode(false);
  }

  //colors for the pie chart
  const COLORS = [
    '#0088FE', 
    '#00C49F', 
    '#FFBB28', 
    '#FF8042', 
    '#A28DFF', 
    '#FF6699', 
    '#33CC33', 
    '#FF4444', 
    '#9966CC', 
    '#FFCC00', 
    '#00BFFF', 
    '#FF9933',
    '#66CCCC', 
    '#CC6666', 
    '#3399FF', 
    '#999999', 
  ];

  //JSX to render the component, 

  return (
    <div className="BudgetDash">
      {editMode && (
        <div className="editModalBG">
          <div className ="editModal">
              <label>
                      Expense:
                      <input
                        type="text"
                        value={tempExpenseName}
                        onChange={(e) => setTempExpenseName(e.target.value)}
                      />
                    </label>
                    <label>
                      Amount:
                      <input
                        type="number"
                        value={tempExpenseAmount}
                        onChange={(e) => setTempExpenseAmount(e.target.value)}
                      />
                    </label>
                    <button className="default-button" onClick={(e) => submitExpense(e.target.value)}>Submit</button>
            </div>
          </div>
        )
      }
      
      <div className="container">
        <div className="vertical">

        <div className="budget">
        <label style={{ fontSize: "2rem", fontWeight: "bold"}}>
          TOTAL BUDGET:
          <input
            style={{ fontSize: "2rem", marginLeft: "20px", fontWeight: "bold"}}
            type="number"
            
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            placeholder="$0.00"
          />
        </label>
      </div>
          <h2>
            Total Expenses: $
            {budgetRows.reduce((acc, row) => acc + row.amount, 0).toFixed(2)}
          </h2>
          <div className="addExpense">
            <label>
              Expense:
              <input
                type="text"
                value={expenseName}
                onChange={(e) => setExpenseName(e.target.value)}
                placeholder="Name"
              />
            </label>
            <label>
              Amount:
              <input
                type="number"
                value={expenseAmount}
                onChange={(e) => setExpenseAmount(e.target.value)}
                placeholder="0.00"
              />
            </label>
            <button className="default-button" onClick={addExpense}>Add</button>
            <table className="budget-table">
              <thead>
                <tr>
                  <th>Expenses</th>
                  <th>Amount</th>
                  <th>REMOVE </th>
                  <th>EDIT</th>
                </tr>
              </thead>
              <tbody>
                {budgetRows.map((row) => (
                  <tr key={row.id}>
                    <td>{row.name}</td>
                    <td>${row.amount.toFixed(2)}</td>
                    <td>
                      <button className="default-button" onClick={() => removeExpense(row.id)}>
                        Delete
                      </button>
                    </td>
                    <td>
                      <button className="default-button" onClick={() => editExpense(row.id)}>
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
                {budgetRows.length === 0 && (
                  <tr>
                    <td colSpan="1" style={{ textAlign: "center" }}>
                      None
                    </td>
                    <td>N/A</td>
                    <td>N/A</td>
                    <td>N/A</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        <div className= "vertical">
        <h2>
            Remaining Budget: 
            ${Math.max(budget - budgetRows.reduce((acc, row) => acc + row.amount, 0), 0).toFixed(2)}
          </h2>
          <div>
            <PieChart width={500} height={500}>
              <Pie
                data={budgetRows}
                cx="50%"
                cy="50%"
                outerRadius={200}
                dataKey="amount"
                nameKey="name"
                label={({ name }) => name}
              >
              {budgetRows.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BudgetDash;
