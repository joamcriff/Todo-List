import React from "react";
import {Route, Routes} from 'react-router-dom'
import Register from "./component/pages/Register";
import Signup from "./component/pages/Signup";
import Main from "./component/pages/Main";
import Task from "./component/Task";
import PrivateRoutes from "./component/PrivateRoute/PrivateRoute";

export default function App() {
    return (
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/register" element={<Register />} />
          <Route path="/signup" element={<Signup />} />
        <Route element={<PrivateRoutes />}>
          <Route path="/task" element={<Task />} />
        </Route>
        </Routes>
    )
}