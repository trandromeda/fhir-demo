import React, { useEffect, useState } from "react";

interface IPatient {
  id: string;
  name?: Array<any>;
  birthDate?: string;
  gender?: string;
  age?: number;
}

function Stats() {
  const pediatricPatients = () => {
    // return patients.length;
  };

  return (
    <div className="stats">
      <p>Number of patients:</p>
      <p>Average age:</p>
      <p>Number of pediatric patients:</p>
    </div>
  );
}

export default Stats;
