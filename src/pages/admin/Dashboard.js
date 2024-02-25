import React from "react";
import AdminEventList from "./AdminEventList";
import CreateEvent from "./CreateEvent";
import adminlogo from "../images/logo.jpg"
const AdminDashboard = () => {
  return (
    <div>
      <CreateEvent />
      <img className="d-block mx-auto img-fluid w-20" src={adminlogo} height={150}
        width={200} alt="BigCo Inc. logo" />

      <AdminEventList />
    </div>
  );
};

export default AdminDashboard;
