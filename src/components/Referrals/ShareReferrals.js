import { Button, Card, Col, Input, Row } from "antd";
import React, { Component, useContext, useEffect, useState } from "react";
import {
  useHistory,
  useLocation,
} from "react-router-dom/cjs/react-router-dom.min";
import { useGetRferralCodeByIDMutation } from "../../store/Dashboard/DashboardAPI";
import { setLoadingModalConfiguration } from "../../store/Slices/ModalLoaderSlice";
import { useDispatch } from "react-redux";
import AuthContext from "../../store/authentication/auth-context";
const ShareReferrals = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const authCtx = useContext(AuthContext);

  const location = useLocation();
  const [dashboardData, setDashboardData] = useState([]);
  const stateData = location.state?.stateData;

  const [fetchAssets, { data: getAssetsData, isSuccess: isAssetsSuccess }] =
    useGetRferralCodeByIDMutation();

  useEffect(() => {
    if (!!getAssetsData) {
      dispatch(setLoadingModalConfiguration({ isVisible: false }));
      setDashboardData(getAssetsData);
    } else if (isAssetsSuccess) {
      dispatch(setLoadingModalConfiguration({ isVisible: false }));
    }
  }, [getAssetsData]);

  useEffect(
    function Dashboard() {
      dispatch(setLoadingModalConfiguration({ isVisible: true }));
      fetchAssets({
        id: authCtx.clientID,
      });
    },
    [fetchAssets]
  );

  const Onclick = () => {
    // const stateData = {
    //     ReferralCode: CheckReferralData,
    // };
  };

  const RL = `${process.env.REACT_APP_PUblic}?Code=` + getAssetsData;

  return (
    <>
      <div className="tabled">
        <div className="layout-content">
          <Card bordered={false} title={"Referral Link"} className="criclebox ">
            <div class="container">
              <div class="card bg-primary">
                <div class="card-header">Your Referral</div>
                <div class="card-body">
                  <div class="row">
                    <div className="col-md-8">
                      <Input
                        readOnly={true}
                        value={
                          `${process.env.REACT_APP_PUblic}?Code=` +
                          getAssetsData
                        }
                      ></Input>
                    </div>
                    <div className="col-md-4 text-white">
                      <Button
                        type="Primary"
                        onClick={() =>
                          navigator.clipboard.writeText(
                            `${process.env.REACT_APP_PUblic}?Code=` +
                              getAssetsData
                          )
                        }
                      >
                        Copy
                      </Button>
                    </div>
                  </div>
                </div>

                <div class="row bg-white">
                  <div className="col-md-8">
                    <a
                      href={
                        "https://web.whatsapp.com/send?text= Referral Link URL " +
                        RL
                      }
                      rel="nofollow noopener"
                      target="_blank"
                      className="share-icon"
                    >
                      {" "}
                      <img
                        src={"images/logos_whatsapp-icon.png"}
                        style={{ height: "36px" }}
                      />
                      Share via Whatsapp
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
};

export default ShareReferrals;
