import React from 'react';
import DashboardLayout from './DashboardLayout';
import Nav from "../components/dashboard/Nav.jsx";
import Summary from "../components/dashboard/Summary.jsx";

const OverviewPage = () => {
  return (
    <>
      <DashboardLayout>
        <Nav />
        <Summary />
      </DashboardLayout>
    </>
  );
};

export default OverviewPage;
