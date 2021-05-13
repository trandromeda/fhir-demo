import React, { useEffect, useState } from "react";
import { IPatient } from "../../models/patient.model";
import "./Stats.scss";

type Props = {
  patients: IPatient[];
};

function Stats(props: Props) {
  const [numPatients, setNumPatients] = useState<number>(0);
  const [averageAge, setAverageAge] = useState<number>(0);
  const [numPediatricPatients, setNumPediatricPatients] = useState<number>(0);

  useEffect(() => {
    setNumPatients(props.patients.length);
  }, [props.patients.length]);

  useEffect(() => {
    const ageReducer = (
      acc: number,
      cv: IPatient,
      index: number,
      arr: IPatient[]
    ) => {
      if (index === arr.length - 1) {
        acc = typeof cv.age === "number" ? acc + cv.age : acc;
        return acc / arr.length;
      } else return acc + (typeof cv.age === "number" ? cv.age : 0);
    };
    const averageAge = props.patients.reduce(ageReducer, 0);
    setAverageAge(averageAge);
  }, [props.patients]);

  useEffect(() => {
    const pediatricPatientsCount = props.patients.filter((patient) => {
      return patient.age ? patient.age < 18 : false;
    });
    setNumPediatricPatients(pediatricPatientsCount.length);
  }, [props.patients]);

  return (
    <div className="message">
      <div className="message-body">
        <p>Number of patients: {numPatients}</p>
        <p>Average age: {averageAge}</p>
        <p>Number of pediatric patients: {numPediatricPatients}</p>
      </div>
    </div>
  );
}

export default Stats;
