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
      //useInteractiveGuideline: true,
      dispatch: {
        stateChange: function(e){ console.log("stateChange"); },
        changeState: function(e){ console.log("changeState"); },
        tooltipShow: function(e){ console.log(e); },
        //tooltipHide: function(e){ console.log("tooltipHide"); }
      },
      callback: function(chart){
        console.log("!!! lineChart callback !!!");
      },
      useInteractiveGuideline: false,
      interactive: true,
      tooltips: true,
      tooltipContent: function (key, x, y, e, graph) { //return html content
        return '<h3>' + key + '</h3>' +
        '<br/>'+
        '<div class="btn-group-vertical">' +
        '<div class="inline">'+
        ' <button type="button" class="btn btn-info btn-xs">ZOOM</button><pre>  '+ d3.time.format('%x')(new Date(x)) + '</pre></div>'+
        '<hr/>'+
        '<div class="inline">'+
        ' <button type="button" class="btn btn-info btn-xs">ZOOM</button><pre>  ' + y +
        '</pre></div>'+
        '<br/>'+
        '</div>'
      },
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
