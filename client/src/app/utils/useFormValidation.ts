import { useState, useCallback } from "react";

type ValidationSchema<T> = {
  [K in keyof T]?: (value: T[K], formData: T) => string | null;
};

export function useFormValidation<T extends Record<string, any>>(
  initialState: T,
  validationSchema: ValidationSchema<T>
) {
  const [formData, setFormData] = useState<T>(initialState);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({});

  const validateField = useCallback(
    (name: keyof T) => {
      const validator = validationSchema[name];
      if (!validator) return;

      const error = validator(formData[name], formData);
      setErrors((prev) => ({
        ...prev,
        [name]: error || undefined,
      }));

      return !error;
    },
    [formData, validationSchema]
  );

  const validateForm = useCallback(() => {
    const newErrors: Partial<Record<keyof T, string>> = {};
    let isValid = true;

    // Validate all fields
    Object.keys(validationSchema).forEach((key) => {
      const fieldName = key as keyof T;
      const validator = validationSchema[fieldName];
      if (!validator) return;

      const error = validator(formData[fieldName], formData);
      if (error) {
        newErrors[fieldName] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  }, [formData, validationSchema]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value, type } = e.target;
      const fieldName = name as keyof T;

      // Handle different input types
      const parsedValue = type === "number" ? parseFloat(value) || 0 : value;

      setFormData((prev) => ({
        ...prev,
        [fieldName]: parsedValue,
      }));

      // Mark field as touched
      setTouched((prev) => ({
        ...prev,
        [fieldName]: true,
      }));

      // Validate field if it's been touched
      if (touched[fieldName]) {
        validateField(fieldName);
      }
    },
    [validateField, touched]
  );

  const handleBlur = useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      const { name } = e.target;
      const fieldName = name as keyof T;

      // Mark field as touched
      setTouched((prev) => ({
        ...prev,
        [fieldName]: true,
      }));

      validateField(fieldName);
    },
    [validateField]
  );

  const resetForm = useCallback(() => {
    setFormData(initialState);
    setErrors({});
    setTouched({});
  }, [initialState]);

  return {
    formData,
    errors,
    touched,
    handleChange,
    handleBlur,
    validateForm,
    validateField,
    resetForm,
    setFormData,
  };
}
