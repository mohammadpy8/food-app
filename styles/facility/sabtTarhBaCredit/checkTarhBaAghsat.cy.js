/// <reference types="Cypress" />

import { mainInfo, checkInfoBaAghsat, infoTrahHamgani } from "../../newInfo";
import { gettingHami } from "../../utils";

describe("چک کردن طرح با اقساط با شزایط دادن اعتبار ", () => {
  let token;

  it("چک کردن طرح", () => {
    Cypress.on("uncaught:exception", (err, runnable) => false);
    cy.wait(500);

    cy.login(checkInfoBaAghsat.username, mainInfo.password); /// وارد کردن اطلاعات
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
    cy.get("#form1").click().type(infoTrahHamgani.title); /// سرج کردن یکی از طرح ها
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

    cy.then(() => {
      cy.getAllLocalStorage()
        .then((result) => { //// گرفتن توکن
          const getToken = JSON.parse(
            result["https://stage1.qhami.com"].mresalatPwa
          );
          token = getToken.token.access_token;
          console.log(token);
        })
        .then(() => {
          cy.request({ /// ارسال درخواست 
            method: "POST",
            url: "https://stage1api.qhami.com/facility/facility-request/service-cost",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
              gatewayToken: "e37a3a9c-9667-4f86-88a2-62b973ac12d1",
            },
            body: {
              isTogether: false,
              monthCount: 42,
              prePaymentAmount: 0,
              creditTenMonthAmount: 0,
              prepaymentModel: {
                prepaymentMap: {
                  12516: [
                    {
                      totalAmount: 10000,
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
                totalAmount: 10000,
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
              const hamiList = res.body.haamiModelList; /// گرفتن لیست حامی
              return gettingHami(hamiList, "علی نقی"); /// چک کردن حامی مورد نظر
          })
        });
    });
  });
});
