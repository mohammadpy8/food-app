// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add("concurrentLogins", (user) => {
  // const promises = users.map(user => {
  cy.visit("/"); //باز کردن وب سایت
  cy.get('#profile > [href="/"]').click({ force: true }); //رفتن به صفحه لاگین

  cy.url().should("include", "/sso/login"); // چک کردن وارد شدن در صفحه لاگین
  cy.get("#username").type(user.username); //وارد کردن نام کاربری
  cy.get("#password").type(user.password); //وارد کردن پسور
  cy.get("#captchaValue").type("111111"); //وارد کردن کد کپچا
  cy.get(".login100-form-btn").click(); //انجام عملیات لاگین
  // cy.url().should('include', 'qhami.com')//چک کردن بازگشت به صفحه اصلی بعد از لاگین
});

Cypress.Commands.add(
  "login",
  (
    username,
    password,
    { url = Cypress.env("M_RESALAT_URL"), captcha = "111111", waitingTime = 3000 } = {}
  ) => {
    cy.session(`${username}_M`, () => {
      //ذخیره کردن فرایند لاگین برای جلوگیری از لاگین مجدد برای هر تست
      //session با استفاده از
      Cypress.on("uncaught:exception", (err, runnable) => false); //جلوگیری از نمایش خطاهایی که حین تست رخ می‌دهد
      cy.visit(url); //رفتن به ادرس داده شده که به صورت پیشفرض ادرس خود ام‌رسالت است
      cy.wait(waitingTime);
      cy.get("#profile").click({ force: true }); //کلیک روی دکمه ورود
      cy.url("pathname", { timeout: 20000 }).should("contain", "/sso/login"); //بررسی ریدایرکت شدن به صفحه لاگین
      cy.get("#username").type(username); //وارکردن نام‌کاربری
      cy.get("#password").type(password); //وارد کردن کلمه عبور
      cy.get("#captchaValue").type(captcha); //وارد کردن کد کپچا که به صورت پیشفرض مقدار ۱۱۱۱۱۱ را دارد
      cy.get(".login100-form-btn").should("contain", "ورود").click({ force: true }); //کلیک برروی دکمه لاگین
      cy.location("href").should("contain", url); //چک کردن برگشتن به ادرس اصلی پس از فرایند لاگین
    });
  }
);

Cypress.Commands.add(
  "loginBP",
  (username, password, { url = Cypress.env("BACK_PANEL_URL"), captcha = "111111" } = {}) => {
    cy.session(`${username}_BP`, () => {
      //ذخیره کردن فرایند لاگین برای جلوگیری از لاگین مجدد برای هر تست
      //session با استفاده از
      Cypress.on("uncaught:exception", (err, runnable) => false); //جلوگیری از نمایش خطاهایی که حین تست رخ می‌دهد
      cy.visit(url); //رفتن به ادرس داده شده که به صورت پیشفرض ادرس خود بک‌پنل است
      cy.url("pathname").should("contain", "/sso/login"); //بررسی ریدایرکت شدن به صفحه لاگین
      cy.get("#username").type(username); //وارکردن نام‌کاربری
      cy.get("#password").type(password); //وارد کردن کلمه عبور
      cy.get("#captchaValue").type(captcha); //وارد کردن کد کپچا که به صورت پیشفرض مقدار ۱۱۱۱۱۱ را دارد
      cy.get(".login100-form-btn").should("contain", "ورود").click({ force: true }); //کلیک برروی دکمه لاگین
      cy.location("href").should("contain", url); //چک کردن برگشتن به ادرس اصلی پس از فرایند لاگین
    });
  }
);

Cypress.Commands.add("InputTypes", (element, typeValue, textInput) => {
  cy.get(element).then(() => {
    cy.window().then(() => {
      const textDetails = typeValue(window.prompt(textInput));
      cy.get(element).type(textDetails);
    })
  })
});

Cypress.Commands.add(
  "loginMbazar",
  (

    { url = 
      "https://stage1.mbazarclub.com/cart", captcha = "111111", waitingTime = 3000 } = {}
  ) => {
    cy.session(`09551182503_M`, () => {
      //ذخیره کردن فرایند لاگین برای جلوگیری از لاگین مجدد برای هر تست
      //session با استفاده از
      Cypress.on("uncaught:exception", (err, runnable) => false); //جلوگیری از نمایش خطاهایی که حین تست رخ می‌دهد
      cy.visit(url); //رفتن به ادرس داده شده که به صورت پیشفرض ادرس خود ام‌رسالت است
      cy.wait(waitingTime);
      // cy.get("#profile").click({ force: true }); //کلیک روی دکمه ورود
      // cy.url("pathname", { timeout: 20000 }).should("contain", "/sso/login"); //بررسی ریدایرکت شدن به صفحه لاگین
      cy.origin("https://stage1api.qhami.com/sso/login",() => {

        cy.get("#username").type("09551182503"); //وارکردن نام‌کاربری
        cy.get("#password").type("123456789"); //وارد کردن کلمه عبور
        cy.get("#captchaValue").type("111111"); //وارد کردن کد کپچا که به صورت پیشفرض مقدار ۱۱۱۱۱۱ را دارد
        cy.get(".login100-form-btn").should("contain", "ورود").click({ force: true }); //کلیک برروی دکمه لاگین
      })
      // cy.location("href").should("contain", url); //چک کردن برگشتن به ادرس اصلی پس از فرایند لاگین
    });
  }
);

// cy.wrap(Promise.all(promises));
// });
