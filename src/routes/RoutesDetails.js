import { Route, useHistory, Switch } from "react-router-dom";

import { useContext, useEffect, useMemo } from "react";
import { authAppRoutes, commonAppRoutes } from "./routesConfig";
import { AuthContext } from "../components";
import SignInPage from "../pages/SignIn/SignInPage";
import { SessionExpired } from "../components/ErrorPages/SessionExpired";
import { getURLParams } from "../utils";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch } from "react-redux";
import { useCheckListItem_GetCheckListItemByCategoryMutation, useCheckReferralCodeMutation, useLoginMutation } from "../store/ConfigurationAPI/ConfigurationAPI";



const RoutesDetails = () => {
  const history = useHistory();
  const location = useLocation();
  const authCtx = useContext(AuthContext);
  const dispatch = useDispatch();
  const pathName = useMemo(() => location.pathname, [location.pathname]);
  const URLParams = useMemo(
    () => getURLParams({ data: location.search }),
    [location.search]
  );


  const [
    getCheckReferralCoder,
    {
      data: CheckReferralData,
      isSuccess: isGetCheckReferralSuccess,
      reset: resetGetCheckReferral,
      isUninitialized: isGetCheckReferralUninitialized,
    },
  ] = useCheckReferralCodeMutation();


  useEffect(() => {
    if (isGetCheckReferralSuccess && !!CheckReferralData) {
      console.log("stateData", CheckReferralData);

      if (CheckReferralData?.statusCode == 400) {
        history.push("ReferralCodeVerificationFail", {
          stateData: CheckReferralData
        });
      }
      else {
        const stateData = {
          from: "ReferralCodeVerification",
          data: CheckReferralData,
        };

        // history.replace("/ReferralCodeVerification", stateData);
        // history.push("ReferralCodeVerificationSuccess", {
        //   stateData: CheckReferralData
        // });
           history.push("Register", {
          stateData: CheckReferralData
        });
      }
    }

    return () => resetGetCheckReferral();
  }, [

    history,
    isGetCheckReferralSuccess,
    isGetCheckReferralUninitialized,
    pathName,
    resetGetCheckReferral,
  ]);

  console.log("RoutesDetails", pathName)
  console.log("RoutesDetails", URLParams)
  console.log("authCtx.isLoggedIn", authCtx)

  


  useEffect(() => {
    console.log("RoutesDetails" + pathName);
    if (pathName === "/ReferralCodeVerification") {
      console.log("RoutesDetails1" + pathName);
      // if (!!URLParams?.refNo && !!URLParams?.token && !!URLParams?.pan) {
      //   localStorage.setItem("pan", URLParams.pan);
      //   localStorage.setItem("token", URLParams.token);
      let data = {
        referralCode: URLParams.Code,
      }
      getCheckReferralCoder({ data: data });
      // }
    }
  }, [
    URLParams,
    getCheckReferralCoder,
    history,
    location.search,
    pathName,
  ]);

  ///redemption...


  return (
    <>
      <Switch>
        {!!authCtx.isLoggedIn
          ? authAppRoutes.map((a) => (
            <Route
              key={a.path}
              path={a.path}
              exact={true}
              sensitive={true}
              component={a.component}
            />
          ))
          : authAppRoutes.map((a) => (
            <Route
              key={a.path}
              path={a.path}
              exact={true}
              sensitive={true}
              component={() => <SessionExpired />}
            />
          ))}
        {commonAppRoutes.map((a) => (
          <Route path={a.path} exact component={a.component} />

        ))
        }
      </Switch >
    </>
  );
};

export default RoutesDetails;