export const numberWithCommas = (number) => {
  const checkNumber = number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return checkNumber;
};

export const checkPrice = (price, time, xs) => {
  const harGhest =
    (price * (xs / 1200) * Math.pow(1 + xs / 1200, time)) /
    (Math.pow(1 + xs / 1200, time) - 1);
  const mohasebehSod = time * harGhest;
  const khodeSod = mohasebehSod - price;
  return [harGhest, khodeSod];
};

export const finallPriceAghsat = (checking) => {
  const lastPrice =
    Math.floor(checking) + (checking - Math.floor(checking) >= 0.97 ? 1 : 0);
  return lastPrice;
};

export const checkValueMaghsat = (valueAghsat, totalPrice, time, xs) => {
  if (valueAghsat === 0 || null || undefined) {
    return checkPrice(totalPrice, time, xs);
  } else {
    const newTotalAmount = valueAghsat + totalPrice;
    return checkPrice(newTotalAmount, time, xs);
  }
};

export const gettingHami = (hamiList, hamiName) => {
  const getFullName = hamiList.map((hami) => hami.fullName);
  console.log(getFullName);
  const getHami = getFullName.find((item) => item === hamiName);
  console.log(getHami);
  if (getHami !== hamiName || null || undefined) {
    return cy.log("حامی مورد نظر وجود ندارد");
  } else {
    return getHami;
  }
};

// جدا کردن مبلغ از متن
export function extractPriceFromText(text) {
  const regex = /[\d,]+/;
  const match = text.match(regex); // حذف کردن متن فارسی از مبلغ بیمه
  const price = Number(match[0].replace(/,/g, "")); // حذف کاما از مبلغ
  //ذخیره مبلغ بیمه برای تطابق با صفحه بعدی و استفاده های اتی
  // array[0] = از متن مبلغ را بیرون کشیده بهمراه کاما
  return [match[0], price];
  // array[1] = عدد مبلغ است با تایپ نامبر
};

export const checkCurrncy = (amount) => {
  let toman = "تومان"
  const newPrice = amount.split(" ");
  expect(newPrice[1]).to.equal(toman);
};

