import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import CreatePostValidationSchema from "../../Schemas/CreatePostValidationSchema";
import { FormCreatePostProps } from "../../Utils/types";

const FormCreatePost = ({ handlePostSubmit, name }: FormCreatePostProps) => {
  return (
    <div className="mt-4 mb-4">
      <Formik
        initialValues={{ title: "", body: "" }}
        onSubmit={handlePostSubmit}
        validationSchema={CreatePostValidationSchema}
      >
        {({ errors, touched }) => (
          <Form>
            <Field
              type="text"
              name="title"
              className={`form-control mb-2 ${
                errors.title && touched.title ? "is-invalid" : ""
              }`}
              placeholder={`Give a title to your ${name}`}
            />
            <ErrorMessage
              name="title"
              component="div"
              className="invalid-feedback"
            />

            <Field
              as="textarea"
              name="body"
              className={`form-control ${
                errors.body && touched.body ? "is-invalid" : ""
              }`}
              placeholder={`Say something in your ${name}`}
            />
            <ErrorMessage
              name="body"
              component="div"
              className="invalid-feedback"
            />

            <button type="submit" className="btn btn-primary mt-2">
              {name}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default FormCreatePost;
