/// <reference types="Cypress" />

import {checkUserMhami, password, bodyCheckTarh, bodyCheckNotTarh} from "../../../utils";

describe("ورود به ام حامی", () => {

  let natioanalCode;
  let token;

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

  it(" کاربری که عضو ام حامی است.", () => {
    Cypress.on("uncaught:exception", (err, runnable) => false);
    cy.wait(500);

    cy.login(checkUserMhami.username1, password); /// وارد کردن اطلاعات
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
          const getNationalCode = JSON.parse(
            result["https://stage1.qhami.com"].userInfo
          );

          const getToken = JSON.parse(
            result["https://stage1.qhami.com"].mresalatPwa
          );
          token = getToken.token.access_token;

          natioanalCode = getNationalCode.nationalCode; ///// گرقتن کد ملی
          console.log(natioanalCode);
        })
        .then(() => {
          cy.get("label").contains("ام حامی").click({ force: true }); //// رقتن به بخش ام حامی
          cy.wait(500);

          cy.get("#form1").click().type("support-details"); /// سرج کردن یکی از طرح ها
          cy.wait(700);

          cy.get("p")
            .contains("همیاری های من")
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
          cy.get("input[inputmode='numeric']").type("0"); /// وارد کردن قیمت
          cy.wait(500);
          cy.get("input[max='84']").then((input) => {
            ////// عوض کردن مقدار ماهانه با استفاده از یه کامند که  در ابتدای این قایل نوشته شده اسنت نوشته شده است
            cy.inputChange(input, "36");
          });

          cy.then(() => {
            const body = bodyCheckTarh;
            cy.wait(500);

            cy.request({
              ////// ارسال در خاست برای گرفتن مفادیر
              method: "POST",
              url: "https://stage1api.qhami.com/facility/facility-request/service-cost",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
                gatewayToken: "b3765708-8f2c-4be0-80e6-2332096fda0f",
              },
              body: body,
            }).then((res) => {
              console.log(res.body.haamiModelList); ///// چک کردن تابع برای اینکه اسم حامی باشد.
              const getHami = (hamiList) => {
                const hami = hamiList.filter(
                  (hami) => hami.fullName === "رزگار حسین"
                );
                return hami;
              };
              const hamian = getHami(res.body.haamiModelList);
              const hamiName = hamian[0].fullName;
              if (hamiName === "رزگار حسین") {
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
                  .contains("موافقت و ثبت درخواست")
                  .click({ force: true }); //// کلیک بر روی دکمه
                cy.wait(500);
                cy.get(
                  "input[class='form-control directionLtr removeArrowInput']"
                )
                  .click()
                  .type(natioanalCode);
                cy.wait(500);

                cy.get("button").contains(" دریافت کد تایید").click();
                cy.wait(500);

                cy.get("input[type='tel']").each(($el) => {
                  cy.wrap($el).type("1"); ///// وارد کردن اعداد 1 در کد دو عاملی
                });
                cy.wait(500);
              } else {
                alert("حامی وجود ندارد");
                cy.end();
              }
            });
          });
        });
    });
  });

  /* -------------------------------------------------------------------------- */
  /*                      برای اینکه کاربری جز حامیان نباشد                     */
  /* -------------------------------------------------------------------------- */

  it.only("کاربری جز ام حامی نیست", () => {
    Cypress.on("uncaught:exception", (err, runnable) => false);
    cy.wait(500);

    cy.login(checkUserMhami.username2, password); /// وارد کردن اطلاعات
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
          const getNationalCode = JSON.parse(
            result["https://stage1.qhami.com"].userInfo
          );

          const getToken = JSON.parse(
            result["https://stage1.qhami.com"].mresalatPwa
          );
          token = getToken.token.access_token;

          natioanalCode = getNationalCode.nationalCode; ///// گرقتن کد ملی
          console.log(natioanalCode);
        })
        .then(() => {
          cy.get("label").contains("ام حامی").click({ force: true }); //// رقتن به بخش ام حامی
          cy.wait(500);

          cy.get("#form1").click().type("support-details"); /// سرج کردن یکی از طرح ها
          cy.wait(700);

          cy.get("p")
            .contains("همیاری های من")
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
          cy.get("input[inputmode='numeric']").type("0"); /// وارد کردن قیمت
          cy.wait(500);
          cy.get("input[max='84']").then((input) => {
            ////// عوض کردن مقدار ماهانه با استفاده از یه کامند که  در ابتدای این قایل نوشته شده اسنت نوشته شده است
            cy.inputChange(input, "36");
          });

          cy.then(() => {
            const body = bodyCheckNotTarh;
            cy.wait(500);

            cy.request({
              ////// ارسال در خاست برای گرفتن مفادیر
              method: "POST",
              url: "https://stage1api.qhami.com/facility/facility-request/service-cost",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
                gatewayToken: "15f1789a-c612-4ca7-b8c2-2c96405c5a40",
              },
              body: body,
            }).then((res) => {
              console.log(res.body.haamiModelList);
              console.log(res.body.haamiModelList); ///// چک کردن تابع برای اینکه اسم حامی باشد.
              const getHami = (hamiList) => {
                const hami = hamiList.filter(
                  (hami) => hami.fullName === "حسین زینب" ///// حامی خود عضو
                );
                return hami;
              };
              const hamian = getHami(res.body.haamiModelList);
              const hamiName = hamian[0].fullName;
              if (hamiName === "رزگار حسین") {
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
                  .contains("موافقت و ثبت درخواست")
                  .click({ force: true }); //// کلیک بر روی دکمه
                cy.wait(500);
                cy.get(
                  "input[class='form-control directionLtr removeArrowInput']"
                )
                  .click()
                  .type(natioanalCode);
                cy.wait(500);

                cy.get("button").contains(" دریافت کد تایید").click();
                cy.wait(500);

                cy.get("input[type='tel']").each(($el) => {
                  cy.wrap($el).type("1"); ///// وارد کردن اعداد 1 در کد دو عاملی
                });
                cy.wait(500);
              } else {
                alert("حامی وجود ندارد");
                cy.end();
              }
            });
          });
        });
    });
  });
});
