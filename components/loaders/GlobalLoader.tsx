"use client";

import { useSelector } from "react-redux";
import BouncingPencilLoader from "./BouncingPencilLoader";
import { RootState } from "@/stores";

const GlobalLoader = () => {
    const { homePageLoading } = useSelector(
        (state: RootState) => state.homePageSlice
    );

    if (!homePageLoading) return null;

    return <BouncingPencilLoader />;
};

export default GlobalLoader;