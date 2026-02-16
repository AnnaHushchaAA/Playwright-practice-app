import { test } from '../test-options'
import { faker } from '@faker-js/faker'


test("paramethrized methods @regression", async({pageManager, formLayoutPage}) => {  
    const randomFullName = faker.person.fullName()
    const randomEmail = `${randomFullName.replace(' ', '')}${faker.number.int(100)}@test.com`
    await pageManager.onFormLayoutPage().submitUsingTheGridFormLayoutWithCredentialsAndSelectOption(process.env.USERNAME, process.env.PASSWORD, 'Option 1')
    await pageManager.onFormLayoutPage().sybmitInlineFormWithNameandCheckBox(randomFullName, randomEmail, false)
})

