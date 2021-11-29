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

export async function getBtsComposeWriteData() {
  const csv = await d3.csv('./data/BTS년도별작곡작사횟수.csv')
  return csv.map((d) => ({ ...d, date: new Date(d.date) }))
}

export async function getBoybandWriteRatioData() {
  const csv = await d3.csv('./data/남자아이돌작사비율.csv')
  return {
    data: csv
      .reduce((acc, cur) => [...acc, cur], [])
      .sort((a, b) => b.참여 - a.참여),
    columns: ['참여', '비참여'],
  }
}

export async function getBoybandComposeRatioData() {
  const csv = await d3.csv('./data/남자아이돌작곡비율.csv')
  return {
    data: csv
      .reduce((acc, cur) => [...acc, cur], [])
      .sort((a, b) => b.참여 - a.참여),
    columns: ['참여', '비참여'],
  }
}

export async function getBoybandOwnSongData() {
  const csv = await d3.csv('./data/남자아이돌년도별작곡작사횟수.csv')
  const data = csv
    .map((d) => ({ ...d, date: new Date(d.date) }))
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

export async function getSongByBtsMembersData() {
  const memberMap = new Map()
  const dateSet = new Set()
  const series = []

  const csv = await d3.csv('./data/BTS멤버년도별작곡작사횟수.csv')
  csv.forEach(({ date, member, value }) => {
    dateSet.add(new Date(date))
    if (!memberMap.has(member)) {
      memberMap.set(member, series.length)
      series.push({ member, values: [] })
    }
    const d = series[memberMap.get(member)]
    d.values.push({
      member,
      date: new Date(date),
      value: parseInt(value),
    })
  })

  return {
    series,
    dates: Array.from(dateSet),
    members: Array.from(memberMap.keys()).sort(),
  }
}
