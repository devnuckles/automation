import { object, string } from "yup";

export const loginSchema = object().shape({
    email: string().email("Invalid email address").required("Required"),
    password: string().required("Required"),
});
