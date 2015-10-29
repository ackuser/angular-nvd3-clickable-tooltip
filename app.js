app = angular.module('App', ['nvd3']);

app.controller("AppsCtrl", function($scope) {


  $scope.options = {
    chart: {
      type: 'lineWithFocusChart',
      height: 450,
      margin : {
        top: 20,
        right: 20,
        bottom: 60,
        left: 40
      },
      callback: function(chart){
        console.log("!!! lineChart callback !!!");


        /*d3.selectAll(".nv-line").on("click", function () {
            alert("clicked");
        });*/

        d3.selectAll(".nvtooltip").on("click", function () {
            alert("clicked tooltip");
        });
        //var tooltip = chart.interactiveLayer.tooltip;
        var tooltip = chart.tooltip;

        console.log(tooltip.tooltipElem);


        /*tooltip.dispatch.on('elementClick', function(e) {
             alert("You've clicked on " + e.series.key + " - " + e.point.x);
         });*/

         console.log(tooltip);

        //chart.interactiveLayer.tooltip.contentGenerator(function (d){
        //chart.tooltip.snapDistance(8);
        //chart.tooltip.fixedTop(100);
        //chart.tooltip.position({"top":1000000,"left":1300000});

        //chart.interactiveLayer.tooltip.contentGenerator(function (d){
        tooltip.contentGenerator(function (d){
          var html =
          '<h3 style="color:white;background-color:black;">' + d.value + '</h3>' +
          '<div class="btn-group-vertical" style="color:white;background-color:black;">' +
          '<div class="inline">'+
          ' <a href="http://www.w3schools.com/html/" class="btn btn-info btn-xs" role="button">ZOOM</a><pre>  '+ d3.time.format('%x')(new Date(d.point.x)) +
          '</pre></div>'+
          '<hr/>'+
          '<div class="inline">'+
          ' <button type="button" class="btn btn-info btn-xs">ZOOM</button><pre>  ' + d.point.y +
          '</pre></div>'+
          '<br/>'+
          '</div>';
          return html;
        });

        return chart;
      },
      useInteractiveGuideline: false,
      interactive: true,
      transitionDuration: 500,
      xAxis: {
        axisLabel: 'X Axis',
        tickFormat: function(d){
          return d3.format(',f')(d);
        }
      },
      x2Axis: {
        tickFormat: function(d){
          return d3.format(',f')(d);
        }
      },
      yAxis: {
        axisLabel: 'Y Axis',
        tickFormat: function(d){
          return d3.format(',.2f')(d);
        },
        rotateYLabel: false
      },
      y2Axis: {
        tickFormat: function(d){
          return d3.format(',.2f')(d);
        }
      }

    }
  };

  $scope.data = generateData();

  /* Random Data Generator (took from nvd3.org) */
  function generateData() {
    return stream_layers(3,10+Math.random()*200,.1).map(function(data, i) {
      return {
        key: 'Stream' + i,
        values: data
      };
    });
  }

  /* Inspired by Lee Byron's test data generator. */
  function stream_layers(n, m, o) {
    if (arguments.length < 3) o = 0;
    function bump(a) {
      var x = 1 / (.1 + Math.random()),
      y = 2 * Math.random() - .5,
      z = 10 / (.1 + Math.random());
      for (var i = 0; i < m; i++) {
        var w = (i / m - y) * z;
        a[i] += x * Math.exp(-w * w);
      }
    }
    return d3.range(n).map(function() {
      var a = [], i;
      for (i = 0; i < m; i++) a[i] = o + o * Math.random();
      for (i = 0; i < 5; i++) bump(a);
      return a.map(stream_index);
    });
  }

  /* Another layer generator using gamma distributions. */
  function stream_waves(n, m) {
    return d3.range(n).map(function(i) {
      return d3.range(m).map(function(j) {
        var x = 20 * j / m - i / 3;
        return 2 * x * Math.exp(-.5 * x);
      }).map(stream_index);
    });
  }

  function stream_index(d, i) {
    return {x: i, y: Math.max(0, d)};
  }
});
