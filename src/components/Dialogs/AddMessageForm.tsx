import React from "react";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { sendMessageAC } from "../../Redux/dialogs-reducer";

type FormikType = {
  Text?: string;
};

export const AddMessageForm = () => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      Text: "",
    },
    onSubmit: (values) => {
      dispatch(sendMessageAC({ messageBody: values.Text }));
      formik.resetForm();
    },
    validate: (values: FormikType) => {
      const errors: FormikType = {};

      if (!values.Text) {
        errors.Text = "Required";
      }
      return errors;
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div>
        <textarea
          placeholder="Send messages Formik"
          name="Text"
          onChange={formik.handleChange}
          value={formik.values.Text}
        ></textarea>

        {formik.touched.Text && formik.errors.Text && (
          <div style={{ color: "red" }}>{formik.errors.Text}</div>
        )}
      </div>
      <div>
        <button type="submit">Send message</button>
      </div>
    </form>
  );
};
