import {
    Form, Button,
    Input,
    Upload,
    message,
    Col,
    Row,
    Select
} from "antd";

import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { useCallback, useContext, useEffect, useState } from "react";
import { string } from "yup";
import { UploadOutlined } from '@ant-design/icons';
import AuthContext from "../../store/authentication/auth-context";
import { useGetClientsMutation } from "../../store/ClientsAPI/ClientsAPI";
import { useContract_GetFilterMutation } from "../../store/ConfigurationAPI/ConfigurationAPI";
import { useGetTechnician_GetOfflineMutation } from "../../store/TechnicianAPI/TechnicianAPI";
import { setLoadingModalConfiguration } from "../../store/Slices/ModalLoaderSlice";

export default function SurveySearch({
    item = {},
    contractItems = [],
    onCancel,
    isModalClosable = true,
    isModalOpen = true,
    onSuccess,
    onSuccessContract,
    onRemove,
    onUpdated,
    maxCount = 1,
    heading = "Upload Asset Image",
    accept = ".jpg, .png",
    fileList = [],
    hideUploadButton = false,
    showRemoveIcon = true,

}) {

    const dispatch = useDispatch();
    const [defaultValue, setDefaultValue] = useState(0);
    const [clientsData, setClientsData] = useState([]);
    const authCtx = useContext(AuthContext);

   

    const [initalstateSurveySearch, setInitalstateSurveySearch] = useState({
        clientID: 0,
        contractID: 0,
        isSet: false,
    });

    const [surveySearch, setSurveySearch] = useState(initalstateSurveySearch);
    const [dataSurveysInTabularFormat, setDataSurveysInTabularFormat] = useState([]);

    const [
        fetchAllSurvey_GetOffline,
        {
            data: getFetchTechnicianOfflineData,
            isSuccess: isFetchDataSuccess,
        },
    ] = useGetTechnician_GetOfflineMutation();

    console.log("contractData", !!getFetchTechnicianOfflineData ? getFetchTechnicianOfflineData[0].contracts : null);

    useEffect(() => {
        if (isFetchDataSuccess) {
            dispatch(setLoadingModalConfiguration({ isVisible: false }));
        }
        if (getFetchTechnicianOfflineData?.length > 0) {
            dispatch(setLoadingModalConfiguration({ isVisible: false }));
            setClientsData(getFetchTechnicianOfflineData);
            onSuccess({ data: getFetchTechnicianOfflineData, filters: surveySearch });
        }

    }, [getFetchTechnicianOfflineData, isFetchDataSuccess]);

    // useEffect(() => {

    //     dispatch(setLoadingModalConfiguration({ isVisible: true }));
    //     fetchAllSurvey_GetOffline({ cbxid: 2, userxid: -1 })

    // }, [])

    useEffect(
        function fetchAllSurvey() {
            dispatch(setLoadingModalConfiguration({ isVisible: true }));
            fetchAllSurvey_GetOffline({ cbxid: authCtx.companyBranchID, userxid: authCtx.usertype === "Admin" ? -1 : authCtx.clientID })

        }, [fetchAllSurvey_GetOffline]);

    console.log("onChangeClient", surveySearch);
    console.log("onChangeClient", !!surveySearch.isSet);

    const [hideLoading, setHIdeLoading] = useState(false);
    useEffect(() => {
        if (hideLoading) {
            dispatch(setLoadingModalConfiguration({ isVisible: false }));
            setHIdeLoading(false);
        }
    }, [hideLoading])

    useEffect(() => {

        if (surveySearch.isSet) {
            console.log("onChangeClient", !!surveySearch.isSet)
            setSurveySearch((s) => ({
                ...s,
                isSet: false,
            }));
            setHIdeLoading(true);

            onSuccess({ data: getFetchTechnicianOfflineData, filters: surveySearch });

            // setSurveySearch({
            //     ...SurveySearch,
            //     isSet: false,
            // });
        }
    }, [surveySearch, surveySearch.isSet])

    const onChangeClient = (e) => {
        if (e !== 0) { // when it;s "ALL"
            dispatch(setLoadingModalConfiguration({ isVisible: true }));
            setSurveySearch({
                ...surveySearch,
                clientID: e,
                isSet: true,
            });
        }
        else {
            setSurveySearch({
                ...SurveySearch,
                clientID: e,
                isSet: true,
            });
            setDefaultValue(0);
        }
    }
    const onChangeContract = (e) => {
        if (e !== 0) { // when it;s "ALL"
            dispatch(setLoadingModalConfiguration({ isVisible: true }));
            setSurveySearch({
                ...surveySearch,
                contractID: e,
                isSet: true,
            });
        }
        else {
            setSurveySearch({
                ...SurveySearch,
                contractID: e,
                isSet: true,
            });
            setDefaultValue(0);
        }
    }


    return (
        <>

            <div className="row" >
                <div class="column">
                    <div class="column" >Select Client</div>
                    <div>
                        <Select defaultValue={0} placeholder="Client" className="form-control" onChange={onChangeClient}>
                            {clientsData?.length > 0 ? clientsData?.map((a, index) =>
                            (
                                <>
                                    {index === 0 ?
                                        <>
                                            <option key={0} value={0}>ALL</option>
                                            <option key={a.pid} value={a.pid}> {a.companyName}</option>
                                        </>
                                        : <option key={a.pid} > {a.companyName + index}</option>}

                                </>
                            )) : <option key={0} value={0}>ALL</option>}
                        </Select>
                    </div>

                    <div class="column">Select Contract</div>
                    <div>
                        <Select defaultValue={0} placeholder="Client" className="form-control" onChange={onChangeContract}>
                            {contractItems?.length > 0 ? contractItems?.map((a, index) =>
                            (
                                <>
                                    {index === 0 ?
                                        <>
                                            <option key={0} value={0}>ALL</option>
                                            <option key={a.pid} value={a.pid}>{a.prefix + "-" + a.contractPrefix + "-" + a.refNo + " - " + a.contactName + " - " + a.buildingAddress1 + "-" + a.buildingAddress2}</option>
                                        </>
                                        : <option key={a.pid} value={a.pid}>{a.prefix + "-" + a.contractPrefix + "-" + a.refNo + " - " + a.contactName + " - " + a.buildingAddress1 + "-" + a.buildingAddress2}</option>
                                    }

                                </>
                            )) : <option key={0} value={0}>ALL</option>}
                        </Select>
                    </div>


                </div>
            </div>
        </>
    );

}

SurveySearch.propTypes = {
    item: PropTypes.object,
    contractItems: PropTypes.object,
    onCancel: PropTypes.func,
    isModalClosable: PropTypes.bool,
    isModalOpen: PropTypes.bool,
    onSuccess: PropTypes.func,
    onSuccessContract: PropTypes.func,
    onRemove: PropTypes.func,
    onUpdated: PropTypes.func,
    maxCount: PropTypes.number,

}