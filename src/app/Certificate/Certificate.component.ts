/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { CertificateService } from './Certificate.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-certificate',
  templateUrl: './Certificate.component.html',
  styleUrls: ['./Certificate.component.css'],
  providers: [CertificateService]
})
export class CertificateComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
  private errorMessage;

  certId = new FormControl('', Validators.required);
  studentId = new FormControl('', Validators.required);
  studentName = new FormControl('', Validators.required);
  certTitle = new FormControl('', Validators.required);
  certAward = new FormControl('', Validators.required);
  certWording = new FormControl('', Validators.required);
  issuer = new FormControl('', Validators.required);

  constructor(public serviceCertificate: CertificateService, fb: FormBuilder) {
    this.myForm = fb.group({
      certId: this.certId,
      studentId: this.studentId,
      studentName: this.studentName,
      certTitle: this.certTitle,
      certAward: this.certAward,
      certWording: this.certWording,
      issuer: this.issuer
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    const tempList = [];
    return this.serviceCertificate.getAll()
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      result.forEach(asset => {
        tempList.push(asset);
      });
      this.allAssets = tempList;
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

	/**
   * Event handler for changing the checked state of a checkbox (handles array enumeration values)
   * @param {String} name - the name of the asset field to update
   * @param {any} value - the enumeration value for which to toggle the checked state
   */
  changeArrayValue(name: string, value: any): void {
    const index = this[name].value.indexOf(value);
    if (index === -1) {
      this[name].value.push(value);
    } else {
      this[name].value.splice(index, 1);
    }
  }

	/**
	 * Checkbox helper, determining whether an enumeration value should be selected or not (for array enumeration values
   * only). This is used for checkboxes in the asset updateDialog.
   * @param {String} name - the name of the asset field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified asset field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }

  addAsset(form: any): Promise<any> {
    this.asset = {
      $class: 'verifier.certificates.biznet.Certificate',
      'certId': this.certId.value,
      'studentId': this.studentId.value,
      'studentName': this.studentName.value,
      'certTitle': this.certTitle.value,
      'certAward': this.certAward.value,
      'certWording': this.certWording.value,
      'issuer': this.issuer.value
    };

    this.myForm.setValue({
      'certId': null,
      'studentId': null,
      'studentName': null,
      'certTitle': null,
      'certAward': null,
      'certWording': null,
      'issuer': null
    });

    return this.serviceCertificate.addAsset(this.asset)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.myForm.setValue({
        'certId': null,
        'studentId': null,
        'studentName': null,
        'certTitle': null,
        'certAward': null,
        'certWording': null,
        'issuer': null
      });
      this.loadAll();
    })
    .catch((error) => {
      if (error === 'Server error') {
          this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else {
          this.errorMessage = error;
      }
    });
  }


  updateAsset(form: any): Promise<any> {
    this.asset = {
      $class: 'verifier.certificates.biznet.Certificate',
      'studentId': this.studentId.value,
      'studentName': this.studentName.value,
      'certTitle': this.certTitle.value,
      'certAward': this.certAward.value,
      'certWording': this.certWording.value,
      'issuer': this.issuer.value
    };

    return this.serviceCertificate.updateAsset(form.get('certId').value, this.asset)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.loadAll();
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }


  deleteAsset(): Promise<any> {

    return this.serviceCertificate.deleteAsset(this.currentId)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.loadAll();
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

  setId(id: any): void {
    this.currentId = id;
  }

  getForm(id: any): Promise<any> {

    return this.serviceCertificate.getAsset(id)
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      const formObject = {
        'certId': null,
        'studentId': null,
        'studentName': null,
        'certTitle': null,
        'certAward': null,
        'certWording': null,
        'issuer': null
      };

      if (result.certId) {
        formObject.certId = result.certId;
      } else {
        formObject.certId = null;
      }

      if (result.studentId) {
        formObject.studentId = result.studentId;
      } else {
        formObject.studentId = null;
      }

      if (result.studentName) {
        formObject.studentName = result.studentName;
      } else {
        formObject.studentName = null;
      }

      if (result.certTitle) {
        formObject.certTitle = result.certTitle;
      } else {
        formObject.certTitle = null;
      }

      if (result.certAward) {
        formObject.certAward = result.certAward;
      } else {
        formObject.certAward = null;
      }

      if (result.certWording) {
        formObject.certWording = result.certWording;
      } else {
        formObject.certWording = null;
      }

      if (result.issuer) {
        formObject.issuer = result.issuer;
      } else {
        formObject.issuer = null;
      }

      this.myForm.setValue(formObject);

    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

  resetForm(): void {
    this.myForm.setValue({
      'certId': null,
      'studentId': null,
      'studentName': null,
      'certTitle': null,
      'certAward': null,
      'certWording': null,
      'issuer': null
      });
  }

}
