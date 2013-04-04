  $(document).ready(function(){

    chartObj = [{
        "cId": "#canvasTest-1",
        "cType": "line",
        "cData": {
          labels : ["January","February","March","April","May","June","July"],
          datasets : [
            {
              fillColor : "rgba(220,220,220,0.5)",
              strokeColor : "rgba(220,220,220,1)",
              data : [65,59,90,81,56,55,40]
            },
            {
              fillColor : "rgba(151,187,205,0.5)",
              strokeColor : "rgba(151,187,205,1)",
              data : [28,48,40,19,96,27,100]
            }
          ]
        }},{
        "cId": "#canvasTest-2",
        "cType": "pie",
        "cData": [
          {
            value: 55,
            color:"#ccc"
          },
          {
            value: 22,
            color: "#0b02e1"
          },
          {
            value: 16,
            color: "#02e10c"
          },
          {
            value: 4,
            color: "#84b6eb"
          },
          {
            value: 3,
            color: "#69D2E7"
          }
        ]}];

      // Call the responsive plugin
      $.respCharts(chartObj);

    });