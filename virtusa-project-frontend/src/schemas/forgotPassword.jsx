import * as Yup from "yup";

const validateOnChange = Yup.object({
  newPassword: Yup.string()
    .min(6)
    .matches(
      /[A-Z][A-z0-9@$%_#]{5,}/,
      "Password must start with capital letter"
    )
    .required("Password field cannot be empty"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword"), null], "Password didn't matched")
    .required("Confirm Password field cannot be empty"),
});

export default validateOnChange;
