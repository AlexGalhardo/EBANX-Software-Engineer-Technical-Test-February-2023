import { AccountEntity } from "../../src/entities/AccountEntity";

describe("testing AccountEntity", () => {
    const accountEntityOrigin = new AccountEntity('100', 10)
    const accountEntityDestination = new AccountEntity('300', 0)

    it("it should return correct id and balance", async () => {
        expect(accountEntityOrigin.getId).toBe('100');
        expect(accountEntityOrigin.getBalance).toBe(10);
        expect(accountEntityDestination.getId).toBe('300');
        expect(accountEntityDestination.getBalance).toBe(0);
    });

    it("it should deposit correctly in each AccountEntity", async () => {
        accountEntityOrigin.depositBalance(10)
        accountEntityOrigin.depositBalance(35)

        accountEntityDestination.depositBalance(5)
        accountEntityDestination.depositBalance(18)

        expect(accountEntityOrigin.getBalance).toBe(55);
        expect(accountEntityDestination.getBalance).toBe(23);
    });

    it("it should withdraw from balance correctly in each AccountEntity", async () => {
        accountEntityOrigin.withdrawBalance(25)
        accountEntityOrigin.withdrawBalance(30)

        accountEntityDestination.withdrawBalance(13)
        accountEntityDestination.withdrawBalance(8)

        expect(accountEntityOrigin.getBalance).toBe(0);
        expect(accountEntityDestination.getBalance).toBe(2);
    });

    it("it should transfer from accountId 100 balance 80 correctly to accountId 300", async () => {
        accountEntityOrigin.depositBalance(100)

        if (accountEntityOrigin.withdrawBalance(80)) {
            if (accountEntityDestination.depositBalance(80)) {
                expect(accountEntityOrigin.getBalance).toBe(20);
                expect(accountEntityDestination.getBalance).toBe(82);
            }
        }
    });
});
