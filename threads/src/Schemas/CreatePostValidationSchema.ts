import * as Yup from "yup";

const CreatePostValidationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  body: Yup.string().required("Content is required"),
});

export default CreatePostValidationSchema;
