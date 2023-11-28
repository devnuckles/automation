import React from "react";
import Styles from "@/styles/style.module.css";

export default function TableBody({ items, columns }) {
    return (
        <tbody className={Styles.edit_col}>
            {items.map((item, index) => (
                <tr key={item.id}>
                    {columns.map((column, index) => {
                        {
                            return (
                                <td
                                    key={index}
                                    style={item.style ? item.style : {}}
                                >
                                    {column.content(item, column.path)}
                                </td>
                            );
                        }
                    })}
                </tr>
            ))}
        </tbody>
    );
}
