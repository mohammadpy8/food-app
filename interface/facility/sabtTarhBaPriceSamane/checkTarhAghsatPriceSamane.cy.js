/// <reference types="Cypress" />

import {
  checkCurrncy,
  gettingHami,
  numberWithCommas,
  randomIntFromInterval,
} from "../../../utils";
import {
  mainInfo,
  checkInfoBaAghsat,
  infoTarhBaPriceSamane,
} from "../../../info";

describe("چک کردن طرح با اقساط با چک کردن میزان هزینه سامانه", () => {

  let hamiArr =[];

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

    cy.intercept("https://stage12api.qhami.com/mresalat/supporter-plan/1*").as(
      "TrahHami"
    ); /// گرفتن اطلاعات مربوط به طرح مثل قیمتی که به صورت پیش فرض و توضبخات وجود دارد.

    cy.get(
      ':nth-child(1) > [style="display: flex; text-align: center;"] > [style="display: flex; width: 100%; padding: 2% 1%; border-radius: 10px; align-items: center; justify-content: center; margin: auto; flex-direction: column;"] > :nth-child(3)'
    ).click({ force: true });
    cy.wait(1000);
  
    cy.get("label").contains("ام حامی").click({ force: true }); //// رقتن به بخش ام حامی
    cy.wait(500);
    cy.get("#form1").click().type(infoTarhBaPriceSamane.title); /// سرج کردن یکی از طرح ها
    cy.wait(700);

    cy.get("p").contains("همیاری های من").scrollIntoView({ easing: "linear" });
    cy.wait(500);

    cy.get(".btn > .sc-eDLKEg").click({ force: true }); //// سرج کردن
    cy.wait(500);
    cy.intercept(
      "https://stage12api.qhami.com/facility/facility-request/service-cost"
    ).as("aghsat"); /// گرفتن اطلاعات مربوط به ام اقساط

    cy.get(".nav-link").click({ force: true }); /// انتخاب طرح
    cy.wait(750);
    cy.wait(500);
    cy.wait("@TrahHami").then((res) => {
      console.log(res.response.body);
      cy.get("span")
        .eq(3) //// گرفتن span  مربوط به توضیحات
        .invoke("text")
        .then((text) => {
          expect(res.response.body.description).to.equal(text); /// چک کردن توضیحات با api
        });
      cy.wait(500);
      console.clear();
      cy.get("div[class='radioo']")
        .find("label")
        .each((element, index) => {
          cy.wrap(element)
            .invoke("text")
            .then((text) => {
              /// گرفتن متن مبالغ
              const newText = text.split(" "); ///// جدا کردن تومان از مبلغ
              expect(res.response.body.priceList[index]).to.equal(+newText[0]); /// چک کردن همه مبالغ موجود با Api
              expect("تومان").to.equal(newText[1]); //// چک کردن تومان داشتن مبالغ
            });
        });
      cy.get(".radioo > .form-check > .sc-gLLuHO")
        .should("be.visible")
        .eq(randomIntFromInterval(res.response.body.priceList.length - 1, 0))
        .click(); /// انتخاب کردن قیمت
      cy.wait(750);
    });
    cy.pause();
    cy.wait(750);
    cy.get("label").contains("همیاری اقساطی").click();
    cy.wait(500);
    cy.get("button").contains("همیاری اقساطی").click();
    cy.wait(500);

    cy.get("label").contains("پرداخت ماهیانه").click();
    cy.wait(500);
    cy.wait("@aghsat").then((res) => {
      const services = res.response.body.calculatedServiceCostAmount; //// مبلغ سرویس سامانه
      const hamiList = res.response.body.haamiModelList; ///// لیست حامی
      cy.get(".text-nowrap").each((element, index) => {
        if (index === 0) {
          cy.wrap(element)
            .invoke("text")
            .then((text) => {
              const newText = text.split(" ");
              expect(newText[0]).to.equal(numberWithCommas(services)); ///// چک کردن قیمت سامانه
              return checkCurrncy(text);
            });
        }
      });
      cy.wait(500);
      cy.get("span").contains("مشاهده حامیان ").click(); ////  باز کردن مودال حامیان
      cy.get(".hm-md-body").each((element, index) => {
        cy.wrap(element)
          .find("label")
          .first()
          .invoke("text")
          .then((name) => {
            hamiArr.push(name);
            cy.wrap(hamiArr).as("Hami"); ////// ذخیره کردن تک تک نام های حامیان
          });
      });
      cy.wait(500);
      cy.get("@Hami").then((res) => {
        const nameHamiApi = gettingHami(hamiList, checkInfoBaAghsat.name); //// بیرون کشیدن اسم حامی مورد نظر از داخل api
        const nameHamiUi = res.find((item) => item === checkInfoBaAghsat.name); //// بیرون کشیدن اسم حامی مورد نطر از داخل صفحه
        expect(nameHamiApi).to.equal(nameHamiUi); //// چک کردن برابری اسم های api  و داخل صفحه
      });
    });
  });
});
