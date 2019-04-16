import * as React from "react";
import { Form, minLength, required } from "./Form";

const ContactUs: React.SFC<{}> = () => {
  return (
    <Form
      defaultValues={{ name: "", email: "", reason: "Support", notes: "" }}
      validationRules={{ email: { validator: required } }}
    >
      <Form.Field name="name" label="Your name" type="Text" />
      <Form.Field name="email" label="Your email" type="Text" />
      <Form.Field
        name="reason"
        label="Reason you need to contact us"
        type="Select"
        options={["Marketing", "Support", "Feedback", "Jobs", "Other"]}
      />
      <Form.Field name="notes" label="Additional notes" type="TextArea" />
    </Form>
  );
};

export default ContactUs;
