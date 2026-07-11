import { photoLevels, xcLevels } from './bili-data.js';
import { t } from '../translations.js';

export const graphBili = (data, lang) => {
  // Create a canvas to hold the graph
  let html = `
      <div id='bili-graph-div' class='graph-container'>
          <canvas id='bili-graph'></canvas>
      </div>
  `;

  // Clear any previous graph, then insert the new canvas
  const biliGraphEl = document.querySelector('#biliGraph');
  biliGraphEl.innerHTML = '';
  biliGraphEl.insertAdjacentHTML('beforeend', html);

  // Define variables for the labels and the datapoints
  let labels = null;
  let dataPoints = null;
  let tcbDataPoints = [];
  let tsbDataPoints = [];
  data.biliData.forEach((bili) => {
    let age = bili.ageInHours.toString();
    let tcb = bili.tcb;
    let tsb = bili.tsb;
    if (tcb) {
      tcbDataPoints.push({
        x: age,
        y: tcb,
      });
    }
    if (tsb) {
      tsbDataPoints.push({
        x: age,
        y: tsb,
      });
    }
  });

  ///////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////// XC //////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////
  // First check if above XC or pre-XC levels and if so use XC graphs
  if (data.xc || data.preXC) {
    // Note: graph only handles gestAge up to 38 so just need to correct for this
    let corrGA = null;
    let corrGAstr = '';
    if (data.patient.ga >= 38) {
      corrGA = 38;
      corrGAstr = '38+';
    } else {
      corrGA = data.patient.ga;
      corrGAstr = data.patient.ga;
    }

    // Retrieve data based on risk factors or not
    if (!data.patient.riskFactors) {
      let chartInfo = {
        label: corrGAstr + ` wk ${t[lang].graphs.exchangeLine}`,
        annotation: [`${t[lang].graphs.exchangeLine}`, corrGAstr + ' weeks'],
        backgroundColor: '#cf1928fb',
        titleText: t[lang].graphs.exchangeTitleNoRF,
        maxY: getMaxY(data, tcbDataPoints, tsbDataPoints), // Define a maxY value
        minY: getMinY(data, tcbDataPoints, tsbDataPoints), // Define a minY value
        // Use the xcLevels obj to define the location of the label/annotation for the line
        xValueForAnnotation: 280,
        yValueForAnnotation:
          parseInt(
            xcLevels[corrGA][data.patient.presenceOfRiskFactors].data[240],
          ) - 80,
      };

      labels = Object.keys(
        xcLevels[corrGA][data.patient.presenceOfRiskFactors].data,
      );
      dataPoints = Object.values(
        xcLevels[corrGA][data.patient.presenceOfRiskFactors].data,
      );
      // console.log(labels, dataPoints);

      plotXCGraph(
        chartInfo,
        labels,
        dataPoints,
        tcbDataPoints,
        tsbDataPoints,
        lang,
      );
    } else if (data.patient.riskFactors) {
      let chartInfo = {
        label: corrGAstr + ` wk ${t[lang].graphs.exchangeLine}`,
        annotation: [`${t[lang].graphs.exchangeLine}`, corrGAstr + ' weeks'],
        backgroundColor: '#cf1928fb',
        titleText: t[lang].graphs.exchangeTitleWithRF,
        maxY: getMaxY(data, tcbDataPoints, tsbDataPoints), // Define a maxY value
        minY: getMinY(data, tcbDataPoints, tsbDataPoints), // Define a minY value
        // Use the xcLevels obj to define the location of the label/annotation for the line
        xValueForAnnotation: 280,
        yValueForAnnotation:
          parseInt(
            xcLevels[corrGA][data.patient.presenceOfRiskFactors].data[240],
          ) - 80,
      };

      labels = Object.keys(
        xcLevels[corrGA][data.patient.presenceOfRiskFactors].data,
      );
      dataPoints = Object.values(
        xcLevels[corrGA][data.patient.presenceOfRiskFactors].data,
      );

      plotXCGraph(
        chartInfo,
        labels,
        dataPoints,
        tcbDataPoints,
        tsbDataPoints,
        lang,
      );
    }
    return;
  }

  ///////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////// PHOTO //////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////
  // Default to photo graph in any case where data.xc or data.preXC are false
  // Retrieve data based on risk factors or not
  if (!data.patient.riskFactors) {
    let chartInfo = {
      label: data.patient.ga + ` wk ${t[lang].graphs.photoLine}`,
      annotation: [`${t[lang].graphs.photoLine}`, data.patient.ga + ' weeks'],
      backgroundColor: '#2400ff',
      titleText: t[lang].graphs.photoTitleNoRF,
      maxY: getMaxY(data, tcbDataPoints, tsbDataPoints), // Define a maxY value based
      minY: getMinY(data, tcbDataPoints, tsbDataPoints), // Define a minY value
      // Use the photoLevels obj to define the location of the label/annotation for the line
      xValueForAnnotation: 280,
      yValueForAnnotation:
        parseInt(
          photoLevels[data.patient.ga][data.patient.presenceOfRiskFactors]
            .data[240],
        ) - 80,
    };

    data.patient.ga = parseInt(data.patient.ga);
    labels = Object.keys(
      photoLevels[data.patient.ga][data.patient.presenceOfRiskFactors].data,
    );
    dataPoints = Object.values(
      photoLevels[data.patient.ga][data.patient.presenceOfRiskFactors].data,
    );
    // console.log(chartInfo, labels, dataPoints);

    plotPhotoGraph(
      chartInfo,
      labels,
      dataPoints,
      tcbDataPoints,
      tsbDataPoints,
      lang,
    );
  } else if (data.patient.riskFactors) {
    // Note: graph only handles gestAge up to 38 so just need to correct for this
    let corrGA = null;
    let corrGAstr = '';
    if (data.patient.ga >= 38) {
      corrGA = 38;
      corrGAstr = '38+';
    } else {
      corrGA = data.patient.ga;
      corrGAstr = data.patient.ga;
    }

    let chartInfo = {
      label: corrGAstr + ` wk ${t[lang].graphs.photoLine}`,
      annotation: [`${t[lang].graphs.photoLine}`, corrGAstr + ' weeks'],
      backgroundColor: '#2400ff',
      titleText: t[lang].graphs.photoTitleWithRF,
      maxY: getMaxY(data, tcbDataPoints, tsbDataPoints), // Define a maxY value based
      minY: getMinY(data, tcbDataPoints, tsbDataPoints), // Define a minY value
      // Use the photoLevels obj to define the location of the label/annotation for the line
      xValueForAnnotation: 280,
      yValueForAnnotation:
        parseInt(
          photoLevels[corrGA][data.patient.presenceOfRiskFactors].data[240],
        ) - 80,
    };

    labels = Object.keys(
      photoLevels[corrGA][data.patient.presenceOfRiskFactors].data,
    );
    dataPoints = Object.values(
      photoLevels[corrGA][data.patient.presenceOfRiskFactors].data,
    );
    // console.log(chartInfo, labels, dataPoints);

    plotPhotoGraph(
      chartInfo,
      labels,
      dataPoints,
      tcbDataPoints,
      tsbDataPoints,
      lang,
    );
  }
  return;
};

