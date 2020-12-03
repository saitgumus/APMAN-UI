import * as actionTypes from "./action-types";
import User from "../../Models/User";
import {LoginUser} from "../../Services/UserService";
import {ShowStatusError} from "../../Core/Helper";

//import Log from "../../Services/Log";

/**
 *
 * @param {User}
 * @returns {{payload: *, type: string}}
 * @constructor
 */
export function LoginSuccess(userContract) {
    return {
        type: actionTypes.LOGIN,
        payload: userContract,
    };
}

export function ChangeLoginStatusSuccess(token, expiration, isSuccess) {
    return {
        type: actionTypes.CHANGE_LOGIN_STATUS,
        payload: {
            token,
            expiration,
            isSuccess,
        },
    };
}

export function ChangeLoginStatus(jwtObject) {
    return function (dispatch) {
        dispatch(
            ChangeLoginStatusSuccess(
                jwtObject.token,
                jwtObject.expiration,
                jwtObject.isSuccess
            )
        );
    };
}

export function Login(user) {
    return  function (dispatch) {
        return  LoginUser(user)
            .then(
                res => {
                    if (res.success) {
                        user = res.value;
                        dispatch(LoginSuccess(user));
                        //test
                        dispatch(ChangeLoginStatusSuccess(user.token, user.expiration, true))
                    } else {
                        ShowStatusError(res.getResultsStringFormat());
                        dispatch(ChangeLoginStatusSuccess("", new Date(), false))
                        dispatch(LoginSuccess(new User()));
                    }
                }
            ).catch(
                (e) => {
                    // debugger;
                    // if (e.response.status === 401) {
                    //     dispatch(ChangeLoginStatusSuccess("", new Date(), false))
                    // }
                    // dispatch(LoginSuccess(new User()));
                    console.log(e);
                }
            )
        // return HttpClientServiceInstance.post(url, user)
        //     .then((res) => {
        //         let data = res.data.user;
        //
        //         user = new User();
        //         user.userId = data.userId;
        //         user.email = data.email;
        //         user.firstName = data.firstName;
        //         user.lastName = data.lastName;
        //         user.userName = data.userName;
        //         user.token = res.data.token.token;
        //         user.expiration = res.data.token.expiration;
        //         user.inboxNotificationCount = data.inboxNotificationCount;
        //         user.generalNotificationCount = 0;//doldurulacak
        //
        //         localStorage.setItem("user", JSON.stringify(user));
        //         HttpClientServiceInstance.setTokenOnLogin(user.token);
        //         dispatch(LoginSuccess(user));
        //         //test
        //         dispatch(ChangeLoginStatusSuccess(user.token, user.expiration, true))
        //     })
        //     .catch((e) => {
        //         if (e.response.status === 401) {
        //             dispatch(ChangeLoginStatusSuccess("", new Date(), false))
        //         }
        //         dispatch(LoginSuccess(new User()));
        //     });
    };
}
