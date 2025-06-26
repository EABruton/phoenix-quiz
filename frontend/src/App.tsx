import "./App.css";
import { Fragment } from "react";
import SignupPage from "./pages/Accounts/SignupPage/SignupPage";
import { BrowserRouter, Route, Routes } from "react-router";
import QuestionsPage from "./pages/QuestionsPage/QuestionsPage";
import LoginPage from "./pages/Accounts/LoginPage/LoginPage";

export const ROUTE_SIGNUP = "/signup";
export const ROUTE_LOGIN = "/login";
export const ROUTE_QUESTION_CATALOG = "/question-catalog";

function App() {
  return (
    <Fragment>
      <BrowserRouter>
        <Routes>
          <Route path={ROUTE_SIGNUP} element={<SignupPage />} />
          <Route path={ROUTE_LOGIN} element={<LoginPage />} />
          <Route path={ROUTE_QUESTION_CATALOG} element={<QuestionsPage />} />
        </Routes>
      </BrowserRouter>
    </Fragment>
  );
}

export default App;
