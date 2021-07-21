/// <reference types="Cypress" />

describe('DigitalTolk TestSuite',function()
{
   it('TS_01', () => {
       cy.visit("https://ct.digitaltolk.se/")
       cy.contains('Bli').should("be.visible")
   
   });

   it('TS_02', () => {
    cy.visit("https://ct.digitaltolk.se/")
    cy.wait(3000)
    cy.xpath("//div[contains(@class,'el-input el-input--mini el-input--suffix')]/span[contains(@class,'el-input__suffix')]/span[contains(@class,'el-input__suffix-inner')]/i[contains(@class,'el-select__caret el-input__icon el-icon-arrow-up')]").click()
    cy.xpath("//ul[contains(@class,'el-scrollbar__view el-select-dropdown__list')]/li[contains(text(),'EN')]").click({force: true})
    //verify if EN is selected
    cy.xpath("//div[@class='el-input el-input--mini el-input--suffix']/input[@placeholder='Välj' and @class='el-input__inner']").should("have.value","EN")
    //Verify if english version is launched
    cy.contains('Booking').should('be.visible')
    cy.contains('Services').should('be.visible')
    cy.contains('About').should('be.visible')
    cy.contains('For Translator').should('be.visible')
    //cy.contains('Contact').should('be.visible')
    cy.contains('Log in').should('be.visible')
    cy.contains('Register').should('be.visible')
    cy.contains('Emergency Booking').should('be.visible')
    cy.contains('Convey Service').should('be.visible')
    cy.contains('Text Translation').should('be.visible')
    cy.contains('Advanced').should('be.visible')
    cy.contains('Select Language').should('be.visible')
    cy.contains('Day').should('be.visible')
    cy.contains('Start Time').should('be.visible')
    cy.contains('End Time').should('be.visible')
    cy.contains('Phone').should('be.visible')
    cy.contains('Others').should('be.visible')
    cy.contains('Book').should('be.visible')
    //negative scenarios
    cy.contains('Bokning').should('not.exist')
    cy.contains('Våra tjänster').should('not.exist')
    cy.contains('Om oss').should('not.exist')
    cy.contains('För tolken').should('not.exist')
    cy.contains('Kontakt').should('not.exist')
    cy.contains('Logga in').should('not.exist')
    cy.contains('Bli kund').should('not.exist')
    cy.contains('Akutbokning').should('not.exist')
    cy.contains('Meddelandeservice').should('not.exist')
    cy.contains('Översättning').should('not.exist')
    cy.contains('Boka').should('not.exist')


});

it('TS_03', () => {
    cy.visit("https://ct.digitaltolk.se/")
    cy.contains('Logga in').click()
    cy.url().should('include','/login')
});

it('TS_04', () => {
    cy.visit("https://ct.digitaltolk.se/")
    cy.wait(3000)
    cy.log('loaded')
    cy.xpath("//div[contains(@class,'home-page__banner-action-container')]/a[@href='/login']").click()
    cy.xpath("//div[contains(@class,'username')]/input[@type='text']").type('abc')
    cy.xpath("//div[contains(@class,'password')]/input[@type='password']").type('abc')
    cy.xpath("//button[contains(@class,'el-button app-button-primary el-button--default login-form__login-button')]").click()
    cy.xpath("//div[@role='alert']").should('be.visible')
    
});

it('TS_05', () => {
    cy.visit("https://ct.digitaltolk.se/")
    cy.wait(3000)
    cy.log('loaded')
    cy.xpath("//div[contains(@class,'home-page__banner-action-container')]/a[@href='/login']").click()
    cy.xpath("//div[contains(@class,'username')]/input[@type='text']").type('hira@customer.dt')
    cy.xpath("//div[contains(@class,'password')]/input[@type='password']").type('Test123$')
    cy.xpath("//button[contains(@class,'el-button app-button-primary el-button--default login-form__login-button')]").click()
    const username="hira@customer.dt"
    const name = username.split("@",1);
    const name_final=name[0].charAt(0).toUpperCase() + name[0].slice(1)
    cy.xpath("//*[contains(text(),'"+name_final+"')]").should('be.visible')
    //cy.url().should('include','/today-dashboard')
    
});

it('TS_06', () => {
    cy.visit("https://ct.digitaltolk.se/")
    cy.wait(3000)
    cy.log('loaded')
    cy.xpath("//div[contains(@class,'home-page__banner-action-container')]/a[@href='/login']").click()
    cy.xpath("//div[contains(@class,'username')]/input[@type='text']").type('hira@customer.dt')
    cy.xpath("//div[contains(@class,'password')]/input[@type='password']").type('Test123$')
    cy.xpath("//button[contains(@class,'el-button app-button-primary el-button--default login-form__login-button')]").click()
    //set language
     cy.xpath("//div[@id='tab-default']/div/span[contains(text(),'Bokning')]").click()
     cy.xpath("//form[@class='el-form normal-booking-form__form-container']").first().find("div").first().find("div").first().find("div > div > div > div > span > span > i").click()
     cy.wait(3000)
     cy.get('ul').find('li').each(($el, index, $list) => {
     if($el.find('span').text().includes('Lingala'))
         {
             $el.click()
         }  
     }
     )
    //setting time
    cy.xpath("//form[@class='el-form normal-booking-form__form-container']/div[1]/div[2]/div/div/input").first().click()
    cy.xpath("//span[contains(@class,'today')]").first().nextAll().eq(13).click()
    //setting start date
     cy.xpath("//form[@class='el-form normal-booking-form__form-container']/div[1]/div[3]/div/div/div/div/input").first().click()
     const hpart = Cypress.moment().tz('Europe/Stockholm').add(7, 'hours').format('HH')
     let minpart = Cypress.moment().tz('Europe/Stockholm').add(7, 'hours').format('mm')
      if(minpart < 30){ minpart='00'}
      else if(minpart>30){minpart='30'}
     const time=hpart+':'+minpart
     cy.log(time)
     const curr_time = Cypress.moment().tz('Europe/Stockholm').format('HH:mm')
     cy.log(curr_time)
     cy.get('ul').find('li').each(($el, index, $list) => {
        if($el.find('span').text().includes(time))
          {
            $el.click()
          }  
      }
      )
    //setting end-time
    cy.wait(2000)
    cy.xpath("//form[@class='el-form normal-booking-form__form-container']/div[1]/div[4]/div/div/div").first().click()
    const hpart1 = Cypress.moment().tz('Europe/Stockholm').add(8, 'hours').format('HH')
    let minpart1 = Cypress.moment().tz('Europe/Stockholm').add(8, 'hours').format('mm')
     if(minpart1 < 30){ minpart1='00'}
     else if(minpart1>30){minpart1='30'}
    const e_time=hpart1+':'+minpart1
    cy.log(e_time)
    cy.xpath("//form[@class='el-form normal-booking-form__form-container']/div[1]/div[4]/div/div/div").first().type(e_time)
    //cy.xpath("//form[@class='el-form normal-booking-form__form-container']/div[1]/div[4]/div/div/div").first().click()
    //setting-up radio button
    cy.wait(3000)
    cy.xpath("//input[@value='physical']").prev().first().click()
    cy.xpath("//span[text()='Fler val']").first().click()
    cy.get('.normal-booking-form__other-options-body > .el-row > .el-col-md-5 > .el-form-item > .el-form-item__content > .el-select > .el-input > .el-input__suffix > .el-input__suffix-inner > .el-select__caret').click()
    cy.xpath("//span[contains(text(),'Kvinnlig')][1]").first().click({force: true})
    cy.xpath("//div[contains(@class,'specific-translator')]/div[2]/input").first().type('hira@translator.dt',{force: true})
    //const filepath = 'file.img'
    // cy.xpath("//div[contains(@class,'upload--text')]/button").next('input').first().type(filepath,{force: true})
    // cy.xpath("//div[contains(@class,'upload--text')]/button").first().click()
    cy.wait(3000)
    cy.fixture('abc.PNG').then(fileContent => {
        cy.xpath("//div[contains(@class,'upload--text')]/button").next('input').first().attachFile({
            fileContent: fileContent.toString(),
            fileName: 'testPicture.png',
            mimeType: 'image/png'
        });
    });
    cy.xpath("//div[contains(@class,'specific-translator')]/div[2]/input").first().type('hira@translator.dt',{force: true})

    cy.xpath("//span[contains(text(),'Klicka')]").first().click()
    cy.xpath("//div[contains(@class,'specific-translator')]/div[2]/input").first().should('have.value','hira@translator.dt')
    cy.pause(10)
    cy.xpath("//span[text()=' Boka ']").first().click()
});


   
   
}

)