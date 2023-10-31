/// <reference types="Cypress" />
import { password, checkMhami } from "../../../utils";

describe("ورود به ام حامی", () => {

  let natioanalCode;

  /* -------------------------------------------------------------------------- */
  /*        کامند برای عوض کردن مقادیر  value  که input  دارند می باشد که       */
  /* -------------------------------------------------------------------------- */

  Cypress.Commands.add("inputChange", (input, value) => {
    const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
      window.HTMLInputElement.prototype,
      "value"
    ).set;

    const changeInputValue = (inputToChange) => (newValue) => {
      nativeInputValueSetter.call(inputToChange[0], newValue);
      inputToChange[0].dispatchEvent(
        new Event("input", {
          newValue,
          bubbles: true,
          composed: true,
        })
      );
    };

    return cy.get(input).then((input) => {
      changeInputValue(input)(value);
    });
  });

  it("ام حامی", () => {
    Cypress.on("uncaught:exception", (err, runnable) => false);
    cy.wait(500);

    cy.login(checkMhami.username, password); /// وارد کردن اطلاعات
    cy.wait(500);

    cy.visit(Cypress.env("M_RESALAT_URL")); /// باز کردن سایت
    cy.wait(500);

    cy.get("#profile").click({ force: true });
    cy.wait(100);

    cy.get("label").contains("ام حامی").scrollIntoView({ easing: "linear" });
    cy.wait(1000);

    cy.get(
      ':nth-child(1) > [style="display: flex; text-align: center;"] > [style="display: flex; width: 100%; padding: 2% 1%; border-radius: 10px; align-items: center; justify-content: center; margin: auto; flex-direction: column;"] > :nth-child(3)'
    ).click({ force: true });
    cy.wait(1000);
    // cy.pause()

    cy.then(() => {
      cy.getAllLocalStorage()
        .then((result) => {
            console.log(result);
          const getNationalCode = JSON.parse(result["https://stage1.qhami.com"].userInfo);

          natioanalCode = getNationalCode.nationalCode
          console.log(natioanalCode);
        })
        .then(() => {
          cy.get("label").contains("ام حامی").click({ force: true }); //// رقتن به بخش ام حامی
          cy.wait(500);

          cy.get("#form1").click().type("طرح حامی9"); /// سرج کردن یکی از طرح ها
          cy.wait(700);

          cy.get("p")
            .contains("لیست طرح ها")
            .scrollIntoView({ easing: "linear" });
          cy.wait(500);

          cy.get(".btn > .sc-eCQiwC").click({ force: true }); //// سرج کردن
          cy.wait(500);

          cy.get(".nav-link").click({ force: true }); /// انتخاب طرح
          cy.wait(750);

          cy.get(".radioo > :nth-child(1) > .sc-gKkivs")
            .should("be.visible")
            .click(); /// انتخاب کردن قیمت
          cy.wait(750);

          cy.get("label").contains("همیاری اقساطی").click({ force: true }); /// انتخاب کردن بخش اقساطی
          cy.wait(750);

          cy.get("button").contains("همیاری اقساطی").click({ force: true }); //// کلیک رو دکمه
          cy.wait(500);

          cy.get("input[inputmode='numeric']").clear(); /// پاک کردن اطلاعات
          cy.wait(500);

          cy.get("span")
            .contains(" ام اقساط")
            .scrollIntoView({ easing: "linear" });
          cy.wait(750);

          cy.get("input[inputmode='numeric']").type("10000"); /// وارد کردن قیمت
          cy.wait(500);

          cy.get("input[max='84']").then((input) => {
            ////// عوض کردن مقدار ماهانه با استفاده از یه کامند که  در ابتدای این قایل نوشته شده اسنت نوشته شده است
            cy.inputChange(input, "54");
          });

          cy.wait(500);

          cy.get("button").contains("ثبت درخواست").click({ force: true }); //// ثبت کردن درخواست
          cy.wait(750);

          cy.get("label")
            .contains(
              "بدینوسیله اعلام می دارم که شرایط فوق را مطالعه کرده و همه موارد مورد پذیرش اینجانب می باشد."
            )
            .click({ force: true }); /// پذیرش قوانین
          cy.wait(500);

          cy.get("button")
            .contains("موافقت و پرداخت بیعانه")
            .click({ force: true }); //// کلیک بر روی دکمه
          cy.wait(500);

          cy.get(".css-tlfecz-indicatorContainer").click({ force: true }); //// باز کردن نوع پرداختی
          cy.wait(500);

          cy.get(".css-11unzgr").then(($el) => {
            //// انتخاب یکی از موارد  برای پرداخت
            if ($el.find("#react-select-2-option-0").length > 0) {
              cy.get("#react-select-2-option-0").click({ force: true });
            } else {
              return false;
            }
          });
          cy.wait(500);

          cy.get("u").contains("مشاهده قوانین و مقررات").click();
          cy.wait(500);
          ///////////////// تایید قوانین
          cy.get("button")
            .contains("قوانین و مقرارت را مطالعه کرده و میپذیرم")
            .click();
          cy.wait(500);

          cy.get("button").contains("تائید و پرداخت").click();
          cy.wait(500);
          // cy.pause();

          cy.log(natioanalCode);
          console.log(natioanalCode);

          cy.get("input[class='form-control directionLtr removeArrowInput']")
            .click()
            .type(natioanalCode);
          cy.wait(500);

          cy.get("button").contains(" دریافت کد تایید").click()
        });
    });
  });
});
