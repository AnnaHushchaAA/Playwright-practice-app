import {test, expect} from '@playwright/test';

test.beforeEach(async ({page}) => {
    await page.goto('/');
    //await page.getByText("Form Layouts").click();
});

test.describe('Form layout page', () => {
    //test.describe.configure({retries: 2})
    test.beforeEach(async ({page}) => {
        await page.getByText("Forms").click();
        await page.getByText("Form Layouts").click();
    });

    test('input fields', async ({page}) => {
        const usingthegridEmailInput = page.locator('nb-card', {hasText: 'Using the Grid'}).getByRole('textbox', {name: 'Email'});
        await usingthegridEmailInput.fill('test@test.com');
        await usingthegridEmailInput.clear();
        await usingthegridEmailInput.pressSequentially('test2@test.com', {delay: 300});

        //generic assertion
        const inputValue = await usingthegridEmailInput.inputValue();
        expect (inputValue).toBe('test2@test.com');

        //locator assertion
        await expect (usingthegridEmailInput).toHaveValue('test2@test.com');

    });

    test('radiio buttons', async ({page}) => {
        const usingTheGridForm = page.locator('nb-card', {hasText: 'Using the Grid'});
        //two varians of selecting radio buttons
        //await usingTheGridForm.getByLabel('Option 1').check({force: true});
        await usingTheGridForm.getByRole('radio', {name: 'Option 1'}).check({force: true});

        //Generic assertion
        const isChecked = await usingTheGridForm.getByRole('radio', {name: 'Option 1'}).isChecked();
        expect (isChecked).toBeTruthy();

        //Locator assertion
        await expect (usingTheGridForm.getByRole('radio', {name: 'Option 1'})).toBeChecked();

        await usingTheGridForm.getByRole('radio', {name: 'Option 2'}).check({force: true});
        //Negative generic assertion
        expect (await usingTheGridForm.getByRole('radio', {name: 'Option 1'}).isChecked()).toBeFalsy();
        expect (await usingTheGridForm.getByRole('radio', {name: 'Option 2'}).isChecked()).toBeTruthy();
        //Negative locator assertion
        //await expect ( usingTheGridForm.getByRole('radio', {name: 'Option 1'})).not.toBeChecked();

    })

})

test('Checkboxes', async ({page}) => {
    await page.getByText("Modal & Overlays").click();
    await page.getByText("Toastr").click();

    await page.getByRole('checkbox', {name: "Hide on click"}).uncheck({force: true});
    await page.getByRole('checkbox', {name: "Prevent arising of duplicate toast"}).check({force: true});

    const allCheckBoxes = page.getByRole('checkbox');
    const checkBoxCount = await allCheckBoxes.count();
    expect (checkBoxCount).toBe(3);

    for (const box of await allCheckBoxes.all()){
        await box.check({force: true});
        expect (await box.isChecked()).toBeTruthy();
    }
})

test('Dropdown lists', async ({page}) => {
    const dropDownmenu = page.locator('ngx-header nb-select');
    await dropDownmenu.click();

    page.getByRole('list') //List can be used when the list has a UL tag
    page.getByRole('listitem') //can be used when the list has LI tags

    //const optionList = page.getByRole('list').locator('nb-option');
    const optionList = page.locator('nb-option-list nb-option');
    await expect (optionList).toHaveText(["Light", "Dark", "Cosmic", "Corporate"])

    await optionList.filter({hasText: 'Cosmic'}).click();
   // await optionList.nth(2).click();
    await expect (dropDownmenu).toHaveText('Cosmic');
    const header = page.locator('nb-layout-header');
    await expect (header).toHaveCSS('background-color', 'rgb(50, 50, 89)');

    const colors = {
        "Light": "rgb(255, 255, 255)",
        "Dark": "rgb(34, 43, 69)",
        "Cosmic": "rgb(50, 50, 89)",
        "Corporate": "rgb(255, 255, 255)"
    };

    await dropDownmenu.click();
    for (const color in colors){
       await optionList.filter({hasText: color}).click();
        await expect (header).toHaveCSS('background-color', colors[color]);
        if (color !== 'Corporate') {
            await dropDownmenu.click();
        }
    }
})

test('tooltips', async ({page}) => {
    await page.getByText("Modal & Overlays").click();
    await page.getByText("Tooltip").click();

    //const tooltipCard = page.locator('nb-card-body button').getByText('Top');
    //await tooltipCard.hover();
    const tooltipCard = page.locator('nb-card', {hasText: 'Tooltip Placements'});
    await tooltipCard.getByRole('button', {name: 'Top'}).hover();
    //await localStorage.getbyRole('tooltip') //only if the tooltip has role="tooltip" attribute
    const tooltipValue = await page.locator('nb-tooltip').textContent();
    await expect (tooltipValue).toEqual('This is a tooltip');
});

