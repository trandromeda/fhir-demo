import React, { useEffect, useMemo, useState } from "react";
import { IPatient } from "../../models/patient.model";
import "./Stats.scss";

type Props = {
  patients: IPatient[];
};

function Stats(props: Props) {
  const numPatients = useMemo(() => {
    console.log("call numPatients");
    return props.patients.length;
  }, [props.patients.length]);

  const averageAge = useMemo(() => {
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
    return props.patients.reduce(ageReducer, 0);
  }, [props.patients]);

  const numPediatricPatients = useMemo(() => {
    return props.patients.filter((patient) => {
      return patient.age ? patient.age < 18 : false;
    }).length;
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
