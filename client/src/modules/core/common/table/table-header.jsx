import React from "react";
import Styles from "@/styles/style.module.css";

export default function TableHeader({ columns }) {
    return (
        <thead className={Styles.edit_col}>
            <tr>
                {columns.map((column) => (
                    <th scope="col" key={column.label}>
                        {column.label}
                    </th>
                ))}
            </tr>
        </thead>
    );
}