// Define the max value for the y-axis based on the type of graph (XC vs photo && noRF vs RF)
// also handle if any of the tcb/tsb values are above these default max values (e.g., TSB 650 will change maxY to 650 from 500)
const getMaxY = (data, tcbDataPoints, tsbDataPoints) => {
  // First define a default maxY based on the whether XC or photo and risk factors or not
  let maxY = 400;

  // Need XC graph to take priority
  let xc = false;
  let photo = false;

  if (data.xc || data.preXC) {
    xc = true;
  }
  if (!xc && (data.photo || data.prePhoto)) {
    photo = true;
  }

  // Set the typical max bounds for the y-axis (i.e., when data points do not exceed these values)
  if (xc) {
    if (!data.patient.riskFactors) {
      maxY = 500;
    } else {
      maxY = 450;
    }
  }
  if (photo) {
    if (!data.patient.riskFactors) {
      maxY = 400;
    } else {
      maxY = 350;
    }
  }

  // Check if any of the tcb/tsb values are above these default max values
  tcbDataPoints.forEach((tcb) => {
    if (tcb.y && tcb.y > maxY) {
      maxY = tcb.y + 25;
    }
  });
  tsbDataPoints.forEach((tsb) => {
    if (tsb.y && tsb.y > maxY) {
      maxY = tsb.y + 25;
    }
  });
  return maxY;
};

