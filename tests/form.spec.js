import { expect, test } from "@playwright/test";
import { form } from "../POM/page";

test.beforeEach(async({page})=>{
    await page.goto("https://demoqa.com/automation-practice-form")
})
  
test.describe('Form test', () => {
    test.skip('verify successful submition with valid data ', async ({ page }) => {
        const Form = new form(page)
        await Form.enterPersonalInfo(
            'Ashish',
            'Paudel',
            'ashish@gmail.com',
            '9823875819')
        await Form.genderRatio()
        await Form.selectDateOfBirth('1998','7')
        await page.waitForTimeout(100)

        await Form.selectSubject('computer science')
        await Form.hobbies()
        await page.waitForTimeout(100)
        await Form.addImage('D:/newTask/camera.jpg')
        await Form.currentAdd('kathmandu')
        await page.waitForTimeout(1000)
        await Form.slectState('Uttar Pradesh')        
        await Form.slectCity('agra')
        await Form.submit()
        await expect(page.locator('#example-modal-sizes-title-lg')).toHaveText('Thanks for submitting the form')
        await Form.closeBtn()
    })

    test('verify submition is unsucessful with empty data',async({page})=>{
        const Form = new form(page)
        await Form.submit()
        await expect(page.locator('#firstName')).toHaveCSS('border-color', 'rgb(220, 53, 69)')
        await expect(page.locator('#lastName')).toHaveCSS('border-color', 'rgb(220, 53, 69)')
        await expect(page.locator('#userNumber')).toHaveCSS('border-color', 'rgb(220, 53, 69)')
        await expect(page.locator('//label[normalize-space()="Female"]')).toHaveCSS('border-color','rgb(220, 53, 69)')
        
    })

    test('verify requirefield submition sucessfully',async({page})=>{
                const Form = new form(page)
        await Form.enterPersonalInfo(
            'Ashish',
            'Paudel',
            '',
            '9823875819')
        await page.waitForTimeout(100)
        await Form.genderSlection()
        await Form.submit()
        await expect(page.locator('#example-modal-sizes-title-lg')).toHaveText('Thanks for submitting the form')
    })

    test('verify requirefield submition unsucessfull',async({page})=>{
                const Form = new form(page)
            await Form.enterPersonalInfo(
                '',
                '',
                '',
                '')
            await Form.selectSubject('computer science')
            await Form.hobbies()
            await page.waitForTimeout(100)
            await Form.addImage('D:/newTask/camera.jpg')
            await Form.currentAdd('kathmandu')
            await page.waitForTimeout(1000)
            await Form.slectState('Uttar Pradesh')        
            await Form.slectCity('agra')
            await Form.submit()
            // await Form.genderSlection()
            await Form.submit()
            await expect(page.locator('#firstName')).toHaveCSS('border-color', 'rgb(220, 53, 69)')
            await expect(page.locator('#lastName')).toHaveCSS('border-color', 'rgb(220, 53, 69)')
            await expect(page.locator('#userNumber')).toHaveCSS('border-color', 'rgb(220, 53, 69)')
            await expect(page.locator('//label[normalize-space()="Female"]')).toHaveCSS('border-color','rgb(220, 53, 69)')
        })
    test('verify  ',async({page})=>{
                const Form = new form(page)
        await Form.enterPersonalInfo(
            'Ashish',
            'Paudel',
            '',
            '9823875819')
        await page.waitForTimeout(100)
        await Form.genderSlection()
        await Form.submit()
        })
})


