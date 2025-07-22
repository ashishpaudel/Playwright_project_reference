import {test, expect} from '@playwright/test'

export class form{
    constructor(page){
        this.page = page
        //personal information 
        this.firstName = page.locator('#firstName')
        this.lastName = page.locator('#lastName')
        this.userEmail = page.locator('#userEmail')
        this.userNumber = page.locator('#userNumber')

        //gender ratio
        this.genderRatio = page.locator('//label[normalize-space()="Male"]')

        //Date of Birth
        this.datePickerInput = page.locator('.react-datepicker__input-container');
        this.yearSelect = page.locator('.react-datepicker__year-select');
        this.monthSelect = page.locator('.react-datepicker__month-select');
        this.daySelect = page.locator('.react-datepicker__day--015');

        // Subjects and Hobbies
        this.subjectClick = page.locator('.subjects-auto-complete__value-container')
        this.subjectsInput = page.locator('.subjects-auto-complete__input input');
        this.subEnter = page.keyboard
        this.hobbiesCheckbox = page.locator('#hobbies-checkbox-3');

        //Address and file update
        this.currentAddress = page.locator('#currentAddress');
        this.fileUploadInput = page.locator('input[type="file"]');

        // State and City
        this.stateDropdown = page.locator('//div[@id="state"]');
        // this.stateSlect = page.locator('.css-1uccc91-singleValue')
        this.cityDropdown = page.locator('input[id="react-select-4-input"]');

        // Submit and Modal
        this.submitButton = page.locator('#submit');
        this.modalTitle = page.locator('#example-modal-sizes-title-lg');
        this.closeButton = page.locator('#closeLargeModal');

}
 async enterPersonalInfo(firstName, lastName, email, phone) {
    await this.firstName.fill(firstName);
    await this.lastName.fill(lastName);
    await this.userEmail.fill(email);
    await this.userNumber.fill(phone);
  }
  async genderSlection(){
    await this.genderRatio.click()
  }

  async selectDateOfBirth(year, month) {
    await this.datePickerInput.click();
    await this.yearSelect.selectOption({ value: year });
    await this.monthSelect.selectOption({ value: month });
    await this.daySelect.click();
  }

  async selectSubject(subject){
    await this.subjectClick.click()
    await this.subjectsInput.pressSequentially(subject,{delay:10})
    await this.subEnter.press("Enter")
    
  }

  async hobbies(){
    await this.hobbiesCheckbox.click({ force: true })
    // await this.hobbiesEnter.press("Enter")
  }

  //   async submitForm() {
  //   await this.submitButton.click();
  // }

  async addImage(image){
    await this.fileUploadInput.setInputFiles(image)
  }
    async currentAdd(address){
    await this.currentAddress.fill(address)
}

  async slectState(state){
    await this.stateDropdown.click()
    await this.page.locator(`text=${state}`).click()
    // await this.stateSlect.click(state)
  }
  async slectCity(city){
    await this.cityDropdown.fill(city)
    await this.page.keyboard.press('Enter')
  }
  async submit(){
    await this.submitButton.click()
  }
  async closeBtn(){
    await this.closeButton.click()
  }
  
}