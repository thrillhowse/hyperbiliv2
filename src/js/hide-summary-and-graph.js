export const hideSummaryAndGraph = () => {
  // remove patient details summary
  const patientDetailsSummary = document.querySelector(
    '#patient-details-summary-div',
  );
  if (patientDetailsSummary) {
    patientDetailsSummary.remove();
  }

  // remove summary/table
  const summary = document.querySelector('#summary-table-div');
  if (summary) {
    summary.remove();
  }

  // remove graph
  const graph = document.querySelector('#bili-graph-div');
  if (graph) {
    graph.remove();
  }
};
