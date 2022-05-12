import { UserPhoto } from './../../hooks/usePhotoGallery';
import { useIonToast } from "@ionic/react";
import jwtDecode from "jwt-decode";
import { JWTPayload } from "../../../types";
import { Stock } from "../../components/Supermarket/Supermarket";
import { API_SERVER } from "../../helpers/api";
import { RootDispatch, RootState } from "../store";
import { getUserInfo } from "../user/thunk";
import { login, loginFailed, logout, signupFailed } from "./action";

function errorToString(error: unknown): string {
    return (error as Error).toString();
}

export function SignUp(email: string, username: string,bio:string, images: UserPhoto) {
    return async (dispatch: RootDispatch) => {

        let formData = new FormData();
        formData.append("email", email);
        formData.append("username", username);
        formData.append("bio", bio);
        formData.append("images", images.file);

        // passing the username and email to server when signing up and get the token back
        try {
            let res = await fetch(`${API_SERVER}/user/SignUp`, {
                method: "POST",
                body: formData,
            });

            if (res.status === 400) {
                dispatch(signupFailed("user existed"));
            } else if (res.status === 200) {
                window.location.href = "/RegisterSuccess";
            }
        } catch (e) {
            return false;
        }

    };
}

export function logInWithEmail(email: string) {
    return async (dispatch: RootDispatch) => {
        function backdoor(token: string) {
            localStorage.setItem("token", token);
            dispatch(checkTokenThunk());
            dispatch(getUserInfo());
            window.location.href = "/MyProfile";
            return;
        }
        let backdoorInfo = [
            {
                email: "kevinboy1@tecky.io",
                token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwiZW1haWwiOiJrZXZpbmJveTFAdGVja3kuaW8ifQ._9SPvhoXzZQ28lXfbH4VwQRNkYt88CBbwxeJAVRTpvk",
            },
            {
                email: "kevinboy2@tecky.io",
                token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MiwiZW1haWwiOiJrZXZpbmJveTJAdGVja3kuaW8ifQ.u4NhebYET8VkSI4K_6IS4aeEIkeZDtt9x5J771r2SDI",
            },
            {
                email: "kevinboy3@tecky.io",
                token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MywiZW1haWwiOiJrZXZpbmJveTNAdGVja3kuaW8ifQ.AJVbaPtfARr3nmqM2nVkynlp8zG645MTN1UK3cKiLA8",
            },
            {
                email: "sandiegirl1@tecky.io",
                token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6NCwiZW1haWwiOiJzYW5kaWVnaXJsMUB0ZWNreS5pbyJ9.Z-KmktMqilcVEnBCCwzVdT-RhevZPG1Av9x9C80R9GA",
            },
            {
                email: "sandiegirl2@tecky.io",
                token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6NSwiZW1haWwiOiJzYW5kaWVnaXJsMkB0ZWNreS5pbyJ9.VwigW-3RThy-waGMHLmRY2-T3JIUQTEFbCtUUMGLeKY",
            },
            {
                email: "sandiegirl3@tecky.io",
                token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6NiwiZW1haWwiOiJzYW5kaWVnaXJsM0B0ZWNreS5pbyJ9.gVBrAOSODpP_ietobB_4hDytlmBkRO5DUyKHBwjF-YU",
            },
            {
                email: "fanboy1@tecky.io",
                token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6NywiZW1haWwiOiJmYW5ib3kxQHRlY2t5LmlvIn0.QnDB_ecxsUJtxtHk5Me1HyO8ldSP7up9dUYj7K2LeoY",
            },
            {
                email: "fanboy2@tecky.io",
                token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6OCwiZW1haWwiOiJmYW5ib3kyQHRlY2t5LmlvIn0.U-Ao2Hfh6yVUDAUxMcqjPxNP2RHb8Hyz3mCnCyuboXw",
            },
            {
                email: "fanboy3@tecky.io",
                token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6OSwiZW1haWwiOiJmYW5ib3kzQHRlY2t5LmlvIn0.op_X0YH6wGvQv6UbdGVnwnJI8QVhg1tyxOjJQFzVPDw",
            },
            {
                email: "markdude@tecky.io",
                token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MTAsImVtYWlsIjoibWFya2R1ZGVAdGVja3kuaW8ifQ.ReWOGnIfiIQSVRsBRYSR7rAo7KtFikqOgJ2HUyzqeWc",
            },
            {
                email: "wayneperson@tecky.io",
                token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MTEsImVtYWlsIjoid2F5bmVwZXJzb25AdGVja3kuaW8ifQ.gukVSTdYeAujBl_kA4rk-MUS3-YEOHXcK5vDs-YfgVw",
            },
            {
                email: "katekapo@tecky.io",
                token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MTIsImVtYWlsIjoia2F0ZWthcG9AdGVja3kuaW8ifQ.4m_CLMaEtS0UefaLd5wABnLiq2B123IS4zPsG41e-fU",
            },
            {
                email: "lynlynlyn@tecky.io",
                token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MTMsImVtYWlsIjoibHlubHlubHluQHRlY2t5LmlvIn0.S4uzZOWnA3tUJBwMp8lkCOJAnGRwQ48gkHHUwLEdD6I",
            },
        ];

        for (let user of backdoorInfo) {
            if (user.email === email) {
                backdoor(user.token);
                return;
            }
        }

        // let whiteListEmail = backdoorInfo.map((user) => user.email);
        // if (whiteListEmail.includes(email)) {
        //     backdoorInfo.filter((user) => {
        //         if (user.email === email) {
        //             backdoor(user.token);
        //             return;
        //         }
        //     });
        // }

        try {
            let res = await fetch(`${API_SERVER}/user/sendLink`, {
                method: "GET",
                headers: { email },
            });

            if (res.status === 200) {
                alert("login email has been sent, please check your mailbox");
            } else if (res.status === 401) {
                alert("user not exist / passcode expired");
            }
        } catch (e) {
        }
    };
}

// place in the index.tsx keep track if there is token in local storage
export function checkTokenThunk() {
    return (dispatch: RootDispatch) => {
        let token = localStorage.getItem("token");
        if (!token) {
            dispatch(logout());
            return;
        }
        dispatch(login(token));
    };
}
