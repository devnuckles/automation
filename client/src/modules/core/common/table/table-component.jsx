import React from "react";
import TableHeader from "./table-header";
import TableBody from "./table-body";

export default function Table({ items, columns }) {
    return (
        <table className="table">
            <TableHeader columns={columns} />
            <TableBody items={items} columns={columns} />
        </table>
    );
}
