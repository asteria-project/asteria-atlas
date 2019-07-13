import { FormGroup, AbstractControl } from '@angular/forms';

/**
 * A utility class for working with forms.
 */
export class FormUtils {

    /**
     * Force to display errors over all form controls for the specified form.
     * 
     * @param {FormGroup} formGroup the form on which to perform validation.
     */
    public static markAllAsTouched(formGroup: FormGroup): void {
        for (const i in formGroup.controls) {
            const control: AbstractControl = formGroup.controls[i];
            control.markAsTouched();
            control.updateValueAndValidity();
        }
    }

    /**
     * Force to remove errors over all form controls for the specified form.
     * 
     * @param {FormGroup} formGroup the form on which to reset validation.
     */
    public static markAllAsUntouched(formGroup: FormGroup): void {
        for (const i in formGroup.controls) {
            const control: AbstractControl = formGroup.controls[i];
            control.markAsUntouched();
            control.updateValueAndValidity();
        }
    }

    /**
     * Reset all fields of the specified form.
     * 
     * @param {FormGroup} formGroup the form for which to reset all fields.
     */
    public static reset(formGroup: FormGroup): void {
        formGroup.reset();
        FormUtils.markAllAsUntouched(formGroup);
    }

    /**
     * Return the value for the field declared on the specified form.
     * 
     * @param {FormGroup} formGroup the form for which to get the field value.
     * @param {string} fieldName the name of the field for which to get the value.
     * 
     * @returns {any} the value for the field declared on the specified form.
     */
    public static getFieldValue(formGroup: FormGroup, fieldName: string): any {
        return formGroup.get(fieldName).value;
    }
    
    /**
     * Set the value for the field declared on the specified form.
     * 
     * @param {FormGroup} formGroup the form for which to set the field value.
     * @param {string} fieldName the name of the field for which to set the value.
     * @param {any} value the new value for the specified field name.
     */
    public static setFieldValue(formGroup: FormGroup, fieldName: string, value: any): void {
        formGroup.get(fieldName).setValue(value);
    }
}