/// <reference types="Cypress" />

import { password, sabtMhami , informationTarhMhami } from "../../../utils";

describe("ورود به ام حامی", () => {

  it("ثبت طرح", () => {
    Cypress.on("uncaught:exception", (err, runnable) => false);
    cy.wait(500);

    cy.login(sabtMhami.username, password); /// وارد کردن اطلاعات
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

    cy.get("p").contains("لیست طرح ها").click({ force: true }); /// زدن روی طرح برای ثبت آن
    cy.wait(500);

    cy.get("button").contains("ایجاد طرح ").click({ force: true });
    cy.wait(500);

    cy.get("#title").click().type(informationTarhMhami.titleTarh); //// اسم طرح
    cy.wait(500);

    cy.get("span").contains("ام حامی").click(); //// نوع طرح
    cy.wait(500);

    cy.get(".custom-input").click({ force: true });
    cy.wait(500);

    cy.get("label")
      .contains("محدوده تاریخ")
      .scrollIntoView({ easing: "linear" });
    cy.wait(750);

    cy.pause(); ///// توقف برای ثبت تاریخ

    cy.get(".sc-kEbfvU").click().type(informationTarhMhami.infomation); ///// توضیحات
    cy.wait(500);

    cy.get("button").contains("مرحله بعد").click({ force: true });
    cy.wait(500);

    cy.get(".supporterCeateLabelChip > .form_input_container").each( //// ثبت قیمت پیش قرض
      (element, index) => {
        if (index === 0) {
          cy.wrap(element).type(informationTarhMhami.price);
        }
      }
    );
    cy.wait(500);

    cy.get("button").contains("افزودن").click(); //// ثبت قیمت
    cy.wait(500); 

    cy.get("#customPrice").click({ force: true });
    cy.wait(500);
    cy.get("#facility").click({ force: true }); ////// ثبت کردن بخش های پشتبانی از ام حامی و ام حسام
    cy.wait(500);
    cy.get("#Cash").click({ force: true });
    cy.wait(500);
    cy.get("button").contains("مرحله بعد").click({ force: true });
    cy.wait(750);
    cy.get(".input-wrapper").each(($el, index) => {
        cy.wrap($el).type(index === 0 ? sabtMhami.usernameHami : sabtMhami.nationalCodeHami) ///// وارد کردن یه کاربر برای حامی
    });
    cy.wait(500);   
    cy.get("button").contains("بررسی").click({force: true});
    cy.wait(500);
    cy.get("label").contains("پشتیبانی ام اقساط").click();
    cy.wait(500);
    cy.get(".input-wrapper").each(($el, index) => { //// وارد کردن مبلغ
        if(index === 2) {
            cy.wrap($el).type(informationTarhMhami.totalPrice)
        }
    });
    cy.wait(500);
    cy.get("label").contains("اعطای اعتبار به هر درخواست").click();
    cy.wait(500);
    cy.get(".input-wrapper").each(($el, index) => { //////////// اعطای مبلغ بع فرد
        if(index === 3) {
            cy.wrap($el).type(informationTarhMhami.creditPrice)
        }
    });
    cy.wait(500);
    cy.get("label").contains("اعطای اعتبار به تعداد متقاضیان").click();
    cy.wait(500);
    cy.get(".input-wrapper").each(($el, index) => {
        if(index === 4) {
            cy.wrap($el).type("1") //// تعداد متقاضی ها
        }
    });
////////////////////////////////////////////////////////////////////////////////////////// start
    cy.get("label").contains("اعطای اعتبار به اعضای گروه حامی").click();
    cy.wait(500);
    cy.get("button").contains("مشاهده لیست اعضای گروه حامی").click();
    cy.wait(500);
    cy.get(".form_input_container").each(($el, index) => {
        cy.wrap($el).type(index === 0 ? sabtMhami.userHami1: sabtMhami.nationalHami1)
    });
    cy.wait(500);
    cy.get('.mt-4 > div > .sc-bdDrbm').contains("بررسی").click();
    cy.wait(500);

    /* -------------------------------------------------------------------------- */
    /*          وارد کردن چند از افراد برای اعضای حامی و مبلغ دریافت شده          */
    /* -------------------------------------------------------------------------- */

    cy.get(".input-wrapper").each(($el, index) => {
        if(index === 5) {
            cy.wrap($el).type(informationTarhMhami.priceUser);           
        }
    });
    cy.wait(500);
    cy.get("button").contains("افزودن به لیست اعضا").click();
    cy.wait(500);

    cy.get(".form_input_container").each(($el, index) => {
        cy.wrap($el).type(index === 0 ? sabtMhami.userHami2:sabtMhami.nationalHami2)
    });
    cy.wait(500);
    cy.get('.mt-4 > div > .sc-bdDrbm').contains("بررسی").click();
    cy.wait(500);
    cy.get(".input-wrapper").find("input").each(($el, index) => {
        if(index === 5) {
            cy.wrap($el).clear();
        }
    });
    cy.wait(500);
    cy.get(".input-wrapper").each(($el, index) => {
        if(index === 5) {
            cy.wrap($el).type(informationTarhMhami.priceUser);
        }
    });
    ///////////////////////////////////////////////////////////////////////////////////////////////////end
    cy.wait(500);
    cy.get("button").contains("افزودن به لیست اعضا").click();
    cy.wait(500);
    cy.get("button").contains("ثبت نهایی لیست اعضا گروه حامی").click();
    cy.wait(500);
    cy.get("button").contains("افزودن به لیست").click();
    cy.wait(500);
    cy.get("button").contains("ثبت نهایی").click();
    cy.wait(500);
  });

});
