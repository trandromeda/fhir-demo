var express = require("express");
var axios = require("axios");
var router = express.Router();
var _ = require("lodash");

const { DateTime, Interval } = require("luxon");

const instance = axios.create({
  baseURL: "http://hapi.fhir.org/baseR4/",
  timeout: 1000,
});

const getPatients = (query) => {
  const response = instance.get(`Patient?${query}`);
  return response;

  /** to recursively fetch all of the bundle */
  const data = response.data;
  const results = [data];
  // if (data.link[1] && data.link[1].relation === "next") {
  //   const nextUrl = data.link[1].url;
  //   return results.concat(await getPatients(nextUrl));
  // } else {
  // }
  // return results;
};

const calculateAge = (dateString) => {
  const birthDate = DateTime.fromISO(dateString);
  const now = DateTime.now();

  const yearsBetween = Interval.fromDateTimes(birthDate, now);
  const yearsObject = yearsBetween.toDuration("years").toObject();

  return Math.floor(yearsObject.years);
};

const getGivenName = (name) => {
  return name.given ? name.given.join(" ") : "n/a";
};

const getName = (patientName) => {
  const officialName = patientName
    ? _.find(patientName, { use: "official" }) || patientName[0]
    : { text: "n/a" };

  return officialName.text
    ? officialName.text
    : `${officialName.family}, ${getGivenName(officialName)}`;
};

const transformPatientsOut = (patients) => {
  return patients.map((patient) => {
    return {
      id: patient.resource.id,
      name: getName(patient.resource.name),
      birthDate: patient.resource.birthDate,
      gender: patient.resource.gender,
      age: calculateAge(patient.resource.birthDate),
    };
  });
};

router.get("/", async (req, res, next) => {
  const birthdate = req.params.birthdate;
  const query = birthdate ? `birthdate=ge${birthdate}` : "";
  const response = await getPatients(query);

  const patientData = transformPatientsOut(response.data.entry);

  res.json({
    patients: patientData,
    next: _.find(response.data.link, { relation: "next" }),
  });
});

module.exports = router;
