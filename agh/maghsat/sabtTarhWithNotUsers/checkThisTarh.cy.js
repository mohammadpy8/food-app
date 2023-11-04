/// <reference types="Cypress" />

import { password, detailsSabtTarh, sabtNotUsers } from "../../../info";
import { numberWithCommas, bodyNoUser,gettingHami } from "../../../utils";

describe("چک کردن طرح بدون عضو", () => {
  let token;

  it("چک کردن طرح", () => {
    Cypress.on("uncaught:exception", (err, runnable) => false);
    cy.wait(500);

    cy.login(sabtNotUsers.userHami, password); /// وارد کردن اطلاعات
    cy.wait(500);

    cy.visit(Cypress.env("M_RESALAT_URL")); /// باز کردن سایت
    cy.wait(500);

    cy.get("#profile").click();
    cy.wait(2000);

    cy.get("label").contains("ام حامی").scrollIntoView({ easing: "linear" });
    cy.wait(100);
    cy.get(
      ':nth-child(1) > [style="display: flex; text-align: center;"] > [style="display: flex; width: 100%; padding: 2% 1%; border-radius: 10px; align-items: center; justify-content: center; margin: auto; flex-direction: column;"] > :nth-child(3)'
    ).click({ force: true });
    cy.wait(1000);
    cy.get("label").contains("ام حامی").click({ force: true }); //// رقتن به بخش ام حامی
    cy.wait(500);
    cy.get("span")
      .contains("حق عضویت انجمن حامیان فرهنگ قرض الحسنه و کارآفرینی اجتماعی")
      .scrollIntoView({ easing: "linear" });
    cy.wait(500);
    cy.get("#form1").type(detailsSabtTarh.titleTarh);
    cy.wait(500);
    cy.get(".btn > .sc-eCQiwC").click();
    cy.wait(500);
    cy.get("label").contains(detailsSabtTarh.titleTarh).click();
    cy.wait(500);
    cy.get("input[type='text']").type("50000");
    cy.wait(500);
    cy.get("label[id='inputPricecnt']")
      .invoke("text")
      .then((text) => {
        const getPrice = text.split(" ");
        const priceFinaal = Number(getPrice[0].split(",").join(""));
        expect(getPrice[0]).to.equal(numberWithCommas(priceFinaal));
      });
    cy.wait(500);
    cy.get("label").contains("همیاری اقساطی").click();
    cy.wait(500);
    cy.get('button').contains("همیاری اقساطی").click();
    cy.wait(500);
    cy.then(() => {
        cy.getAllLocalStorage().then(result => {
            const getToken = JSON.parse(result["https://stage1.qhami.com"].mresalatPwa);
            token = getToken.token.access_token;
        })
        .then(() => {
            cy.request({
                method: "POST",
                url: "https://stage1api.qhami.com/facility/facility-request/service-cost",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                    gatewayToken: "5b538ea7-ed89-4700-b63f-81c6fc093018",
                },
                body: bodyNoUser,
            })
            .then(res => {
                const hamiList = res.body.haamiModelList;
                return gettingHami(hamiList, "علی تاج نیا");
            })
        })
    })
  });
});
