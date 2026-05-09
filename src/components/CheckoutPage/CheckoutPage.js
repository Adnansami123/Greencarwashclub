import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../store/authentication/auth-context";
import {
  useHistory,
  useLocation,
} from "react-router-dom/cjs/react-router-dom.min";
import { useCart } from "../../context/CartContext";
import { useRazorpay } from "react-razorpay";
import { usePostRazorOrderMutation } from "../../store/Subcription/SubscriptionAPI";
import dayjs from "dayjs";
import { useAddInvoiceMutation } from "../../store/InvoiceAPI/InvoiceAPI";
import { setLoadingModalConfiguration } from "../../store/Slices/ModalLoaderSlice";
import { useDispatch } from "react-redux";
import {
  useGetUserCompanyByBrandAndUserMutation,
  usePostOrderMutation,
} from "../../store/eCommerceAPI/eCommerceAPI";
import {
  useBranchByCountryIDMutation,
  useCountriesMutation,
} from "../../store/BranchesAPI/BranchesAPI";
import { string } from "yup";
import {
  commonValidationsMsg,
  commonValidator,
} from "../../utils/validations/commonValidations";
import { useLoginMutation } from "../../store/ConfigurationAPI/ConfigurationAPI";
import { Checkbox, Form, Radio, Select } from "antd";
import { geteCommerceInvoiceSum } from "../../utils";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
// import image
import RazorpayImage from "../../assets/images/Qrcodegreesn 1.png";
export default function CheckoutPage() {
  const BTFSAuthCtx = useContext(AuthContext);
  const { cartItems, setCartItems } = useCart();
  console.log("cartItems", cartItems);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  console.log("Errors is Changed-2", errors);

  const initialStates = {
    // User billing details
    ConsineeClientXid: 0, // by default it is 0 because we are not passing if nulll.....
    NamePrefix: null,
    firstName: null,
    lastName: null,
    companyName: null,
    gstin: null,
    country: 0,
    streetAddress: "",
    apartmentDetails: "",
    city: null,
    state: null,
    email: null,
    pid: 0,
    clientReferenceNumber: null,
    mobile: null,
    password: null,
    countryXid: null,
    branchXid: null,
    createdOn: dayjs(),
    poBox: null,
    streetAddress: null,
    //clientTypeXid: null, // this is not required.
    stateName: null,

    // Subscription details
    subscriptionDuration: 12,
    SubscriptionAmount: 0,
    GSTPercentage: 0,
    GSTPercentageAmount: 0,
    Total: 0,
    isChanged: false,
    PaymentTransactions: {
      PaymentModeXID: 1,
    },
  };

  const loginInitialStates = {
    // User billing details
    UserName: null,
    Password: null,
  };

  //bind the countries...
  const [
    fetchCountries,
    { data: getCountriesData, isSuccess: isGetCountriesSuccess },
  ] = useCountriesMutation();

  useEffect(() => {
    fetchCountries({ id: "1" });
  }, []);

  //end here

  //here I am gettin gexisting biling address detials / known as client in the backend...
  const [
    fetch,
    {
      data: getUserAddressData,
      isSuccess: isUserAddressDataSuccess,
      reset: resetUserCompanyByBrandAndUser,
    },
  ] = useGetUserCompanyByBrandAndUserMutation();

  //upon response getting the data...
  useEffect(() => {
    if (!!getUserAddressData && getUserAddressData?.length > 0) {
      dispatch(setLoadingModalConfiguration({ isVisible: false }));
      setStates({
        ...states,
        firstName: getUserAddressData[0]?.firstName,
        lastName: getUserAddressData[0]?.lastName,
        mobile: getUserAddressData[0]?.mobile,
        companyName: getUserAddressData[0]?.companyName,
        countryXid: getUserAddressData[0]?.countryXid,
        ConsineeClientXid: getUserAddressData[0]?.pid,
        gstin: getUserAddressData[0]?.gstin,
        streetAddress: getUserAddressData[0]?.officeAddress,

        poBox: getUserAddressData[0]?.poBox,
        email: getUserAddressData[0]?.email,
      });
      resetUserCompanyByBrandAndUser();
    } else if (isUserAddressDataSuccess) {
      dispatch(setLoadingModalConfiguration({ isVisible: false }));
    }
  }, [getUserAddressData, isUserAddressDataSuccess]);
  // end here....

  //on load getting the user Address/ company  data....
  useEffect(
    function Assets() {
      if (!!authCtx.clientID) {
        // if client ID exists.....
        dispatch(setLoadingModalConfiguration({ isVisible: true }));
        fetch({
          CBXID: process.env.REACT_APP_CBXID,
          UserXID: authCtx.clientID,
        });
      }
    },
    [fetch],
  );

  //end here...
  //const [Razorpay, isLoaded] = useRazorpay();

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };
  const [states, setStates] = useState(initialStates);
  const [loginStates, setLoginStates] = useState(loginInitialStates);

  //Razor Pay
  const dispatch = useDispatch();
  const authCtx = useContext(AuthContext);
  const [subscriptionDuration, setSubscriptionDuration] = useState(12);
  const [createOrder, { data: getFetchData, isSuccess: isFetchDataSuccess }] =
    usePostRazorOrderMutation();

  useEffect(() => {
    if (!!!getFetchData) return;
    // console.log("getFetchData", getFetchData);
    setApiStatus((prev) => ({ ...prev, orderApi: "failed" }));
    console.log("Order API failed:", getFetchData.message);
    if (getFetchData?.statusCode === 500) {
      alert(getFetchData.message);
    } else {
      setApiStatus((prev) => ({ ...prev, orderApi: "success" }));
      console.log("Order API success:", getFetchData);
      //Map data from API to state

      const options = {
        //  key: "rzp_test_34osJN9wvJynKP",
        key: "rzp_live_JCDcoamlzzQIFb",
        amount: getFetchData?.details?.attributes?.amount || 0,
        currency: "INR",
        name: "CALIBRECUE IT SOLUTIONS",
        description: "Transaction",
        // image: "https://example.com/your_logo",
        order_id: getFetchData?.details?.attributes?.id || 0,
        handler: (res) => {
          const data = {
            AmountReceived: 100,
            // AmountReceived: (cartState?.CartState.price * subscriptionDuration) * 100,
            OfferXid: null,
            Type: "Month",
            Duration: subscriptionDuration,
            PaymentRef: res.razorpay_payment_id,
            PlanXid: 2,
            IsActive: 1,
            subscriptionDate: dayjs(),
            subscriptionStartDate: dayjs(),
            //  subscriptionEndDate: dayjs(),
            subscriptionEndDate: dayjs().add(
              dayjs.duration({ months: subscriptionDuration }),
            ),
            companyXid: 0, /// this is getting from the backend.....
            UserXID: 2, // this is from redux
            lastEditByXid: 9999,
          };
          // SubscriptionDetails({
          //     data: data,
          // });
        },
        prefill: {
          name: "afsdasdf",
          email: "ateeq@calibrecue.com",
          contact: "9959728586",
        },
        notes: {
          address: "",
        },
        theme: {
          color: "#3399cc",
        },
      };

      // const rzpay = new Razorpay(options);
      // rzpay.open();
      const rzp = new window.Razorpay(options);
      rzp.open();

      ///to add invoice...
    }
  }, [getFetchData, isFetchDataSuccess]);

  const [orderNotes, setOrderNotes] = useState("");
  const [orderTotal, setOrderTotal] = useState(0);
  const [orderSubtotal, setOrderSubtotal] = useState(0);
  const [orderTax, setOrderTax] = useState(0);
  const [orderShipping, setOrderShipping] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  // const [isChecked, setIsChecked] = useState(false);
  // const [selectedCOD, setSelectedCOD] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  // state
  const [showPaymentImage, setShowPaymentImage] = useState(false);

  const history = useHistory();
  const location = useLocation();
  const formRef = useRef(null);
  const [apiStatus, setApiStatus] = useState({
    orderApi: "not called",
    invoiceApi: "not called",
  });

  // Get the cart total from localStorage when component mounts
  useEffect(() => {
    const total = localStorage.getItem("cartTotal");
    const subtotal = localStorage.getItem("cartSubtotal");
    const tax = localStorage.getItem("cartTax");
    const shipping = localStorage.getItem("cartShipping");

    if (total) setOrderTotal(parseFloat(total));
    if (subtotal) setOrderSubtotal(parseFloat(subtotal));
    if (tax) setOrderTax(parseFloat(tax));
    if (shipping) setOrderShipping(parseFloat(shipping));
  }, []);

  // Summary totals now from the cart
  const subtotal = orderSubtotal;
  // Always make shipping free if subtotal > 500, regardless of orderShipping value
  const shipping = subtotal <= 500 ? 0 : orderShipping;
  const tax = orderTax || 0;
  // const total = orderTotal || subtotal + shipping + tax;
  const total = orderTotal;

  const [Add, { data: getAddAssetData, isSuccess: isAddAssetSuccess }] =
    usePostOrderMutation();

  useEffect(() => {
    if (isAddAssetSuccess === false) return;
    if (!!getAddAssetData) {
      if (getAddAssetData?.statusCode === 500) {
        setApiStatus((prev) => ({ ...prev, invoiceApi: "failed" }));
        dispatch(setLoadingModalConfiguration({ isVisible: false }));
        alert(getAddAssetData?.message);
      } else if (getAddAssetData?.status === 400) {
        setApiStatus((prev) => ({ ...prev, invoiceApi: "failed" }));
        dispatch(setLoadingModalConfiguration({ isVisible: false }));
        alert(JSON.stringify(getAddAssetData?.errors));
      } else {
        setApiStatus((prev) => ({ ...prev, invoiceApi: "success" }));
        console.log("Invoice API success:", getAddAssetData);

        dispatch(setLoadingModalConfiguration({ isVisible: false }));

        // ✅ CLEAR CART
        setCartItems([]);

        // ✅ ALSO CLEAR LOCAL STORAGE (important)
        localStorage.removeItem("cartItems");
        localStorage.removeItem("cartTotal");
        localStorage.removeItem("cartSubtotal");
        localStorage.removeItem("cartTax");
        localStorage.removeItem("cartShipping");

        history.push("PaymentSuccess");
      }
    }
  }, [isAddAssetSuccess, getAddAssetData]);

  //validation will tigger here...

  const billingFields = (isAddToCart = false) => {
    let billing;

    const commonBillingObj = {
      firstName: string().required(),
      lastName: string().required(),
      companyName: string().required(),
      country: string().required(),
      streetAddress: string().required(),
      email: string().required(),
      poBox: string().required(),
    };
    return commonBillingObj;
  };

  console.log("cartItems", cartItems);
  console.log("Erros", states);

  const generateInvoice = useCallback(() => {
    // return;
    //end here...
    dispatch(setLoadingModalConfiguration({ isVisible: true }));

    const commonCompany = {
      companyBranchInvoices: {
        CBXid: process.env.REACT_APP_CBXID,
        ConsineeClientXid: states.ConsineeClientXid,
        InvoiceCreatedOn: dayjs(new Date()),
        NamePrefix: states.NamePrefix,
        FirstName: states.firstName, // this is for client when not exists..
        LastName: states.lastName, // this is for client when not exists..
        GSTIN: states.gstin,
        POBox: states.poBox,
        ClientEmailAddress: states.email,
        MobileNo: states.mobile,
        OfficeAddress: states.streetAddress,
        To_Name: "",
        ClientCompanyName: states.companyName,
        PaymentTerms: "",
        PurchaseOrder: "0",
        PurchaseOrderDate: dayjs(),
        Remarks: "",
        PaymentRemarks: "",
        Validity: "",
        //  eWayBillNumber: form.getFieldValue("eWayBillNumber"),
        DeliveryNote: states.DeliveryNote,
        //  ModeorTermsOfPayment: form.getFieldValue("ModeorTermsOfPayment"),
        //  OtherReferences: form.getFieldValue("OtherReferences"),
        //   DespatchedDocumentNumber: form.getFieldValue("DespatchedDocumentNumber"),
        //   DeliveryNoteDateNew: form.getFieldValue("DeliveryNoteDate"),
        //  Price: form.getFieldValue("Price"),
        //   Transport: form.getFieldValue("Transport"),
        //  InvoiceCreatedOn:"",  // should be ssystem date.
        Taxes: "",
        //  Delivery: form.getFieldValue("Delivery"),
        //  PandF: form.getFieldValue("PandF"),
        formTypeXid: 6, // the value is assiging in the top of the page...
        CompanyShortName: "",
        TYear: null,
        RefID: 0, // not accepting null value in backend so added as 0...
        StateXid: 1,
        //  InvoiceXid: null, // not accepting null value ...
        //  PaymentStatusXid: 2,//pending....
        PaymentStatusXid: states.PaymentModeXID == 1 ? 2 : 4,
        // PaymentStatusXid: payment,
        // BuyerClientXid: form.getFieldValue("BuyerClientXid"),
        BuyerClientXid: states.ConsineeClientXid,
        lastEditByXid: !!getFetchLoginData
          ? getFetchLoginData?.userXid
          : BTFSAuthCtx.clientID,
        // IsProjectWise: states.IsProjectWise,
        TransactionStatusXid: 2, //default pending...
        UserXid: !!getFetchLoginData
          ? getFetchLoginData?.userXid
          : BTFSAuthCtx.clientID, // this is used to add in the AMC MAP for only ecommerce application....
      },

      //bind the Details from the Cart Context.....
      InvoiceProductDetails: cartItems.map((item) => ({
        itemXID: item.id,
        Description: item.description || item.itemName,
        SelectedColor: item.selectedColor || "",
        SelectedSize: item.selectedSize || "",
        ItemSpecficationXID: null,
        UOM: item.UOM,
        QuantityAmount: item.price,
        Quantity: item.quantity,
        TotalAmount: item.price,
        InvoiceDiscountType: 0,
        InvoiceDiscountValue: 0,
        InvoiceDiscountAmount: 9,
        TotalRateBeforeDiscount: 0,
        ExciseDutyTotalInWords: "0",
        HSNCODE: "",
        GSTPer: 10,
        SGSTPer: 5,
        SGSTAmount: (item.price * 5) / 100,
        CGSTPer: 5,
        CGSTAmount: (item.price * 5) / 100,
        IGSTPer: null,
        IGSTAmount: null,
        //AfterGSTAmount: item.price + (item.price * 18) / 100,
        AfterGSTAmount: item.price,
      })),
      // here payment details...
      // here I am checking if payment
      // 2 Pay now / Bank Transfer....
      PaymentTransactions:
        states.PaymentModeXID == 2
          ? {
              ClientXID: states.ConsineeClientXid,
              AmountReceived: geteCommerceInvoiceSum({
                invoiceData: cartItems,
              }),
              //1 equal to receipt
              // 2 equal to Paid/Payment
              PaymentModeXID: states.PaymentModeXID,
              CBXid: process.env.REACT_APP_CBXID,
              PaymentType: states.formPaymentTypeXID, /// this need to check... and added from the String...
              PaymentTypeXid: states.formPaymentTypeXID, /// this need to check... and added from the String...
              lastEditByXid: !!getFetchLoginData
                ? getFetchLoginData?.userXid
                : BTFSAuthCtx.userXid,
            }
          : null,

      // end here....
    };

    Add({ data: commonCompany });
  }, [cartItems, states]);

  const [
    fetchLogin,
    {
      data: getFetchLoginData,
      isSuccess: isFetchLoginDataSuccess,
      isError: isError,
    },
  ] = useLoginMutation();

  const [invalidUser, setInvalidUser] = useState(false);
  const [unknownError, setUnknownError] = useState(false);

  useEffect(() => {
    if (getFetchLoginData !== null && isFetchLoginDataSuccess) {
      if (getFetchLoginData == undefined && isFetchLoginDataSuccess) {
        setUnknownError(true);
        dispatch(setLoadingModalConfiguration({ isVisible: false }));
        return;
      } else {
        setUnknownError(false);
      }
      if (!!getFetchLoginData && getFetchLoginData?.statusCode !== 400) {
        const expirationTime = new Date(new Date().getTime() + 20000 * 10000);

        authCtx.login(
          getFetchLoginData.token,
          //getRightUser[0].pid === "9999" ? "superAdmin" : "admin",
          getFetchLoginData.roles,
          getFetchLoginData.companyXid,
          getFetchLoginData?.branchDtls[0]?.companyName, //company is ..
          // getUserByBranch[0].companyBranch.pid,
          getFetchLoginData.roles === "SuperAdmin"
            ? 0
            : getFetchLoginData?.branchDtls[0]?.pid,
          getFetchLoginData?.userXid, // this is client id default 0...
          getFetchLoginData?.clientXid, // this is client id  from the client table... default 0... and this actual clietn ID.
          getFetchLoginData?.firstName, // this is the first Name....
          getFetchLoginData?.underUserXid, // this is the first Name....
          expirationTime.toISOString(),
        );
        setInvalidUser(false);

        //here getting the address / company details....
        fetch({
          CBXID: process.env.REACT_APP_CBXID,
          UserXID: getFetchLoginData?.userXid, //here client id getting null, so used userxid....
        });
        dispatch(setLoadingModalConfiguration({ isVisible: false }));
      } else if (getFetchLoginData?.statusCode === 400) {
        dispatch(setLoadingModalConfiguration({ isVisible: false }));
        setInvalidUser(true);
      } else {
        dispatch(setLoadingModalConfiguration({ isVisible: false }));
        setInvalidUser(false);
      }
    }
  }, [getFetchLoginData, isFetchLoginDataSuccess]);

  const handleLoginSubmit = (e) => {
    e.preventDefault();

    const expirationTime = new Date(new Date().getTime() + 20000 * 10000);
    dispatch(setLoadingModalConfiguration({ isVisible: true }));

    let data = {
      username: loginStates.userName,
      password: loginStates.password,
    };

    fetchLogin({
      data: data,
    });
  };
  // end here..
  const handleSubmit = (e) => {
    e.preventDefault();

    commonValidator({
      fields: billingFields(),
      fieldValues: states,
    }).then((r) => {
      console.log("Response", JSON.stringify(r));
      if (r === true) {
        setErrors({});
        generateInvoice();
      } else {
        const errVal = {};
        // loop over the errors object & assign respective error msg
        for (const key in r) {
          // Only assign common validation messages & ignore custom ones
          if (
            key !== "amount" &&
            key !== "installmentsNumber" &&
            key !== "CDSLClientID" &&
            key !== "DPID" &&
            key !== "NSDLClientID" &&
            key !== "switchValue" &&
            key !== "switchAmount"
          ) {
            errVal[key] = commonValidationsMsg[key];
          }
        }

        setErrors({
          ...r, // For custom validation messages
          ...errVal, // Overwrite non-custom preassigned yup validation messages with common ones
          ...errors, // Overwrite validation messages with existing ones
        });
      }
    });
  };

  const handleInputChangeFirstName = (e) => {
    const { name, value } = e.target;
    const { firstName, ...Err } = errors;
    setStates({
      ...states,
      firstName: e.target.value,
      //  isChanged: true,
    });

    const field = {
      firstName: string().required(),
    };

    const fieldValues = {
      firstName: value,
    };
    commonValidator({ fields: field, fieldValues: fieldValues }).then((r) => {
      if (r === true) {
        //  const newErrors = { ...errors };
        // delete newErrors[name];
        setErrors({});
      } else {
        setErrors({
          ...errors,
          ...r,
        });
      }
    });
  };

  const handleInputChange = (e) => {
    // const { name, value } = e.target;
    // const { firstName, ...Err } = errors;
    // setStates({
    //   ...states,
    //   [name]: value,
    //   //  isChanged: true,
    // });
    // const field = {
    //   firstName: string().required(),
    // };
    // const fieldValues = {
    //   firstName: value,
    // };
    // commonValidator({ fields: field, fieldValues: fieldValues }).then((r) => {
    //   if (r === true) {
    //     const newErrors = { ...errors };
    //     // delete newErrors[name];
    //     setErrors(newErrors);
    //   } else {
    //     setErrors({
    //       ...errors,
    //       ...r,
    //     });
    //   }
    // });
  };

  const handleInputChangeAddress = (e) => {
    const { name, value } = e.target;
    console.log("InvoiceFields ", errors);
    const { streetAddress, ...Err } = errors;
    setStates({
      ...states,
      streetAddress: value,
      //  isChanged: true,
    });

    const field = {
      streetAddress: string().required(),
    };

    const fieldValues = {
      streetAddress: value,
    };

    commonValidator({ fields: field, fieldValues: fieldValues }).then((r) => {
      if (r === true) {
        setErrors(Err);
      } else {
        setErrors(r);
      }
    });
  };

  const handleInputChangeEmail = (e) => {
    const { name, value } = e.target;
    const { email, ...Err } = errors;
    setStates({
      ...states,
      email: value,
      //  isChanged: true,
    });

    const field = {
      email: string().required(),
    };

    const fieldValues = {
      email: value,
    };

    commonValidator({ fields: field, fieldValues: fieldValues }).then((r) => {
      if (r === true) {
        setErrors(Err);
      } else {
        setErrors(r);
      }
    });
  };

  const handleInputChangeCompanyName = (e) => {
    const { name, value } = e.target;
    console.log("InvoiceFields ", errors);
    const { companyName, ...Err } = errors;
    setStates({
      ...states,
      companyName: value,
      //  isChanged: true,
    });

    const field = {
      companyName: string().required(),
    };

    const fieldValues = {
      companyName: value,
    };

    commonValidator({ fields: field, fieldValues: fieldValues }).then((r) => {
      if (r === true) {
        setErrors(Err);
      } else {
        setErrors(r);
      }
    });
  };

  const handleInputChangeGST = (e) => {
    const { name, value } = e.target;
    console.log("InvoiceFields ", errors);
    const { gstin, ...Err } = errors;
    setStates({
      ...states,
      gstin: value,
      //  isChanged: true,
    });

    const field = {
      gstin: string().required(),
    };

    const fieldValues = {
      gstin: value,
    };

    commonValidator({ fields: field, fieldValues: fieldValues }).then((r) => {
      if (r === true) {
        setErrors(Err);
      } else {
        setErrors(r);
      }
    });
  };

  const handleInputChangeMobile = (e) => {
    const { name, value } = e.target;
    console.log("InvoiceFields ", errors);
    const { mobile, ...Err } = errors;
    setStates({
      ...states,
      mobile: value,
      //  isChanged: true,
    });

    const field = {
      mobile: string().required(),
    };

    const fieldValues = {
      mobile: value,
    };

    commonValidator({ fields: field, fieldValues: fieldValues }).then((r) => {
      if (r === true) {
        setErrors(Err);
      } else {
        setErrors(r);
      }
    });
  };

  const handleInputChangelastName = (e) => {
    const { name, value } = e.target;
    console.log("InvoiceFields ", errors);
    const { lastName, ...Err } = errors;
    setStates({
      ...states,
      lastName: value,
      //  isChanged: true,
    });

    const field = {
      lastName: string().required(),
    };

    const fieldValues = {
      lastName: value,
    };

    commonValidator({ fields: field, fieldValues: fieldValues }).then((r) => {
      if (r === true) {
        setErrors(Err);
      } else {
        setErrors(r);
      }
    });
  };

  const OnChangeHandler = (e) => {
    // states({
    //   ...states.PaymentTransactions,
    //   PaymentModeXID: e.target.value,
    // })
    setStates((prevState) => ({
      ...prevState,
      PaymentTransactions: {
        ...prevState.PaymentTransactions,
        PaymentModeXID: e.target.value,
      },
    }));
  };

  const handleInputChangeTownOrCity = (e) => {
    setStates({
      ...states,
      city: e.target.value,
    });
  };

  const handleInputChangeDeliveryNote = (e) => {
    setStates({
      ...states,
      DeliveryNote: e.target.value,
      //  isChanged: true,
    });
  };

  const handleInputChangeLoginUserName = (e) => {
    setLoginStates({
      ...loginStates,
      userName: e.target.value,
    });
  };

  const handleInputChangeLoginPassword = (e) => {
    setLoginStates({
      ...loginStates,
      password: e.target.value,
    });
  };

  const handleInputChangepoBox = (e) => {
    setStates({
      ...states,
      poBox: e.target.value,
      //  isChanged: true,
    });
  };
  const OnChangeHandlerPayment = (e) => {
    const checked = e.target.checked;

    setShowPaymentImage(checked);

    setStates((prevState) => ({
      ...prevState,
      PaymentTransactions: {
        ...prevState.PaymentTransactions,
        PaymentModeXID: checked ? 2 : 0,
      },
    }));
  };
  const [
    fetcharea, // the trigger function
    { data: branches, isLoading, isSuccess },
  ] = useBranchByCountryIDMutation();
  useEffect(() => {
    fetcharea({ countryid: 4 });
  }, []);
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white py-4 shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-4 flex justify-center items-center text-sm font-medium">
          <Link
            to="/"
            className="text-blue-600 hover:text-blue-800 transition-colors"
          >
            HOME
          </Link>
          <span className="mx-2 text-gray-400">/</span>
          <span className="text-gray-800">CHECKOUT</span>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 sm:py-12">
        <div className="flex flex-col items-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 text-center mb-8">
            Complete Your Purchase
          </h1>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Billing Details */}
          <div className="w-full lg:w-3/5">
            {!!!authCtx.isLoggedIn ? (
              <div className="bg-white rounded-xl shadow-md p-5 sm:p-6 border border-gray-100 mb-6">
                <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                  <span className="bg-blue-100 text-blue-600 w-7 h-7 rounded-full inline-flex items-center justify-center mr-3 text-sm">
                    1
                  </span>
                  Login
                </h2>

                <form onSubmit={handleLoginSubmit}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        User Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name={"userName"}
                        required
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition bg-white text-black"
                        value={loginStates.userName}
                        onChange={handleInputChangeLoginUserName}
                      />
                      <span className="errorMsg">{errors?.userName}</span>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Password <span className="text-red-500">*</span>
                      </label>

                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          name="password"
                          required
                          className="w-full p-3 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition bg-white text-black"
                          value={loginStates.password}
                          onChange={handleInputChangeLoginPassword}
                        />

                        <span
                          className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-black-500"
                          onClick={() => setShowPassword((prev) => !prev)}
                        >
                          {showPassword ? (
                            <EyeOutlined />
                          ) : (
                            <EyeInvisibleOutlined />
                          )}
                        </span>
                      </div>

                      <span className="errorMsg">{errors?.password}</span>
                    </div>

                    <div className="flex gap-4 self-start mr-6 mt-6">
                      {/* <Link
                        to="/SignIn"
                        className="no-underline px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold shadow-md hover:from-blue-600 hover:to-indigo-700 transition duration-300"
                      >
                        Login
                      </Link> */}
                      <button
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 flex items-center justify-center"
                        type="Login"
                        onClick={handleLoginSubmit}
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <svg
                              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                            PROCESSING...
                          </>
                        ) : (
                          "Login"
                        )}
                      </button>
                      <Link
                        to="/Register"
                        className="inline-flex items-center justify-center whitespace-nowrap no-underline px-4 py-2 rounded-lg border border-indigo-600 text-indigo-600 font-semibold transition duration-300"
                      >
                        Sign Up
                      </Link>
                    </div>
                  </div>
                </form>
              </div>
            ) : (
              <></>
            )}
            <div className="bg-white rounded-xl shadow-md p-5 sm:p-6 border border-gray-100 mb-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                <span className="bg-blue-100 text-blue-600 w-7 h-7 rounded-full inline-flex items-center justify-center mr-3 text-sm">
                  1
                </span>
                Sign-up Details
              </h2>

              <form ref={formRef} onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      First Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name={"firstName"}
                      required
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition bg-white text-black"
                      value={states.firstName}
                      onChange={handleInputChangeFirstName}
                    />
                    <span className="errorMsg">{errors?.firstName}</span>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name={"lastName"}
                      required
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition bg-white text-black"
                      value={states.lastName}
                      onChange={handleInputChangelastName}
                    />
                    <span className="errorMsg">{errors?.lastName}</span>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Mobile Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      maxLength={10}
                      name={"Mobile"}
                      required
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition bg-white text-black"
                      value={states.mobile}
                      onChange={handleInputChangeMobile}
                    />
                    <span className="errorMsg">{errors?.mobile}</span>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name={"email"}
                      required
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition bg-white text-black"
                      value={states.email}
                      onChange={handleInputChangeEmail}
                    />
                    <span className="errorMsg">{errors?.email}</span>
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Vehicle NO:
                    {/* <span className="text-gray-400">(Optional)</span> */}
                  </label>
                  <input
                    type="text"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition bg-white text-black"
                    value={states.companyName}
                    onChange={handleInputChangeCompanyName}
                  />
                  <span className="errorMsg">{errors?.companyName}</span>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    GST Number
                    <span className="text-gray-400">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition bg-white text-black"
                    value={states.gstin}
                    onChange={handleInputChangeGST}
                  />
                  <span className="errorMsg">{errors?.gstin}</span>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Country / Region <span className="text-red-500">*</span>
                  </label>
                  <select
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition bg-white text-black"
                    value={states.country}
                  >
                    {getCountriesData?.map((a) => (
                      <option key={a.pid} value={a.pid}>
                        {a.nameEng}
                      </option>
                    ))}
                  </select>
                  <span className="errorMsg">{errors?.country}</span>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    State <span className="text-red-500">*</span>
                  </label>

                  <Select
                    placeholder="Select State"
                    showSearch
                    optionFilterProp="children"
                    className="w-full"
                    allowClear
                  >
                    {branches?.map((branch) => (
                      <Select.Option key={branch.pid} value={branch.pid}>
                        {branch.nameAra}
                      </Select.Option>
                    ))}
                  </Select>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Street Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    name={"streetAddress"}
                    placeholder="House number and street name"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition mb-2 bg-white text-black"
                    value={states.streetAddress}
                    onChange={handleInputChangeAddress}
                  />
                  <span className="errorMsg">{errors?.streetAddress}</span>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Town / City <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name={"city"}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition bg-white text-black"
                    value={states.city}
                    onChange={handleInputChangeTownOrCity}
                  />
                  <span className="errorMsg">{errors?.city}</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Postcode / ZIP <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name={"poBox"}
                      required
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition bg-white text-black"
                      value={states.poBox}
                      onChange={handleInputChangepoBox}
                    />
                    <span className="errorMsg">{errors?.poBox}</span>
                  </div>
                </div>
              </form>
            </div>

            {/* Additional Information */}
            <div className="bg-white rounded-xl shadow-md p-5 sm:p-6 border border-gray-100">
              <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                <span className="bg-blue-100 text-blue-600 w-7 h-7 rounded-full inline-flex items-center justify-center mr-3 text-sm">
                  2
                </span>
                Additional Information
              </h2>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Order notes <span className="text-gray-400">(Optional)</span>
                </label>
                <textarea
                  rows="4"
                  placeholder="Notes about your order, e.g. special notes for delivery."
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition bg-white text-gray-800"
                  value={states.DeliveryNote}
                  onChange={handleInputChangeDeliveryNote}
                ></textarea>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="w-full lg:w-2/5">
            <div className="bg-white rounded-xl shadow-md p-5 sm:p-6 border border-gray-100 sticky top-8">
              <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                <span className="bg-blue-100 text-blue-600 w-7 h-7 rounded-full inline-flex items-center justify-center mr-3 text-sm">
                  3
                </span>
                Your Order
              </h2>

              <div className="border-b border-gray-200 pb-4">
                <div className="flex justify-between font-medium mb-4">
                  <span className="text-blue-600">Summary</span>
                  <span className="text-blue-600">Amount</span>
                </div>

                <div className="flex justify-between py-2 text-gray-700">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
              </div>

              {tax > 0 && (
                <div className="flex justify-between py-2 text-gray-700 border-b border-gray-200">
                  <span>Tax (5% inclusive)</span>
                  <span>₹{tax.toFixed(2)}</span>
                </div>
              )}

              <div className="py-4">
                <div className="flex justify-between">
                  <span className="font-bold text-lg text-gray-800">Total</span>
                  <span className="font-bold text-lg text-blue-600">
                    ₹{total.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Payment Method */}
              <div className="mt-2 mb-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2 flex items-center">
                  <span className="bg-blue-100 text-pink-500 w-8 h-8 rounded-full inline-flex items-center justify-center mr-3 text-sm">
                    4
                  </span>
                  Payment Method
                </h3>
                <div className="space-y-10 p-1">
                  <Checkbox
                    checked={showPaymentImage}
                    onChange={OnChangeHandlerPayment}
                  >
                    Pay Now
                  </Checkbox>

                  {showPaymentImage && (
                    <div className="mt-15 flex justify-center px-2 sm:px-10">
                      <img
                        src={RazorpayImage}
                        alt="Razorpay"
                        className="
        w-full
        max-w-[600px]
        sm:max-w-[300px]
        md:max-w-[380px]
        lg:max-w-[450px]
        xl:max-w-[500px]
        h-auto
        object-contain
        rounded-xl
        shadow-lg
        transition-all
        duration-300
      "
                      />
                    </div>
                  )}
                </div>
              </div>

              <button
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 flex items-center justify-center"
                type="submit"
                onClick={handleSubmit}
                disabled={isSubmitting || !authCtx.isLoggedIn}
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    PROCESSING...
                  </>
                ) : (
                  "PLACE ORDER"
                )}
              </button>

              <div className="mt-6 text-sm text-gray-600">
                <div className="flex items-center mb-3">
                  {/* <svg
                    className="w-5 h-5 text-green-500 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    ></path>
                  </svg> */}
                  {/* <span className="font-medium">Secure Checkout:</span> */}
                </div>
                {/* <p className="text-gray-500 text-sm pl-7">
                  Your payment information is encrypted for your security
                </p>

                <div className="flex items-center mt-4">
                  <span className="font-medium mr-3">We accept:</span>
                  <div className="flex space-x-2">
                    <div className="flex items-center justify-center w-10 h-6 bg-blue-800 rounded">
                      <span className="text-xs text-white font-bold">VISA</span>
                    </div>
                    <div className="flex items-center justify-center w-10 h-6 bg-red-500 rounded">
                      <span className="text-xs text-white font-bold">MC</span>
                    </div>
                    <div className="flex items-center justify-center w-10 h-6 bg-blue-500 rounded">
                      <span className="text-xs text-white font-bold">AMEX</span>
                    </div>
                    <div className="flex items-center justify-center w-10 h-6 bg-yellow-400 rounded">
                      <span className="text-xs text-blue-800 font-bold">
                        PP
                      </span>
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
            {/* 
            <div className="bg-white rounded-xl shadow-md p-5 sm:p-6 border border-gray-100 mt-6">
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <svg
                    className="w-5 h-5 text-blue-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="font-medium text-gray-800">Need Help?</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Have questions about your order? Contact our customer
                    support team.
                  </p>
                  <a
                    href="mailto:support@example.com"
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium mt-1 inline-block"
                  >
                    support@example.com
                  </a>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>

      {/* <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-sm">
                © 2025 Your Company. All rights reserved.
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-6">
              <a
                href="#"
                className="text-sm text-gray-300 hover:text-white transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-sm text-gray-300 hover:text-white transition-colors"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="text-sm text-gray-300 hover:text-white transition-colors"
              >
                Refund Policy
              </a>
            </div>
          </div>
        </div>
      </footer> */}
    </div>
  );
}
