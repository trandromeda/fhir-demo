import React, { useEffect, useState } from "react";
import axios from "axios";

interface IPatient {
  fullUrl: any;
  resource: any;
}
function Patients() {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    axios.get("/patients/test").then((res) => {
      const body = res.data;
      console.log(body);
      setPatients(res.data.entry);
    });
  }, []);

  if (patients.length) {
    return (
      <div className="Patients">
        <ul>
          {patients.length &&
            patients.map((patient: IPatient) => {
              return <li key={patient.resource.id}>{patient.fullUrl}</li>;
            })}
        </ul>
      </div>
    );
  } else return <div>Fetching patients...</div>;
}

export default Patients;
