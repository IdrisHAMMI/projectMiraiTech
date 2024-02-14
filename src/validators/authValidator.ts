import { AbstractControl, FormGroup } from "@angular/forms";

export const confirmPasswordValidator = (controlName: string, controlNameToMatch: string) => {
    return (formGroup: FormGroup) => {
        const control = formGroup.get(controlName);
        const controlToMatch = formGroup.get(controlNameToMatch);
        
        if (!control || !controlToMatch) {
            //IF EITHER CONTROL IS NOT FOUND RETURN NULL
            return null;
        }

        if (controlToMatch.errors && !controlToMatch.errors.confirmPasswordValidator) {
            // IF THERE IS ALREADY ANOTHER ERROR DO NOT ADD ANOTHER
            return null;
        }

        if (control.value !== controlToMatch.value) {
            controlToMatch.setErrors({ confirmPasswordValidator: true });
        } else {
            controlToMatch.setErrors(null);
        }
    };
};
