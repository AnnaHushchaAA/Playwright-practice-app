import {test, expect} from '@playwright/test'

test('input fields', async ({page}, testinfo) => {
        await page.goto('/');
        if(testinfo.project.name == 'Mobile'){
            await page.locator('.sidebar-toggle').click()
        }
        await page.getByText("Forms").click();
        await page.getByText("Form Layouts").click();
         if(testinfo.project.name == 'Mobile'){
            await page.locator('.sidebar-toggle').click()
        }
        const usingthegridEmailInput = page.locator('nb-card', {hasText: 'Using the Grid'}).getByRole('textbox', {name: 'Email'});
        await usingthegridEmailInput.fill('test@test.com');
        await usingthegridEmailInput.clear();
        await usingthegridEmailInput.pressSequentially('test2@test.com')
    });