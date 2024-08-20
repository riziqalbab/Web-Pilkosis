import { Outlet } from "react-router-dom";

export default function LayoutAdmin () {
    return (
        <>
            <p>THIS IS ADMIN PAGE</p>
            <Outlet />
        </>
    );
}