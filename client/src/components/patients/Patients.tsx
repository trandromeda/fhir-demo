import { useEffect, useState } from "react";
import { IFilters } from "../../models/filters.model";
import { IPatient } from "../../models/patient.model";
import "./Patients.scss";

type Props = {
  patients: IPatient[];
  filters: IFilters;
};

function Patients(props: Props) {
  const [patients, setPatients] = useState<IPatient[]>([]);

  useEffect(() => {
    let filteredPatients = props.patients;
    if (props.filters.maxAge) {
      const maxAge = props.filters.maxAge;
      filteredPatients = props.patients.filter(
        (patient) => patient.age < maxAge
      );
    }

    setPatients(filteredPatients);
  }, [props.filters, props.patients]);

  if (patients.length) {
    return (
      <div className="Patients">
        <table className="table is-fullwidth is-striped">
          <thead>
            <tr>
              <th>id</th>
              <th>name</th>
              <th>gender</th>
              <th>birthdate</th>
              <th>age</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient) => {
              return (
                <tr key={patient.id}>
                  <td>{patient.id}</td>
                  <td>{patient.name}</td>
                  <td>{patient.gender}</td>
                  <td>{patient.birthDate}</td>
                  <td>{patient.age}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  } else
    return (
      <div className="instructions">Click 'Fetch Patients' to get started</div>
    );
}

export default Patients;
