import React, { useState } from "react";
import "./App.scss";
import axios from "axios";
import Patients from "./components/patients/Patients";
import Stats from "./components/stats/Stats";
import { IPatient } from "./models/patient.model";
import { IFilters } from "./models/filters.model";

function App() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [patients, setPatients] = useState<IPatient[]>([]);
  const [showStats, setShowStats] = useState<boolean>(false);
  const [filters, setFilters] = useState<IFilters>({ maxAge: undefined });

  const handleGetPatients = () => {
    setIsLoading(true);
    axios
      .get("/patients?birthdate=1951-01-01")
      .then((res: { data: { patients: IPatient[]; next: string } }) => {
        setPatients(res.data.patients);
        setIsLoading(false);
      });
  };

  const handleFilterPediatricPatients = () => {
    setFilters({
      maxAge: filters.maxAge ? undefined : 18,
    });
  };

  const handleViewStats = () => {
    setShowStats(!showStats);
  };

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
              className={`button is-light ${filters.maxAge ? "is-active" : ""}`}
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

        <div>
          {showStats && <Stats patients={patients} />}
          <Patients patients={patients} filters={filters} />
        </div>
      </div>
    </div>
  );
}

export default App;
