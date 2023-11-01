/// <reference types="Cypress" />

import { password, sabtMaghsatNotUser, informationSabt } from "../../../info";
import { numberWithCommas } from "../../../utils";

describe("ثبت طرح", () => {

  let token;

  it("ثبت طرح بدون اعضا برای استفاده از حامیان", () => {
    Cypress.on("uncaught:exception", (err, runnable) => false);
    cy.wait(500);

    cy.login(sabtMaghsatNotUser.username, password); /// وارد کردن اطلاعات
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

    cy.get("#title").click().type(informationSabt.info); //// اسم طرح
    cy.wait(500);

    cy.get("span").contains("ام حامی").click(); //// نوع طرح
    cy.wait(500);

    cy.get(".custom-input").click({ force: true }); ///// کلیک به روی تاریخ
    cy.wait(500);

    cy.get("label")
      .contains("محدوده تاریخ")
      .scrollIntoView({ easing: "linear" });
    cy.wait(750);

    cy.pause(); //// صبر کردن برای انتخاب تاریخ

    cy.get(".sc-kEbfvU").click().type(informationSabt.details); ///// پر کردن بخش توضیخات
    cy.wait(500);

    cy.get("button").contains("مرحله بعد").click({ force: true });
    cy.wait(500);

    cy.get(".supporterCeateLabelChip > .form_input_container").each(
      //// ثبت قیمت پیش قرض
      (element, index) => {
        if (index === 0) {
          cy.wrap(element).type(informationSabt.price);
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
    cy.wait(500);

    cy.get("#customPrice").click({ force: true }); ///// فعال کردن بخش دادن ثبت قیمت پیش فرض
    cy.wait(500);
    cy.get("#facility").click({ force: true }); ////// ثبت کردن بخش های پشتبانی از ام حامی و ام حسام
    cy.wait(500);
    cy.get("#Cash").click({ force: true });
    cy.wait(500);
    cy.get("button").contains("مرحله بعد").click({ force: true });
    cy.wait(750);
    cy.get(".input-wrapper").each(($el, index) => {
      cy.wrap($el).type(
        index === 0
          ? sabtMaghsatNotUser.usernameHami
          : sabtMaghsatNotUser.nationalCodeHami
      ); ///// وارد کردن یه کاربر برای حامی
    });

    cy.wait(500);
    cy.get("button").contains("بررسی").click({ force: true }); //// بررسی کردن حامی وارد شده

    cy.then(() => {
      cy.getAllLocalStorage()
        .then((result) => {
          const getToken = JSON.parse(
            result["https://stage1.qhami.com"].mresalatPwa
          );
          token = getToken.token.access_token; //// ست کردن توکن
        })
        .then(() => {
          cy.request({
            method: "POST", ///////////// پست کردن کئ ملی و نام کاربری برای بررسی با اطلاغات نمایش داده شده در سایت
            url: "http://stage1api.qhami.com/mresalat/supporter-plan/find-by-username-and-nationalcode",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: {
              username: sabtMaghsatNotUser.usernameHami,
              nationalCode: sabtMaghsatNotUser.nationalCodeHami,
            },
          }).then((res) => {
            const fullName = res.body.fullName; //// گرفتن اسم حامی پست شده
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
                cy.wrap($el).type(informationSabt.totalPrice); //// وارد کردن مبلغ کل 
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
                cy.wrap($el).type(informationSabt.creditPrice); ///// وارد کردن مبلع متناسب با اطلاعات وارد شده
              }
            });
            cy.wait(500);
            cy.get("label").contains("اعطای اعتبار به اعضای گروه حامی").click();
            cy.wait(500);
            cy.get("button").contains("مشاهده لیست اعضای گروه حامی").click();
            cy.wait(500);
            cy.get(".form_input_container").each(($el, index) => {
              cy.wrap($el).type(
                index === 0
                  ? sabtMaghsatNotUser.userHami
                  : sabtMaghsatNotUser.nationalHami       //////////////وارد کردن عضو برای حامی
              );
            });
            cy.wait(500);
            cy.get(".mt-4 > div > .sc-bdDrbm").contains("بررسی").click();
            cy.wait(500); /// بررسی کردن عضو

            cy.get(".input-wrapper")
              .find("input")
              .each(($el, index) => {
                if (index === 5) {
                  cy.wrap($el).clear();
                } //// پاک کردن قیمت صفر در input  قیمت
              });

            cy.wait(500);

            cy.get(".input-wrapper").each(($el, index) => {
              if (index === 5) {
                cy.wrap($el).type(informationSabt.priceUser); ////// وارد کردن قبمت برای عضو
              }
            });
            cy.wait(500);
            cy.get("button").contains("افزودن به لیست اعضا").click(); ////// اضافه کردن به لیست 
            cy.wait(500);
            cy.get("button").contains("ثبت نهایی لیست اعضا گروه حامی").click(); //// ثبت کردن آن
            cy.wait(500);
            cy.get("button").contains("افزودن به لیست").click(); ///// افزودن نهایی
            cy.wait(500);
            cy.get("button").contains("ثبت نهایی").click(); ///// و ثبت نهایی
            cy.wait(500);
          });
        });
    });
  });
});
