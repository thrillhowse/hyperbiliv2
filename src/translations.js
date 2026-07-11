export const t = {
  en: {
    // Dictionary Words
    dictionary: {
      weeks: "weeks",
      entry: "Entry",
      from: "from",
      hours: "hours",
      yes: "Yes",
      no: "No",
      version: "Current version",
    },

    // Buttons
    buttons: {
      next: "Next",
      back: "Back",
      submit: "Submit",
      close: "Close",
      yes: "Yes",
      no: "No",
      enterBiliData: "Enter Bili Data",
      copyData: "Copy Data",
      copyGraph: "Copy Graph",
      print: "Print",
      startOver: "Start Over",
      startOverQuestion: "Start Over?",
      startOverWarning: "All patient details and bili data will be lost.",
      startOverYes: "Yes, Start Over",
    },

    // Infobar
    infobar: {
      home: "Home",
      about: "About",
      disclaimer: "Disclaimer",
      privacy: "Privacy",
      contact: "Contact",
      faq: "FAQ",
    },

    // Disclaimer
    disclaimer: {
      title: "Terms of use",
      header: "Disclaimer",
      firstSection: `Healthy Generations Foundation has provided an unrestricted grant to support the development of <em>hyperbili</em>.`,
      secondSection:
        "The Board of Healthy Generations has not conducted an in-depth scientific review of <em>hyperbili</em> and acknowledges and agrees that this tool will be used only as a reference aid, and that the information contained in the product is not intended to be (nor should it be used as) a substitute for the exercise of professional judgment.",
      thirdSection:
        "In view of the possibility of human error or changes in medical science, the User should confirm the information in the product through independent sources. This product is provided without warranties of any kind, express or implied, and the authors disclaim any liability, loss, or damage caused by it or its content.",
      fourthSection:
        "By continuing to use this product, you have indicated your acceptance of these terms.",
      consentBtn: "Consent & Continue",
    },

    // Wizard Progress Bar
    wizardProgressBar: {
      step1: "Patient Details",
      step2: "Bili Data",
      step3: "Summary",
    },

    // Wizard

    // Patient Details Section
    patientDetails: {
      header: "Patient Details",
      headerInfo:
        "Enter demographics and risk factors to proceed to bili data entry.",
      dob: "Date of Birth",
      dobOptional: "optional",
      dobDialogText1:
        "The date of birth is optional. If you already know the age in hours of the test, you can leave this blank.",
      dobDialogText2:
        "If you do enter the date and hour of birth along with the date and hour of the test, the age in hours will automatically be calculated for you!",
      hob: "Hour of Birth",
      hobOptional: "optional",
      hobDialogText1:
        "The hour of birth is optional. If you already know the age in hours of the test, you can leave this blank.",
      hobDialogText2:
        "If you do enter the date and hour of birth along with the date and hour of the test, the age in hours will automatically be calculated for you!",
      gestAge: "GA at Birth",
      gestAgeLong: "Gestational Age at Birth",
      gestAgeDialogText1:
        "Select the <em>completed</em> gestational age at birth in weeks",
      gestAgeDialogText2: "e.g., 37+6 weeks = 37 weeks",
      riskFactors: "Risk Factors",
      neurotoxicityRiskFactors: "Neurotoxicity Risk Factors",
      riskFactorsTable1b:
        "Table 1b: Risk factors that increase the neurotoxic effects of bilirubin",
      riskFactorsTable1bRow1: "Lower gestational age (&#60;38 weeks)*",
      riskFactorsTable1bRow2: "Hypoalbuminemia (serum albumin &#60;30 g/L)",
      riskFactorsTable1bRow3: "Suspected or diagnosed hemolytic conditions**",
      riskFactorsTable1bRow4: "Suspected or culture proven sepsis",
      riskFactorsTable1bRow5:
        "Significant hemodynamic and/or respiratory instability in the preceding 24 hours",
      riskFactorsTable1bNote1:
        '*Gestational age is automatically incorporated when you select "GA at Birth" and does not need to be considered when choosing "Yes" or "No" for Risk Factors',
      riskFactorsTable1bNote2:
        "**Hemolysis may be suspected based on a rapid rate of increase in TSB &#8805;5&#181;mol/L/hr (within 24 hours after birth) or &#8805;3.5&#181;mol/L/hr (beyond 24 hours after birth)",
      riskFactorsSubLabel1: "Does the patient have neurotoxicity risk factors",
      riskFactorsSubLabel2: "(other than gestational age)?",
      phototherapy: "Phototherapy",
      phototherapySublabel1: "Is the patient currently on phototherapy?",
      phototherapySublabel2: "Has the patient ever required phototherapy?",
      previousPhototherapyDialogText1: "Previous Phototherapy",
      previousPhototherapyDialogText2:
        "Select 'Yes' if the patient has been treated with phototherapy at any point in the past.",
      previousPhototherapyDialogText3:
        "ΔTSB cannot be used for patient's who have previously required phototherapy.",
    },

    // Bili Data Section
    biliData: {
      header: "Bili Data",
      headerInfo:
        "Enter bilirubin data then click Submit to proceed to summary.",
      entryHeader: "Entry",
      dot: "Date of Test",
      dotOptional: "optional",
      hot: "Hour of Test",
      hotOptional: "optional",
      ageInHours: "Age (hours)",
      ageInHoursDialogTitle: "Age in Hours",
      ageInHoursDialogText1: "You can enter the age in hours (if known)",
      ageInHoursDialogText2:
        "Otherwise, enter the date and hour of the test, and the age in hours will automatically be calculated.",
      tcb: "TcB (µmol/L)",
      tcbDialogTitle: "TcB",
      tcbDialogText: "Transcutaneous bilirubin",
      tsb: "TSB (µmol/L)",
      tsbDialogTitle: "TSB",
      tsbDialogText: "Total serum bilirubin",
      addEntryButton: "Add a New Entry",
      todayButton: "Today",
    },

    // Summary Section
    summary: {
      header: "Summary",
      headerInfo: "",
      patientSticker: "Patient Sticker",
      patientDetails: {
        header: "Patient Details",
        gestAge: "Gestational Age at Birth",
        neurotoxRF: "Neurotoxicity Risk Factors",
        currentPhoto: "Current Phototherapy",
        previousPhoto: "Previous Phototherapy",
      },
      biliData: {
        header: "Bilirubin Data",
        latestResult: "Latest Bilirubin Result",
        age: "Age",
        tcb: "TcB",
        tsb: "TSB",
        ror: "Rate of Rise",
        deltaTSB: "ΔTSB",
        interpretation: "Interpretation",
        phototherapy: "Phototherapy",
        preExchange: "Pre-Exchange",
        exchange: "Exchange Level",
        belowCutoff: "Below Cutoff",
        aboveCutoff: "Above Cutoff",
        comment: "Comment",
      },
      summaryErrorDialogTitle: "Missing Data",
      summaryErrorDialogText:
        "Some patient details or bilirubin data are missing or invalid. Please go back and ensure all required fields are filled out correctly.",
      missingGestAge: "Gestational age at birth",
      missingRiskFactors: "Risk factors",
      missingCurrentPhototherapy: "Current phototherapy",
      missingPreviousPhototherapy: "Previous phototherapy",
      missingAgeInHours: "Age in hours",
      duplicateAgeInHours:
        "One or more entries have the same age in hours - please ensure all entries have unique ages in hours",
      missingBiliValues:
        "Transcutaneous bilirubin (TcB) or Total Serum Bilirubin (TSB)",
    },

    comments: {
      deltaTSB: "ΔTSB",
      xc: {
        tsbXC:
          "<b>TSB <em>exceeds</em> Exchange Transfusion Threshold (see <a href='https://cps.ca/en/documents/position/hyperbilirubinemia-newborns' target='_blank' class='comment-link'>Recommendation 25</a>)</b>",
        tcbXC:
          "<b>TcB <em>exceeds</em> Exchange Transfusion Threshold (see <a href='https://cps.ca/en/documents/position/hyperbilirubinemia-newborns' target='_blank' class='comment-link'>Recommendation 25</a>).<br><br>Recommendation 10: When TcB testing is used to monitor infants with hyperbilirubinemia, obtain confirmatory testing with TSB if the TcB level is within 50 µmol/L of the hour-specific phototherapy threshold or if the TcB is above 250 µmol/L.</b>",
      },
      preXC: {
        tsbWithRF:
          "<b>TSB is <em>above</em> Pre-Exchange Transfusion Threshold & Risk Factors are present (see <a href='https://cps.ca/uploads/documents/Figure_5_-_English.pdf' target='_blank' class='comment-link'>Figure 5</a> and <a href='https://cps.ca/en/documents/position/hyperbilirubinemia-newborns' target='_blank' class='comment-link'>Recommendations 20-24 and 26</a>)</b><br><br>Recommendation 26: For infants with neurotoxicity risk factor(s), a BET can be initiated when TSB reaches the pre-exchange transfusion threshold (≤30 μmol/L of the exchange transfusion threshold).",
        tcbWithRF:
          "<b>TcB is <em>above</em> Pre-Exchange Transfusion Threshold & Risk Factors are present (see <a href='https://cps.ca/uploads/documents/Figure_5_-_English.pdf' target='_blank' class='comment-link'>Figure 5</a> and <a href='https://cps.ca/en/documents/position/hyperbilirubinemia-newborns' target='_blank' class='comment-link'>Recommendations 20-24 and 26</a>).</b><br><br>Recommendation 10: When TcB testing is used to monitor infants with hyperbilirubinemia, obtain confirmatory testing with TSB if the TcB level is within 50 µmol/L of the hour-specific phototherapy threshold or if the TcB is above 250 µmol/L.",
        tsbWithoutRF:
          "<b>TSB is <em>above</em> Pre-Exchange Transfusion Threshold (see <a href='https://cps.ca/uploads/documents/Figure_5_-_English.pdf' target='_blank' class='comment-link'>Figure 5</a> and <a href='https://cps.ca/en/documents/position/hyperbilirubinemia-newborns' target='_blank' class='comment-link'>Recommendations 20-24</a>)</b>",
        tcbWithoutRF:
          "<b>TcB is <em>above</em> Pre-Exchange Transfusion Threshold (see <a href='https://cps.ca/uploads/documents/Figure_5_-_English.pdf' target='_blank' class='comment-link'>Figure 5</a> and <a href='https://cps.ca/en/documents/position/hyperbilirubinemia-newborns' target='_blank' class='comment-link'>Recommendations 20-24</a>)</b>.<br><br>Recommendation 10: When TcB testing is used to monitor infants with hyperbilirubinemia, obtain confirmatory testing with TSB if the TcB level is within 50 µmol/L of the hour-specific phototherapy threshold or if the TcB is above 250 µmol/L.</b>",
      },
      onPhototherapy: {
        tsbAbovePhoto:
          "<b>TSB is <em>above</em> Phototherapy Threshold <em>while on Phototherapy</em> (see <a href='https://cps.ca/uploads/documents/Figure_4_-_English.pdf' target='_blank' class='comment-link'>Figure 4</a> and <a href='https://cps.ca/en/documents/position/hyperbilirubinemia-newborns' target='_blank' class='comment-link'>Recommendations 11-13, 14-15</a>)</b>",
        tsbBelowPhoto: {
          whileOnPhoto: "while on phototherapy<br><br>",
          tsbBelowPhotoSubtext:
            "TSB is below Phototherapy Threshold while on Phototherapy (see <a href='https://cps.ca/uploads/documents/Figure_4_-_English.pdf' target='_blank' class='comment-link'>Figure 4</a> and <a href='https://cps.ca/en/documents/position/hyperbilirubinemia-newborns' target='_blank' class='comment-link'>Recommendations 16 and 17)</a><br><br>Recommendation 16: Discontinue phototherapy at ΔTSB >30 μmol/L below treatment threshold for infants born ≥38 weeks GA and at ΔTSB >60 μmol/L for those born 35 to 37 weeks GA to minimize risk for rebound hyperbilirubinemia.",
        },
        tcb: "<b>TcB is not indicated while on Phototherapy. Please enter a TSB.</b>",
      },
      notOnPhototherapy: {
        tsbAbovePhoto:
          "<b>TSB is <em>above</em> Phototherapy Threshold (see <a href='https://cps.ca/uploads/documents/Figure_4_-_English.pdf' target='_blank' class='comment-link'>Figure 4</a> and <a href='https://cps.ca/en/documents/position/hyperbilirubinemia-newborns' target='_blank' class='comment-link'>Recommendations 11-13, 14-15</a>)</b>",
        tcbAbovePhoto:
          "<b>TcB is <em>above</em> Phototherapy Threshold (see <a href='https://cps.ca/uploads/documents/Figure_4_-_English.pdf' target='_blank' class='comment-link'>Figure 4</a> and <a href='https://cps.ca/en/documents/position/hyperbilirubinemia-newborns' target='_blank' class='comment-link'>Recommendations 10, 11-13, 14-15</a>).</b><br><br>Recommendation 10: When TcB testing is used to monitor infants with hyperbilirubinemia, obtain confirmatory testing with TSB if the TcB level is within 50 µmol/L of the hour-specific phototherapy threshold or if the TcB is above 250 µmol/L.</b>",
      },
      prePhoto: {
        tsbNearPhoto:
          "<b>TSB is within 30 μmol/L of Phototherapy Thresholds & Risk Factors are present (see <a href='https://cps.ca/en/documents/position/hyperbilirubinemia-newborns' target='_blank' class='comment-link'>Recommendation 12</a>)</b><br><br>Recommendation 12: For infants with neurotoxicity risk factors, consider initiating phototherapy when TSB is ≤30 μmol/L of the phototherapy threshold.",
        tcb250:
          "<b>TcB is ≥ 250 μmol/L (see <a href='https://cps.ca/en/documents/position/hyperbilirubinemia-newborns' target='_blank' class='comment-link'>Recommendation 10</a>)</b><br><br>Recommendation 10: When TcB testing is used to monitor infants with hyperbilirubinemia, obtain confirmatory testing with TSB if the TcB level is within 50 µmol/L of the hour-specific phototherapy threshold OR if the TcB is above 250 µmol/L.",
        tcbNearPhoto:
          "<b>TcB is within 50 μmol/L of Phototherapy Thresholds (see <a href='https://cps.ca/en/documents/position/hyperbilirubinemia-newborns' target='_blank' class='comment-link'>Recommendation 10</a>)</b><br><br>Recommendation 10: When TcB testing is used to monitor infants with hyperbilirubinemia, obtain confirmatory testing with TSB if the TcB level is within 50 µmol/L of the hour-specific phototherapy threshold OR if the TcB is above 250 µmol/L.</b>",
      },
      deltaTSBComments: {
        ageUnder12h: "ΔTSB cannot be calculated for age < 12 hours",
        previousPhoto: "ΔTSB cannot be calculated if previous phototherapy",
        lessThan30: {
          ageUnder24h:
            "µmol/L and Age < 24 hours <br><br><a href='https://cps.ca/en/documents/position/hyperbilirubinemia-newborns' target='_blank' class='comment-link'>Recommendation 4</a> & <a href='https://cps.ca/uploads/documents/Figure_1_-_English.pdf' target='_blank' class='comment-link'>Fig 1:</a><br><br>Delay discharge and consider starting phototherapy",
          ageOver24h:
            "µmol/L and Age >= 24 hours <br><br><a href='https://cps.ca/en/documents/position/hyperbilirubinemia-newborns' target='_blank' class='comment-link'>Recommendation 4</a> & <a href='https://cps.ca/uploads/documents/Figure_1_-_English.pdf' target='_blank' class='comment-link'>Fig 1:</a><br><br>Delay discharge; repeat TSB within 4-12 hours and consider starting phototherapy if TSB continues to increase",
        },
        lessThan60:
          "µmol/L <br><br><a href='https://cps.ca/en/documents/position/hyperbilirubinemia-newborns' target='_blank' class='comment-link'>Recommendation 4</a> & <a href='https://cps.ca/uploads/documents/Figure_1_-_English.pdf' target='_blank' class='comment-link'>Fig 1:</a><br><br>Repeat TSB within 12-24 hours and reassess need for phototherapy",
        lessThan90:
          "µmol/L <br><br><a href='https://cps.ca/en/documents/position/hyperbilirubinemia-newborns' target='_blank' class='comment-link'>Recommendation 4</a> & <a href='https://cps.ca/uploads/documents/Figure_1_-_English.pdf' target='_blank' class='comment-link'>Fig 1:</a><br><br>Repeat TSB within 24-48 hours",
        greaterThan90:
          "µmol/L <br><br><a href='https://cps.ca/en/documents/position/hyperbilirubinemia-newborns' target='_blank' class='comment-link'>Recommendation 4</a> & <a href='https://cps.ca/uploads/documents/Figure_1_-_English.pdf' target='_blank' class='comment-link'>Fig 1:</a><br><br>Routine follow up with primary health provider",
      },
    },

    graphs: {
      exchangeLine: "Exchange Line",
      exchangeTitleNoRF:
        "Exchange transfusion thresholds for infants with no neurotoxicity risk factors",
      exchangeTitleWithRF:
        "Exchange transfusion thresholds for infants with neurotoxicity risk factors",
      photoLine: "Phototherapy Line",
      photoTitleNoRF:
        "Phototherapy thresholds for infants with no neurotoxicity risk factors",
      photoTitleWithRF:
        "Phototherapy thresholds for infants with neurotoxicity risk factors",
      tsb: "TSB",
      tcb: "TcB",
      ageInHours: "Age (in Hours)",
    },

    // Update Warning Dialog
    updateWarning: {
      title: "hyperbili has been updated!",
      text1:
        "This version now includes French translations and an updated look & feel.",
      text2:
        "Please carefully review summary and graph results to ensure accuracy and optimal patient care. If you notice any issues, please reach out to hyperbili@outlook.com. Thank you!",
      okBtn: "I Understand",
    },

    // Updates
    updates: {
      header: "UPDATES",
      header1: "hyperbili - now in French!",
      text1:
        "hyperbili is now available in both English and French. You can select your preferred language using the button in the top right corner of the infobar.",
      header2: "Updated look & feel",
      text2: "Hope you like it! Feedback always welcome at ",
    },

    // Bili Data Info
    biliDataInfo: {
      header: "Bili Data Details",
      header1: "Date & Hour of Test",
      text1:
        "Optional - if you enter both the date and hour of birth along with the date and hour of test, the age in hours will automatically be calculated for you!",
      header2: "Age in Hours",
      text2:
        "If you know the age in hours of the test, you can simply enter it here.",
      header3: "TcB",
      text3: "Transcutaneous bilirubin in µmol/L",
      header4: "TSB",
      text4: "Total serum bilirubin in µmol/L",
    },

    // RoR Dialog
    rorWarning: {
      title: "Warning",
      text1: "The rate of rise (RoR) is high for the patient's age!",
      text2:
        "Consider selecting 'Yes' for Risk Factors as this may indicate a hemolytic condition. Please review the patient's details and bili data to ensure accuracy.",
    },

    // Clinical Disclaimer
    clinicalDisclaimer: {
      header1: "Clinical Disclaimer",
      text1:
        "The information provided by this tool is intended to be used only as a reference aid. It is not intended to be (nor should it be used as) a substitute for the exercise of professional judgment. The authors and Healthy Generations Foundation disclaim any liability, loss, or damage caused by it or its content.",
    },

    // CPS Guidelines
    cpsGuidelines: {
      header1: "CPS 2026 Guidelines",
      text1:
        "This tool is based on the Canadian Paediatric Society’s 2026 position statement titled Guidelines for detection and management of hyperbilirubinemia in term and late preterm newborns (≥35 weeks gestational age)",
    },

    // Error
    error: {
      patientDOBErrorMsg: "Please enter a valid date of birth",
      patientFutureDOBErrorMsg: "Date of birth cannot be in the future",
      patientDOBAfterDOTErrorMsg: "Date of birth cannot be after date of test",
      patientHOBErrorMsg: "Please enter a valid hour of birth",
      patientFutureHOBErrorMsg:
        "Hour of birth cannot be after the date/time of any test already entered",
      patientGestAgeErrorMsg: "Please enter a valid gestational age at birth",
      patientRiskFactorsErrorMsg: "Please select yes or no for risk factors",
      patientCurrentPhototherapyErrorMsg:
        "Please select yes or no for current phototherapy",
      patientPreviousPhototherapyErrorMsg:
        "Please select yes or no for previous phototherapy",
      missingDateOfBirthErrorMsg:
        "Please enter both date and hour of birth to calculate age in hours, or leave both fields blank if age in hours is already known",
      missingHourOfBirthErrorMsg:
        "Please enter both date and hour of birth to calculate age in hours, or leave both fields blank if age in hours is already known",
      dateOfTestErrorMsg: "Please enter a valid test date",
      missingDOBorHOB:
        "Please enter both date and hour of birth to calculate age in hours",
      dotBeforeDOB: "Date/time of test cannot be before date of birth",
      hourOfTestErrorMsg: "Please enter a valid test hour",
      hotBeforeDOB: "Date/hour of test cannot be before date of birth",
      ageInHoursErrorMsg: "Age in hours must be greater than or equal to 0",
      tcbErrorMsg: "Please enter a valid transcutaneous bilirubin value",
      tsbErrorMsg: "Please enter a valid total serum bilirubin value",
    },

    about: {
      header: "About",
      text1:
        "<em>hyperbili</em> is a free, easy-to-use online tool to help clinicians caring for newborns with jaundice.",
      text2:
        "Based on the Canadian Pediatric Society's statement <a href='https://cps.ca/en/documents/position/hyperbilirubinemia-newborns' target='_blank'>'Guidelines for detection and management of hyperbilirubinemia in term and late preterm newborns (≥35 weeks gestational age)'</a>, <em>hyperbili</em> can tabulate and plot data about your patient's bilirubin.",
      release: "Last release",
    },

    // note: disclaimer is a separate section already defined above

    privacy: {
      header: "Privacy",
      text1:
        "<em>hyperbili</em> is built so that your patient's data never leaves your device.",
      itemTitle1: "No personal health information collected",
      itemText1:
        "<em>hyperbili</em> does not collect or store any patient data.",
      itemTitle2: "All data stays on your device",
      itemText2: "Everything you enter remains client-side, in your browser.",
      itemTitle3: "Nothing sent to the server",
      itemText3: "No information is ever transmitted for processing.",
    },

    contact: {
      header: "Contact",
      email: "Email",
      creator: "Creator",
      text1: "This work would not have existed without the support of",
      support1:
        "Dr. Eugene Ng, MD, FRCPC, FAAP, Neonatologist and first author of the CPS statement",
      support2:
        "Dr. Michael Narvey, MD, FRCPCP, FAAP, Neonatologist and Past Chair of CPS Fetus &amp; Newborn Committee",
      support3: "Canadian Paediatric Society (CPS)",
      support4a: "American Academy of Pediatrics (AAP)",
      support4b: ", who provided data for the graphs",
      support5: "Healthy Generations Foundation",
    },

    faq: {
      header: "Frequently Asked Questions",
      q1: "Is there a phone app?",
      a1: "No. <em>hyperbili</em> is a web application. As such, you can access it on your phone from any browser. It can also be accessed on your computer. This was intentional so that clinician's can access the information they need from anywhere.",
      q2: "Can I save the data I enter?",
      a2: "Unfortunately, no. The data is erased once you leave the page. This too is intentional, to avoid any personal health information being sent over the internet.",
      q3: "Does the app automatically calculate the age in hours?",
      a3: "Yes. If you enter the date and hour of birth along with the date and hour of the test, <em>hyperbili</em> calculates the age in hours for you.",
      q4: "Do I include gestational age when determining whether or not there are risk factors?",
      a4: "No. Although gestational age is considered a neurotoxicity risk factor, it is already incorporated into the different curves when you select the gestational age.",
    },

    print: {
      dob: "Date of Birth",
      hob: "Hour of Birth",
      gestAge: "Gestational Age at Birth",
      riskFactors: "Neurotoxicity Risk Factors",
      currentPhoto: "Current Phototherapy",
      previousPhoto: "Previous Phototherapy",
    },
  },
  fr: {
    // Dictionary Words
    dictionary: {
      weeks: "semaines",
      entry: "Entrée",
      from: "de",
      yes: "Oui",
      no: "Non",
      hours: "heures",
      version: "Version actuelle",
    },

    // Buttons
    buttons: {
      next: "Suivant",
      back: "Retour",
      submit: "Soumettre",
      close: "Fermer",
      yes: "Oui",
      no: "Non",
      enterBiliData: "Saisir les données de bilirubine",
      copyData: "Copier les données",
      copyGraph: "Copier le graphique",
      print: "Impression",
      startOver: "Recommencer",
      startOverQuestion: "Recommencer?",
      startOverWarning:
        "Toutes les informations relatives aux patients et les données biliaires saisies seront perdues.",
      startOverYes: "Oui, recommencer",
    },

    // Infobar
    infobar: {
      home: "Accueil",
      about: "A propos",
      disclaimer: "Avis de non responsabilité",
      privacy: "Confidentialité",
      contact: "Coordonnées",
      faq: "FAQ",
    },

    // Disclaimer
    disclaimer: {
      title: "Conditions d'utilisation",
      header: "Avis de non-responsabilité",
      firstSection: `La Fondation Générations en santé, qui fait partie de la Société canadienne de pédiatrie (SCP), a versé une bourse d’éducation sans restrictions pour financer l’élaboration d’hyperbili.`,
      secondSection: `Le conseil d’administration de Générations en santé n’a pas procédé à une analyse scientifique approfondie d’hyperbili. Il reconnaît et accepte que cet outil sera utilisé seulement comme référence et que l’information qu’il contient n’est pas conçue (ni ne devrait l’être) pour remplacer le jugement professionnel.`,
      thirdSection: `Étant donné la possibilité d’erreur humaine ou d’évolution de la médecine, l’utilisateur doit confirmer l’information contenue dans l’outil auprès de sources indépendantes. Ce produit est fourni sans garanties quelles qu’elles soient, explicites ou implicites, et les auteurs déclinent toute responsabilité, toutes pertes ou tous dommages dont l’outil ou son contenu serait responsable.`,
      fourthSection: `En continuant d’utiliser ce produit, vous indiquez que vous en acceptez les modalités.`,
      consentBtn: "Consentir et continuer",
    },

    // Wizard Progress Bar
    wizardProgressBar: {
      step1: "Information sur les patients",
      step2: "Données sur la bilirubine",
      step3: "Sommaire",
    },

    // Wizard

    // Patient Details Section
    patientDetails: {
      header: "Information sur les patients",
      headerInfo:
        "Entrez les données démographiques et les facteurs de risque pour accéder à la saisie des données sur la bilirubine.",
      dob: "Date de naissance",
      dobOptional: "optionnel",
      dobDialogText1:
        "La date de naissance est optionnelle. Si vous connaissez déjà l’âge en heures du test, vous pouvez laisser ce champ vide.",
      dobDialogText2:
        "Si vous saisissez la date et l’heure de naissance ainsi que la date et l’heure du test, l’âge en heures sera automatiquement calculé pour vous!",
      hob: "Heure de naissance",
      hobOptional: "optionnel",
      hobDialogText1:
        "L’heure de naissance est optionnelle. Si vous connaissez déjà l’âge en heures du test, vous pouvez laisser ce champ vide.",
      hobDialogText2:
        "Si vous saisissez la date et l’heure de naissance ainsi que la date et l’heure du test, l’âge en heures sera automatiquement calculé pour vous!",
      gestAge: "AG à la naissance",
      gestAgeLong: "Âge gestationnel à la naissance",
      gestAgeDialogText1:
        "Sélectionnez l’âge gestationnel <em>terminé</em> à la naissance, en semaines",
      gestAgeDialogText2: "p.ex., 37+6 semaines = 37 semaines",
      riskFactors: "Facteurs de risque",
      neurotoxicityRiskFactors: "Facteurs de risque de neurotoxicité",
      riskFactorsTable1b:
        "Tableau 1b : Les facteurs de risque qui accroissent les effets neurotoxiques de la bilirubine",
      riskFactorsTable1bRow1:
        "Jeune âge gestationnel à la naissance (moins de 38 semaines)*",
      riskFactorsTable1bRow2:
        "Hypoalbuminémie (albumine sérique inférieure à 30 g/L)",
      riskFactorsTable1bRow3:
        "Affection hémolytique présumée ou diagnostiquée**",
      riskFactorsTable1bRow4: "Sepsis présumé ou démontré par culture",
      riskFactorsTable1bRow5:
        "Instabilité hémodynamique ou respiratoire marquée (ou les deux) dans les 24 heures précédentes",
      riskFactorsTable1bNote1:
        "*L’âge gestationnel est intégré automatiquement lorsque vous sélectionnez « AG à la naissance » et n’a pas besoin d’être pris en compte au moment de sélectionner « Oui » ou « Non » à l’égard des facteurs de risque.",
      riskFactorsTable1bNote2:
        "**L’anémie hémolytique peut être présumée d’après une augmentation rapide de la BST d’au moins 5 µmol/L/h (jusqu’à 24 heures de vie) ou d’au moins 3,5 µmol/L/h (après 24 heures de vie)",
      riskFactorsSubLabel1:
        "Le patient présente-t-il des facteurs de risque de neurotoxicité ",
      riskFactorsSubLabel2: "(à part l’âge gestationnel)?",
      phototherapy: "Photothérapie",
      phototherapySublabel1:
        "Le patient est-il actuellement sous photothérapie?",
      phototherapySublabel2:
        "Le patient a-t-il déjà eu besoin de photothérapie?",
      previousPhototherapyDialogText1: "Photothérapie antérieure",
      previousPhototherapyDialogText2:
        "Sélectionnez « Oui » si le patient a reçu un traitement de photothérapie en tout temps par le passé.",
      previousPhototherapyDialogText3:
        "La Δ-BST ne peut pas être utilisée pour le patient qui a déjà dû recevoir une photothérapie.",
    },

    // Bili Data Section
    biliData: {
      header: "Données sur la bilirubine",
      headerInfo:
        "Entrez les données sur la bilirubine puis cliquez sur Soumettre pour accéder au sommaire.",
      entryHeader: "Entrée",
      dot: "Date du test",
      dotOptional: "optionnel",
      hot: "Heure du test",
      hotOptional: "optionnel",
      ageInHours: "Âge (en heures)",
      ageInHoursDialogTitle: "Âge en heures",
      ageInHoursDialogText1:
        "Vous pouvez saisir l’âge, en heures (si vous la connaissez).",
      ageInHoursDialogText2:
        "Autrement, inscrivez la date et l’heure du test, et l’âge en heures sera calculé automatiquement.",
      tcb: "BTc (µmol/L)",
      tcbDialogTitle: "BTc",
      tcbDialogText: "Bilirubine transcutanée",
      tsb: "BST (µmol/L)",
      tsbDialogTitle: "BST",
      tsbDialogText: "Bilirubine sérique totale",
      addEntryButton: "Ajouter une nouvelle entrée",
      todayButton: "Aujourd'hui",
    },

    // Summary
    summary: {
      header: "Résumé",
      headerInfo: "",
      patientSticker: "Sticker du patient",
      patientDetails: {
        header: "Information sur les patients",
        gestAge: "Âge gestationnel à la naissance",
        neurotoxRF: "Facteurs de risque de neurotoxicité",
        currentPhoto: "Photothérapie actuelle",
        previousPhoto: "Photothérapie antérieure",
      },
      biliData: {
        header: "Données sur la bilirubine",
        latestResult: "Dernier résultats de la bilirubine",
        age: "Âge",
        tcb: "BTc",
        tsb: "BST",
        ror: "Taux d'augmentation",
        deltaTSB: "ΔBST",
        interpretation: "Interprétation",
        phototherapy: "Photothérapie",
        preExchange: "Préexsanguinotransfusion",
        exchange: "Seuil d’exsanguinotransfusion",
        belowCutoff: "Sous le seuil",
        aboveCutoff: "Au-dessus du seuil",
        comment: "Commentaire",
      },
      summaryErrorDialogTitle: "Données manquantes",
      summaryErrorDialogText:
        "Certaines informations concernant le patient ou les données relatives à la bilirubine sont manquantes ou invalides. Veuillez vérifier que tous les champs obligatoires sont bien remplis.",
      missingGestAge: "Âge gestationnel à la naissance",
      missingRiskFactors: "Facteurs de risque",
      missingCurrentPhototherapy: "Photothérapie actuelle",
      missingPreviousPhototherapy: "Photothérapie antérieure",
      missingAgeInHours: "Âge en heures",
      duplicateAgeInHours:
        "Une ou plusieurs entrées ont le même âge en heures - veuillez vous assurer que toutes les entrées ont des âges différents en heures",
      missingBiliValues:
        "Bilirubine transcutanée (BTc) ou bilirubine sérique totale (BST)",
    },

    comments: {
      deltaTSB: "Δ-BST",
      xc: {
        tsbXC:
          "La BST dépasse le seuil d’exsanguinotransfusion (voir la <a href='https://cps.ca/fr/documents/position/hyperbilirubinemie-neonatale' target='_blank' class='comment-link'>recommandation 25</a>).",
        tcbXC:
          "La BTc dépasse le seuil d’exsanguinotransfusion (voir la <a href='https://cps.ca/fr/documents/position/hyperbilirubinemie-neonatale' target='_blank' class='comment-link'>recommandation 25</a>).<br><br>Recommandation 10 : Lorsque la mesure de la BTc est utilisée pour surveiller les nouveau-nés atteints d’hyperbilirubinémie, obtenir un test de confirmation par BST si le taux de BTc se situe dans les 50 µmol/L du seuil de photothérapie en fonction des heures de vie ou si la BTc dépasse 250 µmol/L.",
      },
      preXC: {
        tsbWithRF:
          "La BST dépasse le seuil de préexsanguinotransfusion et des facteurs de risque sont présents (voir la <a href='https://cps.ca/uploads/documents/Hyperbili_-_Figure_5_-_French_-_Jan_2026.pdf' target='_blank' class='comment-link'>figure 5</a> et les <a href='https://cps.ca/fr/documents/position/hyperbilirubinemie-neonatale' target='_blank' class='comment-link'>recommandations 20 à 24 et 26</a>).<br><br>Recommandation 26 : Chez les nouveau-nés présentant des facteurs de risque de neurotoxicité, envisager d’entreprendre une ETST lorsque la BST atteint le seuil de préexsanguinotransfusion (ne dépasse pas 30 μmol/L du seuil d’exsanguinotransfusion).",
        tcbWithRF:
          "La BTc dépasse le seuil de préexsanguinotransfusion et des facteurs de risque sont présents (voir la <a href='https://cps.ca/uploads/documents/Hyperbili_-_Figure_5_-_French_-_Jan_2026.pdf' target='_blank' class='comment-link'>figure 5</a> et les <a href='https://cps.ca/fr/documents/position/hyperbilirubinemie-neonatale' target='_blank' class='comment-link'>recommandations 20 à 24 et 26</a>).<br><br>Recommandation 10 : Lorsque la mesure de la BTc est utilisée pour surveiller les nouveau-nés atteints d’hyperbilirubinémie, obtenir un test de confirmation par BST si le taux de BTc se situe dans les 50 µmol/L du seuil de photothérapie en fonction des heures de vie ou si la BTc dépasse 250 µmol/L.",
        tsbWithoutRF:
          "La BST dépasse le seuil de préexsanguinotransfusion (voir la <a href='https://cps.ca/uploads/documents/Hyperbili_-_Figure_5_-_French_-_Jan_2026.pdf' target='_blank' class='comment-link'>figure 5</a> et les <a href='https://cps.ca/fr/documents/position/hyperbilirubinemie-neonatale' target='_blank' class='comment-link'>recommandations 20 à 24</a>).",
        tcbWithoutRF:
          "La BTc dépasse le seuil de préexsanguinotransfusion (voir la <a href='https://cps.ca/uploads/documents/Hyperbili_-_Figure_5_-_French_-_Jan_2026.pdf' target='_blank' class='comment-link'>figure 5</a> et les <a href='https://cps.ca/fr/documents/position/hyperbilirubinemie-neonatale' target='_blank' class='comment-link'>recommandations 20 à 24</a>).<br><br>Recommandation 10 : Lorsque la mesure de la BTc est utilisée pour surveiller les nouveau-nés atteints d’hyperbilirubinémie, obtenir un test de confirmation par BST si le taux de BTc se situe dans les 50 µmol/L du seuil de photothérapie en fonction des heures de vie ou si la BTc dépasse 250 µmol/L.",
      },
      onPhototherapy: {
        tsbAbovePhoto:
          "La BST dépasse le seuil de photothérapie pendant la photothérapie (voir la <a href='https://cps.ca/uploads/documents/Hyperbili_-_Figure_4_-_French_-_Jan_2026.pdf' target='_blank' class='comment-link'>figure 4</a> et <a href='https://cps.ca/fr/documents/position/hyperbilirubinemie-neonatale' target='_blank' class='comment-link'>les recommandations 11 à 13, 14 et 15</a>).",
        tsbBelowPhoto: {
          whileOnPhoto: "pendant la photothérapie<br><br>",
          tsbBelowPhotoSubtext:
            "La BST se situe sous le seuil de photothérapie pendant la photothérapie (voir la <a href='https://cps.ca/uploads/documents/Hyperbili_-_Figure_4_-_French_-_Jan_2026.pdf' target='_blank' class='comment-link'>figure 4</a> et les <a href='https://cps.ca/fr/documents/position/hyperbilirubinemie-neonatale' target='_blank' class='comment-link'>recommandations 16 et 17</a>).<br><br>Recommandation 16 : Mettre un terme à la photothérapie lorsque la Δ-BST se situe à plus de 30 μmol/L sous le seuil de traitement chez les nouveau-nés d’au moins 38 semaines d’AG et à plus de 60 μmol/L chez les nouveau-nés de 35 à 37 semaines d’AG pour limiter le risque d’hyperbilirubinémie de rebond.",
        },
        tcb: "La BTc n’est pas indiquée pendant la photothérapie. Inscrire une BST.",
      },
      notOnPhototherapy: {
        tsbAbovePhoto:
          "La BST dépasse le seuil de photothérapie (voir la <a href='https://cps.ca/uploads/documents/Hyperbili_-_Figure_4_-_French_-_Jan_2026.pdf' target='_blank' class='comment-link'>figure 4</a> et les <a href='https://cps.ca/fr/documents/position/hyperbilirubinemie-neonatale' target='_blank' class='comment-link'>recommandations 11 à 13, 14 et 15</a>)",
        tcbAbovePhoto:
          "La BTc dépasse le seuil de photothérapie (voir la <a href='https://cps.ca/uploads/documents/Hyperbili_-_Figure_4_-_French_-_Jan_2026.pdf' target='_blank' class='comment-link'>figure 4</a> et les <a href='https://cps.ca/fr/documents/position/hyperbilirubinemie-neonatale' target='_blank' class='comment-link'>recommandations 11 à 13, 14 et 15</a>).<br><br>Recommandation 10 : Lorsque la mesure de la BTc est utilisée pour surveiller les nouveau-nés atteints d’hyperbilirubinémie, obtenir un test de confirmation par BST si le taux de BTc se situe dans les 50 µmol/L du seuil de photothérapie en fonction des heures de vie ou si la BTc dépasse 250 µmol/L.",
      },
      prePhoto: {
        tsbNearPhoto:
          "La BST ne dépasse pas 30 µmol/L du seuil de photothérapie et des facteurs de risque sont présents (voir la <a href='https://cps.ca/fr/documents/position/hyperbilirubinemie-neonatale' target='_blank' class='comment-link'>recommandation 12</a>).<br><br>Recommandation 12 : Chez les nouveau-nés qui présentent des facteurs de risque de neurotoxicité, envisager une photothérapie lorsque la BST ne dépasse pas 30 μmol/L du seuil de photothérapie.",
        tcb250:
          "La BTc est d’au moins 250 µmol/L (voir la <a href='https://cps.ca/fr/documents/position/hyperbilirubinemie-neonatale' target='_blank' class='comment-link'>recommandation 10</a>).<br><br>Recommandation 10 : Lorsque la mesure de la BTc est utilisée pour surveiller les nouveau-nés atteints d’hyperbilirubinémie, obtenir un test de confirmation par BST si le taux de BTc se situe dans les 50 µmol/L du seuil de photothérapie en fonction des heures de vie ou si la BTc dépasse 250 µmol/L.",
        tcbNearPhoto:
          "La BTc se situe dans les 50 µmol/L des seuils de photothérapie (voir la <a href='https://cps.ca/fr/documents/position/hyperbilirubinemie-neonatale' target='_blank' class='comment-link'>recommandation 10</a>).<br><br>Recommandation 10 : Lorsque la mesure de la BTc est utilisée pour surveiller les nouveau-nés atteints d’hyperbilirubinémie, obtenir un test de confirmation par BST si le taux de BTc se situe dans les 50 µmol/L du seuil de photothérapie en fonction des heures de vie ou si la BTc dépasse 250 µmol/L.",
      },
      deltaTSBComments: {
        ageUnder12h:
          "La Δ-BST ne peut pas être calculée à moins de 12 heures de vie.",
        previousPhoto:
          "La Δ-BST ne peut pas être calculée en cas de photothérapie antérieure.",
        lessThan30: {
          ageUnder24h:
            "µmol/L et Moins de 24 heures de vie conformément à la <a href='https://cps.ca/fr/documents/position/hyperbilirubinemie-neonatale' target='_blank' class='comment-link'>recommandation 4</a> et à la <a href='https://cps.ca/uploads/documents/Hyperbili_-_Figure_1_-_French_-_Jan_2026.pdf' target='_blank' class='comment-link'>figure 1</a>: Reporter le congé et envisager d’entreprendre la photothérapie.",
          ageOver24h:
            "µmol/L et au moins 24 heures de vie conformément à la <a href='https://cps.ca/fr/documents/position/hyperbilirubinemie-neonatale' target='_blank' class='comment-link'>recommandation 4</a> et à la <a href='https://cps.ca/uploads/documents/Hyperbili_-_Figure_1_-_French_-_Jan_2026.pdf' target='_blank' class='comment-link'>figure 1</a>: Reporter le congé. Reprendre la BST dans les quatre à 12 heures et envisager d’entreprendre la photothérapie si la BST augmente.",
        },
        lessThan60:
          "µmol/L <br><br><a href='https://cps.ca/fr/documents/position/hyperbilirubinemie-neonatale' target='_blank' class='comment-link'>Recommandation 4</a> et <a href='https://cps.ca/uploads/documents/Hyperbili_-_Figure_1_-_French_-_Jan_2026.pdf' target='_blank' class='comment-link'>figure 1</a>: Reprendre la BST dans les 12 à 24 heures et réévaluer la nécessité d’entreprendre la photothérapie.",
        lessThan90:
          "µmol/L <br><br><a href='https://cps.ca/fr/documents/position/hyperbilirubinemie-neonatale' target='_blank' class='comment-link'>Recommandation 4</a> et <a href='https://cps.ca/uploads/documents/Hyperbili_-_Figure_1_-_French_-_Jan_2026.pdf' target='_blank' class='comment-link'>figure 1</a>: Reprendre la BST dans les 24 à 48 heures.",
        greaterThan90:
          "µmol/L <br><br><a href='https://cps.ca/fr/documents/position/hyperbilirubinemie-neonatale' target='_blank' class='comment-link'>Recommandation 4</a> et <a href='https://cps.ca/uploads/documents/Hyperbili_-_Figure_1_-_French_-_Jan_2026.pdf' target='_blank' class='comment-link'>figure 1</a>: Entreprendre un suivi systématique avec le dispensateur de soins primaires.",
      },
    },

    graphs: {
      exchangeLine: "Seuils d’exsanguinotransfusion ",
      exchangeTitleNoRF:
        "Les seuils d’exsanguinotransfusion chez les nouveau-nés sans facteur de risque de neurotoxicité",
      exchangeTitleWithRF:
        "Les seuils d’exsanguinotransfusion chez les nouveau-nés présentant des facteurs de risque de neurotoxicité",
      photoLine: "Seuil de photothérapie",
      photoTitleNoRF:
        "Les seuils de photothérapie des nouveau-nés sans facteurs de risque de neurotoxicité ",
      photoTitleWithRF:
        "Les seuils de photothérapie des nouveau-nés présentant des facteurs de risque de neurotoxicité",
      tsb: "BST",
      tcb: "BTc",
      ageInHours: "Âge (en heures)",
    },

    // Update Warning Dialog
    updateWarning: {
      title: "hyperbili a été mis à jour!",
      text1:
        "Cette version inclut maintenant des traductions françaises et une interface utilisateur mise à jour.",
      text2:
        "Veuillez examiner attentivement le résumé et les graphiques des résultats afin d'en assurer l'exactitude et d'assurer une prise en charge optimale du patient. Si vous constatez le moindre problème, veuillez nous contacter à l'adresse hyperbili@outlook.com. Merci!",
      okBtn: "J’ai compris",
    },

    // Updates
    updates: {
      header: "MISES À JOUR",
      header1: "hyperbili - maintenant en français !",
      text1:
        "hyperbili est maintenant disponible en anglais et en français. Vous pouvez sélectionner votre langue préférée à l'aide du bouton situé en haut à droite de la barre d'informations.",
      header2: "Apparence et sensation mises à jour",
      text2:
        "J'espère que ça va vous plaire! Vos commentaires sont toujours les bienvenus sur ",
    },

    // Bili Data Info
    biliDataInfo: {
      header: "Détails des données Bili",
      header1: "Date & Heure du test",
      text1:
        "Optionnel - si vous entrez à la fois la date et l'heure de naissance ainsi que la date et l'heure du test, l'âge en heures sera automatiquement calculé pour vous !",
      header2: "Âge en heures",
      text2:
        "Si vous connaissez l'âge du test en heures, vous pouvez simplement le saisir ici.",
      header3: "BTc",
      text3: "Bilirubine transcutanée en µmol/L",
      header4: "BST",
      text4: "Bilirubine sérique totale en µmol/L",
    },

    // RoR Dialog
    rorWarning: {
      title: "Avertissement",
      text1: "Le taux d'augmentation est élevé pour l'âge du patient !",
      text2:
        "Il est conseillé de choisir « Oui » pour les facteurs de risque, car cela pourrait indiquer une affection hémolytique. Veuillez vérifier l'exactitude des renseignements concernant le patient et ses données biliaires.",
    },

    // Clinical Disclaimer
    clinicalDisclaimer: {
      header1: "Mise en garde concernant les données cliniques",
      text1:
        "Les renseignements fournis par cet outil sont destinés uniquement à servir de référence. Elles ne peuvent en aucun cas remplacer l'avis d'un professionnel. Les auteurs et la Fondation Healthy Generations déclinent toute responsabilité en cas de perte ou de dommage causé par cet outil ou son contenu.",
    },

    // CPS Guidelines
    cpsGuidelines: {
      header1: "Lignes directrices CPS 2026",
      text1:
        "Cet outil est basé sur la déclaration de position de 2026 de la Société Canadienne de Pédiatrie intitulée Directives de détection et de prise en charge de l’hyperbilirubinémie chez les nouveau-nés à terme et peu prématurés (à compter de 35 semaines d’âge gestationnel)",
    },

    error: {
      patientDOBErrorMsg: "Veuillez inscrire une date de naissance valide",
      patientFutureDOBErrorMsg:
        "La date de naissance ne peut pas être dans le futur",
      patientDOBAfterDOTErrorMsg:
        "La date de naissance ne peut pas être postérieure à la date du test",
      patientHOBErrorMsg: "Veuillez inscrire une heure de naissance valide",
      patientFutureHOBErrorMsg:
        "L'heure de naissance ne peut pas être postérieure à la date/heure d'un test déjà enregistré.",
      patientGestAgeErrorMsg:
        "Veuillez inscrire un âge gestationnel valide à la naissance",
      patientRiskFactorsErrorMsg:
        "Veuillez indiquer par oui ou par non les facteurs de risque",
      patientCurrentPhototherapyErrorMsg:
        "Veuillez indiquer oui ou non si vous suivez actuellement une photothérapie",
      patientPreviousPhototherapyErrorMsg:
        "Veuillez indiquer oui ou non si vous avez déjà reçu une photothérapie",
      missingDateOfBirthErrorMsg:
        "Veuillez saisir la date et l'heure de naissance pour calculer l'âge en heures, ou laissez les deux champs vides si l'âge en heures est déjà connu",
      missingHourOfBirthErrorMsg:
        "Veuillez saisir la date et l'heure de naissance pour calculer l'âge en heures, ou laissez les deux champs vides si l'âge en heures est déjà connu",
      dateOfTestErrorMsg: "Veuillez saisir une date de test valide",
      missingDOBorHOB:
        "Veuillez saisir la date et l'heure de naissance pour calculer l'âge en heures",
      dotBeforeDOB:
        "La date du test ne peut être antérieure à la date de naissance",
      hourOfTestErrorMsg: "Veuillez saisir une heure de test valide",
      hotBeforeDOB:
        "La date/l'heure du test ne peut pas être antérieure à la date de naissance.",
      ageInHoursErrorMsg: "L'âge en heures doit être supérieur ou égal à 0",
      tcbErrorMsg:
        "Veuillez saisir une valeur valide de bilirubine transcutanée",
      tsbErrorMsg:
        "Veuillez saisir une valeur valide de bilirubine sérique totale",
    },

    about: {
      header: "À propos de hyperbili",
      text1:
        "<em>hyperbili</em> est un outil en ligne gratuit et facile à utiliser destiné à aider les cliniciens qui prennent en charge les nouveau-nés atteints de jaunisse.",
      text2:
        "Selon la déclaration de la Société canadienne de pédiatrie <a href='https://cps.ca/fr/documents/position/hyperbilirubinemie-neonatale' target='_blank'>'Lignes directrices pour le dépistage et la prise en charge de l'hyperbilirubinémie chez les nouveau-nés à terme et prématurés tardifs (≥ 35 semaines d'âge gestationnel)'</a>, l'hyperbili peut tabuler et représenter graphiquement les données relatives à la bilirubine de votre patient.",
      release: "Dernière version",
    },

    privacy: {
      header: "Confidentialité",
      text1:
        "<em>hyperbili</em> est conçu pour que les données de votre patient ne quittent jamais votre appareil.",
      itemTitle1: "Aucune information personnelle de santé n'a été recueillie.",
      itemText1:
        "<em>hyperbili</em> ne recueille ni n'entrepose aucune donnée patient.",
      itemTitle2: "Toutes les données restent sur votre appareil",
      itemText2:
        "Tout ce que vous saisissez reste du côté client, dans votre navigateur.",
      itemTitle3: "Aucune donnée envoyée au serveur",
      itemText3: "Aucun renseignement n'est jamais transmis pour traitement.",
    },

    contact: {
      header: "Coordonnées",
      email: "Courriel",
      creator: "Créateur",
      text1: "Ce travail n’aurait pas existé sans l’appui",
      support1:
        "du docteur Eugene Ng, MD, FRCPC, FAAP, néonatologiste et premier auteur du document de principes de la SCP",
      support2:
        "du docteur Michael Narvey, MD, FRCPC, FAAP, néonatologiste et ancien président du comité d’étude du fœtus et du nouveau-né",
      support3: "de la Société canadienne de pédiatrie (SCP)",
      support4a: "de l'American Academy of Pediatrics (AAP)",
      support4b: ", qui ont fourni les données pour produire les graphiques",
      support5: "de la Fondation Healthy Generations",
    },

    faq: {
      header: "Foire aux questions",
      q1: "Existe-t-il une appli pour cellulaire ?",
      a1: "Non. <em>hyperbili</em> est une application web. Vous pouvez donc y accéder sur votre téléphone à partir de n'importe quel navigateur. Elle est aussi accessible sur votre ordinateur. Ce choix a été fait intentionnellement afin que les cliniciens puissent accéder aux informations dont ils ont besoin, où qu'ils soient.",
      q2: "Puis-je sauvegarder les données que j'entre ?",
      a2: "Malheureusement, non. Les données sont effacées dès que vous quittez la page. Ceci est également intentionnel, afin d'éviter la transmission de renseignements médicaux personnels sur Internet.",
      q3: "L'application calcule-t-elle automatiquement l'âge en heures ?",
      a3: "Oui. Si vous entrez la date et l'heure de naissance ainsi que la date et l'heure du test, <em>hyperbili</em> calcule l'âge en heures pour vous.",
      q4: "Dois-je tenir compte de l'âge gestationnel pour déterminer s'il existe ou non des facteurs de risque ?",
      a4: "Non. Bien que l'âge gestationnel soit considéré comme un facteur de risque de neurotoxicité, il est déjà intégré dans les différentes courbes lorsque vous sélectionnez l'âge gestationnel.",
    },

    print: {
      dob: "Date de naissance",
      hob: "Heure de naissance",
      gestAge: "Âge gestationnel à la naissance",
      riskFactors: "Facteurs de risque de neurotoxicité",
      currentPhoto: "Photothérapie actuelle",
      previousPhoto: "Photothérapie antérieure",
    },
  },
};
