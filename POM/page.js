import {test, expect} from '@playwright/test'
import {formVariable}from "../POM/variable"
export class form{
    constructor(page){
        this.page = page
        //personal information 
        this.firstName = page.locator('#firstName')
        this.lastName = page.locator('#lastName')
        this.userEmail = page.locator('#userEmail')
        this.userNumber = page.locator('#userNumber')

        //gender ratio
        this.genderRatioMale = page.locator('//label[normalize-space()="Male"]')
        this.genderRatioFemale = page.locator('//label[normalize-space()="Female"]')
        this.genderRatioOthers = page.locator('//label[normalize-space()="Other"]')
        //Date of Birth
        this.datePickerInput = page.locator('.react-datepicker__input-container');
        this.yearSelect = page.locator('.react-datepicker__year-select');
        this.monthSelect = page.locator('.react-datepicker__month-select');
        this.daySelect = page.locator('.react-datepicker__day--015');

        // Subjects and Hobbies
        this.subjectClick = page.locator('.subjects-auto-complete__value-container')
        this.subjectsInput = page.locator('.subjects-auto-complete__input input');
        this.subEnter = page.keyboard
        this.hobbiesCheckbox1 = page.locator('#hobbies-checkbox-1');
        this.hobbiesCheckbox2 = page.locator('#hobbies-checkbox-2');
        this.hobbiesCheckbox3 = page.locator('#hobbies-checkbox-3');


        //Address and file update
        this.currentAddress = page.locator('#currentAddress');
        this.fileUploadInput = page.locator('input[type="file"]');

        // State and City
        this.stateDropdown = page.locator(`//div[@//div[contains(text(),"${formVariable.state[i]}")]="state"]`);
        // this.stateSlect = page.locator('.css-1uccc91-singleValue')
        this.cityDropdown = page.locator('input[id="react-select-4-input"]');

        // Submit and Modal
        this.submitButton = page.locator('#submit');
        this.closeButton = page.locator('#closeLargeModal');

}
 async enterPersonalInfo(firstName, lastName, email, phone) {
    await this.firstName.fill(firstName);
    await this.lastName.fill(lastName);
    await this.userEmail.fill(email);
    await this.userNumber.fill(phone);
  }
  async genderSlection(gender){
    if(gender === 'male'){
      await this.genderRatioMale.click()
    }else if(gender === 'female'){
     await this.genderRatioFemale.click()
    }else if(gender === 'other'){
    await this.genderRatioOthers.click()
    }
    
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

// async hobbies(hobbie) {
//     if (hobbie === 'Sports') {
//         await this.hobbiesCheckbox1.click({ force: true });
//         await expect(this.hobbiesCheckbox1).toBeChecked();
//         await this.hobbiesCheckbox1.click({ force: true });
//         await expect(this.hobbiesCheckbox1).not.toBeChecked();
//     } 
//     else if (hobbie === 'Reading') {
//         await this.hobbiesCheckbox2.click({ force: true });
//         await expect(this.hobbiesCheckbox2).toBeChecked();
//         await this.hobbiesCheckbox2.click({ force: true });
//         await expect(this.hobbiesCheckbox2).not.toBeChecked();
//     } 
//     else if (hobbie === 'Music') {
//         await this.hobbiesCheckbox3.click({ force: true });
//         await expect(this.hobbiesCheckbox3).toBeChecked();
//         await this.hobbiesCheckbox3.click({ force: true });
//         await expect(this.hobbiesCheckbox3).not.toBeChecked();
//     }
// } 
async hobbies(hobbie){
      const checkbox = this.getHobbyCheckbox(hobbie)
      await checkbox.click({ force: true })
  }

  getHobbyCheckbox(hobbie){
    if(hobbie === 'Sports'){
      return this.hobbiesCheckbox1
    }else if(hobbie==='Reading'){
      return this.hobbiesCheckbox2;
    }else if(hobbie==='Music'){
      return this.hobbiesCheckbox3;
    }
  }


    async submitForm() {
    await this.submitButton.click();
  }

  async addImage(image){
    await this.fileUploadInput.setInputFiles(image)
  }
    async currentAdd(address){
    await this.currentAddress.fill(address)
}

  // async slectState(state){
  //   await this.stateDropdown.click()
  //   await this.page.locator(`text=${state}`).click()
  //   // await this.stateSlect.click(state)
  // }
    async slectState(state){
      if(state ==='NCR'){
        const ncrCity = formVariable.cities[0]
        for(const cityNcr of ncrCity)
          for (const singleCity of cityNcr)
          await await this.cityDropdown.fill(singleCity)
          await this.page.keyboard.press('Enter')
      }

  }
  // async slectCity(city){
  //   await this.cityDropdown.fill(city)
  //   await this.page.keyboard.press('Enter')
  // }
  
  async submit(){
    await this.submitButton.click()
  }
  async closeBtn(){
    await this.closeButton.click( {force: true} )
  }
  
}