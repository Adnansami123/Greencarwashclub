import { Button, Card, Input, Radio, Select } from "antd";
import React, { Component, useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useGetAllInventoriesMutation } from "../../store/InventoryAPI/InventoryAPI";
import { useDispatch, useSelector } from "react-redux";
import { cartStateActions } from "../../store/authentication";
const Products = () => {

    const dispatch = useDispatch();
    const history = useHistory();

    const cartState = useSelector(
        (state) => state.CartStateSlice.CartState
    );

    console.log("onClickPurchase", cartState);
    console.log("onClickPurchase", cartState?.CartState);
    console.log("onClickPurchase", JSON.stringify(cartState));

    const [
        fetch,
        {
            data: getFetchData,
            isSuccess: isFetchDataSuccess,
        },
    ] = useGetAllInventoriesMutation();


    //getting products detials....
    useEffect(
        function Assets() {
            fetch({
                CBXID: 1,
            });

        }, [fetch]);


    const onClickLoginPage = () => {
        history.push("Sign-In");
    }

    const Onclick = () => {

        history.push("Payments", {
            stateData: null
        });
    }



    const onClickPurchase = (e, key) => {
        dispatch(cartStateActions.setCartStateState({ CartState: e.key }));
        console.log("onClickPurchase", JSON.stringify(e));
        console.log("onClickPurchase", JSON.stringify(key));
    }
    return (

        <>
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-12 ">
                        <Card bordered={false} title="Products" className="criclebox">

                            <div class="text-center container py-5">
                                {!!getFetchData && (
                                    <>
                                        <div class="row">


                                            {getFetchData?.map((a) =>
                                            (
                                                <>
                                                    <div class="col-lg-4 col-md-12 mb-3">
                                                        <div class="card bg-primary">
                                                            <div class="bg-image hover-zoom ripple ripple-surface ripple-surface-light"
                                                                data-mdb-ripple-color="light">
                                                                <img src={'ProductImages/' + a.imageName} />
                                                                <div className="hover-overlay bg-info">
                                                                    <div class="mask"></div>
                                                                </div>
                                                            </div>
                                                            <div class="card-body bg-info">
                                                                <h5 class="card-title mb-3">{a.itemName}</h5>
                                                                <h6 class="mb-3">Amount: {a.salePrice}</h6>
                                                            </div>
                                                        </div>
                                                        <div class="row">
                                                            <div class="col-lg-4 col-md-12 mb-3">
                                                                <div class="mask">
                                                                    <div class="d-flex justify-content-start align-items-end h-100">
                                                                        {cartState?.CartState?.pid == a.pid ?
                                                                            <>
                                                                                <h5><span class="badge bg-primary ms-2">Selected</span></h5>
                                                                            </>
                                                                            : null}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="col-lg-6 col-md-12 mb-3">
                                                                <div className="bg-white text-white">
                                                                    <div className="mask"><Button className="btn-primary text-white" onClick={() => onClickPurchase({ key: a })}>Select This</Button></div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </>
                                            ))}
                                            {/* <div class="col-lg-6 col-md-6 mb-4">
                                        <div class="card">
                                            <div class="bg-image hover-zoom ripple ripple-surface ripple-surface-light"
                                                data-mdb-ripple-color="light">
                                                <img src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Products/img%20(4).webp"
                                                    class="w-100" />
                                                <a href="#!">
                                                    <div class="mask">
                                                        <div class="d-flex justify-content-start align-items-end h-100">
                                                            <h5><span class="badge bg-success ms-2">Eco</span></h5>
                                                        </div>
                                                    </div>
                                                    <div class="hover-overlay">
                                                        <div class="mask"></div>
                                                    </div>
                                                    <div class="hover-overlay">
                                                        <div class="mask"><Button>Select This</Button></div>
                                                    </div>
                                                </a>
                                            </div>
                                            <div class="card-body">
                                                <a href="" class="text-reset">
                                                    <h5 class="card-title mb-3">Product name</h5>
                                                </a>
                                                <a href="" class="text-reset">
                                                    <p>Category</p>
                                                </a>
                                                <h6 class="mb-3">$61.99</h6>
                                            </div>
                                        </div>
                                    </div> */}
                                        </div>
                                        <div class="row">
                                            <div className="mb-12 text-right">
                                                <Button type="Primary" disabled={!!cartState?.CartState == true ? false : true} className="btn-primary text-white" onClick={Onclick}>
                                                    Continue To Payment
                                                </Button>
                                                <p>*Please select the product to continue</p>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>

                        </Card>
                    </div>
                </div>
            </div>
        </>
    )
};

export default Products