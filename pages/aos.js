import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

const Aos = () => {
  const signup = Yup.object().shape({
    firstName: Yup.string().min(2, "short!").max(20, "long!!").required("req"),
    lastName: Yup.string().min(2, "short!").max(20, "long!!").required("req"),
    email: Yup.string().email("email").required("e"),
  });

  return (
    <div>
      <h1>Signup</h1>
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
        }}
        validationSchema={signup}
        onSubmit={(values) => {
          // same shape as initial values
          console.log(values);
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <Field name="firstName" />
            {errors.firstName && touched.firstName ? (
              <div>{errors.firstName}</div>
            ) : null}
            <Field name="lastName" />
            {errors.lastName && touched.lastName ? (
              <div>{errors.lastName}</div>
            ) : null}
            <Field name="email" type="email" />
            {errors.email && touched.email ? <div>{errors.email}</div> : null}
            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Aos;
