import { IPatient } from "../../models/patient.model";
import "./Patients.scss";

type Props = {
  patients: IPatient[];
};

function Patients(props: Props) {
  if (props.patients.length) {
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
            {props.patients.map((patient) => {
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
