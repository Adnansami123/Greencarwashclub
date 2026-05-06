module.exports = {
    UserAPIs_Users:
    {
        user: "/User",
        postUser: "/User"

    },  
    assetAPIs_AssetTypes:
    {
        AssetTypes: "/AssetType",

    },
    assetAPIs_SubAssetTypes:
    {
        SubAssetType: "/SubAssetType",

    },
    assetAPIs_AssetDetails:
    {
        AssetDetails: "/AssetDetail",
    },
    AMCMAPAPIs:
    {
        AMCMAPAPIs: "/AMCMap",
    },
    DashboardAPIs:
    {
        DashboardAPIs: "/Dashboard",
    },
    Branches:
    {
        Branch: "/Branch",
        Country: "/Country",
    },
    StateNamesAPI:
    {
        StateNames: "/StateNames",
    },
    PPMFrequency:
    {
        PPMFrequency: "/PPMFrequency",
    },
    PPMFrequencySurveySchedule:
    {
        PPMFrequencySurveyScheduleEndPoint: "/PPMFrequencySurveySchedule"
    },
    Configurations:
    {
        user: "/User",
        userAdd: "/User/AddUser",
        userRegistration: "/User/UserRegistration",
        userRegistrationEmail: "/User/SendRegistrationEmail",
        userPut: "/User",
        BlockOrUnBlockUser: "/User/BlockOrUnBlockUser",
        CompanyBranchConfig: "/CompanyBranchConfig",
        Roles: "/Roles",
        GetAllUsersWithCompanyies: "/Common/GetAll",
        Account: "/Accounts",
        ForgotPassword: "/ForgotPassword/",
        AssetCategory: "/AssetCategory/",
        CheckReferralCode: "/Accounts/CheckReferralCode",
    },

    ConfigurationsSLD:
    {
       
        CompanyType: "/CompanyType",
        Group: "/Group",
        NextUpdate: "/NextUpdate",
        PortLIst: "/PortLIst",
        VesselType: "/VesselType",
      
    },
  
    ClientModule:
    {
        AuthenticateClient: "Accounts/AuthenticateClient",
        EmergencyCallOut: "EmergencyCallOut",
        EmergencyCallOutCount: "EmergencyCallOut/GetECCount/",
        UpdateAcceptedRejected: "EmergencyCallOut/UpdateAcceptedRejected",
    },
    eCommerceModule:
    {
        eCommerceList: "eCommerce/GetItemsByAssetCaetgoryAndCompanyBranchV1/",
        UserRating: "UserRating/GetAllUserRatingByCompanyID/",
    },
    Clients:
    {
        Clients: `/Client/GetAll/`,
        AddClients: `/Client`,
    },
    PaymentTypes:
    {
        PaymentTypes: `/PaymentTypes/`,
    },
    PaymentMaster:
    {
        PaymentMaster: `/PaymentMaster`,
    },
    Common:
    {
        AddCommonCompany: "/Common",
    },
    Company:
    {
        Company: "/Company",
        CompanyBranch: "/CompanyBranch",
    },
    Contracts:
    {
        Contracts: "/Contract",
        barCode: "/BarCode",
        ContractRenewal: "/ContractRenewalHistory",
    },
    ContractAssets:
    {
        ContractAssets: "/ContractAsset",
        ContractAssetDetail: "/ContractAssetDetail",
        ContractAssetCommonDetail: "/ContractAssetCommonDetail",
    },

    CheckList:
    {
        CheckListItem: "/CheckListItem",
        CheckList: "/CheckList",
    },
    TemplateCheckListItemMap:
    {
        TemplateCheckListItemMap: "/TemplateCheckListItemMap",
        GetTemplatesCheckListItemByCompany: "/GetTemplatesCheckListItemByCompany/",
    },

 

    FileUPload:
    {
        FileUpload: "/Upload/Upload",
        FileUploadMultiple: "/Upload/UploadMultiple",
    },

    Technician:
    {
        TechnicianApi: "/Technician",
        TechnicianOfflineApi: "/Technician/GetOffline",
        InsertContractAssetSurveyImages: "/ContractAssetSurvey/InsertContractAssetSurveyImages",

    },
    Invoice:
    {
        Invoice: "/Invoice",

    },

    Inventory:
    {
        Inventory: "/Item",
        ExportInventoryBulkItems: "/Item/ExportInventoryBulkItems",
        GetAllInventoriesByBranch: "/GetByCompany",
        UOMs: "/UOM",

    },

    PaymentTransaction:
    {
        PaymentTransaction: `/PaymentTransaction/`,
        PaymentTransactionExpenses: `/PaymentTransaction/AddExpenses`,
    },

}