test('dialog nox', async ({page}) => {
    await page.getByText("Tables & Data").click();
    await page.getByText("Smart Table").click();

    page.on('dialog', async dialog => {
        expect(dialog.message()).toContain('Are you sure you want to delete?');
        await dialog.accept();
    })
    await page.getByRole('table').locator('tr', {hasText: "mdo@gmail.com"}).locator('.nb-trash').click();
    await expect (page.locator('table tr').first()).not.toHaveText('mdo@gmail.com');
})

test('web tables', async ({page}) => {
    await page.getByText("Tables & Data").click();
    await page.getByText("Smart Table").click();

    //how to get the row by any text in this raw

    const targetRole = page.getByRole('row', {name: "twitter@outlook.com"});
    await targetRole.locator('.nb-edit').click();
    await page.locator('input-editor').getByPlaceholder('Age').clear();
    await page.locator('input-editor').getByPlaceholder('Age').fill('25');
    await targetRole.locator('.nb-checkmark').click();

    //get the row based on the value in a specific column
    await page.locator('.ng2-smart-pagination-nav').getByText('2').click();
    const targetRow = page.getByRole('row', {name: '11'}).filter({has: page.locator('td').nth(1).getByText('11')});
    await targetRow.locator('.nb-edit').click();
    await page.locator('input-editor').getByPlaceholder('E-mail').clear();
    await page.locator('input-editor').getByPlaceholder('E-mail').fill('test@test@ua');
    await page.locator('.nb-checkmark').click();
    expect (await targetRow.locator('td').nth(5).getByText('test@test@ua')).toBeTruthy();

    //Test the filter of the table
    const ages = ['20', '30', '40', '200']

    for (const age of ages){
        await page.locator('input-filter').getByPlaceholder('Age').clear();
        await page.locator('input-filter').getByPlaceholder('Age').fill(age); 
        await page.waitForTimeout(500); //wait for the table to be updated
        const ageRaws = page.locator('tbody tr');
            for (let raw of await ageRaws.all()){
                if (age === '200'){
                    const noDataFound = await page.locator('tbody').getByText('No data found');
                    expect (noDataFound).toBeVisible();
                    await page.screenshot({path: './screenshots/webTable200.png'})
                    continue;
                }
                const cellValue = await raw.locator('td').last().textContent();
                expect (cellValue).toBe(age);

            }
    }
})

test ('data pickers', async ({page}) => {
    await page.getByText("Forms").click();
    await page.getByText("Datepicker").click();

    const calendarInput = page.getByPlaceholder('Form Picker');
    await calendarInput.click();

    let date = new Date();
    date.setDate(date.getDate() + 363);
    const targetDay = date.getDate().toString();
    const expectedMonthShort = date.toLocaleString('En-US', { month: 'short' });
    const expectedMonthLong = date.toLocaleString('En-US', { month: 'long' });
    const expectedYear = date.getFullYear().toString();
    const dateToAssert = `${expectedMonthShort} ${targetDay}, ${expectedYear}`;
    
    //navigate to the correct month and year
    let displayedMonthYear = await page.locator('nb-calendar-view-mode').textContent();
    let expectedMonthTear = ` ${expectedMonthLong} ${expectedYear} `;
    
    while (!displayedMonthYear?.includes(expectedMonthTear)){
        await page.locator('nb-calendar-pageable-navigation [data-name="chevron-right"]').click();
        displayedMonthYear = await page.locator('nb-calendar-view-mode').textContent();
    }
    
    await page.locator('[class="day-cell ng-star-inserted"]').getByText(targetDay,{exact: true}).click();
    await expect(calendarInput).toHaveValue(dateToAssert);

})
test ('sliders', async ({page}) => {
    //Update attribute
    /*const tempGauge = page.locator ('[tabtitle="Temperature"] ngx-temperature-dragger circle');
    await tempGauge.evaluate( node => {
        node.setAttribute('cx', '232.630');
        node.setAttribute('cy', '232.630');
    })
    await tempGauge.click();*/

    //Mouse movement
    const tempBox = page.locator ('[tabtitle="Temperature"] ngx-temperature-dragger');
    await tempBox.scrollIntoViewIfNeeded();
    const box = await tempBox.boundingBox();
    const x = box.x + box.width / 2;
    const y = box.y + box.height / 2;
    await page.mouse.move(x, y)
    await page.mouse.down(); //simulates left mouse button press
    await page.mouse.move(x + 100, y); //move to new position right by 100 pixels
    await page.mouse.move(x + 100, y + 100); //move to new position down by 50 pixels
    await page.mouse.up(); //simulates left mouse button release
    await expect (tempBox).toContainText('30');
})