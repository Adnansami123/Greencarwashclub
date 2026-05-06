const [data, setData] = useState([]);


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

<div className="row register-form">
<div class="row bg-primary">
    <div class="col-16">
        PRODUCT/KIT DETAILS
    </div>
</div>
</div>


useEffect(() => {
    if (getFetchData?.length > 0 && isFetchDataSuccess) {
        setData(getFetchData);
    }

}, [getFetchData, isFetchDataSuccess]);


<div className="col-md-12">
<Form.Item
    className="username"
    label="Product"
    name="ProductXid"
    rules={[
        {
            required: true,
            message: "Please enter the Product Name!",
        },
    ]}
>
    <Select placeholder="Item">
        {data?.map((a) =>
        (
            // <option key={a.pid} value={JSON.stringify(a)}>{a.itemName}</option>
            <option key={a.pid} value={a.pid}>{a.itemName}</option>
        ))}
    </Select>
</Form.Item>

</div>