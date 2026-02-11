import { Page } from '@playwright/test'

export class HelperBase{
    readonly page: Page
    constructor(page: Page){
        this.page = page}

    async waitForNumberOfSec(numberOfSec: number){
        await this.page.waitForTimeout(numberOfSec * 1000)
    }

}