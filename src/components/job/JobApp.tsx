import { ChangeEventHandler, useCallback, useMemo, useState } from "react";
import "./jobapp.css";
import cx from "classnames";

export type ErrorType = Record<string, string>;
export interface OptionType {
  value: string;
  label: string;
}

const validateName = (value: string) => {
  return value.length > 2 ? "" : "Name should be at least 3 characters";
};
const validateEmail = (value: string) =>
  /\S+@\S+\.\S+/.test(value) ? "" : "Enter a valid email";

const validatePhone = (value: string) =>
  /^\d{10}$/.test(value) ? "" : "Phone number should be 10 digits";
const validateUrl = (value: string) =>
  /^(https?:\/\/)?([\w-]+(\.[\w-]+)+)(\/[\w-]*)*\/?$/.test(value)
    ? ""
    : "Please enter valid url";
const initialFormData = {
  position: "fullstack",
  experience: "10",
};
const options = [
  { value: "fullstack", label: "FullStack Developer" },
  { value: "backend", label: "Backend Developer" },
  { value: "frontend", label: "Frontend Developer" },
];
export default function JobApp() {
  const [formData, setFormData] =
    useState<Record<string, string>>(initialFormData);
  const [errors, setFormErrors] = useState<Record<string, string>>({});

  const showYoe = useMemo(
    () => formData.position === "backend" || formData.position === "fullstack",
    [formData.position]
  );

  const showPortfolio = useMemo(
    () => formData.position === "frontend" || formData.position === "fullstack",
    [formData.position]
  );

  const handleChange = useCallback(
    (data: { name: string; value: string }, error: string) => {
      const { name, value } = data;
      setFormData((prev) => ({ ...prev, [name]: value }));
      setFormErrors((prev) => ({ ...prev, [name]: error || "" }));
    },
    [formData]
  );

  const handleReset = useCallback(() => {
    setFormData(initialFormData);
    setFormErrors({});
  }, [setFormData, setFormErrors]);

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
      console.log("formData", formData);
    },
    [formData]
  );

  return (
    <div className="job-app">
      <form onSubmit={handleSubmit}>
        <FormInput
          name="name"
          onChange={handleChange}
          label="Name"
          value={`${formData["name"] || ""}`}
          error={errors["name"]}
          type="text"
          validate={validateName}
        />
        <FormInput
          name="email"
          onChange={handleChange}
          label="Email"
          value={`${formData["email"] || ""}`}
          error={errors["email"]}
          type="email"
          validate={validateEmail}
        />
        <FormInput
          name="phone"
          onChange={handleChange}
          label="Phone"
          value={`${formData["phone"] || ""}`}
          error={errors["phone"]}
          type="tel"
          validate={validatePhone}
        />
        <FormSelect
          name="position"
          options={options}
          label="Job Position"
          onChange={handleChange}
          value={`${formData["position"]}`}
        />
        {showYoe && (
          <FormInput
            label={`Experience in years (${formData["experience"]})`}
            type="range"
            name="experience"
            min="1"
            max="30"
            value={`${formData["experience"]}`}
            onChange={handleChange}
          />
        )}
        {showPortfolio && (
          <FormInput
            label="Portfolio"
            type="url"
            name="portfolio"
            value={`${formData["portfolio"] || ""}`}
            error={errors["portfolio"]}
            onChange={handleChange}
            validate={validateUrl}
          />
        )}
        <div className="form-actions">
          <button className="form-btn" type="button" onClick={handleReset}>
            Reset
          </button>
          <button className="form-btn" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

function FormInput({
  name,
  error,
  type,
  value,
  label,
  placeholder,
  min,
  max,
  onChange,
  validate,
}: {
  name: string;
  error?: string;
  type: string;
  value?: string;
  label?: string;
  placeholder?: string;
  min?: string;
  max?: string;
  onChange?: Function;
  validate?: Function;
}) {
  const handleChange = useCallback(
    (event) => {
      const { name, value } = event.target;
      const error = validate ? validate(value) : "";
      onChange && onChange({ name, value }, error);
    },
    [onChange]
  );
  return (
    <div
      className={cx({
        "form-control form-input": true,
        "form-error": !!error,
      })}
    >
      <label>{label}</label>
      <div className="form-input-container">
        <input
          name={name}
          type={type}
          value={value}
          placeholder={placeholder}
          {...(min ? { min: min } : {})}
          {...(max ? { max: max } : {})}
          onChange={handleChange}
        />
        {error && <div className="error">{error}</div>}
      </div>
    </div>
  );
}

function FormSelect({
  options,
  label,
  value,
  name,
  onChange,
  validate,
}: {
  options: OptionType[];
  label: string;
  value?: string;
  name: string;
  onChange: Function;
  validate?: Function;
}) {
  const handleChange = (event) => {
    const { name, value } = event.target;
    const error = validate ? validate(value) : "";
    onChange && onChange({ name, value }, error);
  };
  return (
    <div className="form-control">
      <label>{label}</label>
      <div className="form-input-container">
        <select
          name={name}
          className="form-select"
          onChange={handleChange}
          value={value}
        >
          {options.map((op) => (
            <option key={op.value} value={op.value}>
              {op.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
