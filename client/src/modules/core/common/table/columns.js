const getCategory = (categoryID) => {
    const category = categories.find((c) => c.id == categoryID);
    return category?.Title || "";
};

const sectionsColumns = [
    {
        label: "ID",
        path: "id",
        content: (item, path) => <>{item[path]}</>,
    },
    {
        label: "Section",
        path: "section",
        content: (item, path) => <>{item[path]}</>,
    },
    {
        label: "Category",
        path: "category",
        content: (item, path) => <>{getCategory(item[path])}</>,
    },
    {
        isAction: true,
        label: "Action",
        path: "action",
        content: (item, path) => <>{item[path]}</>,
    },
];

const usersColumns = [
    {
        label: "ID",
        path: "id",
        content: (item, path) => <>{item[path]}</>,
    },
    {
        label: "User Name",
        path: "username",
        content: (item, path) => <>{item[path]}</>,
    },
    {
        label: "Full Name",
        path: "fullname",
        content: (item, path) => <>{item[path]}</>,
    },
    {
        label: "Email",
        path: "email",
        content: (item, path) => <>{item[path]}</>,
    },
    {
        label: "Role",
        path: "role",
        content: (item, path) => <>{item[path]}</>,
    },
    {
        label: "Phone",
        path: "phone_number",
        content: (item, path) => <>{item[path]}</>,
    },
    {
        label: "Posts",
        path: "post_counts",
        content: (item, path) => <>{item[path]}</>,
    },
    {
        label: "Status",
        path: "status",
        content: (item, path) => <>{item[path]}</>,
    },
    {
        isAction: true,
        label: "Action",
        path: "action",
        style: {
            position: "relative",
        },
        content: (item, path) => <>{item[path]}</>,
    },
];

export { sectionsColumns, usersColumns };
