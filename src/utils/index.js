import moment from "moment";

import { customAlphabet } from "nanoid/non-secure";
import lodash from "lodash";
import Strings from "./Strings";
import { regexPatterns } from "./regex";
import dayjs from "dayjs";
import { Contracts } from "../common/endPoints";
import { TypeOfInvoice, paymentStatus } from "./JSONData";

function splitRoles(roles) {
  // const name = roles.split(",");
  // if (name.length > 0) {
  //     name.map((a) => 
  //     {
  //         if(a==="SupperAdmin")
  //         {
  //             return "SuperAdmin"
  //         }
  //     });
  // }
  // else {
  //     roles
  // }
}

function getTotalCountByActivity({ items = [], type = 0, contractAssets = {} }) {
  console.log("itemsitems", items);
  let count = 0;

  // if (!!items && items.length > 0) {
  //     items.map((a) => {
  //       count = count + 1;
  //     });
  // }
  items.surveySchedules.forEach((a) => {
    if (Number(items.contractAssets.surveyTypeXid) === Number(type)) {
      count += 1;
    }

  })
  return count;

}


function disableUpcomingDates(date) {
  return date > moment();
}

function disablePreviousDates(selectedDate, date, disableBy = 1) {
  console.log("selectedDate", selectedDate);
  console.log("selectedDate", date);
  const startDate = dayjs(selectedDate).add(disableBy, "day");
  const startCheck = date < startDate;

  // return startCheck || disableUpcomingDates(date);
  return startCheck;
}



function generateRandomIdentifier(length) {
  const nanoid = customAlphabet("1234567890", length);
  return nanoid();
}


function getDateMS(date, setNoTime = false) {
  const d = !!!date ? new Date() : date;
  return setNoTime
    ? moment(d, "DD/MM/YYYY").hours(0).minutes(0).seconds(0).unix() * 1000
    : moment(d, "DD/MM/YYYY").unix() * 1000;
}

function getDateTZtoMS(date) {
  const d = !!!date ? new Date() : date;
  return moment(d).unix() * 1000;
}

function getDate(date) {
  return !!date ? moment(date).format("DD/MM/YYYY") : null;
}
function getDateFirstMM(date) {
  const [day, month, year] = date.split("/");
  return `${month}/${day}/${year}`;
  //return !!date ? moment(date).format("MM/DD/YYYY") : null;
}
function getDatePlain(date) {
  return !!date ? moment(date).format("DDMMYYYY") : null;
}

function getDateTime(date) {
  return !!date
    ? moment(date).utcOffset("05:30", false).format("DD/MM/YYYY HH:mm:ss")
    : null;
}


function onMobileKeyPressHandler(event) {
  //  alert('on key press');
  //   return /[0-9a-zA-Z]/i.test(event.key)
  const res = /[0-9]/i.test(event.key);
  if (res === false) {
    event.preventDefault();
    return res;
  }
  return res;
}

function getMaskedMobileNumber(mobile) {
  const MASK_START_INDEX = 2;
  const MASK_END_INDEX = 8;

  if (!!mobile && mobile.toString().length >= 10) {
    return ("" + mobile)
      .split("")
      .reduce(
        (prev, curr, index) =>
          index >= MASK_START_INDEX && index < MASK_END_INDEX
            ? `${prev}X`
            : `${prev}${curr}`,
        ""
      );
  } else return "";
}

function getMaskedMailID(email) {
  const MASKING_STRING = "X";

  if (!!email && email.toString().length) {
    const domainAddress = email.split("@")[1];
    const emailName = email.split("@")[0];
    if (emailName.length > 5) {
      const lastTwoChars = `${emailName[emailName.length - 2] + emailName[emailName.length - 1]
        }`;
      return (
        emailName.charAt(0) +
        emailName.charAt(1) +
        MASKING_STRING.repeat(emailName.length - 4) +
        lastTwoChars +
        "@" +
        domainAddress
      );
    } else {
      if (emailName.length === 3) {
        return (
          emailName.charAt(0) +
          MASKING_STRING +
          emailName.charAt(2) +
          "@" +
          domainAddress
        );
      }
      if (emailName.length === 4) {
        return (
          emailName.charAt(0) +
          emailName.charAt(1) +
          MASKING_STRING +
          emailName.charAt(3) +
          "@" +
          domainAddress
        );
      }
      if (emailName.length === 5) {
        return (
          emailName.charAt(0) +
          emailName.charAt(1) +
          MASKING_STRING +
          MASKING_STRING +
          emailName.charAt(4) +
          "@" +
          domainAddress
        );
      }
      return email;
    }
  } else return "";
}



// Convert URL Parameters to JSON Object
function getURLParams({ data }) {
  if (!!data === false) return {};

  return Object.fromEntries(new URLSearchParams(data));
}










function scrollIntoView({ elementID }) {
  const config = { behavior: "smooth" };
  document.getElementById(elementID).scrollIntoView(config);
}



function setManualScrollRestoration() {
  window.history.scrollRestoration = "manual";
}

function scrollToTop({ isSmoothScroll = true }) {
  const scrollBehaviour = isSmoothScroll ? "smooth" : "auto";

  window.scrollTo({
    top: 0,
    left: 0,
    behavior: scrollBehaviour,
  });
}



function clearLocalSessionStorage() {
  localStorage.clear();
  sessionStorage.clear();
}






function toNum(n) {
  return new Intl.NumberFormat("en-IN", {

  }).format(n);
}






function removeElements({ obj = {}, keys = [] }) {
  const newObj = {};
  Object.keys(obj).forEach(function (p) {
    if (!keys.includes(p)) {
      newObj[p] = obj[p];
    }
  });

  return newObj;
}

function removeElementsByValue({ obj = {}, key = "", keyValue = "" }) {
  const newObj = [];
  Object.keys(obj).forEach(function (p) {
    if (obj[p][key] !== keyValue) {
      newObj.push(obj[p]);
    }
  });

  return newObj;
}



