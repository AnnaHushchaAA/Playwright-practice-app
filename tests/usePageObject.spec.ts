import { test } from '@playwright/test'
import { pageManager } from '../page-object/pageManager'
import { faker } from '@faker-js/faker'

test.beforeEach(async ({page}) => {
    await page.goto('/');
});


test ('Navigate to form page @regression', async({page}) => {
    const pm = new pageManager(page)
    await pm.navigationTo().formLayoutPage()
    await pm.navigationTo().datePickerPage()
    await pm.navigationTo().formLayoutPage()
    await pm.navigationTo().smartTablePage()
    await pm.navigationTo().toastrPage()
    await pm.navigationTo().tooltipPage()
})

test("paramethrized methods", async({page}) => {
    const pm = new pageManager(page)
    const randomFullName = faker.person.fullName()
    const randomEmail = `${randomFullName.replace(' ', '')}${faker.number.int(100)}@test.com`

    await pm.navigationTo().formLayoutPage()
    await pm.onFormLayoutPage().submitUsingTheGridFormLayoutWithCredentialsAndSelectOption(process.env.USERNAME, process.env.PASSWORD, 'Option 1')
    await page.screenshot({path: './screenshots/FormLayout.png'})
    await pm.onFormLayoutPage().sybmitInlineFormWithNameandCheckBox(randomFullName, randomEmail, false)
    await page.locator('nb-card', {hasText: "Inline Form"}).screenshot({path: './screenshots/InlineForm.png'})
    // await pm.navigationTo().datePickerPage()
    // await pm.datePickerPage().selectCommoDatePickerDateForToday(7)
    // await pm.datePickerPage().selectPickerDatesForRangeForToday(7,8)
})

