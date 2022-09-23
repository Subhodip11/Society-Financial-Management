import * as Yup from "yup";

export const validateOnChange = Yup.object({
  societyName: Yup.string()
    .min(3)
    .max(30)
    .required("Society Name cannot be empty"),
  city: Yup.string().min(3).max(20).required("City field cannot be empty"),
  pincode: Yup.string().length(6).required("Pincode field cannot be empty"),
});
