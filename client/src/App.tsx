import React, { useState } from "react";
import "./App.scss";
import axios from "axios";
import Patients from "./components/patients/Patients";

interface IPatient {
  id: string;
  name?: Array<any>;
  birthDate?: string;
  gender?: string;
  age?: number;
}

interface IPatient {
  fullUrl: any;
  resource: any;
}
function App() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [patients, setPatients] = useState<IPatient[]>([]);

  const handleGetPatients = () => {
    setIsLoading(true);
    axios
      .get("/patients?birthdate=1951-01-01")
      .then((res: { data: { patients: IPatient[]; next: string } }) => {
        const body = res.data;
        console.log(body);
        setPatients(res.data.patients);
        setIsLoading(false);
      });
  };

  const handleFilterPediatricPatients = () => {};
  const handleViewStats = () => {};

  return (
    <div className="columns">
      <div className="column">
        <div className="container">
          <div className="title">FHIR Demo</div>
          <div className="buttons">
            <button className="button is-primary" onClick={handleGetPatients}>
              Fetch Patients
            </button>
            <button
              className="button is-light"
              onClick={handleFilterPediatricPatients}
            >
              Filter Pediatric Patients
            </button>
            <button className="button is-info" onClick={handleViewStats}>
              Show Stats
            </button>
          </div>
        </div>

        {isLoading && <p className="loading">Loading...</p>}

        {!isLoading && <Patients patients={patients} />}
      </div>
    </div>
  );
}

export default App;
