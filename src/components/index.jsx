

import { useBranchesMutation, useCountriesMutation} from "../store/BranchesAPI/BranchesAPI";
import DeleteConfirmationModal from "../DeleteModal";
import ConfirmationModal from "../DeleteModal/Confirmation";
import {
    useUsersMutation, useGetTemplatesMutation,
    useAddTemplateMutation, usePutTemplateMutation, useDeleteTemplateMutation,
    useGetTemplateByIDMutation,
    useAddCommonCompanyMutation,
    useGetCompaniesMutation,
    useGetCompanyByIDMutation,
    usePutCompanyMutation,
    useGetContractsMutation,

    useDeleteCompanyBranchMutation,
    useGetCompanyBranchByIDMutation,
    useGetCompanyBranchesMutation,
    usePutCompanyBranchMutation,
    useAddCompanyBranchMutation,
    useGetCompanyBranchByCompanyIDMutation,
    useGetCheckListItemMutation,
    useDeleteContractMutation,
} from "../store/ConfigurationAPI/ConfigurationAPI";
import {
    useAddClientMutation, useGetClientByIDMutation, useGetClientsMutation
    , usePutClientMutation, useDeleteClientMutation
} from "../store/ClientsAPI/ClientsAPI";

import {
    Row,
    Col,
    Card,
    Radio,
    Table,
    Upload,
    message,
    Progress,
    Avatar,
    Typography,
    Button
} from "antd";

import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "../store/authentication/auth-context";
//import project1 from "../assets/images/logo.png";
//import project2 from "../../assets/images/logo.png";

//import project1 from "../../assets/images/logo.png"
import { Link } from "react-router-dom";


export {
    Row,
    Col,
    Card,
    Radio,
    Table,
    Upload,
    message,
    Progress,
    Button,
    Avatar,
    Typography,
    ConfirmationModal,
    useHistory,
    useEffect, useState,
    useUsersMutation,
    useBranchesMutation,
    
    DeleteConfirmationModal,
    useGetTemplatesMutation,
    useAddTemplateMutation,
    usePutTemplateMutation,
    useDeleteTemplateMutation,
    useGetTemplateByIDMutation,
    useAddClientMutation,
    useGetClientByIDMutation,
    useGetClientsMutation, 
    usePutClientMutation,
    useDeleteClientMutation,
    useCountriesMutation,
    useAddCommonCompanyMutation,
    useGetCompaniesMutation,
    useGetCompanyByIDMutation,
    usePutCompanyMutation,
    useGetContractsMutation,
    useDeleteCompanyBranchMutation,
    useGetCompanyBranchByIDMutation,
    useGetCompanyBranchesMutation,
    usePutCompanyBranchMutation,
    useAddCompanyBranchMutation,
    useGetCompanyBranchByCompanyIDMutation,
    AuthContext,
    useGetCheckListItemMutation,
    useDeleteContractMutation,
};