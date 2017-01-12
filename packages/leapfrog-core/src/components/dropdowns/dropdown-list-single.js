// @flow

import React, { Component } from 'react'
import DropdownBox from './dropdown-box'
import DropdownSearch from './dropdown-search'
import styled from 'styled-components'
import {
  focusFirst,
  focusLast,
  focusNext,
  focusPrev,
} from './dropdown-focus-helpers'
import { googlish } from '@di/leapfrog-util'

type OptionsType = {
  value: string,
  label: string,
}

const visibleItemsQuery = 'li:not([hidden])'

const getLi = ({ hidden }) => hidden ? `
  height: 0;
  padding: 0 8px;
  overflow: 'hidden';
` : ''

const Li = styled.li`
  margin: 0;
  padding: 0 20px;
  height: 60px;
  display: flex;
  flex-direction: vertical;
  vertical-align: middle;
  align-items: center;
  ${getLi}
  list-style: none;
  ${({ nowrap }) => nowrap ? 'white-space: nowrap;' : ''}
  cursor: default;
  box-sizing: border-box;
  ${({ selected }) => selected ? 'background: #ccc;' : ''}
  &:focus {
    outline: none;
    border: 1px rgba(0,0,0,0.2) dashed;
    padding: 0 19px;
  }
  &:hover {
    background: ${({ selected }) => selected ? '#ccc' : '#f5f5f5'};
  }`

const Ul = styled.ul`
  margin: 0;
  padding: 0px;
  max-height: 300px;
  width: 100%;
  overflow-y: auto;`

const SearchWrapper = styled.div`
  padding: 14px;
  border-bottom: 1px solid #ccc;
`

const DropdownWrapper = styled.div`
  text-align: left;
  width: 100%;
`

const Wrapper = styled.div`
  width: ${({ width }) => width}px;
  display: flex;
  position: relative;
`

export default class SelectDropdown extends Component {
  state = {
    isOpen: false,
    filter: '',
    selectedIndex: undefined,
    selected: undefined,
    value: this.props.value || this.props.defaultValue,
  };

  static defaultProps = {
    width: 200,
    filterFn: filterText => ({ label }) => googlish(filterText)(label),
  }

  onDown = (e) => {
    if (e.keyCode === 40 || e.keyCode === 32) {
      this.setState({ isOpen: true })
      this.focusFirst()
      e.preventDefault()
    }
  }

  focusLast = () => focusLast(
    this.ul,
    visibleItemsQuery
  )

  focusFirst = () => focusFirst(
    this.ul,
    this.input,
    this.props.filter,
    visibleItemsQuery
  )
  focusNext = () => focusNext(
    this.ul,
    this.input,
    this.props.filter,
    visibleItemsQuery
  )

  focusPrev = () => focusPrev(
    this.ul,
    this.input,
    this.props.filter,
    visibleItemsQuery
  )

  onKeyDown = (event: Event) => {
    const key = {
      38: 'UP',
      40: 'DOWN',
      33: 'PAGEUP',
      34: 'PAGEDOWN',
      27: 'ESC',
      13: 'ENTER',
      32: 'SPACE',
    }[event.keyCode]
    if (key && !(key === 'SPACE' && event.target === this.input)) {
      event.preventDefault()
      event.stopPropagation()
    }
    switch (key) {
      case 'UP':
        this.focusPrev()
        break
      case 'DOWN':
        this.focusNext()
        break
      case 'PAGEUP':
        this.focusFirst()
        break
      case 'PAGEDOWN':
        this.focusLast()
        break
      case 'ESC':
        this.setState({ isOpen: false })
        break
    }
  }

  setSelected = item => {
    if (this.props.value) return
    this.setState({
      selected: item,
    })
    // clearTimeout(this.timeout)
    // this.timeout = setTimeout(
    //   () => {
        this.button.focus()
        this.setState({ isOpen: false })
    //   },
    //   0
    // )
  }

  onKeyDown2 = item => (event: Event) => {
    const key = {
      13: 'ENTER',
      32: 'SPACE',
    }[event.keyCode]

    if (!key) return
    this.setSelected(item)
  }

  onButtonClick = (e) => {
    this.setState({ isOpen: !this.state.isOpen })
    e.preventDefault()
  }

  onChangeFilter = ({ target }: Event) => {
    if (
      !(target instanceof HTMLInputElement) ||
      target === null
    ) return
    this.setState({ filter: target.value })
  }

  componentWillUnmount() {
    clearTimeout(this.timeout)
  }

  render () {
    const {
      filter,
      selected,
    } = this.state
    const {
      right,
      onGray,
      options,
      title,
      filterFn,
      nowrap,
      width,
      button: Button,
    } = this.props

    return (
      <Wrapper width={width}>
        <Button
          onGray={onGray}
          onKeyDown={this.onDown}
          onClick={this.onButtonClick}
          innerRef={(button: HTMLElement) => { if (button) this.button = button }}
        >
          {
            selected === undefined ?
              title :
              selected.label
          }
        </Button>
        <DropdownBox
          onKeyDown={this.onKeyDown}
          right={right}
          open={this.state.isOpen}
          style={{ width: '100%' }}
          onClickOutside={() => this.setState({ isOpen: false })}
        >
          <DropdownWrapper
            role="menu"
            innerRef={(ul: HTMLElement) => { if (ul) this.ul = ul }}
          >
            <DropdownSearch
              show={this.props.filter}
              onChange={this.onChangeFilter}
              value={filter}
              onRef={el => this.input = el}
            />

            <Ul>
              {
                options
                .filter(filterFn(filter))
                .map(({ value, label }, i) => (
                  <Li
                    nowrap={nowrap}
                    key={i}
                    tabIndex={0}
                    selected={selected === options[i]}
                    onKeyDown={this.onKeyDown2(options[i])}
                    onClick={() => this.setSelected(options[i])}
                  >
                    {label}
                  </Li>
                ))
              }
            </Ul>
          </DropdownWrapper>
        </DropdownBox>
      </Wrapper>
    )
  }
}