function getEng({ data = [], type = "Technician" }) {
  console.log("userData", data);
  console.log("userData", type);
  if (data.length === 0) return [];

  let isEngFlag = true;

  data.forEach((el) => {
    if (el.nameEng === type) {
      isEngFlag = false;
      return isEngFlag;
    }
  });

  return isEngFlag;
}
function getFilteredByTechAndEng({ data = [] }) {

  console.log("userData", data);
  if (data.length === 0) return [];

  const newObj = [];
  let flag = false;
  data.forEach((el) => {
    el.roles.forEach((user) => {
      if (user.nameEng === "Technician" || user.nameEng === "Engineer") {
        flag = true;
      }
    })

    if (flag === true) {
      newObj.push(el);
      flag = false;
    }
  });
  return newObj;
}

function getFilterByAsset({ data = [], assetID }) {
  console.log("userData", data);
  console.log("userData", assetID);
  if (data.length === 0) return [];
  const newObj = [];
  data.forEach((el) => {
    console.log("userData", el);
    if (Number(el.assetXid) === Number(assetID)) {
      newObj.push(el);
    }
  });
  return newObj;
}

function getFilterByContractAsset({ data = [], assetID }) {
  console.log("userData", data);
  console.log("userData", assetID);
  if (data.length === 0) return [];
  const newObj = [];
  data.forEach((el) => {
    console.log("userData", el);
    if (Number(el.contractAssets.contractAssetPid) === Number(assetID)) {
      newObj.push(el);
    }
  });
  return newObj;
}

function getFilterByContractAssetType({ data = [], assetID }) {
  console.log("userData", data);
  console.log("userData", assetID);
  if (data.length === 0) return [];
  const newObj = [];
  data.forEach((el) => {
    console.log("getFilterByContractAssetType", el);
    el.contractAssetDetails.forEach((el1) => {
      if (Number(el1.assetTypeXid) === Number(assetID)) {
        newObj.push(el);
      }
    });
  });
  return newObj;
}


function getFilterByAssetType({ data = [], assetTypeID }) {
  console.log("userData", data);
  console.log("userData", assetTypeID);
  if (data.length === 0) return [];
  const newObj = [];
  data.forEach((el) => {
    console.log("userData", el.assetTypeXid);
    if (Number(el.assetTypeXid) === Number(assetTypeID)) {
      newObj.push(el);
    }
  });
  return newObj;
}

function getFilterByAssetsFromContract({ data = [], ContractAssetXID = 0 }) {
  console.log("getFilterByAssetsFromContract", ContractAssetXID);
  console.log("getFilterByAssetsFromContract", data);
  if (data.length === 0) return [];
  const newObj = [];
  if (ContractAssetXID === 0) {
    data.forEach((el) => {
      newObj.push(el.contractAssets);
    });
  }
  else {
    data.forEach((el) => {
      if (ContractAssetXID === el.contractAssets.contractAssetPid) {
        newObj.push(el.contractAssets);
      }

    });
  }

  return newObj;
}


function filterBasedOnFrequency({ data = [], ppmFrequencySurveySchedulePid }) {
  console.log("datadata", data);
  console.log("datadata", ppmFrequencySurveySchedulePid);
  if (data.length === 0) return [];
  const newObj = [];
  data.forEach((el) => {
    el.surveySchedules.forEach((elSchedule) => {
      if (Number(elSchedule.ppmFrequencySurveySchedulePid) === Number(ppmFrequencySurveySchedulePid)) {
        newObj.push(el);
      }
    })

  });
  return newObj;
}


function getValueFromDropdown({ data = [], keyValue }) {

  console.log("getValueFromDropdown", data);
  console.log("getValueFromDropdown", keyValue);

  if (data.length === 0) return [];
  let newObj = "";
  data.forEach((el) => {
    if (Number(el.pid) === Number(keyValue)) {
      newObj = el.nameOfAtt;
      return el.nameOfAtt;
    }
  });
  return newObj;
}


function validateNewRecord({ data = [], keyValue }) {
  if (data.length === 0) return true;
  let newObj = true;
  data.forEach((el) => {
    if (Number(el.AssetDetailsXid) === Number(keyValue)) {

      newObj = false;
      return false;
    }
  });
  return newObj;
}


function filterRemovedFiles({ data = [], removeUID }) {
  console.log("datadata", data);
  console.log("datadata", removeUID);
  if (data.length === 0) return [];
  const newObj = [];

  const finalObj = [];
  data.file.fileList.forEach((el) => {
    console.log("datadata", el.uid);
    console.log("datadata", removeUID);

    if (el.uid !== removeUID) {
      // const fileNew = {
      //   file: {
      //     fileList: [{
      //       el
      //     }]
      //   }
      // };
      newObj.push(el);
    }
  });
  console.log("datadata", newObj.length);
  if (newObj.length > 0) {
    const fileNew = {
      file: {
        fileList: newObj

      }
    };
    return fileNew;
  }
  return newObj;
}


function getExtensionByMIMEType({ fileName }) {
  console.log("image/png", fileName);
  let fileExtension;
  const ext = fileName;
  switch (ext) {
    case "application/pdf":
      fileExtension = ".pdf";
      break;
    case "image/jpeg":
      fileExtension = ".jpg";
      break;
    case "image/jpg":
      fileExtension = ".jpg";
      break;
    case "image/png":
      fileExtension = ".png";
      break;
  }
  console.log("image/png", fileExtension);

  return fileExtension;
}

function getMIMEType({ filename }) {
  if (!!filename === false || !filename.includes(".")) return;

  let mimeType;
  const ext = filename.split(".")[1];
  switch (ext) {
    case "pdf":
      mimeType = "application/pdf";
      break;
    case "jpg":
      mimeType = "image/jpeg";
      break;
    case "jpeg":
      mimeType = "image/jpeg";
      break;
    case "png":
      mimeType = "image/png";
      break;
    case "PNG":
      mimeType = "image/png";
  }
  return mimeType;
}




