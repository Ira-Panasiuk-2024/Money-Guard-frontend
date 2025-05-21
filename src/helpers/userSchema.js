import { object, string } from "yup";

export const validationSchemaUserUpdate = object({
  name: string()
    .min(3, "Minimum length is 3 characters")
    .max(20, "Maximum length is 20 characters")
    .matches(/^[a-zA-Zа-щА-ЩЬьЮюЯяІіЇїЄєҐґ]+$/, {
      message: "You can add only letters",
    })
    .required("Required"),
});
