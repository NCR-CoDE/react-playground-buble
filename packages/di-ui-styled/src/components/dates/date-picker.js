import React from 'react'
import styled from 'styled-components'
import Month from './month'
import DayNames from './day-names'
import MonthChooser from './month-chooser'

const Wrapper = styled.div`
  width: 280px;
  background: #fff;
`

export default class DatePicker extends React.Component {
  state = {
    displayedMonth: this.props.firstSelected || new Date(),
    firstSelected: this.props.firstSelected || null,
    lastSelected: this.props.lastSelected || null,
  }

  setDisplayedMonth = displayedMonth => {
    this.setState({ displayedMonth })
  }

  onSelect = date => {
    const { range, onChange, closing } = this.props
    if (closing) return
    let {
      firstSelected,
      lastSelected,
    } = this.state
    if (!range) {
      firstSelected = date
      lastSelected = null
    } else {
      if (lastSelected !== null) {
        firstSelected = date
        lastSelected = null
      } else {
        if (firstSelected) {
          lastSelected = date
        } else {
          firstSelected = date
        }
      }
    }
    let min = firstSelected
    let max = lastSelected
    if (lastSelected && firstSelected && firstSelected > lastSelected) {
      min = lastSelected
      max = firstSelected
    }
    this.setState({
      firstSelected: min,
      lastSelected: max,
    })
    if (!onChange) return
    onChange({
      firstSelected: min,
      lastSelected: max,
    })
  }



  render() {
    const {
      displayedMonth,
      firstSelected,
      lastSelected,
    } = this.state
    const {
      range,
      disableWeekends,
      minStartDate,
      maxEndDate,
      onChange,
    } = this.props
    const { setDisplayedMonth, onSelect } = this
    // let min = firstSelected
    // let max = lastSelected
    // if (lastSelected && firstSelected && firstSelected > lastSelected) {
    //   min = lastSelected
    //   max = firstSelected
    // }
    return (
      <Wrapper>
        <MonthChooser
          defaultValue={displayedMonth}
          onChange={setDisplayedMonth}
        />
        <DayNames />
        <Month
          showMonth={displayedMonth}
          minStartDate={minStartDate}
          maxEndDate={maxEndDate}
          firstSelected={firstSelected}
          lastSelected={lastSelected}
          onSelect={onSelect}
          range={range}
          disableWeekends={disableWeekends}
        />
      </Wrapper>
    )
  }

}