function trimJSONValues({ obj = {} }) {
  return JSON.parse(
    JSON.stringify(obj, (key, value) =>
      typeof value === "string" ? value.trim() : value
    )
  );
}



function disabledFutureDate(current) {
  return current && current > moment().endOf("day");
}



function isDevEnv() {

  if (
    ["localhost"].includes(
      window.location.hostname
    )
  ) {
    return true;
  }
}



const NOOP = () => { };

class consoleLogger {
  constructor() {
    this.debug = isDevEnv() ? console.debug.bind(console) : NOOP;
    this.table = isDevEnv() ? console.table.bind(console) : NOOP;
    this.log = isDevEnv() ? console.log.bind(console) : NOOP;
    this.info = isDevEnv() ? console.info.bind(console) : NOOP;
    this.warn = isDevEnv() ? console.warn.bind(console) : NOOP;
    this.error = isDevEnv() ? console.error.bind(console) : NOOP;
  }
}
const logger = new consoleLogger();



function getParsedJSON(data) {
  let d = data;
  try {
    d = JSON.parse(d);
  } catch (err) {
    return d;
  }
  return d;
}




const NA = (str) => {
  if (str === null) {
    return "NA";
  }
  if (typeof str === "string" && str === "") {
    return "NA";
  }

  return str;
};


function getSurveyType(surveyTypeXid) {
  let SurveyTypeName;
  switch (surveyTypeXid) {
    case 2:
      SurveyTypeName = "PPM Services";
      break;
    case 1:
      SurveyTypeName = "Conditional Survey";
      break;
    case 3:
      SurveyTypeName = "Emergency Call Out";
      break;
  }

  return SurveyTypeName;
}

function getSurveyTypeShortName(surveyTypeXid) {
  console.log("surveyTypeXid", surveyTypeXid);
  let SurveyTypeName;

  switch (surveyTypeXid) {
    case 2:
      SurveyTypeName = "PPM";
      break;
    case 1:
      SurveyTypeName = "CSR";
      break;
    case 3:
      SurveyTypeName = "EC";
      break;
  }

  return SurveyTypeName;
}

function disableByContractType({ ContractType = 0, FrequencyType = "" }) {
  console.log("disableByContractType", ContractType);
  console.log("disableByContractType", FrequencyType);
  // let SurveyTypeName = false;

  if (ContractType === "N" && FrequencyType == "PPM Services") {
    return false;
  }
  else if (ContractType === "E" && FrequencyType == "PPM Services") {
    return true;
  }
  else if (ContractType === "N" && FrequencyType == "Emergency Call Out") {
    return true;
  }
  return false;
}
function disableEndDate({ FrequencyType = 0 }) {

  if (FrequencyType !== 2) {
    return true;
  }

  return false;
}

function FrequencyBySurveyType({ data = [], surveyTypeIDp }) {
  console.log("FrequencyBySurveyType", surveyTypeIDp);
  if (data.length === 0) return [];
  const newObj = [];
  data.forEach((el) => {
    if (surveyTypeIDp === 1 || surveyTypeIDp === 3) {
      if (el.nameEng === "NA")
        newObj.push(el);
    }
    else {
      if (el.nameEng !== "NA")
        newObj.push(el);
    }

  });
  return newObj;
}

function onlyDate(dateValue) {

  return dayjs(dateValue).format('DD-MM-YYYY')
}

function DateWithTimeStamp(dateValue) {

  //return dayjs(dateValue).format('DD-MM-YYYY')
  return !!dateValue
    ? dayjs(dateValue).format("DD-MM-YYYY HH:mm")
    : null;
}

function filterGetListData({ data = [], dateValue }) {
  console.log("FrequencyBySurveyType", dayjs(dateValue).format('DD/MM/YYYY'));

  // console.log("FrequencyBySurveyType", data);
  if (data.length === 0) return [];
  const newObj = [];
  data.forEach((el) => {

    el.surveySchedules.forEach((schedule) => {

      if (dayjs(schedule.surveyStartDate).format('DD/MM/YYYY') === dayjs(dateValue).format('DD/MM/YYYY')) {
        newObj.push({
          type: schedule.status === "Draft" ? "warning" : "success",
          content: el.contractAssets.companyName + " " + el.contractAssets.assetName + " " + schedule.status,
          // content: "this content with wrap workign or not...", // css is not working...
        },);
      }
    });

  });
  return newObj;
}

function ArrayToString({ data = [] }) {
  console.log("data?.length", data?.length);
  if (data?.length === 0) return [];
  let strArraryToString = "";
  console.log("datadata", data)
  if (!!data && data?.length > 0) {
    data.forEach((el) => {
      strArraryToString = strArraryToString + "," + el;
    })
  }
  return strArraryToString;
}


function StringToArray({ data = "" }) {
  console.log("data?.length", data?.length);
  if (!!data === false) return [];
  let strArraryToString = "";
  console.log("data?.length", data);

  const split = data.split(",");
  console.log("data?.length", split)
  const newObj = [];
  if (split.length > 0) {
    split.map((a) => {
      if (a !== "")
        newObj.push(a);
    });

    return newObj;
  }
  // if (!!data && data?.length > 0) {
  //   data.forEach((el) => {
  //     strArraryToString = strArraryToString + "," + el;
  //   })
  // }
  return strArraryToString;
}

function getRolesFromUserRoles({ data = [] }) {

  if (data.length === 0) return [];
  const newObj = [];
  data.forEach((el) => {
    newObj.push(el.pid);
  });
  return newObj;
}

