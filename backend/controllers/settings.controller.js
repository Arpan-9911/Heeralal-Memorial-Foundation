import Settings from "../models/Settings.js";
import asyncHandler from "../middleware/asyncHandler.js";

const initialSettings = {
  general: [
    { key: "orgName", label: "Organisation Name", value: "Heeralal Memorial Foundation" },
    { key: "taglineEn", label: "Tagline (EN)", value: "Committed to Equality, Empowerment, and Sustainable Change" },
    { key: "taglineHi", label: "Tagline (HI)", value: "स्वतंत्रता, उपयोगीता और संरक्षित बदलाव के लिये" },
    { key: "latestNewsEn", label: "Latest News (EN)", value: "Heeralal Memorial Foundation expands education reach..." },
    { key: "latestNewsHi", label: "Latest News (HI)", value: "हीरलल मेमोरियल फाउंडेशन शिक्षा पहुंच को विकसित करता है..." },
    { key: "copyright", label: "Copyright Text", value: "© 2023-2024 Heeralal Memorial Foundation. All rights reserved." },
    { key: "managedBy", label: "Managed By", value: "Website Content Managed by SurPanix" },
  ],
  registration: [
    { key: "cin", label: "CIN", value: "U88900DL2023NPL416329" },
    { key: "regDate", label: "Registration Date", value: "June 29, 2023" },
    { key: "pan", label: "PAN", value: "AACH0000F" },
    { key: "rocNo", label: "ROC No.", value: "ITRA/DXM/S/ROC/..." },
    { key: "ngoReg", label: "NGO Reg No", value: "DL/2023/..." },
    { key: "section12A", label: "12A/12AB", value: "" },
    { key: "section80G", label: "80G", value: "" },
    { key: "darpanId", label: "DARPAN ID", value: "" },
  ],
  contact: [
    { key: "email", label: "Email", value: "admin@hlmf.org.in" },
    { key: "phone", label: "Phone", value: "+91 11-2345XXXX" },
    { key: "addressEn", label: "Address 1 (EN)", value: "12/4B Institutional Area, New Delhi - 110001" },
    { key: "addressHi", label: "Address 1 (HI)", value: "12/4B संस्थागत क्षेत्र, नई दिल्ली - 110001" },
    { key: "officeEn", label: "Office 1 Label (EN)", value: "Central Delhi Office:" },
    { key: "officeHi", label: "Office 1 Label (HI)", value: "मध्य दिल्ली कार्यालय:" },
    { key: "address2En", label: "Address 2 (EN)", value: "" },
    { key: "address2Hi", label: "Address 2 (HI)", value: "" },
    { key: "office2En", label: "Office 2 Label (EN)", value: "" },
    { key: "office2Hi", label: "Office 2 Label (HI)", value: "" },
    { key: "helpline", label: "Helpline (Toll Free)", value: "1800-XXX-XXXX" },
    { key: "donationEmail", label: "Donation Email", value: "donate@hlmf.org.in" },
    { key: "careerEmail", label: "Career Email", value: "hr@hlmf.org.in" },
    { key: "officeHoursMFEn", label: "Office Hours Mon-Fri (EN)", value: "Monday – Friday: 9:30 AM – 5:30 PM" },
    { key: "officeHoursMFHi", label: "Office Hours Mon-Fri (HI)", value: "सोमवार – शुक्रवार: सुबह 9:30 – शाम 5:30" },
    { key: "officeHoursSatEn", label: "Office Hours Saturday (EN)", value: "Saturday: 10:00 AM – 2:00 PM" },
    { key: "officeHoursSatHi", label: "Office Hours Saturday (HI)", value: "शनिवार: सुबह 10:00 – दोपहर 2:00" },
    { key: "officeHoursSunEn", label: "Office Hours Sunday (EN)", value: "Sunday & Gazetted Holidays: Closed" },
    { key: "officeHoursSunHi", label: "Office Hours Sunday (HI)", value: "रविवार और राजपत्रित अवकाश: बंद" },
    { key: "dept1TitleEn", label: "Dept 1 Title (EN)", value: "Education Wing" },
    { key: "dept1TitleHi", label: "Dept 1 Title (HI)", value: "शिक्षा विभाग" },
    { key: "dept1Contact", label: "Dept 1 Email", value: "education@hlmf.org.in" },
    { key: "dept1HeadEn", label: "Dept 1 Head (EN)", value: "Ms. Anjali Sharma" },
    { key: "dept1HeadHi", label: "Dept 1 Head (HI)", value: "सुश्री अंजलि शर्मा" },
    { key: "dept2TitleEn", label: "Dept 2 Title (EN)", value: "Healthcare Wing" },
    { key: "dept2TitleHi", label: "Dept 2 Title (HI)", value: "स्वास्थ्य सेवा विभाग" },
    { key: "dept2Contact", label: "Dept 2 Email", value: "health@hlmf.org.in" },
    { key: "dept2HeadEn", label: "Dept 2 Head (EN)", value: "Dr. Vivek Mehra" },
    { key: "dept2HeadHi", label: "Dept 2 Head (HI)", value: "डॉ. विवेक मेहरा" },
    { key: "dept3TitleEn", label: "Dept 3 Title (EN)", value: "Finance & Audit" },
    { key: "dept3TitleHi", label: "Dept 3 Title (HI)", value: "वित्त एवं ऑडिट" },
    { key: "dept3Contact", label: "Dept 3 Email", value: "finance@hlmf.org.in" },
    { key: "dept3HeadEn", label: "Dept 3 Head (EN)", value: "Mr. Arjun Malhotra" },
    { key: "dept3HeadHi", label: "Dept 3 Head (HI)", value: "श्री अर्जुन मल्होत्रा" },
    { key: "dept4TitleEn", label: "Dept 4 Title (EN)", value: "Legal & Compliance" },
    { key: "dept4TitleHi", label: "Dept 4 Title (HI)", value: "विधि एवं अनुपालन" },
    { key: "dept4Contact", label: "Dept 4 Email", value: "legal@hlmf.org.in" },
    { key: "dept4HeadEn", label: "Dept 4 Head (EN)", value: "Ms. Kavita Jain" },
    { key: "dept4HeadHi", label: "Dept 4 Head (HI)", value: "सुश्री कविता जैन" },
    { key: "googleMapsUrl", label: "Google Maps Embed URL", value: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.5445606837786!2d77.2090057!3d28.6328247!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd37b741d057%3A0xcdee88e47393c3f1!2sConnaught%20Place%2C%20New%20Delhi%2C%20Delhi!5e0!3m2!1sen!2sin!4v1700000000000" },
  ],
};

export const getSettings = asyncHandler(async (req, res) => {
  let settings = await Settings.findOne();
  if (!settings) {
    settings = await Settings.create(initialSettings);
  } else {
    // Merge backend initialSettings with fetched settings to ensure new keys are populated in DB
    let modified = false;
    for (const section of ["general", "registration", "contact"]) {
      const initialSection = initialSettings[section];
      if (!settings[section]) {
        settings[section] = [];
        modified = true;
      }
      
      const currentSection = settings[section];
      for (const initialItem of initialSection) {
        const exists = currentSection.some(item => item.key === initialItem.key);
        if (!exists) {
          currentSection.push(initialItem);
          modified = true;
        }
      }
      if (modified) {
        settings.markModified(section);
      }
    }
    if (modified) {
      await settings.save();
    }
  }
  res.status(200).json({ success: true, settings });
});

export const updateSettings = asyncHandler(async (req, res) => {
  const { general, registration, contact, executionLayout } = req.body;

  let settings = await Settings.findOne();
  if (!settings) {
    settings = await Settings.create(initialSettings);
  }

  if (general) {
    settings.general = general;
    settings.markModified("general");
  }
  if (registration) {
    settings.registration = registration;
    settings.markModified("registration");
  }
  if (contact) {
    settings.contact = contact;
    settings.markModified("contact");
  }
  if (executionLayout) {
    settings.executionLayout = executionLayout;
    settings.markModified("executionLayout");
  }

  await settings.save();

  res.status(200).json({ success: true, settings });
});
