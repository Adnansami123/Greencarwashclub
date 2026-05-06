import PropTypes from "prop-types";
import { useContext, useEffect, useMemo } from "react";
import { AuthContext } from "../index"

function SessionExpired({ isSessionExpired = false }) {
    const authCtx = useContext(AuthContext);
    const timeMSToRedirect = 1500;

    //upoin sesssion expired!
    useEffect(() => {
        if (isSessionExpired) {
            setTimeout(() => {
                localStorage.removeItem("token");
                window.location.replace("/bdsystem/");
            }, timeMSToRedirect);
        }
    }, [isSessionExpired]);

    return (
        <div className='acontainer'>
            <div className='row'>
                <div className='offset-md-3 col-md-6'>
                    <div>
                        <>
                            <div>
                                <p>Session has expired</p>
                                <p>please <a href='/sign-in'>click here!</a> to login again.</p>
                            </div>
                        </>

                    </div>
                </div>
            </div>
        </div>
    );
}

export { SessionExpired };

SessionExpired.propTypes = {
    isSessionExpired: PropTypes.bool,
};
