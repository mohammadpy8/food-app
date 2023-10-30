/// <reference types="Cypress" />

describe("", () => {
  const base_url = "https://stage1.qhami.com";
  const username = "09551182503";
  const password = "123456789";
  let natioanalCode;

  it("", () => {
    Cypress.on("uncaught:exception", (err, runnable) => false);

    cy.wait(700);
    cy.loginMbazar(username, password);
    cy.wait(500);
    cy.visit("https://stage1.mbazarclub.com/cart"); ///// ورود به ام بازار

    cy.wait(500);
    cy.get("span").contains("دسته بندی").click();
    cy.wait(500);                             ///////////////// رفتن به دسته بندی
    cy.get("label").contains("کالای دیجیتال").click();
    cy.wait(500);
    cy.get("span").contains("افزودن به سبد خرید").click(); ////////////// افزودن بع سبد خرید
    cy.wait(500);
    cy.then(() => { ////////////// چک کردن شرط وحود داشتن اون محصول در غیر این صورت کم کردن آن و دوباره اضافه کردن
      if (cy.get(".add > :nth-child(2)").should("exist")) {
        cy.get(".add > :nth-child(3)").click();
        cy.wait(500);
        cy.get(".supplierrOne-add > .three > button").click();
        cy.wait(500);
        cy.get("img[alt='close']").click();
        cy.wait(500);
        cy.get(".itsCart > .d-flex > .IRYbold").click({ force: true }); ///// رقتن به سبد خرید
        cy.wait(500);
        cy.get("button")
          .contains("ادامه فرایند خرید")
          .scrollIntoView({ easing: "linear" });
        cy.wait(500);
        cy.get("button").contains("ادامه فرایند خرید").click();
        cy.wait(500);
        cy.get(".form-control").click(); /////////////// قرایند پر کردن توضیحات
        cy.wait(500);
        cy.get(".form-control").each(($el, index) => {
          cy.wrap($el).type(index === 0 ? "test" : "test2");
        });
        cy.wait(500);
        cy.get("label").contains("ثبت درخواست اقساطی").click(); ///// در خواست اقساطی
        cy.wait(500);
        cy.get("button").contains("پرداخت").click();
        cy.wait(500);
      } else { ////////////////// روند اینکه محصول وجود دارد و اینکه فقط روی افزودن کلیک کند
        cy.get(".supplierrOne-add > .three > button").click();
        cy.wait(500);
        cy.get("img[alt='close']").click();
        cy.wait(500);
        cy.get(".itsCart > .d-flex > .IRYbold").click({ force: true });
        cy.wait(500);
        cy.get("button")
          .contains("ادامه فرایند خرید")
          .scrollIntoView({ easing: "linear" });
        cy.wait(500);
        cy.get("button").contains("ادامه فرایند خرید").click();
        cy.wait(500);
        cy.get(".form-control").click();
        cy.wait(500);
        cy.get(".form-control").each(($el, index) => {
          cy.wrap($el).type(index === 0 ? "test" : "test2");
        });
        cy.wait(500);
        cy.get("label").contains("ثبت درخواست اقساطی").click();
        cy.wait(500);
        cy.get("button").contains("پرداخت").click();
        cy.wait(500);



        /* -------------------------------------------------------------------------- */
        /*          بقیع موارد به دلیل redirect نکردن سایت دستی انجام شده است         */
        /* -------------------------------------------------------------------------- */

        
      }
    });
  });
});
