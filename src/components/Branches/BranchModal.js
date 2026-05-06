import {
    Modal, Form, Button,
    Input,
    Select,
    Checkbox
} from "antd";
import PropTypes from "prop-types";
import { useCallback, useContext, useEffect, useState } from "react";
import { string } from "yup";
import AuthContext from "../../store/authentication/auth-context";
import { useAddAssetCategoryMutation, useAddCheckListItemMutation,  usePutAssetCategoryMutation, usePutCheckListItemMutation } from "../../store/ConfigurationAPI/ConfigurationAPI";
import { useAddBranchMutation, useAddCountryMutation, useCountriesMutation, usePutBranchMutation } from "../../store/BranchesAPI/BranchesAPI";

export default function BranchModal({
    item = {},
    onCancel,
    isModalClosable = true,
    isModalOpen = true,
    onSuccess,
    onUpdated,

}) {



    const authCtx = useContext(AuthContext);
    const [isTrackInventory, setITrackInventory] = useState(item?.isPort==true ? true : true);
    const [closeModal, setCloseModal] = useState(true);
    const { TextArea } = Input;
    const onChangeTrackInventory = (e) => {
         
        if (e.target.checked)
            setITrackInventory(true);
        else
            setITrackInventory(false);

    }
    useEffect(() => {
        if (!!item?.pid === false) return;
        form.setFieldsValue({ 
            NameEng: item.nameEng, 
            address: item.address, 
            countryXid: item.countryXid,
            lat: item.lat,
            long: item.long,
         });
       //  setITrackInventory(item.isPort==true ? "Checked" : "UnChecked");
    }, [item])
    const [form] = Form.useForm();

    const [
        Add,
        {
            data: getAddData,
            isSuccess: isAddSuccess,
        },
    ] = useAddBranchMutation();

    useEffect(() => {

        if (isAddSuccess) {
            onSuccess();
        }
    }, [isAddSuccess])


    const [
        put,
        {
            data: getPutData,
            isSuccess: isPutSuccess,
        },
    ] = usePutBranchMutation();

    useEffect(() => {
        if (isPutSuccess) {
            onUpdated();
        }
    }, [getPutData])

    const onFinish = (values) => {
        // alert(form.getFieldValue("isPort"));
        // alert(form.getFieldValue("NameEng"));
       // return;
        if (!!item.pid) {
            let data = {
                nameEng: form.getFieldValue("NameEng"),
                NameAra: form.getFieldValue("NameEng"),
                address: form.getFieldValue("address"),
                email: "",
                webSite: "",
                countryXid: form.getFieldValue("countryXid"),
                lastEditByXid: authCtx.clientID,
                pid: item.pid,
                lat: form.getFieldValue("lat"),
                long: form.getFieldValue("long"),
                isPort: isTrackInventory,

            };
            put({ data: data }); // not yet completed as on 10 Aug 2023
        }
        else {
            let data = {
                nameEng: form.getFieldValue("NameEng"),
                NameAra: form.getFieldValue("NameEng"),
                address: form.getFieldValue("address"),
                email: "",
                webSite: "",
                countryXid: form.getFieldValue("countryXid"),
                lastEditByXid: authCtx.clientID,
                lat: form.getFieldValue("lat"),
                long: form.getFieldValue("long"),
                isPort: isTrackInventory, 
                //form.getFieldValue("isPort"),
            };
            Add({ data: data });

        }

    }

    const onChange = () => {

    }
    const onFinishFailed = () => {

    }

    const onClickReset = () => {
        form.setFieldsValue({ NameEng: '' });
    }


 

    const [
        fetchCountries,
        {
            data: getCountriesData,
            isSuccess: isGetCountriesSuccess,
        },
    ] = useCountriesMutation();


    useEffect(() => {
        fetchCountries({ id: "1", });
    }, []);

    return (
        <>
            <Modal open={isModalOpen} title={!!item?.pid === true ? "Update Country" : "Add Country"} footer={null}
                closable={isModalClosable}
                onCancel={onCancel}
                maskClosable={false}

            >
                <div>
                    <Form form={form}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        layout="vertical"
                        name="control-hooks"
                        className="row-col"
                    >

                        <Form.Item
                            className="username"
                            label="Branch/City"
                            name="NameEng"
                            rules={[
                                {
                                    required: true,
                                    message: "Please enter the Branch/City",
                                },
                            ]}
                        >
                            <Input placeholder="Branch/City" />

                        </Form.Item>
                        <Form.Item
                            className="username"
                            label="Short Name"
                            name="address"
                          
                        >
                            <Input placeholder="Country Code" />

                        </Form.Item>
                        <Form.Item
                            className="username"
                            label="Country"
                            name="countryXid"
                            rules={[
                                {
                                    required: true,
                                    message: "Please select the Country!",
                                },
                            ]}
                        >
                            <Select placeholder="Company Country">
                                {getCountriesData?.map((a) =>
                                (
                                    <option key={a.pid} value={a.pid}>{a.nameEng}</option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Form.Item
                            className="username"
                            label="Lat"
                            name="lat"
                          
                        >
                            <Input placeholder="Lat" />

                        </Form.Item>
                        <Form.Item
                            className="username"
                            label="Long"
                            name="long"
                           
                        >
                            <Input placeholder="long" />

                        </Form.Item>
                        <Form.Item
                            className="username"
                            label="Is Port"
                            name="isPort"
                           
                        >
                            <Checkbox checked={isTrackInventory} value={isTrackInventory} onChange={onChangeTrackInventory} placeholder="Is Port"></Checkbox>

                        </Form.Item>
                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                            >
                                {!!item?.pid === true ? "Update" : "Add"}
                            </Button>
                            <Button

                                htmlType="button"
                                disabled={!!item?.pid === true}
                                onClick={onClickReset}
                            >
                                Reset
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </Modal>
        </>
    );

}

BranchModal.propTypes = {
    item: PropTypes.object,
    onCancel: PropTypes.func,
    isModalClosable: PropTypes.bool,
    isModalOpen: PropTypes.bool,
    onSuccess: PropTypes.func,
    onUpdated: PropTypes.func,

}