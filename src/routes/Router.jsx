

import {
    createBrowserRouter,
} from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/Home/Home/Home";
import Register from "../pages/Register/Register";
import Login from "../pages/Login/Login";
import Route from "../layout/Route";
import ManageUsers from "../pages/AdminRoute/ManageUsers";
import CashIn from "../pages/UserRoute/CashIn";
import SendMoney from "../pages/UserRoute/SendMoney";
import CashOut from "../pages/UserRoute/CashOut";
import TransactionHistory from "../pages/UserRoute/TransactionHistory";
import ManageCashIn from "../pages/AgentRoute/ManageCashIn";
export const router = createBrowserRouter([
    {
        path: '/',
        element: <Route></Route>,
        children: [
            {
                path: '/register',
                element: <Register></Register>
            },
            {
                path: '/',
                element: <Login></Login>
            }
        ]
    },

    {
        path: "/dashboard",
        element: <Main></Main>,
        children: [
            {
                path: 'home',
                element: <Home></Home>
            },
            // Admin Route
            {
                path: 'manageUsers',
                element: <ManageUsers></ManageUsers>
            },
            // User Route
            {
                path: 'cashIn',
                element: <CashIn></CashIn>
            },
            {
                path: 'sendMoney',
                element:<SendMoney></SendMoney>
            },
            {
                path: 'cashOut',
                element:<CashOut></CashOut>
            },
            {
                path:'inbox',
                element:<TransactionHistory></TransactionHistory>
            },
            // Agent Route
            {
                path:'manageCashIn',
                element:<ManageCashIn></ManageCashIn>
            }

        ]
    },
]);