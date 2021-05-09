import React, { useEffect, useState } from "react";
import "./App.css";
import Patients from "./components/patients/Patients";

interface IPatient {
  fullUrl: any;
  resource: any;
}
function App() {
  const [showPatients, setShowPatients] = useState(false);

  const handleShowPatients = () => {
    setShowPatients(true);
  };

  return (
    <div>
      <button onClick={handleShowPatients}>Fetch Patients</button>
      {showPatients && <Patients />}
    </div>
  );
}

export default App;
