import {test, expect} from '@playwright/test';
import { get } from 'http';
test.beforeEach(async ({page}) => {
    await page.goto('/');
});
test.beforeEach('Navigate to Forms', async ({page}) => {
        await page.getByText("Forms").click();
    });
test.beforeEach('Navigate to Form Layouts', async ({page}) => {

        await page.getByText("Form Layouts").click();
});

test('Locator syntax rules', async ({page}) => {
    //by tag name
    await page.locator('input').first().click();
    //by id
    await page.locator('#inputEmail1').click();
    //by class name
    page.locator('.shape-rectangle');
    //by attribute
    page.locator('[placeholder="Email"]');
    //by entire class value
    page.locator('[class="input-full-width size-medium shape-rectangle nb-transition"]');
    //combine different salactors
    page.locator('input[placeholder="Email"]');
    //by xpath (NOT RECOMMENDED)
    page.locator('//input[@id="inputEmail1"]');
    //by patyial text match
    page.locator(':text("Using")');
    //by exact text match
    page.locator(':text("Using the Grid")');
});

test("Using facing locators", async ({page}) => {
    await page.getByRole('textbox', {name: 'Email'}).first().click();
    await page.getByRole('button', {name: 'Sign in'}).first().click();
    await page.getByLabel('Email').first().click();
    await page.getByPlaceholder('Jane Doe').first().click();
    //await page.getByTitle('IoT Dashboard').first().click();
    await page.getByTestId('signIn').click();
});

test('Locating child elements', async({page}) =>{
    await page.locator ('nb-card nb-radio :text-is("Option 1")').click();
    await page.locator('nb-card').locator('nb-radio').locator(':text-is("Option 2")').click();
    await page.locator('nb-card').getByRole('button', {name: 'Sign in'}).first().click();
    await page.locator('nb-card').nth(3).getByRole('button').click();  ///No Recommended
})

test('Locating parent elements', async({page}) =>{
    //await page.locator('nb-card', {hasText: 'Using the Grid'}).getByRole('textbox', {name: 'Email'}).click();
    //await page.locator('nb-card', {has: page.locator('#inputEmail1')}).getByRole('textbox', {name: 'Email'}).click();

    await page.locator('nb-card').filter({hasText: 'Basic form'}).getByRole('textbox', {name: 'Email'}).click();
    await page.locator('nb-card').filter({has: page.locator('.status-danger')}).getByRole('textbox',{name: 'Password'}).click();
    await page.locator('nb-card').filter({has: page.locator('nb-checkbox')}).filter({hasText: 'Sign in'})
        .getByRole('textbox', {name: 'Email'}).click();

    await page.locator(':text-is("Using the Grid")').locator('..').getByRole('textbox', {name: 'Email'}).click();
})

test('Reusind locators', async({page}) =>{
    const basicForm = page.locator('nb-card').filter({hasText: 'Basic form'});
    const emailInput = basicForm.getByRole('textbox', {name: 'Email'});

    await emailInput.fill('test@test.com');
    await basicForm.getByRole('textbox', {name: 'Password'}).fill('Welcome123');
    await basicForm.locator('nb-checkbox').click();
    await basicForm.getByRole('button').click();

    await expect (emailInput).toHaveValue('test@test.com');
});

test('Extracting values', async({page}) =>{
    //single text value extraction
    const basicForm = page.locator('nb-card').filter({hasText: 'Basic form'});
    const buttonText = await basicForm.getByRole('button').textContent();
    expect(buttonText).toEqual('Submit');

    //multiple values
    const allRadioButtons = await page.locator('nb-radio').allTextContents();
    expect(allRadioButtons).toContain('Option 1');

    //input value
    const emailField = basicForm.getByRole('textbox', {name: 'Email'});
    await emailField.fill('test@test.com');
    const emailValue = await emailField.inputValue();
    expect(emailValue).toEqual('test@test.com');

    const placeholderValue = await emailField.getAttribute('placeholder');
    expect(placeholderValue).toEqual('Email');
});

test ('Assertions', async ({page}) =>{

    const basicFormButton = page.locator('nb-card').filter({hasText: 'Basic form'}).locator('button');
    
    //General assertions
    const value = 5;
    expect(value).toBeGreaterThan(3);
    expect(value).toBeLessThan(10);
    expect(value).toBe(5);
    expect(value).not.toBe(0);

    const stringValue = 'Playwright Test';
    expect(stringValue).toContain('Test');
    expect(stringValue).toMatch(/^[A-Z][a-z]+ [A-Z][a-z]+$/);

    const textToCheck = await basicFormButton.textContent();
    expect(textToCheck).toEqual('Submit');

    //Locator assertions(will always wait up to 5 seconds by default)
    await expect(basicFormButton).toBeVisible();
    await expect(basicFormButton).toBeEnabled();
    await expect(basicFormButton).toHaveText('Submit');
    await expect(basicFormButton).toHaveCount(1);

    //Soft assertions
    await expect.soft(basicFormButton).toHaveText('Submit');
    await basicFormButton.click();

});
/*test('the first test', async ({page}) => {

   await page.getByText("Form Layouts").click();
});

test('the second test', async ({page}) => {

   await page.getByText("Datepicker").click();
})*/


/*test.describe('The third test suite', () => {
    test.beforeEach(async ({page}) => {
        await page.getByText("Forms").click();
    });

    test('Navigate to Form Layouts', async ({page}) => {

        await page.getByText("Form Layouts").click();
    });

    test('Navigate to Datepicker', async ({page}) => {

        await page.getByText("Datepicker").click();
    })});

test.describe('The fourth test suite', () => {
    test.beforeEach(async ({page}) => {
        await page.getByText("Tables & Data").click();
    });

    test('Navigate to Smart table', async ({page}) => {

        await page.getByText("Smart table").click();
    });

    test('Navigate to Tree grid', async ({page}) => {

        await page.getByText("Tree grid").click();
    })});*/
