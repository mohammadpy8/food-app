/// <reference types="Cypress" />

import { mainInfo, mhamiCheckTarhWithoutHamiBp, tokenBP } from "../../../info";
import { checkCurrncy, numberWithCommas } from "../../../utils";

describe("چک کردن ام اقساط بدون حامی", () => {
  let facilityCode;
  it("بدون حامی", () => {
    Cypress.on("uncaught:exception", (err, runnable) => false);
    cy.wait(500);

    cy.loginBP(mhamiCheckTarhWithoutHamiBp.username, mainInfo.password); /// وارد کردن اطلاعات
    cy.wait(500);

    cy.visit(Cypress.env("BACK_PANEL_URL")); /// باز کردن سایت
    cy.wait(500);
    cy.get("label").contains("لیست درخواست های اقساطی").click();
    cy.wait(500);
    cy.get("label").contains("ام بازار").first().click({ force: true }); ///// رقتن به لیست در خواست های اقساطی ام بازار
    cy.wait(500);
    cy.get("label")
      .contains("ام بازار")
      .first()
      .scrollIntoView({ easing: "linear" });
    cy.wait(500);
    cy.get("label")
      .contains("لیست درخواست های اقساطی ام بازاربدون حامی") ///// در خاست های اقساطی
      .click();
    cy.wait(500);
    cy.get("input[id='text-filter-column-id']")
      .click()
      .type(mhamiCheckTarhWithoutHamiBp.code);
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
        url: `https://stage1api.qhami.com/facility/back-panel/admin/mbazar/${mhamiCheckTarhWithoutHamiBp.code}`,
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
                return checkCurrncy(text);
              });
            cy.wait(500);
          } else if (index === 6) {
            cy.wrap(element)
              .invoke("text")
              .then((text) => {
                const newText = text.split(" ");
                expect(newText[0]).to.equal(numberWithCommas(facilityAmount));
                return checkCurrncy(text);
              });
            cy.wait(500);
          } else if (index === 7) {
            cy.wrap(element)
              .invoke("text")
              .then((text) => {
                const newText = text.split(" ");
                expect(newText[0]).to.equal(numberWithCommas(prePayment));
                return checkCurrncy(text);
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
                return checkCurrncy(text);
              });
          } else if (index === 10) {
            cy.wrap(element)
              .invoke("text")
              .then((text) => {
                const newText = text.split(" ");
                expect(newText[0]).to.equal(numberWithCommas(credit));
                return checkCurrncy(text);
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
          cy.wait(500);
          cy.get("span")
            .contains("لیست حامیان")
            .parent()
            .next()
            .find(".rc-table-placeholder")
            .invoke("text")
            .then((text) => {
              const checkText = expect(text).to.equal(
                mhamiCheckTarhWithoutHamiBp.tableHamianText
              );
              console.log(checkText);
              if (
                fullNameHamian.length === 0 &&
                priceHamian.length === 0 &&
                checkText
              ) {
                cy.log("حامی وجود ندارد و درست میباشد."); ////// چک کردن اینکه حامی وجود ندارد
              }
            });
        });
      });
    });
  });
});
