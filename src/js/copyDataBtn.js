export const copyDataBtn = (copyBtn, data, dob, hob) => {
  // Data will contain the necessary data just need to format it

  // First sort the biliData array based on 'ageInHours'
  const orderedBiliData = data.biliData;
  orderedBiliData.sort((a, b) => a.ageInHours - b.ageInHours);

  let str = ``;
  if (dob) {
    str += `Date of Birth: ${new Date(dob).toDateString()}<br>`;
  }
  if (hob) {
    str += `Hour of Birth: ${hob}:00<br>`;
  }
  str += `GA at Birth: ${data.patient.ga} wks<br>`;
  str += `Neurotoxicity Risk Factors: ${data.patient.riskFactorsStr}<br><br>`;

  // Need to update the str for each bilirubin
  let i = 1;
  orderedBiliData.forEach((bili) => {
    str += `Bilirubin #${i}<br>`;
    str += `Age: ${bili.ageInHours} hours `;
    if (bili.testDate) {
      str += `(${bili.testDate}`;
      if (bili.testTime) {
        str += ` at ${bili.testTime}:00)<br>`;
      } else {
        str += `)<br>`;
      }
    } else {
      str += `<br>`;
    }
    if (bili.tcb) {
      str += `TcB: ${bili.tcb} &#181;mol/L`;
    }
    if (bili.tsb) {
      if (bili.tcb) {
        str += `, TSB: ${bili.tsb} &#181;mol/L`;
      } else {
        str += `TSB: ${bili.tsb} &#181;mol/L`;
      }
    }
    if (bili.result) {
      const plainText = stripHtmlTags(bili.result);
      str += `, ${plainText}`;
    }
    str += `<br><br>`;
    i++;
  });

  // Δ isn't in the Windows-1252 codepage, so it can turn into "?" when pasted
  // into apps that only read the legacy ANSI clipboard flavor. Spell it out instead.
  str = str.replace(/Δ-?/g, "Delta ");

  const copied = copyToClipboard(str);
  if (copied) {
    // change btn text for a second
    copyBtn.textContent = "Copied!";
    setTimeout(() => {
      copyBtn.textContent = "Copy Data";
    }, 1500);
  } else {
    console.error("Failed to copy");
    copyBtn.textContent = "Error!";
    setTimeout(() => {
      copyBtn.textContent = "Copy Data";
    }, 1500);
  }
};

/**
 * Copy To Clipboard
 * function used to copy summary to the clipboard
 * need to create an invisible element that contains all the data and then copy that
 * taken with help from https://stackoverflow.com/questions/34191780/javascript-copy-string-to-clipboard-as-text-html
 * @param {string} str
 */
const copyToClipboard = (str) => {
  // first create a container for the HTML
  let container = document.createElement("div");
  container.innerHTML = str;
  container.style.position = "fixed";
  container.style.opacity = 0;

  // Mount the container to the DOM to make it available to select
  document.body.appendChild(container);

  // Remove any already existing selections on the page
  window.getSelection().removeAllRanges();

  // Select contents of our container and Copy to clipboard
  var range = document.createRange();
  range.selectNode(container);
  window.getSelection().addRange(range);
  document.execCommand("copy");

  // Remove the container
  document.body.removeChild(container);

  return true;
};

function stripHtmlTags(htmlString) {
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = htmlString;
  return tempDiv.textContent || tempDiv.innerText || "";
}
