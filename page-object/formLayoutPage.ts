import { Page } from '@playwright/test'
import { HelperBase } from './helperBase'

export class FormLayoutPage extends HelperBase{
    constructor(page: Page){
        super(page)
    }
    async submitUsingTheGridFormLayoutWithCredentialsAndSelectOption(email: string, password: string, optionText: string) {
        const usingTheGridForm = this.page.locator('nb-card', {hasText: 'Using the Grid'})
        await usingTheGridForm.getByRole('textbox', {name: 'Email'}).fill(email)
        await usingTheGridForm.getByRole('textbox', {name: 'Password'}).fill(password)
        await usingTheGridForm.getByRole('radio', {name: optionText}).check({force: true});
        await usingTheGridForm.getByText('Sign In').click()
        await this.waitForNumberOfSec(2)
    }

    /**
     * This method is filling the form with user parameters.
     * @param name  Name should be a full(Name and surname)
     * @param email 
     * @param checkbox 
     */
    async sybmitInlineFormWithNameandCheckBox(name: string, email: string, checkbox: boolean){
        const inlineForm = this.page.locator('nb-card', {hasText: 'Inline Form'})
        await inlineForm.getByRole('textbox', {name: 'Jane Doe'}).fill(name)
        await inlineForm.getByRole('textbox', {name: 'Email'}).fill(email)
        if (checkbox){
           await inlineForm.getByRole('checkbox').check({force: true})
        }
        await inlineForm.getByText("Submit").click()

    }

}
