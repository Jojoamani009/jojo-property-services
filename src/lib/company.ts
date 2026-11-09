// Company details shown in the website footer.
// UK limited companies must show their registered name, company number,
// place of registration and registered office address on their website.

export const COMPANY = {
  name: "Jojo Property Services Ltd",
  number: "16060358",
  registeredIn: "England and Wales",
  office: {
    line1: "20 Eames Gardens",
    town: "Peterborough",
    postcode: "", // TODO: add the postcode exactly as shown on Companies House
    country: "United Kingdom",
  },
  wasteCarrier: "CBDL615596",
  serviceArea: "Peterborough and surrounding areas",
};

export const registeredOfficeAddress = [
  COMPANY.office.line1,
  COMPANY.office.town,
  COMPANY.office.postcode,
  COMPANY.office.country,
]
  .filter(Boolean)
  .join(", ");