// Define the min value for the y-axis based on the type of graph (XC vs photo && noRF vs RF)
// also handle if any of the tcb/tsb values are below these default max values
const getMinY = (data, tcbDataPoints, tsbDataPoints) => {
  // First define a default minY based on the whether XC or photo and risk factors or not
  let minY = 50;

  // Need XC graph to take priority
  let xc = false;
  let photo = false;

  if (data.xc || data.preXC) {
    xc = true;
  }
  if (!xc && (data.photo || data.prePhoto)) {
    photo = true;
  }

  if (xc) {
    minY = 200;
  }
  if (photo) {
    minY = 50;
  }

  tcbDataPoints.forEach((tcb) => {
    if (tcb.y > 0 && tcb.y < minY) {
      minY = tcb.y - 25;
    }
  });
  tsbDataPoints.forEach((tsb) => {
    if (tsb.y > 0 && tsb.y < minY) {
      minY = tsb.y - 25;
    }
  });
  return minY;
};

// Plot XC Graph
const plotXCGraph = (
  chartInfo,
  labels,
  dataPoints,
  tcbDataPoints,
  tsbDataPoints,
  lang,
) => {
  const ctx = document.querySelector('#bili-graph');

  // console.log(chartInfo);

  new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [
        {
          label: chartInfo.label,
          data: dataPoints,
          backgroundColor: chartInfo.backgroundColor,
          order: 3, // draw the reference line behind the TcB/TSB data points
        },
        {
          type: 'scatter',
          label: t[lang].graphs.tcb,
          data: tcbDataPoints,
          backgroundColor: '#ffa500',
          borderColor: '#ffa500',
          pointStyle: 'crossRot',
          pointRadius: 6,
          pointHoverRadius: 12,
          order: 2, // draw the TcB over the reference line but behind TSB
        },
        {
          type: 'scatter',
          label: t[lang].graphs.tsb,
          data: tsbDataPoints,
          backgroundColor: '#007d58',
          borderColor: '#007d58',
          pointStyle: 'circle',
          pointRadius: 4,
          pointHoverRadius: 8,
          order: 1, // draw the TSB over the reference line and the TcB
        },
      ],
    },
    options: {
      plugins: {
        annotation: {
          annotations: {
            label1: {
              type: 'label',
              display: true,
              xValue: chartInfo.xValueForAnnotation,
              yValue: chartInfo.yValueForAnnotation,
              content: [chartInfo.annotation[0], chartInfo.annotation[1]],
              font: {
                size: 12,
                family: 'sans-serif',
              },
            },
          },
        },
        type: 'line',
        title: {
          display: true,
          text: chartInfo.titleText,
          padding: 6,
          font: {
            size: 16,
          },
        },
        legend: {
          position: 'bottom',
          labels: {
            boxWidth: 6,
            boxHeight: 6,
            font: {
              size: 10,
            },
            usePointStyle: true,
          },
        },
      },
      scales: {
        x: {
          title: {
            display: true,
            text: t[lang].graphs.ageInHours,
            font: {
              size: 10,
            },
          },
          max: 338,
          min: 0,
          ticks: {
            count: 14.5,
            stepSize: 24,
            maxTicksLimit: 14.5,
            font: {
              size: 8,
            },
          },
        },
        y: {
          title: {
            display: true,
            padding: 2,
            text: `${t[lang].graphs.tsb} (µmol/L)`,
            font: {
              size: 10,
            },
          },
          max: chartInfo.maxY,
          min: chartInfo.minY,
          ticks: {
            count: 7,
            stepSize: 50,
            maxTicksLimit: 7,
            font: {
              size: 8,
            },
          },
        },
      },
      elements: {
        line: {
          borderWidth: 2,
          borderColor: chartInfo.backgroundColor,
          backgroundColor: chartInfo.backgroundColor,
        },
        point: {
          radius: 0.5,
          pointStyle: 'circle',
          borderColor: chartInfo.backgroundColor,
          backgroundColor: chartInfo.backgroundColor,
        },
      },
    },
  });
};