function getClientsFromContracts({ data = [] }) {
  if (data.length === 0) return [];
  const newObj = [];
  const clientIDs = [];
  const contracts = [];
  console.log("getClientsFromContracts", data);

  data.forEach((el) => {
    if ([...clientIDs].includes(el.client.pid)) {
      console.log("getClientsFromContracts", "yes");
    }
    else {
      clientIDs.push(el.client.pid);
      newObj.push(el.client);
    }
  });
  console.log("getClientsFromContracts", newObj);

  return newObj;
}


function getRolesNameFromUserRoles({ data = [] }) {

  if (data.length === 0) return [];
  const newObj = [];
  data.forEach((el) => {
    newObj.push(el.nameEng);
  });
  return newObj;
}

function getFilteredByChecklistITems({ existingData = [], DBData = [] }) {


  if (DBData.length === 0) return [];

  const newObj = [];

  DBData.forEach((el) => {
    let flag = false;
    existingData.forEach((user) => {
      if (user.pid === el.pid) {
        flag = true;
      }
    })

    if (flag === false) {
      newObj.push(el);
      flag = false;
    }
  });
  return newObj;
}

function getImagesData({ imagesData = [] }) {

  console.log("imagesData", imagesData);
  console.log("imagesData", imagesData?.length);
  if (imagesData.length === 0) return [];

  const fileList = []

  imagesData.forEach((el) => {
    const imagesObj = {
      uid: el.savedName,
      name: el.originalName,
      status: "done",
      url: `${process.env.REACT_APP_API_BASEURL}/Upload/` + el.savedName + `?entityType=AssetImage`,
      isOld: true,
      //url: "https://btfsstorage.blob.core.windows.net/filecontainer/" + el.savedName,
      //  url: URL.createObjectURL(getfetchBarCodeData),
    };
    fileList.push(imagesObj);
  });
  const fileNew = {
    file: {
      fileList: fileList
    }
  };
  return fileNew;
}

function getFilteredByUserTems({ existingUserData = [], DBData = [] }) {


  if (DBData.length === 0) return [];

  const newObj = [];

  DBData.forEach((el) => {
    let flag = false;
    existingUserData.forEach((user) => {
      if (user.pid === el.pid) {
        flag = true;
      }
    })

    if (flag === false) {
      newObj.push(el);
      flag = false;
    }
  });
  return newObj;
}


function filterRolesOfClient({ data = [], isOnlyClient = false, showAdminOnly = false }) {
  console.log("datadata", data)

  if (data.length === 0) return [];
  const newObj = [];
  data.forEach((el) => {
    if (showAdminOnly) {
      if (el.nameEng === "Admin") {
        newObj.push(el);
      }
    }
    else if (isOnlyClient) {
      if (el.nameEng === "Client") {
        newObj.push(el);
      }
    }
    else {
      if (el.nameEng !== "Client") {
        newObj.push(el);
      }
    }

  });
  return newObj;
}


function SurveysInTabularFormat({ DBData = [], clientID = 0, contractID = 0, ViewBy = 0 }) {

  console.log("filters", clientID);
  console.log("filters", contractID);
  console.log("filters", DBData);
  if (DBData.length === 0) return [];

  const newObj = [];
  const contractsObj = [];
  let flag = false;
  DBData.forEach((el) => {
    if (el.pid == clientID || clientID == 0) {
      let flag = false;
      el.contracts.forEach((contracts) => {

        //contracts binding

        const contractDataObj = {
          pid: contracts.pid,
          prefix: contracts.prefix,
          contractPrefix: contracts.contractPrefix,
          refNo: contracts.refNo,
          contactName: contracts.contactName,
          buildingAddress1: contracts.buildingAddress1,
          buildingAddress2: contracts.buildingAddress2,
        }
        contractsObj.push(contractDataObj);
        //end here
        console.log("filters", contracts);
        if (contracts.pid == contractID || contractID == 0) {
          contracts.contractAssets.forEach((contractAssets) => {
            const scheduleList = []
            contractAssets.ppmFrequencySurveySchedules.forEach((schedules) => {
              let flag = false;
              // console.log("surveyStartDate", onlyDate(dayjs(schedules.surveyStartDate)));
              // console.log("surveyStartDate", onlyDate(dayjs()));
              if ((ViewBy == 1 && onlyDate(dayjs(schedules.surveyStartDate)) == onlyDate(dayjs())) || (ViewBy == 0) ||
                (ViewBy == 2 && onlyDate(dayjs(schedules.surveyStartDate)) < onlyDate(dayjs(-7, "days'")) && onlyDate(dayjs(schedules.surveyStartDate)) < onlyDate(dayjs()))
                || (ViewBy == 3 && onlyDate(dayjs(schedules.surveyStartDate)) < onlyDate(dayjs(7, "days'")) && onlyDate(dayjs(schedules.surveyStartDate)) > onlyDate(dayjs()))
                || (ViewBy == 4 && onlyDate(dayjs(schedules.surveyStartDate)) < onlyDate(dayjs(1, "month'")) && onlyDate(dayjs(schedules.surveyStartDate)) > onlyDate(dayjs()))) {
                const scheudleObj = {
                  clientReferenceNumber: el?.prefix + '-' + el.clientPrefix + '-' + el.clientReferenceNumber,
                  surveyStartDate: schedules.surveyStartDate,
                  contractRefNo: contracts?.prefix + "-" + contracts.contractPrefix + "-" + contracts.refNo,
                  assetName: contractAssets.asset.assetName,
                  surveyStartDate: schedules.surveyStartDate,
                  isEdited: !!schedules.isEdited == true ? "Yes" : "No",
                  surveyTypeXid: getSurveyType(contractAssets.surveyTypeXid),
                  contractAssetPPMFrequencyTemplates: contractAssets.contractAssetPPMFrequencyTemplates[0].frequencyName,
                  status: schedules.statusXid,
                  ppmFrequencySurveySchedulePid: schedules.pid,
                  contractRefeNoID: contracts.pid,
                  // name: el.originalName,
                  // status: "done",
                  // url: `${process.env.REACT_APP_API_BASEURL}/Upload/` + el.savedName + `?entityType=AssetImage`,
                  // isOld: true,
                };
                newObj.push(scheudleObj);
              }
            })
          })
        }
      })
    }
  });

  const surveyOject = {

    data: newObj,
    contracts: contractsObj,

  };
  return surveyOject;
  //  return newObj;
}


