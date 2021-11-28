import { makeChart as initArcChart } from './charts/bigPercentageArcChart.js'
import { makeBoard as initTextBoard } from './charts/textBoard.js'
import { makeChart as initMultiLineChart } from './charts/multiLineChart.js'
import {
  getBtsWriteRatioData,
  getBtsComposeRatioData,
  getBoybandOwnSongData,
} from './services/btsData.js'

async function initCharts() {
  const colorScheme = d3.schemeTableau10

  const btsWriteRatio = await getBtsWriteRatioData()
  initArcChart(
    '#write-arc-chart',
    btsWriteRatio,
    colorScheme,
    '멤버 작사 참여 비율'
  )

  const btsComposeRatio = await getBtsComposeRatioData()
  initArcChart(
    '#compose-arc-chart',
    btsComposeRatio,
    colorScheme,
    '멤버 작곡 참여 비율'
  )

  initTextBoard('#total-song-board', 226, colorScheme)
  initTextBoard('#total-album-board', 38, colorScheme)

  const boybandOwnSongData = await getBoybandOwnSongData()
  initMultiLineChart(
    '#boyband-make-own-song-line-chart',
    boybandOwnSongData,
    colorScheme
  )
}

initCharts()
