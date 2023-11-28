export const numberWithCommas = (number) => {
  const checkNumber = number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","); //// چک کردن کاما های مبالغ
  return checkNumber; //// برگردوندن مبلغ که وارد شده
};

export const checkPrice = (price, time, xs) => { /// چک کردن مبلغ هر قسط
  const harGhest =
    (price * (xs / 1200) * Math.pow(1 + xs / 1200, time)) /
    (Math.pow(1 + xs / 1200, time) - 1); /// محسابات بدست آوردن مقدار فسط
  const mohasebehSod = time * harGhest; /// سود وام
  const khodeSod = mohasebehSod - price;
  return [harGhest.toFixed(), khodeSod.toFixed()]; ///// آرایه ای از مبلغ قسط در index=0 و index=1 مقدار سود
};


export const checkValueMaghsat = (valueAghsat, totalPrice, time, xs=0.0001) => {
  if (valueAghsat === 0 || null || undefined) { ///// شرط نبودن یا بودن بیعانه برای محاسبه کردن مبلغ قسط
    return checkPrice(totalPrice, time, xs); //// چک کردن مقدار قسط با تابع checkprice که در بالا نوشتع شده است
  } else {
    const newTotalAmount = valueAghsat + totalPrice; ///در صورتی که بیعانه وجود دارد را محاسبه می کند
    return checkPrice(newTotalAmount, time, xs);
  }
};

export const gettingHami = (hamiList, hamiName) => { /// تابع چک کردن اسم حامی مورد نظر
  const getFullName = hamiList.map((hami) => hami.fullName); /// بیرون کشیدن اسامی حامی
  console.log(getFullName);
  const getHami = getFullName.find((item) => item === hamiName); //// پیدا کردن اسم حامی مورد نظر از بین تمامی حامی ها
  console.log(getHami);
  if (getHami !== hamiName || null || undefined) {
    return cy.log("حامی مورد نظر وجود ندارد"); //// نشان دادن خطای نبودن اسم حامی مورد نظر
  } else {
    return getHami; /// برگردوندن اسم حامی مورد نظر
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
  expect(newPrice[1]).to.equal(toman); ///// چک کردن تومان بعضی ار مبالغ
};

export const randomIntFromInterval = (max, min) => {
  const number = Math.floor(Math.random() * (max - min + 1) + min);
  return number;
}; ///////////// نولید اعداد رنئوم بین اعداد دلخواه


