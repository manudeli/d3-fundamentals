export async function getBtsWriteRatioData() {
  const csv = await d3.csv('./data/BTS작사비율.csv')
  return csv.map((d) => {
    d.value = parseFloat(d.value)
    return d
  })
}

export async function getBtsComposeRatioData() {
  const csv = await d3.csv('./data/BTS작곡비율.csv')
  return csv.map((d) => {
    d.value = parseFloat(d.value)
    return d
  })
}

export async function getBoybandOwnSongData() {
  const csv = await d3.csv('./data/남자아이돌년도별작곡작사횟수.csv')
  const data = csv
    .map((d) => {
      d.date = new Date(d.date)
      return d
    })
    .sort((a, b) => a.date - b.date)
  const groups = ['BTS', 'EXO', 'GOT7']
  const series = groups.map((key) =>
    data.map(({ [key]: value, date }) => ({
      key,
      date,
      value: parseInt(value),
    }))
  )

  return {
    data,
    series,
    groups,
  }
}
