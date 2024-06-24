import { FieldInputProps, FormikErrors, FormikTouched } from "formik";
import { TextInputProps } from "react-native-paper";

export interface StateMessageProp {
  isEmpty: boolean;
  message: string | null | undefined;
  messageType: "error" | "emptyState" | "inform";
};

export interface ValidatedTextInputProps extends TextInputProps {
  field: FieldInputProps<any>;
  form: {
    errors: FormikErrors<any>;
    touched: FormikTouched<any>;
  };
  label: string;
  placeholder: string;
};

export interface LoginFormValues {
  email: string;
  password: string;
};

export interface LoadingProps {
  loading?: boolean;
  size: number | "small" | "large";
};
