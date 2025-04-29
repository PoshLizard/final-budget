import React, { useState } from 'react';

const BudgetDash = () => {
  const [budgetRows, setBudgetRows]       = useState([]);
  const [expenseName, setExpenseName]     = useState('');
  const [expenseAmount, setExpenseAmount] = useState('');

  const addExpense = () => {
    if (!expenseName || !expenseAmount) return;

    const newRow = {
      id: Date.now(),
      name: expenseName,
      amount: parseFloat(expenseAmount),
    };

    setBudgetRows(prev => [...prev, newRow]);
    setExpenseName('');
    setExpenseAmount('');
  };

  const removeExpense = id => {
    setBudgetRows(prev => prev.filter(r => r.id !== id));
  };

  return (
    <div className="BudgetDash">
      <div className="addExpense">
        <label>
          Expense:
          <input
            type="text"
            value={expenseName}
            onChange={e => setExpenseName(e.target.value)}
            placeholder="Name"
          />
        </label>
        <label>
          Amount:
          <input
            type="number"
            value={expenseAmount}
            onChange={e => setExpenseAmount(e.target.value)}
            placeholder="0.00"
          />
        </label>
        <button onClick={addExpense}>Add</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Expenses</th>
            <th>Amount</th>
            <th> </th>
          </tr>
        </thead>
        <tbody>
          {budgetRows.map(row => (
            <tr key={row.id}>
              <td>{row.name}</td>
              <td>${row.amount.toFixed(2)}</td>
              <td>
                <button onClick={() => removeExpense(row.id)}>Remove</button>
              </td>
            </tr>
          ))}
          {budgetRows.length === 0 && (
            <tr>
              <td colSpan="3" style={{ textAlign: 'center' }}>
                No expenses added yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default BudgetDash;
