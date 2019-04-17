import * as React from "react";

import ContactUs from "../components/ContactUs";
import { IValues, ISubmitResult } from "../components/Form";
import { wait } from "../ProductData";

interface IState {
  name: string;
  email: string;
  reason: string;
  notes: string;
}

class ContactUsPage extends React.Component<{}, IState> {
  public constructor(props: {}) {
    super(props);
    this.state = {
      email: "",
      name: "",
      reason: "",
      notes: ""
    };
  }
  public render() {
    return (
      <div className="page-container">
        <h1>Contact Us</h1>
        <p>
          If you enter your details we'll get back to you as soon as we can.
        </p>
        <ContactUs onSubmit={this.handleSubmit} />
      </div>
    );
  }

  private handleSubmit = async (values: IValues): Promise<ISubmitResult> => {
    await wait(1000);
    return {
      errors: {
        email: ["Some is wrong with this"]
      },
      success: false
    };
  };
}

export default ContactUsPage;
