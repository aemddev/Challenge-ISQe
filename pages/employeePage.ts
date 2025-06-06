import { type Page, type Locator } from "@playwright/test";

export class EmployeePage {
    private readonly page: Page 
    private readonly pimButton: Locator
    private readonly addEmployeeButton: Locator
    private readonly employeeListButton: Locator
    private readonly firstNameInput: Locator
    private readonly lastNameInput: Locator
    private readonly employeeIdInput: Locator
    private readonly saveButton: Locator
    private readonly savePersonalDetailsButton: Locator
    private readonly searchButton: Locator
    private readonly nationalitySelect: Locator
    readonly dateOfBithInput: Locator

    constructor(page: Page){
        this.page = page;
        this.pimButton = this.page.getByRole('link', { name: 'PIM' });
        this.addEmployeeButton = this.page.getByRole('link', { name: 'Add Employee' });
        this.employeeListButton = this.page.getByRole('link', { name: 'Employee List' });
        this.firstNameInput = this.page.getByRole('textbox', { name: 'First Name' });
        this.lastNameInput = this.page.getByRole('textbox', { name: 'Last Name' });
        this.employeeIdInput = this.page.locator('//label[contains(text(),"Employee Id")]/parent::div/parent::div//input');
        this.saveButton = this.page.getByRole('button', { name: 'Save' });
        this.savePersonalDetailsButton = this.page.locator('//h6[text()="Personal Details"]/parent::div').getByRole('button', { name: 'Save' });
        this.searchButton = this.page.getByRole('button', { name: 'Search' });
        this.nationalitySelect = this.page.locator('//label[contains(text(),"Nationality")]/parent::div/parent::div//i');
        this.dateOfBithInput = this.page.locator('//label[contains(text(),"Date of Birth")]/parent::div/parent::div').getByRole('textbox', { name: 'yyyy-dd-mm' });
    }

    async goToaddEmployee() {
        await this.page.goto('/');
        await this.pimButton.click();
        await this.addEmployeeButton.click();
    }
    
    async goToEmployeeList() {
        await this.page.goto('/');
        await this.pimButton.click();
        await this.employeeListButton.click();
    }

    async addNewEmployee({ firstName, lastName, employeeId }: { firstName: string, lastName: string, employeeId: number }) {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.employeeIdInput.fill(`${employeeId}`);
        await this.saveButton.click();
    }

    async searchEmployeeById({ employeeId }: { employeeId: number }) {
        await this.employeeIdInput.fill(`${employeeId}`);
        await this.searchButton.click();
    }

    async goToEditEmployeeProfileById({ employeeId }: { employeeId: number }) {
        await this.goToEmployeeList();
        await this.searchEmployeeById({ employeeId });
        await this.page.locator(`//div[contains(text(),"${employeeId}")]/parent::div/parent::div//button[1]`).click();
    }

    async updateEmployee({ nationality, dateOfBirth }: { nationality: string; dateOfBirth: string}) {
        await this.nationalitySelect.click();
        await this.page.getByText(nationality).click();
        await this.dateOfBithInput.fill(dateOfBirth);
        await this.savePersonalDetailsButton.click();
    }
}
