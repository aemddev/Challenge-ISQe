import { test, expect, Browser, type Page } from '@playwright/test'
import { EmployeePage } from '../pages/employeePage'
import { firstName, lastName, employeeId, nationality, dateOfBirth } from '../config/userConfig'


let page: Page
let employeePage: EmployeePage


test.describe.serial('Add and update new employee',() => {
    test('Add New Employee', async ({ page }) => {
        employeePage = new EmployeePage(page);
        await test.step('Given Navigate to PIM > Add Employee', async () => { 
            await employeePage.goToaddEmployee();
        })
        await test.step(`When Add a new employee with first/last name/employee id`, async() => {
            await employeePage.addNewEmployee({ firstName, lastName, employeeId });
        })
        await test.step('Then Success message appears and redirection to Employee Personal Details page', async () => {
            await expect(page.getByText('Successfully Saved')).toBeVisible();
            await expect(page.getByRole('heading', { name: `${firstName} ${lastName}` })).toBeVisible();
            await expect(page.getByRole('heading', { name: `Personal Details` })).toBeVisible();
        })
    })

    test('Search for Employee', async ({ page }) => {
        employeePage = new EmployeePage(page);
        await test.step('Given Navigate to PIM > Employee List', async () => { 
            await employeePage.goToEmployeeList();
        })
        await test.step(`When Search for the Employee created (by ID)`, async() => {
            await employeePage.searchEmployeeById({ employeeId });
        })
        await test.step('Then the Employee is present on list and correct results appears', async () => {
            await expect(page.getByRole('cell', { name: `${employeeId}` })).toBeVisible();
            await expect(page.getByRole('cell', { name: `${firstName}` })).toBeVisible();
            await expect(page.getByRole('cell', { name: `${lastName}` })).toBeVisible();
        })
    })

    test('Update Personal Details', async ({ page }) => {
        employeePage = new EmployeePage(page);
        await test.step('Given Enter into edit employee profile', async () => { 
            await employeePage.goToEditEmployeeProfileById({ employeeId });
        })
        await test.step(`When Update fields Nationality, Date of Birth and click on save button`, async() => {
            await employeePage.updateEmployee({ nationality, dateOfBirth });
        })
        await test.step('Then the change are saved and displayed', async () => {
            await expect(page.getByText('Successfully Updated')).toBeVisible();
            await page.reload();
            await expect(page.getByText(`${nationality}`)).toBeVisible();
            expect(await employeePage.dateOfBithInput.inputValue()).toContain(dateOfBirth);
        })
    })
})