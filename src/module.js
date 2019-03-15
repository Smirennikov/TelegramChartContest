let chart = document.getElementById('chart');
let chartControl = document.getElementById('chartControl');

let ctx = chart.getContext('2d');
let ctx2 = chartControl.getContext('2d');

chart.width = '485';
chart.height = '430';

chartControl.width = '485';
chartControl.height = '50';
chartControl.style.display = 'block';

export {chart, ctx, ctx2, chartControl}
