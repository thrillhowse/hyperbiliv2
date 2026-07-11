import { useDialogModal } from "./dialog/useDialogModal.js";
import { useLanguage } from "./context/LanguageContext.jsx";
import { t } from "./translations.js";

import { closeOnBackdrop } from "./dialog/closeOnBackdrop.js";

export default function UpdateWarningDialog({
  showUpdateWarning,
  setShowUpdateWarning,
}) {
  const { lang } = useLanguage();

  const updateWarningDialogRef = useDialogModal(showUpdateWarning);

  return (
    <dialog
      id="updateWarningDialog"
      ref={updateWarningDialogRef}
      onClick={(e) => closeOnBackdrop(e, () => setShowUpdateWarning(false))}
    >
      <p className="dialog-title">
        <span className="fluent--molecule-32-regular"></span>
        {t[lang].updateWarning.title}
      </p>
      <p className="dialog-text">{t[lang].updateWarning.text1}</p>
      <p className="dialog-text important">{t[lang].updateWarning.text2}</p>

      <p className="dialog-tip">
        <span className="lucide--smartphone tip-icon"></span>
        <div className="dialog-tip-container">
          <span>{t[lang].updateWarning.tip}</span>
          <a
            id="seeHowInstall"
            href="/pwa"
            dangerouslySetInnerHTML={{
              __html: t[lang].updateWarning.tipLink,
            }}
          ></a>
        </div>
      </p>
      <button
        id="closeUpdateWarningDialogBtn"
        className="close-dialog-btn"
        onClick={() => setShowUpdateWarning(false)}
      >
        <span className="lucide--check"></span>
        {t[lang].updateWarning.okBtn}
      </button>
    </dialog>
  );
}
