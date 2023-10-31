export const checkUserMhami =  {
    username1:"09551182503", //// کاربری که عضو حامی مورد نطر است
    username2:"09551182485",/// کاربری که عضو ام حامی نیست
};

export const maghsatPrice = {
    username: "09550000012",
};

export const checkMhami = {
    username : "09550000012",
};

export const pardakhtYekja = {
    username : "09551182503",
};

export const aghsatMbazar = {
    username: "09551182503"
};

export const sabtMhami = {
    username : "09550000012", //// برای وارد شدن در سایت
    usernameHami: "09551182486", //// نام کاربری برای حامی جدید
    nationalCodeHami: "6842811007", ////// کد ملی حامی حدید

    userHami1: "09551182503", ///// نام کاربری برای عضو حامی
    nationalHami1: "3052811002",/// کدملی 

    userHami2: "09551182505", ///// عضو دیگر
    nationalHami2: "5052811004" ////کد ملی
};

export const sabtMaghsatNotUser = {
    username : "09550000012",

    usernameHami: "09551173510",
    nationalCodeHami:"0153711000",

    userHami:"09551165591",
    nationalHami:"1955611009",
};

export const checkUserWithOutHami = {
    username: "09551165591"
};

export const password = "123456789"; ////پسوورد مشترک


export const informationTarhMhami = {
    titleTarh: "support2-details",
    infomation: "توضیخات", ////// بخش توضیحات ثبت طرح ام حامی
    price: "10000",///// قیمت پیش فرض طرح
    totalPrice: "500000000", ///// مبلغ کل طرح
    creditPrice: "50000000", ////// دادن مبلغ اعتبار
    priceUser: "2000000", ////// مبلع برای عر عضو حامی
};

export const informationSabt = {
    info: "tarh-hami-1",
    details: "test",
    price: "5000",
    totalPrice: "10000000",
    creditPrice : "500000",
    priceUser: "5000",
};

export const bodyCheckTarh = { ///// بادی چک کردن کاربری که غضو حامی باشد
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

export const bodyCheckNotTarh = { ////// بادی برای چک کردن کاربری که جز طرح نیست
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


export const getHami = (hamiList) => {

}
 