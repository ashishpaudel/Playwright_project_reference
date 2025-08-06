import { expect, test } from "@playwright/test";
import { form } from "../POM/page";
import {formVariable}from "../POM/variable"
import { stateCityMapping } from "../POM/variable";
import { expectedData } from "../POM/variable";


    test.beforeEach(async({page})=>{
    await page.goto("https://demoqa.com/automation-practice-form")
})
test.describe('Form test', () => {
    
    test('should submit successfully with all valid data', async ({ page },testData) => {
        const Form = new form(page)
        const fullName = expectedData["Student Name"].split(" ")
        await Form.enterPersonalInfo(
            fullName[0],
            fullName[1],
            expectedData["Student Email"],
            expectedData["Mobile"]
        )
            
        await Form.genderSlection(expectedData["Gender"].toLowerCase());
        // await Form.genderSlection(expectedData.Gender)
        await Form.selectDateOfBirth('1998','7')
        // await page.waitForTimeout(100)

        await Form.selectSubject(expectedData["Subjects"])
        await Form.hobbies(expectedData["Hobbies"])
        // await page.waitForTimeout(100)
        await Form.addImage(`image/${expectedData["Picture"]}`)
        await Form.currentAdd(expectedData["Address"])
        // await page.waitForTimeout(1000)
        await Form.selectState(1)        
        await Form.selectCity(0)
        await Form.submit()
        // await page.waitForTimeout(1000)

        await expect(page.locator('#example-modal-sizes-title-lg')).toHaveText('Thanks for submitting the form');
        
        await expect(page.locator('#example-modal-sizes-title-lg')).toHaveText("Thanks for submitting the form")
        
        for(const [key,value] of Object.entries(expectedData)){

            const locator = page.locator(`//td[normalize-space()="${key}"]/following-sibling::td`)
            await expect(locator).toContainText(value)
        }

        await Form.closeBtn()
        await expect(page.locator('.text-center')).toHaveText('Practice Form')
        await page.waitForTimeout(1000)
    })

    test('should show validation errors when submitting empty form',async({page})=>{
        const Form = new form(page)
        await Form.submit()
        await expect(page.locator('#firstName')).toHaveCSS('border-color', 'rgb(220, 53, 69)')
        await expect(page.locator('#lastName')).toHaveCSS('border-color', 'rgb(220, 53, 69)')
        await expect(page.locator('#userNumber')).toHaveCSS('border-color', 'rgb(220, 53, 69)')
        await expect(page.locator('//label[normalize-space()="Female"]')).toHaveCSS('border-color','rgb(220, 53, 69)')
    })

    test('should submit successfully with only required fields',async({page})=>{
                const Form = new form(page)
        const fullName = expectedData["Student Name"].split(" ")
        await Form.enterPersonalInfo(
            fullName[0],
            fullName[1],
            expectedData["Student Email"],
            expectedData["Mobile"]
        )
            
        await Form.genderSlection(expectedData["Gender"].toLowerCase());
        await Form.submit()
        await expect(page.locator('#example-modal-sizes-title-lg')).toHaveText('Thanks for submitting the form')
    })

    test('should validate correct email format',async({page})=>{
                const Form = new form(page)
        await Form.enterPersonalInfo(
            '',
            '',
             expectedData["Student Email"],
            '')
        await Form.submit()
        
        await expect(page.locator('#userEmail')).toHaveCSS('border-color', 'rgb(40, 167, 69)')
    })

    test('should show error for invalid email format',async({page})=>{
        const Form = new form(page)
        await Form.enterPersonalInfo(
            '',
            '',
            'ashish@com',
            '')
        await Form.submit()
        
        await expect(page.locator('#userEmail')).toHaveCSS('border-color',  'rgb(220, 53, 69)')
    })

    test('should correctly toggle gender selection',async({page})=>{
        const Form = new form(page)
        await Form.genderSlection('male')
        
        await expect(page.locator('//label[normalize-space()="Male"]')).toBeChecked()
        
        await Form.genderSlection('female')
       
        await expect(page.locator('//label[normalize-space()="Female"]')).toBeChecked()

        await Form.genderSlection('other')
        
        await expect(page.locator('//label[normalize-space()="Other"]')).toBeChecked()
    })

    test('should show error for short mobile number',async({page})=>{
        const Form = new form(page)
        await Form.enterPersonalInfo(
            '',
            '',
            '',
            '12345')
        await Form.submit()
        
        await expect(page.locator('#userNumber')).toHaveCSS('border-color',  'rgb(220, 53, 69)')
    })

    test('should show error for non-numeric mobile number',async({page})=>{
        const Form = new form(page)
        await Form.enterPersonalInfo(
            '',
            '',
            '',
            'abcdefghij')
        await Form.submit()
        
        await expect(page.locator('#userNumber')).toHaveCSS('border-color',  'rgb(220, 53, 69)')
    })

    test('should handle invalid subject input',async({page})=>{
        const Form = new form(page)
        await Form.selectSubject('asdasdf')
        // await Form.submit()
        
    await expect(page.locator('.subjects-auto-complete__multi-value__label')).toHaveCount(0)     
    })

    test('should accept valid subjects',async({page})=>{
        const Form = new form(page)
        await Form.selectSubject('computer science')
        await Form.selectSubject('physics')
        await Form.submit()
        
    await expect(page.locator('.subjects-auto-complete__multi-value__label', { hasText: ('Computer Science','Physics') })).toBeVisible()        
    })

    test('should remove subjects using close button',async({page})=>{
        const Form = new form(page)
        await Form.selectSubject('computer science')
        await Form.selectSubject('physics')
        await page.locator('.subjects-auto-complete__indicator').click()
        await Form.submit()
        
     await expect(page.locator('.subjects-auto-complete__multi-value__label', { hasText: ('Computer Science','Physics') })).not.toBeVisible()        
    })


     test('should click multiple hobby ',async({page})=>{
     const Form = new form(page)    
        for(const combination of formVariable.hobbyCombinations){
            for(const hob of combination){
             await Form.hobbies(hob)
             await page.waitForTimeout(100)
             await expect(Form.getHobbyCheckbox(hob)).toBeChecked()
            }
            for(const clean of combination){
                await Form.hobbies(clean)
                await expect(Form.getHobbyCheckbox(clean)).not.toBeChecked()
            }
       

        }
     })


        test('should click multiple hobby checkboxes',async({page})=>{
        const Form = new form(page)
        const hobbiesList = formVariable.hobbyCombinations[6] //['Sports', 'Reading','Music']

        for(const hobby of hobbiesList){
           await Form.hobbies(hobby)
           await expect(Form.getHobbyCheckbox(hobby)).toBeChecked()
           await Form.hobbies(hobby)
           await expect(Form.getHobbyCheckbox(hobby)).not.toBeChecked()
        }
    })




    test('should successfully upload multiple files',async({page})=>{
        const Form = new form(page)
       await Form.addImage('image/camera.png')
       await Form.addImage('image/canon.pdf')
    })


     test('should click each state',async({page})=>{
        const Form = new form(page)
        const states = Object.keys(stateCityMapping);
        console.log(states.length)

        for(let i=0; i<states.length; i++){
            // const state = states[i]
            console.log(i)     
        await Form.selectState(i)
     }

     })

      test('should click each state and city',async({page})=>{
        const Form = new form(page)
        const states = Object.keys(stateCityMapping);
        console.log(states.length)

        for(let i=0; i<states.length; i++){
            // const state = states[i]
            console.log(i)     
        await Form.selectState(i)
        let state = states[i]
        await expect(Form.stateDropdown).toContainText(state)
            const cities = stateCityMapping[states[i]]
           for(let j=0; j<cities.length; j++){
           console.log(cities.length)
            await Form.selectCity(j)
            let  city = cities[j]
            await expect(Form.cityDropdown).toContainText(city)
        }
           }

       })
     })