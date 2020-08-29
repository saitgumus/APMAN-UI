export default class Messages {
  static PlsLogIn = "Merhaba. Lütfen giriş yapınız...";
  static EMailInputFormText = "Geçerli ve aktif bir mail adresi giriniz.";
  static EMailInvalid = "Geçersiz mail adresi.";
  static EMailValid = "";

  static MenuNames = {
    Main: {
      admin: "Admin",
    },
    Action: {
      addApartmernOrSite: "Site/Aparman ekle",
    },
    Other: {
      managment: "Yönetim",
    },
  };

  static ActionNames = {
    save: "Kaydet",
    /**giriş yap */
    enter: "Giriş Yap",
  };

  static LabelNames = {
    name: "Adınız",
    surname: "Soyadınız",
    email: "Mail Adresiniz",
    address: "Adres",
    zipcode: "Posta Kodu",
    city: "İl",
    county: "İlçe",
    recordType: "Kayıt Türü",
    password: "Parola",
  };

  static Warnings = {
    selectRecordType: "Kayıt Türünü Seçiniz..",
    /**işlem başarısız oldu. */
    CouldNotDoProc: "İşlem başarısız.",
  };

  static Errors = {
    InvalidInformation: "Eksik veya hatalı bilgi girdiniz.",
    /**hata oluştu mesajı */
    AccurredAnError: "İşlem yapılırken hata meydana geldi.",
  };
}
