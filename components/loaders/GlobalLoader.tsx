"use client";

import { useSelector } from "react-redux";
import BouncingPencilLoader from "./BouncingPencilLoader";
import { RootState } from "@/stores";
import CircleLoader from "./CircleLoader";

const GlobalLoader = () => {
    const { homePageLoading } = useSelector(
        (state: RootState) => state.homePageSlice
    );

    if (!homePageLoading) return null;

    return <CircleLoader showRandomTxt />;
};

export default GlobalLoader;