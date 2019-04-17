import * as React from "react";

interface IFormProps {
  defaultValues: IValues;
  validationRules: IValidationProps;
  onSubmit: (values: IValues) => Promise<ISubmitResult>;
}

interface IFormState {
  values: IValues;
  errors: IErrors;
  submitting: boolean;
  submitted: boolean;
}

export interface IValues {
  [key: string]: any;
}

export interface IErrors {
  [key: string]: string[];
}

interface IFieldProps {
  name: string;
  label: string;
  type?: "Text" | "Email" | "Select" | "TextArea";
  options?: string[];
}

export interface ISubmitResult {
  success: boolean;
  errors?: IErrors;
}

interface IFormContext {
  errors: IErrors;
  values: IValues;
  setValue?: (fieldName: string, value: any) => void;
  validate?: (fieldName: string, value: any) => void;
}

export type Validator = (
  fieldName: string,
  values: IValues,
  args: any
) => string;

export const required: Validator = (
  fieldName: string,
  values: IValues,
  args?: any
): string =>
  values[fieldName] === undefined ||
  values[fieldName] === null ||
  values[fieldName] === ""
    ? "This mus be populated"
    : "";

export const minLength: Validator = (
  fieldName: string,
  values: IValues,
  length: number
): string =>
  values[fieldName] && values[fieldName].length < length
    ? `This must be at ${length} characters`
    : "";

interface IValidation {
  validator: Validator;
  args?: any;
}

interface IValidationProps {
  [key: string]: IValidation | IValidation[];
}

const FormContext = React.createContext<IFormContext>({
  values: {},
  errors: {}
});

export class Form extends React.Component<IFormProps, IFormState> {
  public static Field: React.SFC<IFieldProps> = props => {
    const handleChange = (
      e:
        | React.ChangeEvent<HTMLInputElement>
        | React.ChangeEvent<HTMLTextAreaElement>
        | React.ChangeEvent<HTMLSelectElement>,
      context: IFormContext
    ) => {
      if (context.setValue) {
        context.setValue(props.name, e.currentTarget.value);
      }
    };

    const handleBlur = (
      e:
        | React.FocusEvent<HTMLInputElement>
        | React.FocusEvent<HTMLTextAreaElement>
        | React.FocusEvent<HTMLSelectElement>,
      context: IFormContext
    ) => {
      if (context.validate) {
        context.validate(props.name, e.currentTarget.value);
      }
    };

    const { name, label, type, options } = props;
    return (
      <FormContext.Consumer>
        {context => (
          <div className="form-group">
            <label htmlFor={name}>{label}</label>
            {(type === "Text" || type === "Email") && (
              <input
                type={type.toLowerCase()}
                id={name}
                value={context.values[name]}
                onChange={e => handleChange(e, context)}
                onBlur={e => handleBlur(e, context)}
              />
            )}
            {type === "TextArea" && (
              <textarea
                id={name}
                value={context.values[name]}
                onChange={e => handleChange(e, context)}
                onBlur={e => handleBlur(e, context)}
              />
            )}
            {type === "Select" && (
              <select
                value={context.values[name]}
                onChange={e => handleChange(e, context)}
                onBlur={e => handleBlur(e, context)}
              >
                {options &&
                  options.map(option => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
              </select>
            )}
            {context.errors[name] &&
              context.errors[name].length > 0 &&
              context.errors[name].map(error => (
                <span key={error} className="form-error">
                  {error}
                </span>
              ))}
          </div>
        )}
      </FormContext.Consumer>
    );
  };

  public constructor(props: IFormProps) {
    super(props);
    const errors: IErrors = {};
    Object.keys(props.defaultValues).forEach(fieldName => {
      errors[fieldName] = [];
    });

    this.state = {
      errors,
      values: props.defaultValues,
      submitted: false,
      submitting: false
    };
  }

  public render() {
    const context: IFormContext = {
      errors: this.state.errors,
      setValue: this.setValue,
      values: this.state.values,
      validate: this.validate
    };

    return (
      <FormContext.Provider value={context}>
        <form
          className="form"
          noValidate={true}
          onSubmit={e => this.handleSubmit(e)}
        >
          {this.props.children}
          <div className="form-group">
            <button
              type="submit"
              disabled={this.state.submitted || this.state.submitting}
            >
              Submit
            </button>
          </div>
        </form>
      </FormContext.Provider>
    );
  }

  private handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault;
  };

  private setValue = (fieldName: string, value: any) => {
    const newValues = { ...this.state.values, [fieldName]: value };
    this.setState({ values: newValues });
  };

  private validate = (fieldName: string, value: any): string[] => {
    const rules = this.props.validationRules[fieldName];
    const errors: string[] = [];
    if (Array.isArray(rules)) {
      rules.forEach(rule => {
        const error = rule.validator(fieldName, this.state.values, rule.args);
        if (error) {
          errors.push(error);
        }
      });
    } else {
      if (rules) {
        const error = rules.validator(fieldName, this.state.values, rules.args);
        if (error) {
          errors.push(error);
        }
      }
    }
    const newErrors = { ...this.state.errors, [fieldName]: errors };
    this.setState({ errors: newErrors });
    return errors;
  };
}
