/// <reference types="Cypress" />

import {
  mainInfo,
  usernameTrahWithUser,
  infoTarhWithUser,
} from "../../../info";
import {
  numberWithCommas,
  checkValueMaghsat,
  finallPriceAghsat,
} from "../../../utils";

describe("چک کردن طرح با اقساط", () => {
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

  it("چک کردن طرح", () => {
    Cypress.on("uncaught:exception", (err, runnable) => false);
    cy.wait(500);

    cy.login(usernameTrahWithUser, mainInfo.password); /// وارد کردن اطلاعات
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
    cy.get("label").contains("ام حامی").click({ force: true }); //// رقتن به بخش ام حامی
    cy.wait(500);
    cy.get("#form1").click().type(infoTarhWithUser.title); /// سرج کردن یکی از طرح ها
    cy.wait(700);

    cy.get("p").contains("همیاری های من").scrollIntoView({ easing: "linear" });
    cy.wait(500);

    cy.get(".btn > .sc-eCQiwC").click({ force: true }); //// سرج کردن
    cy.wait(500);

    cy.get(".nav-link").click({ force: true }); /// انتخاب طرح
    cy.wait(750);

    cy.get(".radioo > :nth-child(1) > .sc-gKkivs").should("be.visible").click(); /// انتخاب کردن قیمت
    cy.wait(750);
    cy.get("label").contains("همیاری اقساطی").click();
    cy.wait(500);
    cy.get("button").contains("همیاری اقساطی").click();
    cy.wait(500);

    cy.get("label").contains("پرداخت ماهیانه").click();
    cy.wait(500);

    cy.then(() => {
      cy.getAllLocalStorage()
        .then((result) => {
          //// گرفتن توکن
          const getToken = JSON.parse(
            result["https://stage1.qhami.com"].mresalatPwa
          );
          token = getToken.token.access_token;
          console.log(token);
        })
        .then(() => {
          cy.request({
            /// ارسال درخواست
            method: "POST",
            url: "https://stage1api.qhami.com/facility/facility-request/service-cost",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
              gatewayToken: "e953346c-ba65-4c9b-a7fe-5112c204b9b1",
            },
            body: {
              isTogether: false,
              monthCount: 42,
              prePaymentAmount: 0,
              creditTenMonthAmount: 0,
              prepaymentModel: {
                prepaymentMap: {
                  12584: [
                    {
                      totalAmount: 20000,
                      facilityPercentage: 0,
                      facilityMonth: 0,
                      credit: 0,
                      type: "USER",
                      carrierGroupPrepayment: 0,
                      carrierName: "",
                      supplierName: "",
                      allocatedCarrierGroupPrepayment: 0,
                      serviceCost: "",
                      includingDiscountServiceAmount: false,
                      haamiId: 0,
                      terminalId: "",
                      serviceCostAmountDiscountInclude: "",
                      extraIds: [],
                      productModelList: [],
                      carrierTransferAmount: 0,
                    },
                  ],
                },
                totalAmount: 20000,
                totalPrepayment: 0,
                resultCode: "",
                clientServiceCost: 0,
                platform: "ام حامی",
                clientRedirectUrl: "",
                mnesiyeServiceCostPercentage: "",
                maxMonth: 84,
                breathingPeriod: "",
                byFirstTransaction: "",
              },
            },
          }).then((res) => {
            console.log(res.body);
            const totalAmount = res.body.facilityAmount; /// قیمت کل
            const mounth = res.body.monthCount; /// تعداد ماه
            const deposit = res.body.prePaymentAmount; /// مفدار بیعانه
            const x = 0.001; /// درصد سود
            const installment = res.body.installment; ////مفدار هر قسط داخل api

            cy.get(".text-nowrap").each((element, index) => {
              if (index === 1) {
                cy.wrap(element)
                  .invoke("text")
                  .then((text) => {
                    const newText = text.split(" ");
                    expect(newText[0]).to.equal(numberWithCommas(installment)); ///// چک کردن قیمت هر قسط
                  });
              }
            });
            cy.wait(500);
            cy.get(".text-nowrap").each((element, index) => {
              const harGhest = checkValueMaghsat(
                deposit,
                totalAmount,
                mounth,
                x
              ); ////// محاسبه هر فسط
              const newHarGhest = finallPriceAghsat(harGhest[0]); ///// محاسبه دقیق هر فسط
              console.log(newHarGhest);
              if (index === 1) {
                cy.wrap(element)
                  .invoke("text")
                  .then((text) => {
                    const newText = text.split(" ");
                    expect(newText[0]).to.equal(numberWithCommas(newHarGhest)); ///// و چک کردن آن
                  });
              }
            });
          });
        });
    });
  });
});
