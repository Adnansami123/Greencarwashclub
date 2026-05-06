import React, { useState, useEffect, useCallback } from "react";

let logoutTimer;

const AuthContext = React.createContext({
  token: "",
  usertype: "",
  companyID: "",
  companyName: "",
  companyBranchid: "",
  clientID: "",
  actualClientID: "", // this is for only Client access from client table....
  userName: "",
  underUserXid: "",
  isLoggedIn: false,

  login: (token) => {},
  logout: () => {},
});

const calculateRemainingTime = (expirationTime) => {
  const currentTime = new Date().getTime();
  const adjExpirationTime = new Date(expirationTime).getTime();
  const remainingDuration = adjExpirationTime - currentTime;
  return remainingDuration;
};

const retrieveStoreToken = () => {
  const storedToken = localStorage.getItem("token");
  const storedUserType = localStorage.getItem("usertype");
  const storedCompanyID = localStorage.getItem("companyID");
  const storedCompanyName = localStorage.getItem("companyName");
  const storedCompanyBranchID = localStorage.getItem("companyBranchID");
  const storedClientID = localStorage.getItem("clientID");
  const storedActualClientID = localStorage.getItem("actualClientID");
  const storedUserName = localStorage.getItem("userName");
  const storedUnderUserXid = localStorage.getItem("underUserXid");

  const storedExpirationDate = localStorage.getItem("expirationTime");

  const remainingTime = calculateRemainingTime(storedExpirationDate);

  if (remainingTime <= 3600) {
    localStorage.removeItem("token");
    localStorage.removeItem("usertype");
    localStorage.removeItem("companyID");
    localStorage.removeItem("companyName");
    localStorage.removeItem("companyBranchID");
    localStorage.removeItem("clientID");
    localStorage.removeItem("actualClientID");
    localStorage.removeItem("userName");
    localStorage.removeItem("underUserXid");
    return null;
  }

  return {
    usertype: storedUserType,
    companyID: storedCompanyID,
    companyName: storedCompanyName,
    companyBranchID: storedCompanyBranchID,
    clientID: storedClientID,
    actualClientID: storedActualClientID,
    userName: storedUserName,
    underUserXid: storedUnderUserXid,
    token: storedToken,
    duration: remainingTime,
  };
};

export const AuthContextProvider = (props) => {
  const tokenData = retrieveStoreToken();

  let initialToken;
  let initialUserType;
  let initialCompanyID;
  let initialCompanyName;
  let initialCompanyBranchID;
  let initialClientID;
  let initialActualClientID;
  let initialUserName;
  let initialUnderUserXid;

  if (tokenData) {
    initialToken = tokenData.token;
    initialUserType = tokenData.usertype;
    initialCompanyID = tokenData.companyID;
    initialCompanyName = tokenData.companyName;
    initialCompanyBranchID = tokenData.companyBranchID;
    initialClientID = tokenData.clientID;
    initialActualClientID = tokenData.actualClientID;
    initialUserName = tokenData.userName;
    initialUnderUserXid = tokenData.underUserXid;
  }

  const [token, setToken] = useState(initialToken);
  const [usertype, setUserType] = useState(initialUserType);
  const [companyID, setCompanyID] = useState(initialCompanyID);
  const [companyName, setCompanyName] = useState(initialCompanyName);
  const [companyBranchID, setCompanyBranchID] = useState(
    initialCompanyBranchID
  );
  const [clientID, setClientID] = useState(initialClientID);
  const [actualClientID, setActualClientID] = useState(initialActualClientID);
  const [userName, setUserName] = useState(initialUserName);
  const [underUserXid, setUnderUserXid] = useState(initialUnderUserXid);

  const userIsLoggedIn = !!token;

  const logoutHandler = useCallback(() => {
    setToken(null);
    setUserType(null);
    setCompanyID(null);
    setCompanyName(null);
    setCompanyBranchID(null);
    setClientID(null);
    setActualClientID(null);
    setUserName(null);
    setUnderUserXid(null);

    localStorage.removeItem("token");
    localStorage.removeItem("usertype");
    localStorage.removeItem("companyID");
    localStorage.removeItem("companyName");
    localStorage.removeItem("companyBranchID");
    localStorage.removeItem("clientID");
    localStorage.removeItem("actualClientID");
    localStorage.removeItem("userName");
    localStorage.removeItem("underUserXid");

    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
  }, []);

  const loginHanlder = (
    token,
    usertype,
    companyID,
    companyName,
    companyBranchID,
    clientID,
    actualClientID,
    userName,
    underUserXid,
    expirationTime
  ) => {
    setToken(token);
    setUserType(usertype);
    setCompanyID(companyID);
    setCompanyName(companyName);
    setCompanyBranchID(companyBranchID);
    setClientID(clientID);
    setActualClientID(actualClientID);
    setUserName(userName);
    setUnderUserXid(underUserXid);
    localStorage.setItem("token", token);
    localStorage.setItem("usertype", usertype);
    localStorage.setItem("companyID", companyID);
    localStorage.setItem("companyName", companyName);
    localStorage.setItem("companyBranchID", companyBranchID);
    localStorage.setItem("clientID", clientID);
    localStorage.setItem("actualClientID", actualClientID);
    localStorage.setItem("userName", userName);
    localStorage.setItem("underUserXid", underUserXid);
    localStorage.setItem("expirationTime", expirationTime);

    const remainingTime = calculateRemainingTime(expirationTime);

    logoutTimer = setTimeout(logoutHandler, remainingTime);
  };

  useEffect(() => {
    if (tokenData) {
      logoutTimer = setTimeout(logoutHandler, tokenData.duration);
    }
  }, [tokenData, logoutHandler]);

  const contextValue = {
    token: token,
    usertype: usertype,
    companyID: companyID,
    companyName: companyName,
    companyBranchID: companyBranchID,
    clientID: clientID,
    actualClientID: actualClientID,
    userName: userName,
    underUserXid: underUserXid,
    isLoggedIn: userIsLoggedIn,
    login: loginHanlder,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
