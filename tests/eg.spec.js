import{test,expect}from'@playwright/test'
import { Console } from 'console'
 
test("from test ", async({page})=>{
//     await page.goto("https://demoqa.com/automation-practice-form")
//     //NAME AND ADDRESS
//     await page.fill('#firstName', 'Ashish');
//     await page.fill('#lastName','Paudel');
//     await page.fill('#userEmail', 'ashish@gmail.com');
//     await page.click('//label[normalize-space()="Female"]');
//     await page.fill('#userNumber','9823875819');
 
//     //DATE OF BIRTH
//     await page.click('.react-datepicker__input-container')
//     await page.selectOption('.react-datepicker__year-select',{value:'1998'})
//     await page.selectOption('.react-datepicker__month-select',{value:'7'})
//     await page.click('.react-datepicker__day--015');
   
 
//     //SUBJECTS AND HOBBY
//     await page.waitForTimeout(1000)
//     await page.locator('.subjects-auto-complete__value-container').click();
//     await page.locator('.subjects-auto-complete__input input').pressSequentially('Computer Science', {delay:10});
//     await page.keyboard.press('Enter')
//     await page.locator('#hobbies-checkbox-3').click({ force: true });
 
//     //PICTURE AND ADDRESS
//     await page.waitForTimeout(1000)
//     await page.setInputFiles('input[type="file"]', 'D:/newTask/camera.jpg')
//     await page.locator('#currentAddress').fill('kathmandu')
 
//     //STATE
//     await page.waitForTimeout(1000)
//     await page.click('#state')
//     await page.click('text=Uttar Pradesh');
//     // await page.locator('#city').click();
//     // await page.locator('#city','text=Agra').click({force:true});
 
//     //CITY
//     await page.locator('input[id="react-select-4-input"]').fill('Agra');
//     await page.keyboard.press('Enter');
 
//     //SUBMIT
//     await page.click('#submit')
//     await page.waitForTimeout(1000)
//    await expect(page.locator('#example-modal-sizes-title-lg')).toHaveText('Thanks for submitting the form')
//     await page.locator('#closeLargeModal').click()
//     await expect(page.locator('.text-center')).toHaveText('Practice Form')
//     // await expect(page).toHaveURL('https://demoqa.com/automation-practice')
   
//     // await page.fill()

// >>>>>>for loop<<<<<<
    //write for loop to print even number from 2 to 10 
    //  for(let i=0; i<=10; i+=2){
    //     console.log(i)
    //  }

    //counting from 1 to 20 find even number 
    //  let count = 0
    // for(let j=1; j<20; j++){
    //   console.log("number betn 1-20 are:" + j)
    //   if(j%2===0){
    //     console.log("even nnumber betn 1-20 are: " + j)
    //     count = count + 1
    //   }
    // }
    // console.log("The total count of even number from 1-20 is:"+ count)
     

//    let  evenNumber = ""
//    for(let k = 2; k<=20; k+=2){
//         evenNumber =evenNumber + k + " "
//    }
//     console.log("even number betn 2 to 20 are :" + evenNumber)

     //Print all even numbers from 1 to 50...................
 /*    let even50 = ""
     for(let l=2; l<=50; l+=2){
        even50 += l + " "
     }
     console.log("the even number betn 1 to 50 are: "+ even50)

    //  ............................Print all odd numbers from 1 to 30.................................
    let odd30 = ""
    for(let a= 1; a<=30; a+=2){
        odd30 = odd30 + a +" "
    }
    console.log("the odd number betn 1 to 30 are:" + odd30)

    // ......................................Find the sum of numbers from 1 to 100...................
    let sum100 = 0
    for(let b = 1; b<=100; b++){
        sum100 +=b

    }
    console.log("the sum of number betn 1 to 100 is: " + sum100)

    // ..................................Print the multiplication table of 5.........................
     let multiple5= " "
     let startNum = 5
    for(let c = 1; c<=10; c++){
        multiple5=multiple5 + c*startNum + ", "
       
    }
     console.log("the multiplication table of 5 is: " + multiple5)

    //.................................... Count how many numbers between 1 and 100 are divisible by 3
    let div3 = 0
    for(let d=0; d<=100; d++ ){
        if(d%3===0){
            div3 +=1
            
        }
    }
    console.log(div3)


    // ..............................Print squares of numbers from 1 to 10 
    let squ =""
    for(let e = 0; e<=10; e++ ){
        squ += e*e +" " 
        
    }
    console.log("the total square number betn 1 to 10 are:"+ squ)

    // ..............................Reverse counting from 10 to 1
   let resum = 0
    let revCount = ""
    for(let f=10; f>=1; f--){
        revCount+=f + ", "
        resum+=f
        
        
    }
   console.log("the total count of 10 to 1 are :"+ revCount)
   console.log("the total sum of 10 to 1 is :"+ resum)

//    ......................................Print the factorial of a number (e.g., 5! = 5×4×3×2×1 = 120)
    let fact = 1
    for(let g=1; g<=5; g++){
       fact=fact*g

    }
    console.log("the factorial of 5 is:" + fact)

    // .......................Print only multiples of both 3 and 5 from 1 to 50
    let commonM = ""
    for(let k=1; k<=50; k++){
        if (k%3===0 && k%5===0){
            commonM+=k + ", "
            
        }       
    }
    console.log(" multiples of both 3 and 5 from 1 to 50: "+ commonM)*/


    // ....................for of
    const pairs = [[1,"One"], [2, "two"]]
    for(let[num,word] of pairs){
        console.log(`${num} is ${word}`)

    }


    // looping over multidimensional
    const matrix = [[1, 2], [3, 4], [5, 6]];
    for(let row of matrix){
        for(let num of row){
            console.log(num)
        }
    }
    //............................While loop..................
    //..................1. Print numbers from 1 to 10
    let i = 1
    while(i<=10){
        console.log("the number from 1 to 10 are:"+i);
        i++
    }

    // .................. Print even numbers from 1 to 20
    let j = 2
    let evenN =""
    while(j<=20){
        evenN+=j
        if (j<20){
            evenN+=", "
        }
        j+=2
    }
    console.log("even number from 1 to 20 are: "+evenN)


    // ................................ Print odd numbers from 1 to 15

    let k = 1
    while(k<=15){
        if(k<=15){
            console.log(k)
        }
        k+=2
    }

})