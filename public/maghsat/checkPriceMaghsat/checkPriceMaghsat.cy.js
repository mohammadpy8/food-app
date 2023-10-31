/// <reference types="Cypress" />
import { password, maghsatPrice } from "../../../utils";

describe("ورود به ام حامی", () => {

  let token;
  let ResNum;
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

  it("ثبت طرح", () => {
    Cypress.on("uncaught:exception", (err, runnable) => false);
    cy.wait(500);

    cy.login(maghsatPrice.username, password); /// وارد کردن اطلاعات
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

    cy.then(() => {
      cy.getAllLocalStorage()
        .then((result) => {
          const getToken = JSON.parse(
            result["https://stage1.qhami.com"].mresalatPwa
          );
          token = getToken.token.access_token; ///// چک کردن توکن در مرحله اول
          // console.log(token);
        })
        .then(() => {
          cy.get("label").contains("ام حامی").click({ force: true }); //// رقتن به بخش ام حامی
          cy.wait(500);

          cy.get("#form1").type("support-details"); ///// انتخاب کردن نوع طرج ام حامی
          cy.wait(500);
          cy.get(".btn > .sc-eCQiwC").click();
          cy.wait(500);
          cy.get("label").contains("support-details").click();
          cy.wait(500);
          cy.get("input[type='text']").type("500000");
          cy.wait(500);
          cy.get("label").contains("همیاری اقساطی").click(); //// رقتن به بخش همیاری اقساطی
          cy.wait(500);
          cy.get("button").contains("همیاری اقساطی").click();
          cy.wait(500);

          cy.wait(5000);

          cy.then(() => {
            let getTokens;
            cy.getAllLocalStorage()
              .then((ress) => {
                const getTokennn = JSON.parse(
                  ress["https://stage1.qhami.com"].mresalatPwa ////////////////////// ست کردن توکن
                );
                getTokens = getTokennn.token.access_token;
                console.log(getTokens);
                const getResNum = JSON.parse(
                  ress["https://stage1maghsat.qhami.com"].ResNum
                );
                ResNum = getResNum;
                console.log(getResNum);
              })
              .then(() => { ////// بادی درخاست ارسالی 
                const body = {
                  monthCount: 24,
                  prePaymentAmount: 0,
                  creditTenMonthAmount: 0,
                  isTogether: false,
                  prepaymentModel: {
                    totalAmount: 500000,
                    prepaymentMap: {
                      12344: [
                        {
                          totalAmount: 500000,
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
                  },
                };
                cy.wait(500);

                cy.get("input[max='84']").then((input) => {
                  ////// عوض کردن مقدار ماهانه با استفاده از یه کامند که  در ابتدای این قایل نوشته شده اسنت نوشته شده است
                  cy.inputChange(input, "24");
                });

                cy.request({ ////// ارسال در خاست برای گرفتن مفادیر 
                  method: "POST",
                  url: "https://stage1api.qhami.com/facility/facility-request/service-cost",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${getTokens}`,
                    gatewayToken: "5acc209f-9555-4136-9497-41a0dbba4ac8",
                  },
                  body: body,
                }) ////////////////////تابع محاسبه مبالغ/////////////////////////////////////
                  .then((res) => {
                    const checkPrice = (price, time, xs) => {
                      const harGhest =
                        (price * (xs / 1200) * Math.pow(1 + xs / 1200, time)) /
                        (Math.pow(1 + xs / 1200, time) - 1);
                      const mohasebehSod = time * harGhest;
                      const khodeSod = mohasebehSod - price;
                      return [harGhest, khodeSod];
                    };
                    const totalAmount = res.body.prepaymentModel.totalAmount;
                    const monthCount = res.body.monthCount;
                    const x = res.body.x;
                    const checkPriceValue = checkPrice(
                      totalAmount,
                      monthCount,
                      0.1
                    );
                    console.log(checkPriceValue);
                    cy.get('.mb-2 > .text-nowrap').invoke("text").then((text) => {
                      const realNumber = text.split(" ")[0];
                      const numberN = realNumber.split(",").join("");
                      expect(numberN).to.equal("11905")
                    })
                  }) //////////////////////// پایان محاسبات///////////////////////////////////////
                  .then(() => { ///////////////تابع چک کردن درستی مبالغ و درستی آن ها////////////////////////////////
                    const numberWithCommas = (number) => {
                      const checkNumber = number
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                      return checkNumber;
                    };

                    cy.get(".text-danger")
                      .invoke("text")
                      .then((amount) => {
                        const realNumber = amount.split(" ");
                        const number = Number(
                          realNumber[1].split(",").join("")
                        );
                        expect(realNumber[1]).to.equal(
                          numberWithCommas(number)
                        );
                      });
                    cy.wait(750);

                    cy.get(".text-nowrap").each((element) => {
                      cy.wrap(element)
                        .invoke("text")
                        .then((amount) => {
                          const realNumber = amount.split(" ");
                          const number = Number(
                            realNumber[0].split(",").join("")
                          );
                          expect(realNumber[0]).to.equal(
                            numberWithCommas(number)
                          );
                        });
                    });
                    cy.wait(500);
                    cy.get(':nth-child(1) > .pt-3 > [style="font-size: 15px;"]')
                      .invoke("text")
                      .then((amount) => {
                        const realNumber = amount.split(" ");
                        const number = Number(
                          realNumber[0].split(",").join("")
                        );
                        expect(realNumber[0]).to.equal(
                          numberWithCommas(number)
                        );
                      });
                      cy.wait(500);
                      cy.get('.avarage > .pt-3 > [style="font-size: 15px;"]')
                        .invoke("text")
                        .then((amount) => {
                          const realNumber = amount.split(" ");
                          const number = Number(realNumber[0].split(",").join(""));
                          expect(realNumber[0]).to.equal(numberWithCommas(number));
                        });
                      cy.wait(500);
                      ////////////////////////////پایان چک کردن مبالغ///////////////////////////////////
                  });
              });
          });
        });
    });
  });
});
