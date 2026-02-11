import {test as base} from '@playwright/test'

export type testoptions = {
    globalsQaURL: string
}

export const test = base.extend<testoptions>({
    globalsQaURL: ['', {option: true}]
})