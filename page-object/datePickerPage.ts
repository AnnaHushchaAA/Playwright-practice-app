import { Page, expect } from '@playwright/test'
import { HelperBase } from './helperBase'

export class DatePickerPage extends HelperBase{
    constructor(page: Page){
        super(page)
    }

    async selectCommoDatePickerDateForToday (numberofdaysfromtoday: number) {
        const calendarInput = this.page.getByPlaceholder('Form Picker')
        await calendarInput.click()
        const dateToAssert = await this.selectDateInTheCalendar(numberofdaysfromtoday)
        await expect(calendarInput).toHaveValue(dateToAssert)
        await this.waitForNumberOfSec(2)
    }

    async selectPickerDatesForRangeForToday (startDayFromToday: number, endDatefromToday: number){
        const calendarInput = this.page.getByPlaceholder('Range Picker')
        await calendarInput.click()
        const dateToAssertStart = await this.selectDateInTheCalendar(startDayFromToday)
        const dateToAssertEnd = await this.selectDateInTheCalendar(endDatefromToday)
        const dateToAssert = `${dateToAssertStart} - ${dateToAssertEnd}`
        await expect(calendarInput).toHaveValue(dateToAssert)
        await this.waitForNumberOfSec(2)
    }


    private async selectDateInTheCalendar(numberofdaysfromtoday: number){ 
        let date = new Date()
        date.setDate(date.getDate() + numberofdaysfromtoday)
        const targetDay = date.getDate().toString()
        const expectedMonthShort = date.toLocaleString('En-US', { month: 'short' })
        const expectedMonthLong = date.toLocaleString('En-US', { month: 'long' })
        const expectedYear = date.getFullYear().toString()
        const dateToAssert = `${expectedMonthShort} ${targetDay}, ${expectedYear}`
        //navigate to the correct month and year
        let displayedMonthYear = await this.page.locator('nb-calendar-view-mode').textContent()
        let expectedMonthTear = ` ${expectedMonthLong} ${expectedYear} `
            
        while (!displayedMonthYear?.includes(expectedMonthTear)){
            await this.page.locator('nb-calendar-pageable-navigation [data-name="chevron-right"]').click()
            displayedMonthYear = await this.page.locator('nb-calendar-view-mode').textContent()
        }   
        await this.page.locator('.day-cell.ng-star-inserted').getByText(targetDay).click()
        return dateToAssert
    
    }



}