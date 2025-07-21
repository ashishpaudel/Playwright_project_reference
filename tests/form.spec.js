import { expect, test } from "@playwright/test";
import { form } from "../POM/page";
import {formVariable}from "../POM/variable"
import { stateCityMapping } from "../POM/variable";
import { KeyObject } from "crypto";

    test.beforeEach(async({page})=>{
    await page.goto("https://demoqa.com/automation-practice-form")
})
test.describe('Form test', () => {
    
    test.skip('should submit successfully with all valid data', async ({ page },testData) => {
        const Form = new form(page)
        await Form.enterPersonalInfo(
            'Ashish',
            'Paudel',
            'ashish@gmail.com',
            '9823875819')
        await Form.genderSlection('male')
        await Form.selectDateOfBirth('1998','7')
        await page.waitForTimeout(100)

        await Form.selectSubject('computer science')
        await Form.hobbies('Music')
        await page.waitForTimeout(100)
        await Form.addImage('image/camera.png')
        await Form.currentAdd('kathmandu')
        await page.waitForTimeout(1000)
        await Form.slectState('Uttar Pradesh')        
        await Form.slectCity('agra')
        await Form.submit()
        await page.waitForTimeout(1000)
        await expect(page.locator('#example-modal-sizes-title-lg')).toHaveText('Thanks for submitting the form');

        await expect(page.locator('//td[normalize-space()="Student Name"]/following-sibling::td')).toHaveText('Ashish Paudel')
        await expect(page.locator('//td[normalize-space()="Student Email"]/following-sibling::td')).toHaveText('ashish@gmail.com')
        await expect(page.locator('//td[normalize-space()="Gender"]/following-sibling::td')).toHaveText('Male')
        await expect(page.locator('//td[normalize-space()="Mobile"]/following-sibling::td')).toHaveText('9823875819')
        await expect(page.locator('//td[normalize-space()="Date of Birth"]/following-sibling::td')).toHaveText('15 August,1998')
        await expect(page.locator('//td[normalize-space()="Subjects"]/following-sibling::td')).toHaveText('Computer Science')
        await expect(page.locator('//td[normalize-space()="Hobbies"]/following-sibling::td')).toHaveText('Music')
        await expect(page.locator('//td[normalize-space()="Picture"]/following-sibling::td')).toHaveText('camera.png')
        await expect(page.locator('//td[normalize-space()="Address"]/following-sibling::td')).toHaveText('kathmandu')
        await expect(page.locator('//td[normalize-space()="State and City"]/following-sibling::td')).toHaveText('Uttar Pradesh Agra')
        
        await Form.closeBtn()
        await expect(page.locator('.text-center')).toHaveText('Practice Form')
        await page.waitForTimeout(1000)
    })

    test.skip('should show validation errors when submitting empty form',async({page})=>{
        // const Form = new form(page)
        await Form.submit()
        await expect(page.locator('#firstName')).toHaveCSS('border-color', 'rgb(220, 53, 69)')
        await expect(page.locator('#lastName')).toHaveCSS('border-color', 'rgb(220, 53, 69)')
        await expect(page.locator('#userNumber')).toHaveCSS('border-color', 'rgb(220, 53, 69)')
        await expect(page.locator('//label[normalize-space()="Female"]')).toHaveCSS('border-color','rgb(220, 53, 69)')
    })

    test.skip('should submit successfully with only required fields',async({page})=>{
                const Form = new form(page)
        await Form.enterPersonalInfo(
            'Ashish',
            'Paudel',
            'ashish@gmail.com',
            '9823875819')
        await page.waitForTimeout(100)
        await Form.genderSlection('male')
        await Form.submit()
        await expect(page.locator('#example-modal-sizes-title-lg')).toHaveText('Thanks for submitting the form')
    })

    test.skip('should validate correct email format',async({page})=>{
                const Form = new form(page)
        await Form.enterPersonalInfo(
            '',
            '',
            'ashish@gmail.com',
            '')
        await Form.submit()
        
        await expect(page.locator('#userEmail')).toHaveCSS('border-color', 'rgb(40, 167, 69)')
    })

    test.skip('should show error for invalid email format',async({page})=>{
        const Form = new form(page)
        await Form.enterPersonalInfo(
            '',
            '',
            'ashish@com',
            '')
        await Form.submit()
        
        await expect(page.locator('#userEmail')).toHaveCSS('border-color',  'rgb(220, 53, 69)')
    })

    test.skip('should correctly toggle gender selection',async({page})=>{
        const Form = new form(page)
        await Form.genderSlection('male')
        
        await expect(page.locator('//label[normalize-space()="Male"]')).toBeChecked()
        
        await Form.genderSlection('female')
       
        await expect(page.locator('//label[normalize-space()="Female"]')).toBeChecked()

        await Form.genderSlection('other')
        
        await expect(page.locator('//label[normalize-space()="Other"]')).toBeChecked()
    })

    test.skip('should show error for short mobile number',async({page})=>{
        const Form = new form(page)
        await Form.enterPersonalInfo(
            '',
            '',
            '',
            '12345')
        await Form.submit()
        
        await expect(page.locator('#userNumber')).toHaveCSS('border-color',  'rgb(220, 53, 69)')
    })

    test.skip('should show error for non-numeric mobile number',async({page})=>{
        const Form = new form(page)
        await Form.enterPersonalInfo(
            '',
            '',
            '',
            'abcdefghij')
        await Form.submit()
        
        await expect(page.locator('#')).toHaveCSS('border-color',  'rgb(220, 53, 69)')
    })

    test.skip('should handle invalid subject input',async({page})=>{
        const Form = new form(page)
        await Form.selectSubject('asdasdf')
        await Form.submit()
        
    await expect(page.locator('.subjects-auto-complete__multi-value__label')).toHaveCount(0)       
    })

    test.skip('should accept valid subjects',async({page})=>{
        const Form = new form(page)
        await Form.selectSubject('computer science')
        await Form.selectSubject('physics')
        await Form.submit()
        
    await expect(page.locator('.subjects-auto-complete__multi-value__label', { hasText: ('Computer Science','Physics') })).toBeVisible()        
    })

    test.skip('should remove subjects using close button',async({page})=>{
        const Form = new form(page)
        await Form.selectSubject('computer science')
        await Form.selectSubject('physics')
        await page.locator('.subjects-auto-complete__indicator').click()
        await Form.submit()
        
     await expect(page.locator('.subjects-auto-complete__multi-value__label', { hasText: ('Computer Science','Physics') })).not.toBeVisible()        
    })


     test.skip('should click multiple hobby ',async({page})=>{
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


        test.skip('should click multiple hobby checkboxes',async({page})=>{
        const Form = new form(page)
        const hobbiesList = formVariable.hobbyCombinations[6] //['Sports', 'Reading','Music']

        for(const hobby of hobbiesList){
           await Form.hobbies(hobby)
           await expect(Form.getHobbyCheckbox(hobby)).toBeChecked()
           await Form.hobbies(hobby)
           await expect(Form.getHobbyCheckbox(hobby)).not.toBeChecked()
        }
    })




    test.skip('should successfully upload multiple files',async({page})=>{
        const Form = new form(page)
       await Form.addImage('image/camera.png')
       await Form.addImage('image/canon.pdf')
    })


    // test('should slect state and city ',async({page})=>{
    //     const Form = new form(page)
        
        
    //     const stateCount =formVariable.state.length
    //     for(let i = 0; i < stateCount; i++){
    //          console.log(`${i}`)
    //          await  Form.slectState(`${i}`)
    //          const  cityCount = formVariable.city.length
    //          for(let i = 0; i < cityCount; i++){
    //             // console.log(`${i}`)
    //             for(const singleCity of (`${i}`) ){
    //                 // console.log(singleCity)
    //                 await Form.slectCity(singleCity)
    //             }
    //          }
          
    // }
    // for(const state of Object.keys(stateCityMapping)){
    //     const states = Object.keys(stateCityMapping);
       
    // for (let i = 0; i < states.length(); i++) {
      
    //   await Form.selectState(i);
    //   //await page.waitForTimeout(100)
    // }
    // }

    
       
    // })



     test.skip('should click each state',async({page})=>{
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