function getSumByType({ invoiceData = [], type }) {
  var sum = 0;
  console.log("invoiceData", invoiceData);
  if (typeof invoiceData == 'object') {
    invoiceData.forEach(invoice => {
      if (type === "SGST")
        sum += parseFloat(invoice.sgstAmount);
      else if (type === "CGST")
        sum += parseFloat(invoice.cgstAmount);
      else if (type === "IGST")
        sum += parseFloat(invoice.igstAmount);
    });
  }
  return sum;
}

function getInvoiceSum({ invoiceData = [] }) {
  var sum = 0;
  if (typeof invoiceData == 'object') {
    invoiceData.forEach(invoice => {
      sum += parseFloat(invoice.totalAmount) + parseFloat(invoice.sgstAmount) + parseFloat(invoice.cgstAmount);
      //  sum += parseFloat(invoice.igstAmount);
    });
  }
  return sum;
}

function geteCommerceInvoiceSum({ invoiceData = [] }) {
  var sum = 0;
  if (typeof invoiceData == 'object') {
    invoiceData.forEach(invoice => {
      sum += parseFloat(invoice.price) ;
      //+ parseFloat(invoice.sgstAmount) + parseFloat(invoice.cgstAmount);
      //  sum += parseFloat(invoice.igstAmount);
    });
  }
  return sum;
}

function getPayoutWithdrewSum({ invoiceData = [], type = 3 }) {
  var sum = 0;
  if (typeof invoiceData == 'object') {
    invoiceData.forEach(invoice => {
      if (invoice.statusXid === type) {
        sum += parseFloat(invoice.payoutAmount);
      }
      //  sum += parseFloat(invoice.igstAmount);
    });
  }
  return sum;
}

function getLedgerSum({ ledgerData = [], type = "credit" }) {
  var sum = 0;
  console.log("ledgerData", ledgerData);
  if (typeof ledgerData == 'object') {
    ledgerData.forEach(invoice => {
      if (type == "credit")
        sum += parseFloat(invoice.credit);
      else
        sum += parseFloat(invoice.debit)
    });
  }
  return sum;
}


function getAmountReceivedAgainstInvoiceSum({ paymentPendingInvoiceItems = [] }) {
  var sum = 0;
  console.log("paymentPendingInvoiceItems", paymentPendingInvoiceItems);

  if (typeof paymentPendingInvoiceItems == 'object') {
    paymentPendingInvoiceItems.forEach(invoice => {
      if (!!invoice?.AmountReceivedAgainstInvoice)
        sum += parseFloat(invoice.AmountReceivedAgainstInvoice);
      //  sum += parseFloat(invoice.igstAmount);
    });
  }
  console.log("paymentPendingInvoiceItems", sum);
  return Number(sum);
}

function getInvoicePendingSum({ invoiceItemSum = [], invoicePaymentSum = [], invoiceID = 0, paymentTransactionXid = 0, paymentInvoiceMaps = [] }) {
  var sum = 9;
  var invoiceSum = 0;
  var paymentSum = 0;
  var paymentSub = 0; ///this is only for edit.....
  if (typeof invoiceItemSum == 'object') {
    invoiceItemSum.forEach(invoice => {
      invoiceSum += parseFloat(invoice.totalAmount) + parseFloat(invoice.sgstAmount) + parseFloat(invoice.cgstAmount);
      //  sum += parseFloat(invoice.igstAmount);
    });
  }
  //paymentSub, no need to do anything... because the value is getting correct....
  if (typeof invoicePaymentSum == 'object') {
    invoicePaymentSum.forEach(invoice => {
      if (invoice.invoiceXID == invoiceID) {
        if (paymentTransactionXid == invoice.paymentTransactionXid)
          paymentSub = invoice.amountReceivedAgainstInvoice;
        else
          paymentSum += parseFloat(invoice.amountReceivedAgainstInvoice);
      }
    });
  }

  sum = invoiceSum - paymentSum;
  //sum = sum + Math.abs(paymentSub);
  return sum;
}

function getSingleInvoicePaymentSum({ invoiceData = [] }) {
  console.log("invoiceData", invoiceData);
  var sum = 0;
  if (typeof invoiceData == 'object') {
    invoiceData.forEach(invoice => {

      sum += parseFloat(invoice.afterGSTAmount);
    });
  }
  return sum;
}

function getInvoicePaymentSum({ invoiceData = [], invoiceID = 9, paymentTransactionXid = 0 }) {
  console.log("invoiceData", invoiceData);
  console.log("invoiceData", invoiceID);
  console.log("invoiceData", paymentTransactionXid);
  var sum = 0;
  if (typeof invoiceData == 'object') {
    invoiceData.forEach(invoice => {
      if (invoice.invoiceXID == invoiceID) {
        if (paymentTransactionXid != invoice.paymentTransactionXid)
          sum += parseFloat(invoice.amountReceivedAgainstInvoice);
      }

      //  sum += parseFloat(invoice.igstAmount);
    });
  }
  return sum;
}



function invoiceToTaxData({ invoiceData = [] }) {
  const uniqueTax = [];
  const uniqueTaxData = [];


  invoiceData.map(invoice => {
    const data = {
      HSNCode: invoice.hsncode,
      totalAmount: invoice.totalAmount,
      cgstPer: invoice.cgstPer,
      cgstAmount: invoice.cgstAmount,
      sgstPer: invoice.sgstPer,
      sgstAmount: invoice.sgstAmount,
      igstPer: invoice.sgstPer,
      igstAmount: invoice.sgstAmount,
      totalTaxableAmount: invoice.cgstAmount + invoice.sgstAmount,
    }
    uniqueTaxData.push(data);
  });

  return uniqueTaxData;

}

