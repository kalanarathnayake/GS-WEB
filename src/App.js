import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AddBudget from './components/budget/add-budget.component';
import BudgetList from './components/budget/budget-list.component';
import EditBudget from './components/budget/budget-edit.component';
import ExpensesList from './components/Expenses/expenses-list.component';
import AddExpense from './components/Expenses/add-expenses.component';
import EditExpenses from './components/Expenses/expenses-edit.component';
import PeopleList from './components/People/people-list.component';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path="/" element={<PeopleList />} />
          <Route exact path="/addBudget" element={<AddBudget />} />
          <Route exact path="/addExpenses" element={<AddExpense />} />
          <Route exact path="/budget" element={<BudgetList />} />
          <Route exact path="/expenses" element={<ExpensesList />} />
          <Route exact path="/editExpenses" element={<EditExpenses />} />
          <Route exact path="/editBudget" element={<EditBudget />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;