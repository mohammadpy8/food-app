/// <reference types="Cypress" />

import { mainInfo, infoTarhBaPriceSamane } from "../../../info";
import { numberWithCommas, checkCurrncy } from "../../../utils";

describe("ثبت طرح همراه با وارد کردن هزینه سامانه", () => {
  let token;

  it("ثبت طرح", () => {
    Cypress.on("uncaught:exception", (err, runnable) => false);
    cy.wait(500);

    cy.login(mainInfo.username, mainInfo.password); /// وارد کردن اطلاعات
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
    cy.get("p").contains("لیست طرح ها").click();
    cy.wait(500);
    cy.get("button").contains("ایجاد طرح ").click({ force: true });
    cy.wait(500);

    cy.get("#title").click().type(infoTarhBaPriceSamane.title); //// اسم طرح
    cy.wait(500);

    cy.get("span").contains("ام حامی").click(); //// نوع طرح
    cy.wait(500);

    cy.get(".custom-input").click({ force: true }); ///// کلیک به روی تاریخ
    cy.wait(500);

    cy.get("label")
      .contains("محدوده تاریخ")
      .scrollIntoView({ easing: "linear" });
    cy.wait(750);

    cy.pause();
    cy.wait(500);
    cy.get("label")
      .contains("تاریخ پایان را مشخص کنید")
      .invoke("text")
      .then((text) => {
        expect(text).to.equal(infoTarhBaPriceSamane.errorDate);
      }); //// صبر کردن برای انتخاب تاریخ

    cy.pause();

    cy.get("textarea").click().type(infoTarhBaPriceSamane.deatils); ///// پر کردن بخش توضیخات
    cy.wait(500);

    cy.get("button").contains("مرحله بعد").click({ force: true }); //// زدن روی دکمه برای چک کردن خطای input  سقف طرح
    cy.wait(500);

    cy.get("input[text='تومان']").clear(); // پاک کردن input  سقف طرح
    cy.get("button").contains("مرحله بعد").click({ force: true });
    cy.wait(500);

    cy.get(".supporterCeateLabelChip > .form_input_container").each(
      //// ثبت قیمت پیش قرض
      (element, index) => {
        if (index === 0) {
          cy.wrap(element).type(infoTarhBaPriceSamane.price);
        }
      }
    );
    cy.wait(500);
    cy.get("button").contains("افزودن").click(); //// ثبت قیمت
    cy.wait(500);

    cy.get(".chipComponent-labelStyle > :nth-child(1)")
      .invoke("text")
      .then((amount) => {
        const number = amount;
        const checkNumber = Number(number.split(",").join(""));
        console.log(checkNumber);
        expect(number).to.equal(numberWithCommas(checkNumber)); ////// چک کردن قیمت پیبش قرض
      });
    cy.get(".chipComponent-labelStyle")
      .children()
      .last()
      .invoke("text")
      .then((text) => {
        let toman = "تومان";
        expect(toman).to.equal(text);
      });
    cy.wait(500);

    cy.intercept(
      "https://stage12api.qhami.com/mresalat/supporter-plan/find-by-username-and-nationalcode"
    ).as("check_hami"); //// گرفتن api مربوط به حامی که باید برای طرح ثبت شود.

    cy.get("#customPrice").click({ force: true }); ///// فعال کردن بخش دادن ثبت قیمت پیش فرض
    cy.wait(500);
    cy.get("#facility").click({ force: true }); ////// ثبت کردن بخش های پشتبانی از ام حامی و ام حسام
    cy.wait(500);
    cy.get("#Cash").click({ force: true });
    cy.wait(500);
    cy.get("input[text='تومان']").clear();
    cy.wait(500);
    cy.get("input[text='تومان']").type("-100000"); //// دادن قیمت و هرینه سامانه  به صورت منفی برای چک کردن خطا
    cy.get("button").contains("مرحله بعد").click({ force: true }); /// برای چک کردن اینکه خطا به درستی کار می کند و رد نمی شود
    cy.get("input[text='تومان']").clear();
    cy.wait(500);
    cy.get("input[text='تومان']").type(infoTarhBaPriceSamane.priceSamane); //// دادن قیمت و هرینه سامانه
    cy.wait(500);
    cy.get("label[id='facilityFeeAmountSP']")
      .invoke("text")
      .then((text) => {
        const getPrice = text.split(" ");
        const priceFinaal = Number(getPrice[0].split(",").join(""));
        expect(getPrice[0]).to.equal(numberWithCommas(priceFinaal)); ///// چک کردن قیمت وارد شده
        return checkCurrncy(text); /// چک کردن تومان ملبغ
      });
    cy.wait(500);
    cy.pause();
    cy.get("button").contains("مرحله بعد").click({ force: true });
    cy.wait(750);
    cy.get(".input-wrapper").each(($el, index) => {
      cy.wrap($el).type(
        index === 0
          ? infoTarhBaPriceSamane.usernameHami
          : infoTarhBaPriceSamane.nationalCodeHami
      ); ///// وارد کردن یه کاربر برای حامی
    });
    cy.wait(500);
    cy.get("button").contains("بررسی").click({ force: true }); //// بررسی کردن حامی وارد شده
    cy.wait("@check_hami").then((res) => {
      const fullName = res.response.body.fullName; //// گرفتن اسم حامی پست شده
      cy.get(
        '[style="background: white; border-radius: 1.5rem; margin: auto; padding: 0.1rem 0.3rem; width: 97%;"] > :nth-child(2) > :nth-child(1)'
      )
        .invoke("text")
        .then((text) => {
          const getfullName = text.split(":"); ///// جدا کردن اسم حامی
          console.log(getfullName);
          expect(getfullName[1]).to.equal(fullName); //// بررسی برابری نام حامی با داده ای که دریافت شده
        });
      cy.wait(500);
      cy.get("label").contains("پشتیبانی ام اقساط").click();
      cy.wait(500);
      cy.get(".input-wrapper").each(($el, index) => {
        //// وارد کردن مبلغ
        if (index === 2) {
          cy.wrap($el).type(infoTarhBaPriceSamane.totalPrice); //// وارد کردن مبلغ کل
        }
      });
      cy.wait(500);
      cy.get("label").contains("اعطای اعتبار به هر درخواست").click();
      cy.wait(500);
      cy.get(".input-wrapper").each(($el, index) => {
        //////////// اعطای مبلغ بع فرد
        if (index === 3) {
          cy.wrap($el).type("1000000000"); /// وارد کردن مبلغ بیشتر از مبلغ کل
        }
      });
      cy.wait(500);
      cy.get("button").contains("متوجه شدم").click(); ///// بالا اومدن خطا و زدن دکمه متوجه شدم
      cy.wait(500);
      cy.get(".input-wrapper")
        .find("input")
        .each(($el, index) => {
          if (index === 3) {
            cy.wrap($el).clear(); //// پاک کردن مبلغ قبلی
          }
        });
      cy.wait(500);
      cy.get(".input-wrapper").each(($el, index) => {
        //////////// اعطای مبلغ بع فرد
        if (index === 3) {
          cy.wrap($el).type(infoTarhBaPriceSamane.creditPrice); ///// وارد کردن مبلع متناسب با اطلاعات وارد شده
        }
      });
      cy.wait(500);
      cy.get("label[id='givePriceUpToSP']")
        .invoke("text")
        .then((text) => {
          const getPrice = text.split(" ");
          const priceFinaal = Number(getPrice[0].split(",").join(""));
          expect(getPrice[0]).to.equal(numberWithCommas(priceFinaal)); ///// چک کردن قیمت وارد شده
          return checkCurrncy(text);
        });
      cy.get("button").contains("افزودن به لیست").click();
      cy.wait(500);
      cy.wait(500);
      cy.get("button").contains("ثبت نهایی").click(); ///// و ثبت نهایی
      cy.wait(500);
    });
  });
});
