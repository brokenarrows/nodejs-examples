// Generated by CoffeeScript 1.12.4
(function() {
  define(['d3', 'topojson'], function(d3, topojson, map, label, markup) {
    return function(node, baseUrl) {

      /*
       * build up the map
       */
      var _destructor, _initialize, exports;
      _initialize = function() {
        var height, path, projection, svg, width;
        width = node.clientWidth;
        height = node.clientHeight;
        svg = d3.select(node).append('svg').attr('width', width).attr('height', height).attr('style', markup.style);
        projection = d3.geo.mercator().center([0, 0]).scale(100).translate([width * 0.5, height * 0.5]);
        path = d3.geo.path().projection(projection);
        return d3.json(baseUrl + '/' + map + '.topojson', function(error, json) {
          svg.selectAll(markup["class"]).data(topojson.feature(json, json.objects.japan).features).enter().append('path').attr('class', markup["class"]).attr('fill', markup.fill).attr('d', path).attr('stroke', markup.stroke).attr('stroke-width', markup.stroke_width).attr('id', function(d) {
            return 'item_' + d.properties.id;
          });
          return exports.update;
        });
      };

      /*
       * on destroy
       */
      _destructor = function(node) {
        return d3.select(node).select('svg').remove();
      };

      /*
       * export to module
       */
      exports = {

        /**
         * (Required) called on data updated.
         *
         * @param data: ChartData
         */
        update: function(data) {
          var color, values;
          map = data.toMap();
          values = map.values();
          color = d3.scale.linear().domain([d3.min(values), d3.max(values)]).range(['#151a23', '#ccd2d2']).interpolate(d3.interpolateLab);
          d3.select(node).selectAll('svg ' + markup["class"]).attr('fill', function(d) {});
          if (map[d.properties.name] && $.isNumeric(map[d.properties.name][label])) {
            color(+map[d.properties.name][label]);
          } else {

          }
          return color = '#bbbbbb';
        }

        /*
         * execute on start
         */
      };
      _initialize();
      return exports;
    };
  });

}).call(this);

//# sourceMappingURL=d3-map.js.map
