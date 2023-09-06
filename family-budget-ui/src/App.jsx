import "./App.css";
import { Route, Routes } from "react-router-dom";
import { FormErrorContextProvider } from "./components/shared/FormErrorContext.jsx"; 
import { AuthContextProvider } from "./components/shared/AuthContext.jsx";
import { UserContextProvider } from "./components/shared/UserContext.jsx"; 
import { CategoryContextProvider } from "./components/shared/CategoryContext.jsx"; 
import { ExpenseContextProvider } from "./components/shared/ExpenseContext.jsx"; 
import { IncomeContextProvider } from "./components/shared/IncomeContext.jsx"; 
import { ActorContextProvider } from "./components/shared/ActorContext.jsx"; 
import { CheckContextProvider } from "./components/shared/CheckContext.jsx"; 
import { ReceiptContextProvider } from "./components/shared/ReceiptContext.jsx"; 
import { BudgetContextProvider } from "./components/shared/BudgetContext.jsx"; 
import { ReportContextProvider } from "./components/shared/ReportContext.jsx"; 
import Layout from "./components/shared/Layout.jsx";
import ProtectedRoute from "./components/shared/ProtectedRoute.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import UserProfile from "./pages/UserProfile.jsx";
import UserPassword from "./pages/UserPassword.jsx";
import Checks from "./pages/Checks.jsx";
import Categories from "./pages/Categories.jsx";
import Expenses from "./pages/Expenses.jsx";
import Incomes from "./pages/Incomes.jsx";
import Actors from "./pages/Actors.jsx";
import Budgets from "./pages/Budgets.jsx";
import Reports from "./pages/Reports.jsx";
 
function App() {
  return (
    <>
      <FormErrorContextProvider>
        <AuthContextProvider>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route
                path="/checks"
                element={
                  <ProtectedRoute accessBy="authenticated">
                    <IncomeContextProvider>
                      <ExpenseContextProvider>
                        <ActorContextProvider>
                          <ReceiptContextProvider>
                            <CheckContextProvider>
                              <Checks />
                            </CheckContextProvider>
                          </ReceiptContextProvider>
                        </ActorContextProvider>
                      </ExpenseContextProvider>
                    </IncomeContextProvider>
                  </ProtectedRoute>
                }
              ></Route>
              <Route
                path="/budgets"
                element={
                  <ProtectedRoute accessBy="authenticated">
                    <BudgetContextProvider>
                      <Budgets />
                    </BudgetContextProvider>
                  </ProtectedRoute>
                }
              ></Route>
              <Route
                path="/reports"
                element={
                  <ProtectedRoute accessBy="authenticated">
                    <ReportContextProvider>
                      <Reports />
                    </ReportContextProvider>
                  </ProtectedRoute>
                }
              ></Route>
              <Route
                path="/categories"
                element={
                  <ProtectedRoute accessBy="authenticated">
                    <CategoryContextProvider>
                      <Categories />
                    </CategoryContextProvider>
                  </ProtectedRoute>
                }
                ></Route>
              <Route
                path="/expenses"
                element={
                  <ProtectedRoute accessBy="authenticated">
                    <CategoryContextProvider>
                      <ExpenseContextProvider>
                        <Expenses />
                      </ExpenseContextProvider>
                    </CategoryContextProvider>
                  </ProtectedRoute>
                }
                ></Route>
              <Route
                path="/incomes"
                element={
                  <ProtectedRoute accessBy="authenticated">
                    <IncomeContextProvider>
                      <Incomes />
                    </IncomeContextProvider>
                  </ProtectedRoute>
                }
                ></Route>
              <Route
                path="/actors"
                element={
                  <ProtectedRoute accessBy="authenticated">
                    <ActorContextProvider>
                      <Actors />
                    </ActorContextProvider>
                  </ProtectedRoute>
                }
                ></Route>
              <Route
                path="/login"
                element={
                  <ProtectedRoute accessBy="non-authenticated">
                    <Login />
                  </ProtectedRoute>
                }
              ></Route>
              <Route
                path="/register"
                element={
                  <ProtectedRoute accessBy="non-authenticated">
                    <Register />
                  </ProtectedRoute>
                }
              ></Route>
              <Route
                path="/profile"
                element={
                  <ProtectedRoute accessBy="authenticated">
                    <UserContextProvider>
                      <UserProfile />
                    </UserContextProvider>
                  </ProtectedRoute>
                }
              ></Route>
              <Route
                path="/password"
                element={
                  <ProtectedRoute accessBy="authenticated">
                    <UserContextProvider>
                      <UserPassword />
                    </UserContextProvider>
                  </ProtectedRoute>
                }
              ></Route>
            </Routes>
          </Layout>
        </AuthContextProvider>
      </FormErrorContextProvider>
    </>
  );
}

export default App;