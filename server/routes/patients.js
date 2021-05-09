var express = require("express");
var axios = require("axios");
var router = express.Router();

// const instance = axios.create({
//   baseURL: "http://hapi.fhir.org/baseR4/",
//   timeout: 1000,
// });

const getPatients = async (url) => {
  const response = await axios.get(url);
  const responseData = response.data;

  if (
    responseData.link &&
    responseData.link[1] &&
    responseData.link[1].relation === "next"
  ) {
    const nextUrl = responseData.link[1].url;
    return responseData;
    // return data.concat(await getPatients(nextUrl));
  } else {
    return responseData;
  }
};

router.get("/", function (req, res, next) {
  res.send("patients data");
});

router.get("/test", async (req, res, next) => {
  const data = await getPatients(
    "http://hapi.fhir.org/baseR4/Patient?birthdate=ge1951-01-01&name=andy"
  );
  //   console.log("final result");
  //   console.log(data);
  res.send(data);
});

module.exports = router;
