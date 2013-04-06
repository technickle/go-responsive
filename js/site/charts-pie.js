$(document).ready(function(){

  chartObj = [{
    "cId": "#canvasTest-2",
    "cType": "pie",
    "cData": [
      {
        value: 55,
        color:"#0088cc"
      },
      {
        value: 22,
        color: "#fbb450"
      },
      {
        value: 16,
        color: "#62c462"
      },
      {
        value: 4,
        color: "#555"
      },
      {
        value: 3,
        color: "#ee5f5b"
      }
    ]}];

  // Call the responsive plugin
  $.respCharts(chartObj);

});
