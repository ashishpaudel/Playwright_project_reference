import{test,expect}from'@playwright/test'
 
test("from test ", async({page})=>{
    await page.goto("https://demoqa.com/automation-practice-form")
    //NAME AND ADDRESS
    await page.fill('#firstName', 'Ashish');
    await page.fill('#lastName','Paudel');
    await page.fill('#userEmail', 'ashish@gmail.com');
    await page.click('//label[normalize-space()="Female"]');
    await page.fill('#userNumber','9823875819');
 
    //DATE OF BIRTH
    await page.click('.react-datepicker__input-container')
    await page.selectOption('.react-datepicker__year-select',{value:'1998'})
    await page.selectOption('.react-datepicker__month-select',{value:'7'})
    await page.click('.react-datepicker__day--015');
   
 
    //SUBJECTS AND HOBBY
    await page.waitForTimeout(1000)
    await page.locator('.subjects-auto-complete__value-container').click();
    await page.locator('.subjects-auto-complete__input input').pressSequentially('Computer Science', {delay:10});
    await page.keyboard.press('Enter')
    await page.locator('#hobbies-checkbox-3').click({ force: true });
 
    //PICTURE AND ADDRESS
    await page.waitForTimeout(1000)
    await page.setInputFiles('input[type="file"]', 'D:/newTask/camera.jpg')
    await page.locator('#currentAddress').fill('kathmandu')
 
    //STATE
    await page.waitForTimeout(1000)
    await page.click('#state')
    await page.click('text=Uttar Pradesh');
    // await page.locator('#city').click();
    // await page.locator('#city','text=Agra').click({force:true});
 
    //CITY
    await page.locator('input[id="react-select-4-input"]').fill('Agra');
    await page.keyboard.press('Enter');
 
    //SUBMIT
    await page.click('#submit')
    await page.waitForTimeout(1000)
   await expect(page.locator('#example-modal-sizes-title-lg')).toHaveText('Thanks for submitting the form')
    await page.locator('#closeLargeModal').click()
    await expect(page.locator('.text-center')).toHaveText('Practice Form')
    // await expect(page).toHaveURL('https://demoqa.com/automation-practice')
   
    // await page.fill()
})