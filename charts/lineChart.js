export function makeChart(chartId, data, colorScheme) {
  console.log(data)

  const margin = { top: 20, right: 10, bottom: 10, left: 20 }
  const width = 540 - margin.left - margin.right
  const height = 280 - margin.top - margin.bottom

  const chartBox = d3.select(chartId)
  const svg = chartBox
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)

  const xScale = d3
    .scaleUtc()
    .domain([data[0].date, data[data.length - 1].date])
    .range([margin.left, width - margin.right])

  const yScale = d3
    .scaleLinear()
    .domain([0, Math.max(...data.map((item) => item.value))])
    .range([height - margin.bottom, margin.top])

  const colorScale = d3.scaleOrdinal().range(colorScheme)

  const xAxis = d3.axisBottom(xScale)
  const yAxis = d3.axisLeft(yScale)

  const line = d3
    .line()
    .x((d) => xScale(d.date))
    .y((d) => yScale(d.value))

  const chart = svg
    .append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`)

  chart
    .append('g')
    .attr('transform', `translate(0, ${height - margin.bottom})`)
    .call(xAxis)

  chart
    .append('g')
    .attr('transform', `translate(${margin.left}, 0)`)
    .call(yAxis)

  chart
    .append('path')
    .attr('class', 'line-path')
    .attr('d', line(data))
    .style('stroke', colorScale)
}
