'use strict';
(function () {
  var heightBarChart = 150;
  var widthBarChart = 40;
  var distanceBetweenColumns = 50;
  var colorOfUserColumn = 'rgba(255, 0, 0, 1)';
  var colorOfAnotherUserColumn = 'rgba(0,0,255,0)';
  var fontFamily = '16px PT Mono';
  var shadowColor = 'rgba(0, 0, 0, 0.7)';
  var cloudX = 100;
  var cloudY = 10;
  var cloudHeight = 270;
  var cloudWidth = 420;


  window.renderStatistics = function (ctx, names, times) {
    paintCloud(ctx);
    paintBarChart(ctx, names, times);
  };

  // отрисовка облака и текста
  var paintCloud = function (ctx) {
    ctx.fillStyle = shadowColor;
    ctx.fillRect(cloudX + 10, cloudY + 10, cloudWidth, cloudHeight);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(cloudX, cloudY, cloudWidth, cloudHeight);
    ctx.textBaseline = 'hanging';
    ctx.font = fontFamily;
    ctx.fillStyle = '#000000';
    ctx.fillText('Ура вы победили!', cloudX + 50, cloudY + 10);
    ctx.fillText('Список результатов:', cloudX + 50, cloudY + 30);
  };

  // отприсовка гистограммы
  var paintBarChart = function (ctx, names, times) {
    var roundTimes = roundOffTimes(times);
    var maxTime = findMaxTime(roundTimes);
    var barChartSizeCoefficient = findBarChartSizeCoefficient(maxTime);
    var heightOfItemsBarChart = findHeightOfItemsBarChart(barChartSizeCoefficient, roundTimes);
    for (var i = 0; i < roundTimes.length; i++) {
      var coordinateX = cloudX + 60 + i * distanceBetweenColumns + i * widthBarChart;
      var coordinateY = cloudY + 80 + heightBarChart - heightOfItemsBarChart[i];
      ctx.fillStyle = getRandomColor();
      if (names[i] === 'Вы') {
        ctx.fillStyle = colorOfUserColumn;
      }
      ctx.fillRect(coordinateX, coordinateY, widthBarChart, heightOfItemsBarChart[i]);
      ctx.textBaseline = 'hanging';
      ctx.font = '16px PT Mono';
      ctx.fillStyle = '#000000';
      ctx.fillText(names[i], coordinateX, cloudX + heightBarChart);
      ctx.fillText(roundTimes[i], coordinateX, coordinateY - 20);
    }
  };

  // Поиск максимального времени
  var findMaxTime = function (times) {
    var max = times[0];
    for (var i = 0; i < times.length; i++) {
      if (times[i] > max) {
        max = times[i];
      }
    }
    return max;
  };

  // Округление времени прохождения игры  к целому числу.
  var roundOffTimes = function (times) {
    var roundTimes = [];
    for (var i = 0; i < times.length; i++) {
      roundTimes[i] = Math.ceil(times[i]);
    }
    return roundTimes;
  };

  // Поиск коэффициента для отрисовки гистограммы
  var findBarChartSizeCoefficient = function (maxTime) {
    return heightBarChart / maxTime;
  };

  // Поиск высот столбцов гистограммы
  var findHeightOfItemsBarChart = function (coefficient, times) {
    var heights = [];
    for (var i = 0; i < times.length; i++) {
      heights[i] = times[i] * coefficient;
    }
    return heights;
  };
  // Рандомная прозрачность цвета
  var getRandomColor = function () {
    var string = colorOfAnotherUserColumn.substr(0, colorOfAnotherUserColumn.length - 2);
    return string + Math.random() + ')';
  };
})();
