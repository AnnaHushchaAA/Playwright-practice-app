import {test, expect} from '@playwright/test';

test.beforeEach(async ({page},testinfo) => {
    await page.goto(process.env.URL);
    await page.getByText('Button Triggering AJAX Request').click();
    testinfo.setTimeout(30000);
});
test.skip('Auto waiting', async ({page}) => {
    const successButton= page.locator('.bg-success');

    //await successButton.click();

    //const text = await successButton.textContent();
    //await successButton.waitFor({ state: "attached" });
    //const text = await successButton.allTextContents();
    //expect (text).toContain('Data loaded with AJAX get request.');

    await expect(successButton).toHaveText('Data loaded with AJAX get request.', { timeout: 20000 });
})

test('alternative waits', async ({page}) => {
    const successButton= page.locator('.bg-success');
    
    //__wait for element
    //await page.waitForSelector('.bg-success');
    
    //__wait for a perticular response
    await page.waitForResponse('http://uitestingplayground.com/ajaxdata');

    //__wait for network call to be completed(NOT RECOMMENDED)
    //await page.waitForLoadState('networkidle');


    const text = await successButton.allTextContents();
    expect (text).toContain('Data loaded with AJAX get request.');
})

test.skip('timeouts', async ({page}) => {
    //test.setTimeout(10000);
    test.slow(); //increases timeout for this particular test x3
    const successButton= page.locator('.bg-success');

    //setting timeout for a particular action
    //await successButton.click({ timeout: 10000 });

    await successButton.click({ timeout: 16000 });
});
