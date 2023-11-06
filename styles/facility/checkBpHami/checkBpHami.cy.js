/// <reference types="Cypress" />

import { mainInfo, mhamiCheckTarhBp, tokenBP } from "../../../info";
import { numberWithCommas } from "../../../utils";

describe("چک کردن ام اقساط با حامی", () => {
  let facilityCode;
  it("با حامی", () => {
    Cypress.on("uncaught:exception", (err, runnable) => false);
    cy.wait(500);

    cy.loginBP(mhamiCheckTarhBp.username, mainInfo.password); /// وارد کردن اطلاعات
    cy.wait(500);

    cy.visit(Cypress.env("BACK_PANEL_URL")); /// باز کردن سایت
    cy.wait(500);
    cy.get("label").contains("لیست درخواست های اقساطی").click();
    cy.wait(500);
    cy.get("label").contains("ام بازار").first().click(); ///// رقتن به لیست در خواست های اقساطی ام بازار
    cy.wait(500);
    cy.get("label")
      .contains("ام بازار")
      .first()
      .scrollIntoView({ easing: "linear" });
    cy.wait(500);
    cy.get("label")
      .contains("لیست درخواست های اقساطی ام بازار دارای حامی") ///// در خاست های اقساطی
      .click();
    cy.wait(500);
    cy.get("input[id='text-filter-column-id']")
      .click()
      .type(mhamiCheckTarhBp.code);
    cy.wait(500);
    cy.get("button")
      .contains(" اعمال فیلتر")
      .scrollIntoView({ easing: "linear" });
    cy.wait(500);
    cy.get("button").contains(" اعمال فیلتر").click(); /////// سرچ کردن در خاست مورد نظر
    cy.wait(500);
    cy.get(":nth-child(1) > a > div > .fas").click({ force: true });
    cy.wait(500);

    cy.then(() => {
      cy.request({
        method: "GET",
        url: `https://stage1api.qhami.com/facility/back-panel/admin/mbazar/${mhamiCheckTarhBp.code}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenBP}`, ////// درخاست دادن و گرفتن اطلاعات مورد نظر برای چک کردن
        },
      }).then((res) => {
        console.log(res.body);
        const fullName = res.body.fullName;
        const username = res.body.username;
        const nationalCode = res.body.nationalCode; ////// گرفتن اطلعات اولیه مثل نام کاربری و کد ملی و...
        const code = res.body.trackingCode;
        facilityCode = res.body.facilityRequestReservedId;
        const amount = res.body.amount;
        const credit = res.body.credit;
        const facilityAmount = res.body.facilityAmount;
        const entrepreneur = res.body.entrepreneur; ///////////////////// این قسمت گرفتن اطلاعات اقساط و گرفتن ایدی مورد نظر این قسط
        const prePayment = res.body.prePayment;
        const mounth = res.body.monthCount;
        const serviceCost = res.body.serviceCost;
        const parcelList = res.body.parcelList;
        console.log(fullName, username, nationalCode, code);
        cy.get(".gift-value-label").each((element, index) => {
          console.log(element, index);
          const info = [username, fullName, code, nationalCode];
          if (index < 4) {
            expect(element).to.contain.text(info[index]); //// چک کردن اطلاعت پایه کاربری
          } else if (index === 4) {
            expect(element).to.contain.text(mounth); /// چک کردن ماه
          } else if (index === 5) {
            /* -------------------------------------------------------------------------- */
            /*                             چک کردن کل قیمت ها                             */
            /* -------------------------------------------------------------------------- */
            cy.wrap(element)
              .invoke("text")
              .then((text) => {
                const newText = text.split(" ");
                expect(newText[0]).to.equal(numberWithCommas(amount));
              });
            cy.wait(500);
          } else if (index === 6) {
            cy.wrap(element)
              .invoke("text")
              .then((text) => {
                const newText = text.split(" ");
                expect(newText[0]).to.equal(numberWithCommas(facilityAmount));
              });
            cy.wait(500);
          } else if (index === 7) {
            cy.wrap(element)
              .invoke("text")
              .then((text) => {
                const newText = text.split(" ");
                expect(newText[0]).to.equal(numberWithCommas(prePayment));
              });
            cy.wait(500);
          } else if (index === 8) {
            /* -------------------------------------------------------------------------- */
            /*                             چک کردن کل قیمت ها                             */
            /* -------------------------------------------------------------------------- */
            cy.wrap(element)
              .invoke("text")
              .then((text) => {
                const newText = text.split(" ");
                expect(newText[0]).to.equal(numberWithCommas(serviceCost));
              });
          } else if (index === 10) {
            cy.wrap(element)
              .invoke("text")
              .then((text) => {
                const newText = text.split(" ");
                expect(newText[0]).to.equal(numberWithCommas(credit));
              });
          }
        });
        /* -------------------------------------------------------------------------- */
        /*                             چک کردن کل قیمت ها                             */
        /* -------------------------------------------------------------------------- */
        cy.wait(500);
        cy.get("span")
          .contains("لیست اطلاعات هسته کارآفرینی اجتماعی و اطلاعات مرسوله")
          .scrollIntoView({ easing: "linear" });
      });
      cy.wait(500);
      cy.then(() => {
        cy.request({
          method: "GET",
          url: `https://stage1api.qhami.com/mresalat/credit-balance/${facilityCode}`,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${tokenBP}`, /////  درخواست برای گرفتن اطلاعات حامی
          },
        }).then((res) => {
          console.log(res.body);
          const creditBalanceSupportListModel =
            res.body.creditBalanceSupportListModel;

          const fullNameHamian = creditBalanceSupportListModel.map(
            ///// گرقتن اسم حامیان
            (item) => item.supportModel.userModel.fullName
          );
          const priceHamian = creditBalanceSupportListModel.map(
            ///// گرفتن مبلغ هر حامی
            (item) => item.supportModel.givePriceUpTo
          );
          console.log(fullNameHamian, priceHamian);
          cy.get("span")
            .contains("لیست حامیان")
            .parent()
            .next()
            .find("td")
            .each((element, index) => {
              const hami = [
                fullNameHamian[0],
                priceHamian[0],
                fullNameHamian[1],
                priceHamian[1],
              ];
              expect(element).to.contain.text(hami[index]); ///////چک کردن حامیان و مبلغ آنها
            });
        });
      });
    });
  });
});
