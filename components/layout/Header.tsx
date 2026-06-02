"use client"
import { UserCookieData_Int } from '@/interface/ProfileInt';
import { fetchTotalCartQty } from '@/stores/productCartSlice';
import { fetchUserProfile } from '@/stores/profileSlice';
import { getUserInfo, setLoginInfo } from '@/utils/getToken';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';

const Header = () => {
    const dispatch = useDispatch();
    const searchParams = useSearchParams();
    const token = searchParams.get("token");
    const router = useRouter();
    const pathname = usePathname();
    const [userData, setUserData] = useState<UserCookieData_Int>({} as any);
    const [openNewsModal, setNewsModal] = useState(false);



    useEffect(() => {
        const userInfo = getUserInfo();
        if (userInfo?.id) {
            dispatch(fetchTotalCartQty({}));
            setUserData(userInfo);
        }

        let timeoutId: NodeJS.Timeout;
        if (!localStorage.getItem("is_subscribed") && !userInfo?.id) {
            timeoutId = setTimeout(() => {
                setNewsModal(true);
            }, 5000);
        }

        return () => {
            if (timeoutId) clearTimeout(timeoutId);
        };

    }, []);

    const fetchData = async (token: string) => {
        let data = await fetchUserProfile(token);
        if (data?.status_code === 200 && data?.data?.login_token) {
            setLoginInfo(data?.data);
            setUserData(data?.data);
            router.push("/");
        }
    };

    useEffect(() => {
        if (pathname === "/" && token) {
            fetchData(token);
        }
    }, [token]);


    return (
        <></>
    )
}

export default Header