function getFilteredAssetPPMFrequencyTemplates({ existingData = [] }) {

  const uniqueTags = [];
  const uniqueTagsData = [];

  console.log("uniqueTags", existingData);
  existingData.map(img => {
    if (uniqueTags.indexOf(img.templateName) === -1) {
      const data = {
        templateName: img.templateName
      }
      uniqueTagsData.push(data);
      uniqueTags.push(img.templateName);
    }
  });

  console.log("uniqueTags", uniqueTags);
  return uniqueTagsData;
}


function getFilterByConsineePid({ buyerDataObj = [], pid }) {
  if (buyerDataObj.length === 0) return [];
  const newObj = [];
  if (pid == 0) {

    return buyerDataObj;
  }
  buyerDataObj.forEach((el) => {
    if (pid == el.pid) {
      newObj.push(el);
    }
  });
  return newObj;
}

function getFilterByAmountReceivedPayment({ buyerDataObj = [] }) {
  if (buyerDataObj.length === 0) return [];

  const newObj = [];
  buyerDataObj.forEach((el) => {
    if (!!el.AmountReceivedAgainstInvoice) {
      console.log("buyerDataObj", el.AmountReceivedAgainstInvoice);
      if (el.AmountReceivedAgainstInvoice !== "") {
        newObj.push(el);
      }
    }
  });
  return newObj;
}

function OnlyPortFilter({ buyerDataObj = [] }) {
  if (buyerDataObj.length === 0) return [];

  const newObj = [];
  buyerDataObj.forEach((el) => {

    if (el.isPort == true) {
      newObj.push(el);
    }

  });
  return newObj;
}

function getAmountReceivedAgainstInvoice({ paymentTransactionXid = 0, paymentInvoiceMaps = [] }) {
  console.log("paymentInvoiceMaps", paymentInvoiceMaps);
  console.log("paymentInvoiceMaps", paymentTransactionXid);
  if (paymentInvoiceMaps.length === 0) return;
  let AmountReceivedAgainstInvoice = null;
  paymentInvoiceMaps.forEach((el) => {
    if (el?.paymentTransactionXid == paymentTransactionXid) {
      AmountReceivedAgainstInvoice = el.amountReceivedAgainstInvoice;
      console.log("amountReceivedAgainstInvoice", el.amountReceivedAgainstInvoice);
      return AmountReceivedAgainstInvoice;
    }

  });

  return AmountReceivedAgainstInvoice;
}


function getFilterByAmountReceivedPaymentMap({ buyerDataObj = [] }) {
  if (buyerDataObj.length === 0) return [];

  const newObj = [];
  buyerDataObj.forEach((el) => {
    if (!!el?.AmountReceivedAgainstInvoice) {
      if (el.AmountReceivedAgainstInvoice !== "") {
        var data = {
          Pid: el.InvoiceXID,
          PaymentStatusXid: el.AmountReceivedAgainstInvoice == el.pendingAmount ? 4 : 2,
          LastEditByXid: el.lastEditByXid,
        }
        newObj.push(data);
      }
    }
  });
  return newObj;
}

function getInvoiceType(surveyTypeXid) {
  let InvoiceTypeName = "";
  TypeOfInvoice.forEach((el) => {
    if (surveyTypeXid == el.key) {
      InvoiceTypeName = el.value
      return InvoiceTypeName
    }
  });
  return InvoiceTypeName;
}

//payment status by payment id
function getPaymentType(surveyTypeXid) {
  let InvoiceTypeName = "";
  paymentStatus.forEach((el) => {
    if (surveyTypeXid == el.key) {
      InvoiceTypeName = el.value
      return InvoiceTypeName
    }
  });

  return InvoiceTypeName;
}

function getFilterMenus({ menuObj = [], showInvoiceOnly = false }) {
  if (menuObj.length === 0) return [];
  console.log("showInvoiceOnly", showInvoiceOnly);

  const newObj = [];
  const newObj1 = [];
  let newObj_temp = [];

  if (!!!showInvoiceOnly) {
    return menuObj;
  }

  menuObj.forEach((el) => {
    if (el.visible) {
      newObj.push(el);
    }
  });

  //not working.. need to check...
  // newObj.forEach((el) => {
  //   // console.log("getFilterMenus", newObj);
  //   // console.log("getFilterMenus", el.children?.visible);

  //   el?.children?.forEach((el1, index) => {
  //     // newObj_temp = el1.filter(item => item.visible);
  //     if (el1?.visible == false) {
  //       // newObj.slice(el1);
  //       menuObj.children[1].splice(index, 1);
  //     }
  //   })
  // });

  return newObj;
}

function getGSTDetails({ rate = 0, quantiry = 0, gstPercentage = 0 }) {
  if (rate === 0 || quantiry === 0 || gstPercentage === 0) return [];
  // const newObj = {};

  const ItemAmount = quantiry * rate;
  const GSTAmount = (ItemAmount * gstPercentage) / 100;

  const newObj = {
    CGSTPer: gstPercentage / 2,
    SGSTPer: gstPercentage / 2,
    ItemAmount: quantiry * rate,
    GSTAmount: GSTAmount,
    SGSTAmount: GSTAmount / 2,
    CGSTAmount: GSTAmount / 2,
    ItemAmount: ItemAmount,
    AfterGSTAmount: ItemAmount + GSTAmount,
    IGSTAmount: 0,
    IGSTPer: 0,

  }
  return newObj;
}




