export const bodyCheckTarh = {
  ///// بادی چک کردن کاربری که غضو حامی باشد
  isTogether: false,
  monthCount: 42,
  prePaymentAmount: 0,
  creditTenMonthAmount: 0,
  prepaymentModel: {
    prepaymentMap: {
      12418: [
        {
          totalAmount: 10000,
          facilityPercentage: 0,
          facilityMonth: 0,
          credit: 0,
          type: "USER",
          carrierGroupPrepayment: 0,
          carrierName: "",
          supplierName: "",
          allocatedCarrierGroupPrepayment: 0,
          serviceCost: "",
          includingDiscountServiceAmount: false,
          haamiId: 0,
          terminalId: "",
          serviceCostAmountDiscountInclude: "",
          extraIds: [],
          productModelList: [],
          carrierTransferAmount: 0,
        },
      ],
    },
    totalAmount: 10000,
    totalPrepayment: 0,
    resultCode: "",
    clientServiceCost: 0,
    platform: "ام حامی",
    clientRedirectUrl: "",
    mnesiyeServiceCostPercentage: "",
    maxMonth: 84,
    breathingPeriod: "",
    byFirstTransaction: "",
  },
};

export const bodyCheckNotTarh = {
  ////// بادی برای چک کردن کاربری که جز طرح نیست
  monthCount: 36,
  prePaymentAmount: 0,
  creditTenMonthAmount: 0,
  isTogether: false,
  prepaymentModel: {
    totalAmount: 10000,
    prepaymentMap: {
      12436: [
        {
          totalAmount: 10000,
          facilityPercentage: 0,
          facilityMonth: 0,
          credit: 0,
          type: "USER",
          carrierGroupPrepayment: 0,
          carrierName: "",
          supplierName: "",
          allocatedCarrierGroupPrepayment: 0,
          serviceCost: "",
          includingDiscountServiceAmount: false,
          haamiId: 0,
          terminalId: "",
          serviceCostAmountDiscountInclude: "",
          extraIds: [],
          productModelList: [],
          carrierTransferAmount: 0,
        },
      ],
    },
  },
};

export const bodyCheckPriceMaghsat = {
  monthCount: 24,
  prePaymentAmount: 0,
  creditTenMonthAmount: 0,
  isTogether: false,
  prepaymentModel: {
    totalAmount: 500000,
    prepaymentMap: {
      12344: [
        {
          totalAmount: 500000,
          facilityPercentage: 0,
          facilityMonth: 0,
          credit: 0,
          type: "USER",
          carrierGroupPrepayment: 0,
          carrierName: "",
          supplierName: "",
          allocatedCarrierGroupPrepayment: 0,
          serviceCost: "",
          includingDiscountServiceAmount: false,
          haamiId: 0,
          terminalId: "",
          serviceCostAmountDiscountInclude: "",
          extraIds: [],
          productModelList: [],
          carrierTransferAmount: 0,
        },
      ],
    },
  },
};

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
  const getHami = getFullName.find((item) => item === hamiName);
  if(getHami !== hamiName || null || undefined) {
    return alert("حامی مورد نظر برای عضو وجود ندارد")
  } else {
    return getHami;
  }
};
