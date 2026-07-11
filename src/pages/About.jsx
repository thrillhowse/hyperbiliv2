import "../css/pages.css";
import "../css/about.css";
import { useState } from "react";
import Header from "../Header.jsx";
import Infobar from "../Infobar.jsx";
import { useLanguage } from "../context/LanguageContext.jsx";
import { t } from "../translations.js";

export default function About() {
  const { lang } = useLanguage();

  const [showInfobar, setShowInfobar] = useState(false);

  return (
    <>
      <Header showInfobar={showInfobar} setShowInfobar={setShowInfobar} />
      <Infobar showInfobar={showInfobar} />
      <main className="main-pages-container">
        <h2 id="consentTitle" className="subtitle--lg">
          hyperbili
          <span className="fluent--molecule-32-regular"></span>
        </h2>
        <div className="pages-container">
          <div className="pages-title-container">
            <span className="lucide--info"></span>
            <h3>{t[lang].about.header}</h3>
          </div>
          <div className="pages-text-container">
            <p dangerouslySetInnerHTML={{ __html: t[lang].about.text1 }}></p>
          </div>
          <div className="pages-text-container">
            <p
              dangerouslySetInnerHTML={{
                __html: t[lang].about.text2,
              }}
            ></p>
          </div>
          <div className="pages-row-container">
            <div className="about-info-card">
              <p className="about-info-card-title">
                {t[lang].dictionary.version}
              </p>
              <p className="about-info-card-text">2.0.0</p>
            </div>
            <div className="about-info-card">
              <p className="about-info-card-title">{t[lang].about.release}</p>
              <p className="about-info-card-text">July 2026</p>
            </div>
          </div>
          <div className="version-notes-container">
            <div className="version-history">
              <div className="vh-heading">
                <i className="ti ti-history" aria-hidden="true"></i>
                <span>Version history</span>
              </div>

              <ol className="vh-timeline">
                <li className="vh-entry vh-entry--latest">
                  <div className="vh-meta">
                    <span className="vh-version">Version 2.0.0</span>
                    <span className="vh-badge">Latest</span>
                    <span className="vh-date">July 2026</span>
                  </div>
                  <p className="vh-notes">hyperbili now in French</p>
                  <p className="vh-notes">Updated look & feel</p>
                  <p className="vh-notes">
                    Hour of birth & hour of test changed to military time
                  </p>
                  <p className="vh-notes">
                    High rate of rise now triggers a warning dialog to consider
                    selecting "Yes" for risk factors and to review patient
                    details and bili data
                  </p>
                </li>

                <li className="vh-entry">
                  <div className="vh-meta">
                    <span className="vh-version">Version 1.2.3</span>
                    <span className="vh-date">Feb 2026</span>
                  </div>
                  <p className="vh-notes">Improved content security policy</p>
                </li>

                <li className="vh-entry">
                  <div className="vh-meta">
                    <span className="vh-version">Version 1.2.2</span>
                    <span className="vh-date">Aug 11 2025</span>
                  </div>
                  <p className="vh-notes">
                    Style upgrade for better accessibility on Graph - legend
                    markers now match their associated point styles on the graph
                    (thanks Angel Netto, RN)
                  </p>
                </li>

                <li className="vh-entry">
                  <div className="vh-meta">
                    <span className="vh-version">Version 1.2.1</span>
                    <span className="vh-date">July 30 2025</span>
                  </div>
                  <p className="vh-notes">
                    Corrected typo in "Hour of Test" for added rows (thanks
                    Donna Kirkland, RN)
                  </p>
                  <p className="vh-notes">
                    Style upgrade for better accessibility on Patient Details
                    and Summary section (thanks Julie Klassen, RN)
                  </p>
                </li>

                <li className="vh-entry">
                  <div className="vh-meta">
                    <span className="vh-version">Version 1.2.0</span>
                    <span className="vh-date">Apr 30 2025</span>
                  </div>
                  <p className="vh-notes">
                    Date and hour of birth are no longer mandatory - if the user
                    knows the age in hours of the test, these fields can be left
                    blank (thanks Dr. R W Smith)
                  </p>
                  <p className="vh-notes">
                    Added links to the position statement and the appropriate
                    figures in the Comment section of the Summary
                  </p>
                  <p className="vh-notes">
                    Added a "Copy Graph" button to the Summary section (thanks
                    Dr. C Chung)
                  </p>
                  <p className="vh-notes">
                    Added a "Patient Sticker" section to the print-out (thanks
                    Dr. C Garcia)
                  </p>
                </li>

                <li className="vh-entry">
                  <div className="vh-meta">
                    <span className="vh-version">Version 1.1.0</span>
                    <span className="vh-date">Apr 16 2025</span>
                  </div>
                  <p className="vh-notes">
                    Added "Rate of Rise" to the Summary Table
                  </p>
                  <p className="vh-notes">
                    Added a "Frequently Asked Questions" section to the site
                  </p>
                  <p className="vh-notes">
                    Improved formatting for Firefox (thanks Dr. K Barrington)
                    so, for example, 3-digit bilirubin values better visualized
                  </p>
                </li>

                <li className="vh-entry">
                  <div className="vh-meta">
                    <span className="vh-version">Version 1.0.2</span>
                    <span className="vh-date">May 27 2025</span>
                  </div>
                  <p className="vh-notes">
                    System was correctly using the latest/most recent bili from
                    the table for the Comment but was using the last bili in the
                    table (i.e., not necessarily the most recent for users who
                    enter data out of order)
                  </p>
                  <p className="vh-notes">
                    This was resulting in discrepancy between Comment and
                    cutoffs (i.e., comment was based on bili for oldest age in
                    hours but cutoffs were based on bili that was last in the
                    table)
                  </p>
                  <p className="vh-notes">
                    corrected so that when assessing xc, prexc, photo, prephoto
                    that the system checks if dealing with latest/most recent
                    bili and uses that to define the cutoffs for the table
                  </p>
                </li>

                <li className="vh-entry">
                  <div className="vh-meta">
                    <span className="vh-version">Version 1.0.1</span>
                    <span className="vh-date">Mar 26 2026</span>
                  </div>
                  <p className="vh-notes">
                    Added information bubbles next to TcB and TSB to show
                    dialogs with definitions of these terms
                  </p>
                  <p className="vh-notes">
                    Overflow added to the bili table to avoid the full page
                    overflowing when multiple rows added
                  </p>
                </li>

                <li className="vh-entry">
                  <div className="vh-meta">
                    <span className="vh-version">Version 1.0.0</span>
                    <span className="vh-date">Mar 25 2026</span>
                  </div>
                  <p className="vh-notes">Initial release</p>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