function getItemRepottData({ ledgerData = [] }) {

  if (ledgerData.length === 0) return [];

  const fileList = []
  /// getting here... GST Invoice, Receipts and Purchase Order....
  //9 equal to Debit Note...
  ledgerData.forEach((el) => {


    const Obj = {
      createdOn: onlyDate(el.invoiceCreatedOn),
      pid: el.pid,
      type: el.type,
      itemName: el.itemName,
      Category: el.assetCategory.nameEng,
      openingStock: el.openingStock,

      // formTypeXid: el2.formTypeXid,
      StockSales: getStockSum({ invoiceData: el.invoiceProductDetails, typeID: 6 }),
      StockPurchase: getStockSum({ invoiceData: el.invoiceProductDetails, typeID: 3 }),
      // credit: el2.formTypeXid == 8 ? getInvoiceSum({ invoiceData: el2.invoiceProductDetails }) : el2.formTypeXid == 3 ? getInvoiceSum({ invoiceData: el2.invoiceProductDetails }) : 0
      // name: el.originalName,
      // status: "done",     
      // isOld: true,
    };

    let flag = true;
    fileList.forEach((user) => {
      if (user.pid === Obj.pid) {
        flag = false;
      }
    })
    // fileList.forEach()
    // if (user.nameEng === "Technician" || user.nameEng === "Engineer") {
    //   flag = true;
    // }
    if (flag == true)
      fileList.push(Obj);

  });
  return fileList;
}

function getStockSum({ invoiceData = [], typeID }) {
  console.log("getStockSum", invoiceData)
  if (invoiceData === null) return 0;

  var sum = 0;
  if (typeof invoiceData == 'object') {
    invoiceData.forEach(invoice => {
      if (invoice.companyBranchInvoices.formTypeXid === typeID)
        sum += parseFloat(invoice.quantity);
      //  sum += parseFloat(invoice.igstAmount);
    });
  }
  return sum;
}

function getLedgerData({ ledgerData = [] }) {

  if (ledgerData.length === 0) return [];

  const fileList = []
  /// getting here... GST Invoice, Receipts and Purchase Order....
  //9 equal to Debit Note...
  ledgerData.forEach((el) => {
    el.companyBranchInvoices.forEach((el2) => {
      if (el2.formTypeXid == 6 || el2.formTypeXid == 8 || el2.formTypeXid == 3 || el2.formTypeXid == 9) {
        const Obj = {
          invoiceCreatedOn: onlyDate(el2.invoiceCreatedOn),
          refID: el2.refID,
          companyName: el.companyName,
          formTypeXid: el2.formTypeXid,
          debit: el2.formTypeXid == 6 ? getInvoiceSum({ invoiceData: el2.invoiceProductDetails }) : el2.formTypeXid == 9 ? getInvoiceSum({ invoiceData: el2.invoiceProductDetails }) : 0,
          credit: el2.formTypeXid == 8 ? getInvoiceSum({ invoiceData: el2.invoiceProductDetails }) : el2.formTypeXid == 3 ? getInvoiceSum({ invoiceData: el2.invoiceProductDetails }) : 0
          // name: el.originalName,
          // status: "done",     
          // isOld: true,
        };
        fileList.push(Obj);
      }
    })

    el.paymentTransactions.forEach((el2) => {

      const Obj = {
        invoiceCreatedOn: onlyDate(el2.invoiceCreatedOn),
        refID: el2.paymentRefID,
        companyName: el.companyName,
        formTypeXid: el2.paymentType == 1 ? 101 : 102, /// this his hard-coded... 101 equal to Receipt and 102 equal to Paid...
        debit: el2.paymentType == 1 ? 0 : el2.amountReceived,
        credit: el2.paymentType == 1 ? el2.amountReceived : 0, //el2.amountReceived,

        // formTypeXid: el2.formTypeXid,
        // name: el.originalName,
        // status: "done",     
        // isOld: true,
      };
      fileList.push(Obj);

    })
  });
  return fileList;
}

function getFilterByAccountHead({ data = [], isExpenses = true }) {

  console.log("getFilterByAccountHead", isExpenses);
  if (data.length === 0) return [];
  const newObj = [];
  data.forEach((el) => {
    if (el.masterType === "EXP" && isExpenses == true) {
      newObj.push(el);
    }
    else if (["CR", "DB"].includes(el.masterType) && isExpenses == false) {
      newObj.push(el);
    }
  });
  return newObj;
}

// this is used for to rmeove creditor and debitor from the list
function getFilterByExpernses({ data = [], isExpenses = true }) {

  console.log("getFilterByAccountHead", isExpenses);
  if (data.length === 0) return [];
  const newObj = [];
  data.forEach((el) => {
    if (["Sundry Creditor", "Sundry Debitor"].includes(el.name)) {

    }
    else {
      newObj.push(el);
    }
  });
  return newObj;
}

function getLeft({ invoiceData = [], typeID }) {
  console.log("getStockSum", invoiceData)
  if (invoiceData === null) return 0;

  var sum = 0;
  if (typeof invoiceData == 'object') {
    invoiceData.forEach(invoice => {
      if (typeID == "left") {
        console.log("filterData", invoice);
        sum = invoice.userXid;
        return sum
      }
      else {
        sum = invoice.userXid;
        return sum
      }

      //  sum += parseFloat(invoice.igstAmount);
    });
  }
  return sum;
}

function Node(value) {
  this.value = value;
  // this.left = null;
  // this.right = null;
}


function insertNode(tree, value) {
  console.log("insertNode", tree);
  console.log("insertNode", value);
  var node = tree,
    key;
  while (node.value !== value) {
    key = value < node.value ? 'left' : 'right';
    if (!node[key]) {
      node["children"] = [new Node(value)];
      node[key] = [new Node(value)];
      break;
    }
    node = node[key];
  }
  return tree;
}

