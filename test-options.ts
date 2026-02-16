import {test as base} from '@playwright/test'
import { pageManager } from './page-object/pageManager'

export type testoptions = {
    globalsQaURL: string
    formLayoutPage: string
    pageManager: pageManager
}

export const test = base.extend<testoptions>({
    globalsQaURL: ['', {option: true}],
    formLayoutPage: async({page}, use) => {
        await page.goto('/')
        await page.getByText('Forms').click()
        await page.getByText('Form Layouts').click()
        await use('')
    },

    pageManager: async ({page,formLayoutPage}, use) => {
        const pm = new pageManager(page)
        await use(pm)
    }
})