/// <reference types="Cypress" />

import { mainInfo, TrahWithUser, infoTarhWithUser } from "../../../info";
import {
  numberWithCommas,
  extractPriceFromText,
  checkCurrncy,
  randomIntFromInterval,
  gettingHami,
} from "../../../utils";

describe(" چک کردن طرح با اقساط با پرداخت یکجا", () => {
  let price = 0;
  let hamiArr = [];
  it("چک کردن طرح", () => {
    Cypress.on("uncaught:exception", (err, runnable) => false);
    cy.wait(500);

    cy.login(TrahWithUser.username, mainInfo.password); /// وارد کردن اطلاعات
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
    cy.intercept("https://stage12api.qhami.com/mresalat/supporter-plan/1*").as(
      "TrahHami"
    ); /// گرفتن اطلاعات مربوط به طرح مثل قیمتی که به صورت پیش فرض و توضبخات وجود دارد.
    cy.wait(500);
    cy.get("#form1").click().type(infoTarhWithUser.title); /// سرج کردن یکی از طرح ها
    cy.wait(700);

    cy.get("p").contains("همیاری های من").scrollIntoView({ easing: "linear" });
    cy.wait(500);

    cy.get(".btn > .sc-eDLKEg").click({ force: true }); //// سرج کردن
    cy.wait(500);

    cy.get(".nav-link").click({ force: true }); /// انتخاب طرح
    cy.wait(750);
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

    cy.intercept(
      "https://stage12api.qhami.com/facility/facility-request/service-cost"
    ).as("aghsat"); /// گرفتن اطلاعات مربوط به ام اقساط

    cy.wait(750);
    cy.get("label").contains("همیاری اقساطی").click();
    cy.wait(500);
    cy.pause();
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
    cy.wait("@aghsat")

    cy.wait(500);
    cy.pause();
    cy.wait("@aghsat");
    cy.wait(500);
    cy.wait("@aghsat").then((res) => {
      cy.pause();
      cy.wait("@aghsat");
      const totalAmount = res.response.body.facilityAmount; //// قیمت کل پرداختی تسهیلات
      const hamiList = res.response.body.haamiModelList; ///// لیست حامی
      const service = res.response.body.calculatedServiceCostAmount; ////هزینه سرویس سامانه
      cy.get(".text-nowrap").each((element, index) => {
        if (index === 0) {
          cy.wrap(element)
            .invoke("text")
            .then((text) => {
              const newText = text.split(" ");
              expect(newText[0]).to.equal(numberWithCommas(service)); ///// چک کردن قیمت سامانه
              return checkCurrncy(text);
            });
        }
      });
      cy.wait(500);
      cy.get(".text-nowrap").each((element, index) => {
        if (index === 1) {
          cy.wrap(element)
            .invoke("text")
            .then((text) => {
              const newText = text.split(" ");
              expect(newText[0]).to.equal(numberWithCommas(totalAmount));
              return checkCurrncy(text); ///// چک کردن قیمت کل تسهیلات
            });
        }
      });
      cy.get("span").contains("مشاهده حامیان ").click(); ////  باز کردن مودال حامیان
      cy.wait(500);

      cy.get(".hm-md-body").each((element, index) => {
        cy.wrap(element)
          .find("label")
          .last()
          .invoke("text")
          .then((text) => {
            const priceTotal = extractPriceFromText(text); ///// محسابه کردن قیمت تک و تک مبالغی که حامیان ارائه داده اند.
            price += priceTotal[1];
            cy.wrap(price).as("total");
          });
      });
      cy.wait(500);

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

      cy.get("@total");

      cy.get("@Hami").then((res) => {
        const nameHamiApi = gettingHami(hamiList, TrahWithUser.nameHami); //// بیرون کشیدن اسم حامی مورد نظر از داخل api
        const nameHamiUi = res.find((item) => item === TrahWithUser.nameHami); //// بیرون کشیدن اسم حامی مورد نطر از داخل صفحه
        expect(nameHamiApi).to.equal(nameHamiUi); //// چک کردن برابری اسم های api  و داخل صفحه
      });
      cy.get("@total").then((res) => {
        cy.get(".supporters > .MuiContainer-root")
          .find("label")
          .eq(1)
          .invoke("text")
          .then((text) => {
            const priceHamianApi = res; ///// اضافه کردن یک تومن به مبلغ که از حامیان داخل صفحه وارد شده به دلیل رند کردن عدد
            const priceHamianUi = extractPriceFromText(text); ////// بیرون کشیدن عدد نشان داده شده در صفحه اصلی برای مبلغ ارائه شده توسط حامیان
            expect(priceHamianApi).to.equal(priceHamianUi[1]); /// چک کردن برابری این دو مقدار
          });
      });
      cy.pause()
      cy.get(".close-btn").click(); /// بستن مودال
      cy.wait(500);
      cy.wait(500);
      cy.get("button")
        .contains("پرداخت بیعانه از طریق ام حسام")
        .click({ force: true }); //// ثبت کردن درخواست
      cy.wait(750);
      cy.get("label")
        .contains(
          "بدینوسیله اعلام می دارم که شرایط فوق را مطالعه کرده و همه موارد مورد پذیرش اینجانب می باشد."
        )
        .click({ force: true }); /// پذیرش قوانین
      cy.wait(500);
      cy.get("button").contains("موافقت و پرداخت بیعانه").click();
      cy.wait(500);
    });
  });
});
