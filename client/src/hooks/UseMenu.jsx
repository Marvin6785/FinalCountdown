import { useContext, useEffect } from "react";
// import { Context } from "../store/menu/Context";

function UseMenu() {
    const { isMenuOpen, toggleMenu } = useContext(Context);

    useEffect(() => {
        if(isMenuOpen) toggleMenu();
    }, []);

    return { isMenuOpen, toggleMenu }
}

export default UseMenu;