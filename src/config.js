const FILMS_IN_LINE = 5;
const STAT_BAR_HEIGHT = 50;

const STAT_CHART_OPTIONS = {
  plugins: {
    datalabels: {
      font: {
        size: 20,
      },
      color: '#ffffff',
      anchor: 'start',
      align: 'start',
      offset: 40,
    },
  },
  scales: {
    yAxes: [{
      ticks: {
        fontColor: '#ffffff',
        padding: 100,
        fontSize: 20,
      },
      gridLines: {
        display: false,
        drawBorder: false,
      },
      barThickness: 24,
    }],
    xAxes: [{
      ticks: {
        display: false,
        beginAtZero: true,
      },
      gridLines: {
        display: false,
        drawBorder: false,
      },
    }],
  },
  legend: {
    display: false,
  },
  tooltips: {
    enabled: false,
  },
};

export default { FILMS_IN_LINE, STAT_BAR_HEIGHT, STAT_CHART_OPTIONS };
