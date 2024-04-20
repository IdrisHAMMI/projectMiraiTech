import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class PatternValidatorsService {

  static patternValidators(regex: RegExp, error:ValidationErrors): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if(!control.value){
        //IF CONTROL IS EMPTY, RETURN NO ERROR
        return null
      }
      //TEST THE VALUE OF THE CONTROL AGAINST THE REGEXP SUPPLIED
      const valid = regex.test(control.value)

      //IF TRUE THEN RETURN NO ERROR, ELSE RETURN ERROR PASSED IN THE SECOND PARAM
      return valid? null: error;
    }
  }
}
