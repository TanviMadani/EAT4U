import { useState } from 'react';
import { validateForm } from '../utils/validation';

export const useFormValidation = (initialValues, validationRules) => {
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setValues(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleBlur = (e) => {
        const { name } = e.target;
        setTouched(prev => ({
            ...prev,
            [name]: true
        }));
    };

    const validateField = (fieldName) => {
        const fieldValue = values[fieldName];
        const fieldRules = validationRules[fieldName];
        
        if (!fieldRules) return;

        const { isValid, errors: fieldErrors } = validateForm(
            { [fieldName]: fieldValue },
            { [fieldName]: fieldRules }
        );

        setErrors(prev => ({
            ...prev,
            [fieldName]: isValid ? null : fieldErrors[fieldName]
        }));
    };

    const validateAll = () => {
        const { isValid, errors: newErrors } = validateForm(values, validationRules);
        setErrors(newErrors);
        return isValid;
    };

    const resetForm = () => {
        setValues(initialValues);
        setErrors({});
        setTouched({});
    };

    return {
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        validateField,
        validateAll,
        resetForm,
        setValues
    };
}; 