function filterUserPurchaseTree({ ledgerData = [] }) {
  // var array = [8, 10, 12, 5, 3, 6],
  //   tree = array.reduce((t, v) => t ? insertNode(t, v) : new Node(v), null);

  // console.log("filterUserPurchaseTreefilterUserPurchaseTree", tree);

  // return;





  // return;

  const arr1 = ['a', 'b', 'c'];
  const arr2 = ['a.foo', 'b.bar', 'c.baz'];

  let result = {};

  const insertAggs = (agg, result) => {

    while (result.aggs) {
      result = result.aggs
    }

    result.aggs = agg;
  }

  for (let i = 0; i < arr1.length; i++) {
    const aggName = arr1[i];
    const field = arr2[i];
    const agg = {
      //  [aggName]: {
      children: [{
        field
      }]
      //  }
    };

    result.aggs ? insertAggs(agg, result) : result.aggs = agg;
  }


  console.log("filterUserPurchaseTree", result)
  if (ledgerData.length === 0) return [];

  const fileList = []
  const leftAndRight = []
  const mainObj = [];
  /// getting here... GST Invoice, Receipts and Purchase Order....
  //9 equal to Debit Note...
  ledgerData.forEach((el) => {

    const Obj = {
      userXid: el.userXid,
      // formTypeXid: el2.formTypeXid,
      children: [
        {
          left: getLeft({ invoiceData: ledgerData, typeID: "left" }),
        },
        {
          right: getLeft({ invoiceData: ledgerData, typeID: "right" }),
        },
      ]


      //  StockPurchase: getStockSum({ invoiceData: el.invoiceProductDetails, typeID: 3 }),
      // credit: el2.formTypeXid == 8 ? getInvoiceSum({ invoiceData: el2.invoiceProductDetails }) : el2.formTypeXid == 3 ? getInvoiceSum({ invoiceData: el2.invoiceProductDetails }) : 0
      // name: el.originalName,
      // status: "done",     
      // isOld: true,
    };
    //  let left = getLeft({ invoiceData: ledgerData, typeID: "left" });
    // console.log("filterData", left);
    // if (left != null) {
    //   leftAndRight.push({ name: left });
    // }
    let flag = true;
    fileList.forEach((user) => {
      if (user.pid === Obj.pid) {
        flag = false;
      }
    })
    // fileList.forEach()
    // if (user.nameEng === "Technician" || user.nameEng === "Engineer") {
    //   flag = true;
    // }
    // if (flag == true) {
    //   Obj.add(leftAndRight)
    // }
    // mainObj = Obj;
    fileList.push(Obj);

  });
  return fileList;
}


function SearchByItemName({ data = [], SearchingItemName = "" }) {
  if (data.length === 0) return [];
  let Category = [];
  let FoundItems = [];

  // is Array true is default 
  //from bulk upload we are sendin name only...
  data.forEach((el) => {
    let isFlag = true;
    let ItemFoundFlag = false;
    let nameAra;
    let nameEng;
    let pid;
    let items = [];
    el.items.forEach((item, index) => {
      if (item.itemName.toUpperCase().includes(SearchingItemName.toUpperCase())) {
        if (isFlag === true) {
          nameAra = el.nameAra;
          nameEng = el.nameEng;
          pid = el.pid;
          items.push(item);
          isFlag = false;
          ItemFoundFlag = true;
        }
        else {
          items.push(item);
        }

      }
    });
    if (ItemFoundFlag === true) {
      FoundItems.push({ nameAra, nameEng, pid, items: items });
    }
  });
  return FoundItems;
}


export {
  generateRandomIdentifier,
  getDateMS,
  getDate,
  getDatePlain,
  disableUpcomingDates,
  onMobileKeyPressHandler,
  getMaskedMailID,
  getMaskedMobileNumber,
  getURLParams,
  getDateTime,
  scrollIntoView,
  setManualScrollRestoration,
  scrollToTop,
  clearLocalSessionStorage,
  removeElements,
  removeElementsByValue,
  getFilteredByTechAndEng,
  getEng,
  getMIMEType,
  getDateTZtoMS,
  trimJSONValues,
  toNum,
  disabledFutureDate,
  isDevEnv,
  NOOP,
  disablePreviousDates,
  getParsedJSON,
  getDateFirstMM,
  NA,
  splitRoles,
  getTotalCountByActivity,
  getFilterByAsset,
  getFilterByAssetType,
  getFilterByAssetsFromContract,
  filterBasedOnFrequency,
  getSurveyType,
  getExtensionByMIMEType,
  disableByContractType,
  FrequencyBySurveyType,
  disableEndDate,
  ArrayToString,
  getFilterByContractAsset,
  getFilterByContractAssetType,
  getRolesFromUserRoles,
  getFilteredByChecklistITems,
  getImagesData,
  getFilteredByUserTems,
  getSurveyTypeShortName,
  getRolesNameFromUserRoles,
  filterRemovedFiles,
  getClientsFromContracts,
  filterGetListData,
  onlyDate,
  getValueFromDropdown,
  validateNewRecord,
  filterRolesOfClient,
  StringToArray,
  SurveysInTabularFormat,
  getFilteredAssetPPMFrequencyTemplates,
  getSumByType,
  getInvoiceSum,
  invoiceToTaxData,
  getFilterByConsineePid,
  getInvoiceType,
  getPaymentType,
  getFilterByAmountReceivedPayment,
  getInvoicePaymentSum,
  getInvoicePendingSum,
  getFilterByAmountReceivedPaymentMap,
  getFilterMenus,
  getSingleInvoicePaymentSum,
  getGSTDetails,
  getAmountReceivedAgainstInvoice,
  getAmountReceivedAgainstInvoiceSum,
  DateWithTimeStamp,
  getLedgerData,
  getLedgerSum,
  getItemRepottData,
  getFilterByAccountHead,
  getFilterByExpernses,
  OnlyPortFilter,
  filterUserPurchaseTree,
  insertNode,
  getPayoutWithdrewSum,
  SearchByItemName,
  geteCommerceInvoiceSum
}