import { useState, useRef, useCallback } from "react";
import * as validators from "@/utils/validators";

export const useAuthForm = ({ initialVal = {}, onSubmit }) => {
  const [values, setValues] = useState(initialVal);
  const [errors, setErrors] = useState({});
  const [isLoading, setLoading] = useState(false);
  const valuesRef = useRef(initialVal);
  const validateField = (name, value) => {
    let error = "";
    switch (name) {
      case "email":
        console.log("validateField email:", value);
        console.log("isRequired:", validators.isRequired(value));
        console.log("isEmail:", validators.isEmail(value));
        error = validators.isRequired(value) || validators.isEmail(value);
        break;

      case "password":
        error =
          validators.isRequired(value) ||
          validators.minLen(10)(value) ||
          validators.checkLower(value) ||
          validators.checkUpper(value) ||
          validators.checkDigit(value) ||
          validators.checkSpecial(value) ||
          validators.maxLen(50)(value);
        break;
      case "username":
        error = validators.isRequired(value) || validators.minLen(3)(value);
        break;
    }
    return error;
  };
  const handleChange = (name, value) => {
    const next = { ...valuesRef.current, [name]: value };
    valuesRef.current = next;
    setValues(next);
  };

  const handleSubmit = async () => {
    const current = valuesRef.current;
    const foundErrors = {};
    Object.entries(current).forEach(([k, v]) => {
      const err = validateField(k, v);
      if (err) foundErrors[k] = err;
    });
    setErrors(foundErrors);
    console.log(foundErrors.name);

    if (Object.values(foundErrors).some(Boolean)) return;

    await onSubmit(current);
  };

  return { values, errors, handleChange, handleSubmit, isLoading };
};
