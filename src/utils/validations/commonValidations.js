import { object, string } from "yup";

export const commonValidationsMsg = {
  Description: "Please select Product/Item",
  Quantity: "Please enter the Quantity ",
  UOM: "Please enter the UOM ",
  QuantityAmount: "Please enter the Quantity Amount ",
  GSTPer: "Please enter the GST Per ",
  HSNCODE: "Please enter the HSNCODE",
  GSTPercentage: "Please enter the GST Percentage ",
  // item: "Minimum Step up Amount should be " + toINR("500"),
  // GStPercentage: "Please enter the GST Percentage " + toINR("500"),
  AmountReceived: "Please enter the Received Amount ",
  TotalAmountReceived: "Total Amount and Invoice Amount is not exact",
  PayoutBalanceAmountExceed:
    "Amount should not exceed with the Available Balance Amount.",
  firstName: "Please enter First Name.",
  lastName: "Please enter Last Name.",
  companyName: "Please enter Company Name.",
  streetAddress: "Please enter Street Address.",
  email: "Please enter Email Address.",
  poBox: "Please enter PinCode.",
};

export async function commonValidator({ fields, fieldValues }) {
  console.log("InvoiceFields", fieldValues);
  const invoice = object().shape({ ...fields });
  const isValid = await object()
    .shape({ ...fields })
    .isValid(fieldValues, {
      abortEarly: false,
    });

  if (!isValid) {
    try {
      await invoice.validate(fieldValues, { abortEarly: false });
    } catch (err) {
      return err.inner.reduce((a, error) => {
        return {
          ...a,
          [error.path]: error.errors[0],
        };
      }, {});
    }
  }

  return true;
}
