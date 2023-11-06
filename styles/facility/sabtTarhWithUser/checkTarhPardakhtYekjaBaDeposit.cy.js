/// <reference types="Cypress" />

import {
  mainInfo,
  usernameTrahWithUser,
  infoTarhWithUser,
} from "../../../info";
import { numberWithCommas, extractPriceFromText } from "../../../utils";

describe(" چک کردن طرح با اقساط با پرداخت یکجا", () => {
  let token;

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

    cy.get("label").contains("پرداخت یکجا").click();
    cy.wait(500);
    cy.get(".col-9").clear();
    cy.wait(1000);
    cy.get(".col-9").type("10000"); //// وارد کردن مبلغ بیعانه
    cy.wait(500);
    cy.get("body").click({ force: true });
    cy.pause(); //// برای کلیک و ارسال درست و گرفتن اطلاعات
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
              gatewayToken: "63b469e4-cb65-4d27-ae17-54ed5c361405",
            },
            body: {
              monthCount: 10,
              prePaymentAmount: 10000,
              creditTenMonthAmount: 0,
              isTogether: true,
              prepaymentModel: {
                totalAmount: 20000,
                prepaymentMap: {
                  12566: [
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
              },
            },
          }).then((res) => {
            console.log(res.body);
            const totalAmount = res.body.facilityAmount; //// قیمت کل پرداختی تسهیلات
            const hamiList = res.body.haamiModelList; ///// لیست حامی
            const service = res.body.calculatedServiceCostAmount; ////هزینه سرویس سامانه
            const prePaymentAmount = res.body.prePaymentAmount; //// هزینه بیعانه
            const hamianPrice = res.body.reserveCreditTenMoth; //// هزنیه حامیان
            const baraord = res.body.suggestionCreditTenMonthAmount; ///// هزینه بر آورد کل

            cy.get(".text-nowrap").each((elemnt, index) => {
              index === 0
                ? cy
                    .wrap(elemnt)
                    .invoke("text")
                    .then((text) => {
                      const newText = text.split(" ");
                      expect(newText[0]).to.equal(numberWithCommas(service)); ///// چک کردن هزینه سرویس سامانه
                    })
                : cy
                    .wrap(elemnt)
                    .invoke("text")
                    .then((text) => {
                      const newText = text.split(" ");
                      expect(newText[0]).to.equal(
                        numberWithCommas(totalAmount) //// چک کردن مبلغ پرداختی
                      );
                    });
            });
            cy.get("label[style='font-size: 15px;']").each((elemnt, index) => {
              index === 0
                ? cy
                    .wrap(elemnt)
                    .invoke("text")
                    .then((text) => {
                      const newText = text.split(" ");
                      expect(newText[0]).to.equal(
                        numberWithCommas(hamianPrice)
                      ); ///// چک کردن هزینه سرویس سامانه
                    })
                : cy
                    .wrap(elemnt)
                    .invoke("text")
                    .then((text) => {
                      const newText = text.split(" ");
                      expect(newText[0]).to.equal(
                        numberWithCommas(baraord) //// چک کردن مبلغ پرداختی
                      );
                    });
            });
            cy.wait(500);
            cy.get("span").contains("مشاهده حامیان ").click({ force: true });
            cy.wait(500);
            cy.get("label[style='font-size: 15px;']").each((element, index) => {
              if (index === 4) {
                cy.wrap(element)
                  .invoke("text")
                  .then((text) => {
                    expect(text).to.equal(hamiList[0].fullName); //// چک کردن اسم حامی
                  });
              } else if (index === 5) {
                cy.wrap(element)
                  .invoke("text")
                  .then((text) => {
                    const newText = extractPriceFromText(text);
                    expect(newText[1]).to.equal(
                      (hamiList[0].amount - prePaymentAmount) //// چک کردن مبلغ حامی
                    );
                  });
              }
            });
          });
        });
    });
  });
});
