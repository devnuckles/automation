import Table from "./table-component";

import Styles from "@/styles/style.module.css";
import Style from "@/styles/post-news.module.css";

export default function DynamicTable({ columns, items }) {
    return (
        <div className={Style.post_news_table}>
            <div className={Styles.table_background}>
                <div className={Styles.table_start}>
                    <div className={Style.table_start}>
                        <Table items={items} columns={columns} />
                    </div>
                </div>
            </div>
        </div>
    );
}
