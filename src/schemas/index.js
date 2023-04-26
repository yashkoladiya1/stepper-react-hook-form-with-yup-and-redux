import * as Yup from "yup";

export const profileSchema = Yup.object({
    fullName:Yup.string().min(5).max(25).required("please enter Full Name"),
    email:Yup.string().email().required("please enter your Email"),
    mobile: Yup.number()
    .typeError("That doesn't look like a phone number")
    .positive("A phone number can't start with a minus")
    .integer("A phone number can't include a decimal point")
    .min(8)
    .required('A phone number is required')
});

export const educationSchema = Yup.object({
    schoolName:Yup.string().min(5).max(25).required("please enter School Name"),
    collegeName:Yup.string().min(5).max(25).required("please enter College Name"),
    courseName: Yup.string().min(5).max(25).required("please enter Course Name"),
});

export const jobSchema = Yup.object({
    companyName:Yup.string().min(5).max(25).required("please enter company Name"),
    role:Yup.string().min(5).max(25).required("please enter Role"),
    companyAddress: Yup.string().min(5).max(25).required("please enter company address "),
});