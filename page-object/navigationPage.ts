import { Locator, Page } from '@playwright/test'
import { HelperBase } from './helperBase'

export class NavigationPage extends HelperBase {
    readonly formLayoutMenuItem: Locator
    readonly datepickerMenuItem: Locator
    readonly smartTablesMenuItem: Locator
    readonly toastrMenuItem: Locator
    readonly tooltipMenuItem: Locator

    constructor(page: Page) {
        super(page)
        this.formLayoutMenuItem = page.getByText("Form Layouts")
        this.datepickerMenuItem = page.getByText("Datepicker")
        this.smartTablesMenuItem = page.getByText("Smart Table")
        this.toastrMenuItem = page.getByText("Toastr")
        this.tooltipMenuItem = page.getByText("Tooltip")
    }

    async formLayoutPage() {
        this.selectGroupMenuItem('Forms')
        await this.formLayoutMenuItem.click()
        await this.waitForNumberOfSec(2)
    }

    async datePickerPage() {
        this.selectGroupMenuItem('Forms')
        await this.datepickerMenuItem.click()
        await this.waitForNumberOfSec(2)
    }

    async smartTablePage() {
        this.selectGroupMenuItem('Tables & Data')
        await this.smartTablesMenuItem.click()
        await this.waitForNumberOfSec(2)
    }

    async toastrPage() {
        this.selectGroupMenuItem('Modal & Overlays')
        await this.toastrMenuItem.click()
        await this.waitForNumberOfSec(2)
    }

    async tooltipPage() {
        this.selectGroupMenuItem('Modal & Overlays')
        await this.tooltipMenuItem.click()
        await this.waitForNumberOfSec(2)
    }

    private async selectGroupMenuItem(groupTitleItem: string) {
        const groupMenuItem = this.page.getByTitle(groupTitleItem)
        const expandedState = await groupMenuItem.getAttribute('aria-expanded')
        if (expandedState == 'false') {
            await groupMenuItem.click()
        }
        await this.waitForNumberOfSec(2)
    }



}