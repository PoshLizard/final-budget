import React, { useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const BudgetDash = () => {
  const [budget, setBudget] = useState(0);
  const [budgetRows, setBudgetRows] = useState([]);
  const [expenseName, setExpenseName] = useState("");
  const [expenseAmount, setExpenseAmount] = useState("");

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

  const removeExpense = (id) => {
    setBudgetRows((prev) => prev.filter((r) => r.id !== id));
  };

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

  return (
    <div className="BudgetDash">
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
      <div className="container">
        <div className="vertical">
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
                </tr>
              </thead>
              <tbody>
                {budgetRows.map((row) => (
                  <tr key={row.id}>
                    <td>{row.name}</td>
                    <td>${row.amount.toFixed(2)}</td>
                    <td>
                      <button onClick={() => removeExpense(row.id)}>
                        X
                      </button>
                    </td>
                  </tr>
                ))}
                {budgetRows.length === 0 && (
                  <tr>
                    <td colSpan="1" style={{ textAlign: "center" }}>
                      No expenses added yet.
                    </td>
                    <td></td>
                    <td></td>
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
            <PieChart width={400} height={400}>
              <Pie
                data={budgetRows}
                cx="50%"
                cy="50%"
                outerRadius={100}
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
