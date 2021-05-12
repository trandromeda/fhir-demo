import React, { useState } from "react";
import "./App.css";
import axios from "axios";
import Patients from "./components/patients/Patients";

interface IPatient {
  id: string;
  name?: Array<any>;
  birthDate?: string;
  gender?: string;
  age?: number;
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

  return (
    <div>
      <button onClick={handleGetPatients}>Fetch Patients</button>

      {isLoading && <p>Loading...</p>}

      {!isLoading && <Patients patients={patients} />}
    </div>
  );
}

export default App;
