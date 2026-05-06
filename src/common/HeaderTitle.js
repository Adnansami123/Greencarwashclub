import { useContext, useEffect, useMemo, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { authAppRoutes } from "../routes/routesConfig";

export default function HeaderTitle() {
    const routes = authAppRoutes;
    const { location } = useHistory();
    const getBreadCrumbName = useMemo(() => {
        return routes.filter((route) => route.path === location.pathname)?.[0];
    }, [location]);


    const heading = () => {
        const name = getBreadCrumbName.menuText;         
        return name;
    };
    return (
        <>
            {heading()}
        </>
    );
};