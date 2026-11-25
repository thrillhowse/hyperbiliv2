export const hideSummaryAndGraph = () => {
  // remove patient details summary
  const patientDetailsSummary = document.querySelector(
    "#patient-details-summary-div",
  );
  if (patientDetailsSummary) {
    patientDetailsSummary.remove();
  }

  // remove summary/table
  const summary = document.querySelector("#summary-table-div");
  if (summary) {
    summary.remove();
  }

  const canvas = document.querySelector("#bili-graph");

  if (canvas && typeof Chart !== "undefined") {
    Chart.getChart(canvas)?.destroy();
  }

  // remove graph
  const graph = document.querySelector("#bili-graph-div");
  if (graph) {
    graph.remove();
  }
};
