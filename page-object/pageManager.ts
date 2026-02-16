import { Page } from '@playwright/test'
import { NavigationPage } from '../page-object/navigationPage'
import { FormLayoutPage } from '../page-object/formLayoutPage'
import { DatePickerPage } from '../page-object/datePickerPage'

export class pageManager {

    private readonly page: Page
    private readonly NavigationPage: NavigationPage
    private readonly FormLayoutPage: FormLayoutPage
    private readonly DatePickerPage: DatePickerPage
    constructor(page:Page) {
        this.page = page
        this.NavigationPage = new NavigationPage(this.page)
        this.FormLayoutPage = new FormLayoutPage(this.page)
        this.DatePickerPage = new DatePickerPage(this.page)
    }
    navigationTo() {
        return this.NavigationPage
    }
    onFormLayoutPage() { 
        return this.FormLayoutPage
    }
    datePickerPage() {
        return this.DatePickerPage
    }
}