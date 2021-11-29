export function makeChart(chartId, dataObj, colorScheme) {
  const { data, columns } = dataObj

  const margin = { top: 70, right: 10, bottom: 10, left: 20 }
  const width = 540 - margin.left - margin.right
  const barHeight = 20
  const height = data.length * barHeight

  const chartBox = d3.select(chartId)
  const svg = chartBox
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)

  const xScale = d3
    .scaleLinear()
    .domain([0, 1])
    .range([margin.left, width - margin.right])

  const yScale = d3
    .scaleBand()
    .domain(data.map((d) => d.name))
    .range([margin.top, margin.top + height])
    .padding(0.08)

  const colorScale = d3.scaleOrdinal().domain(columns).range(colorScheme)

  const formatPercent = d3.format('.0%')
  const xAxis = d3.axisTop(xScale).tickSizeOuter(0).tickFormat(formatPercent)
  const yAxis = d3.axisLeft(yScale).tickSizeOuter(0)

  const stack = d3.stack().keys(columns).offset(d3.stackOffsetExpand)
  const series = stack(data)

  const chart = svg
    .append('g')
    .attr('transform', `translate(${margin.left}, 0)`)

  chart.append('g').attr('transform', `translate(0, ${margin.top})`).call(xAxis)

  chart
    .append('g')
    .attr('transform', `translate(${margin.left}, 0)`)
    .call(yAxis)
    .call((g) => g.selectAll('.domain').remove())

  const stackGroup = chart
    .append('g')
    .selectAll('g')
    .data(series)
    .join('g')
    .attr('fill', (d) => colorScale(d.key))
    .attr('fill-opacity', 0.9)

  stackGroup
    .selectAll('rect')
    .data((d) => d)
    .join('rect')
    .attr('x', (d) => xScale(d[0]))
    .attr('y', (d) => yScale(d.data.name))
    .attr('width', (d) => xScale(d[1]) - xScale(d[0]))
    .attr('height', yScale.bandwidth())

  const legendGroup = svg
    .append('g')
    .attr('transform', `translate(${margin.left}, ${margin.left})`)
    .attr('text-anchor', 'start')
    .attr('font-family', 'sans-serif')
    .attr('font-size', 10)

  const legend = legendGroup
    .selectAll('.legend')
    .data(columns)
    .join('g')
    .attr('transform', (d, i) => 'translate(' + i * 90 + ', 0)')

  legend
    .append('rect')
    .attr('width', 16)
    .attr('height', 16)
    .attr('fill', colorScale)
    .attr('fill-opacity', 0.8)

  legend
    .append('text')
    .attr('x', 23)
    .attr('y', 9.5)
    .attr('dy', '0.35em')
    .text((d) => d)
}