// Plot phototherapy graph
const plotPhotoGraph = (
  chartInfo,
  labels,
  dataPoints,
  tcbDataPoints,
  tsbDataPoints,
  lang,
) => {
  const ctx = document.querySelector('#bili-graph');

  // console.log(chartInfo);

  new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [
        {
          label: chartInfo.label,
          data: dataPoints,
          backgroundColor: chartInfo.backgroundColor,
          order: 3, // draw the reference line behind the TcB/TSB data points
        },
        {
          type: 'scatter',
          label: t[lang].graphs.tcb,
          data: tcbDataPoints,
          backgroundColor: '#ffa500',
          borderColor: '#ffa500',
          borderWidth: 2,
          pointStyle: 'crossRot',
          pointRadius: 6,
          pointHoverRadius: 12,
          order: 2, // draw the TcB over the reference line but behind TSB
        },
        {
          type: 'scatter',
          label: t[lang].graphs.tsb,
          data: tsbDataPoints,
          backgroundColor: '#007d58',
          borderColor: '#007d58',
          pointStyle: 'circle',
          pointRadius: 4,
          pointHoverRadius: 8,
          order: 1, // draw the TSB over the reference line and the TcB
        },
      ],
    },
    options: {
      plugins: {
        annotation: {
          annotations: {
            label1: {
              type: 'label',
              display: true,
              xValue: chartInfo.xValueForAnnotation,
              yValue: chartInfo.yValueForAnnotation,
              content: [chartInfo.annotation[0], chartInfo.annotation[1]],
              font: {
                size: 12,
                family: 'sans-serif',
              },
            },
          },
        },
        title: {
          display: true,
          text: chartInfo.titleText,
          padding: 6,
          font: {
            size: 16,
          },
        },
        legend: {
          position: 'bottom',
          labels: {
            boxWidth: 6,
            boxHeight: 6,
            font: {
              size: 10,
            },
            usePointStyle: true,
          },
        },
      },
      scales: {
        x: {
          title: {
            display: true,
            text: t[lang].graphs.ageInHours,
            font: {
              size: 10,
            },
          },
          max: 338,
          min: 0,
          ticks: {
            count: 14.5,
            stepSize: 24,
            maxTicksLimit: 14.5,
            font: {
              size: 8,
            },
          },
        },
        y: {
          title: {
            display: true,
            padding: 2,
            text: `${t[lang].graphs.tsb} (µmol/L)`,
            font: {
              size: 10,
            },
          },
          max: chartInfo.maxY,
          min: chartInfo.minY,
          ticks: {
            count: 8,
            stepSize: 50,
            maxTicksLimit: 8,
            font: {
              size: 8,
            },
          },
        },
      },
      elements: {
        line: {
          borderWidth: 1,
          borderColor: chartInfo.backgroundColor,
          backgroundColor: chartInfo.backgroundColor,
        },
        point: {
          radius: 0.5,
          pointStyle: 'circle',
          borderColor: chartInfo.backgroundColor,
          backgroundColor: chartInfo.backgroundColor,
        },
      },
    },
  });
};

// The line colours for the photo (w/ risk factors) and the XC graphs (w and w/o risk factors) are the same
const getBGforXC = (ga) => {
  let gestAge = parseInt(ga);
  if (gestAge === 35) {
    return '#8CCF43';
  }
  if (gestAge === 36) {
    return '#722EA5';
  }
  if (gestAge === 37) {
    return '#4276C6';
  }
  if (gestAge === 38) {
    return '#EE0300';
  }
};

// The line colours for the photo (w/o risk factors) are unique and require their own function
const getBGforPhotoNoRF = (ga) => {
  let gestAge = parseInt(ga);
  if (gestAge === 35) {
    return '#000000';
  }
  if (gestAge === 36) {
    return '#FFBC01';
  }
  if (gestAge === 37) {
    return '#98D650';
  }
  if (gestAge === 38) {
    return '#712F9F';
  }
  if (gestAge === 39) {
    return '#3E75CC';
  }
  if (gestAge === 40) {
    return '#F6050C';
  }
};
