import styled from 'styled-components';
import {
  spacing_md,
  spacing_sm,
  btnFontSize,
  neutral,
  positive,
  info,
  warning,
  negative,
  border_radius,
  border_width,
} from './variables'

const Button = styled.button`
  border-radius: 2px;
  border-width: ${({minimal}) => {
    if (minimal) return 0;

    return border_width;
  }};
  padding: ${(props) => {
    if (props.iconOnly) {
      return 0
    }

    return '0 0.5rem';
  }};
  box-sizing: content-box;
  font-size: ${btnFontSize};
  text-transform: uppercase;
  height: 2rem;
  min-width: 2rem;
  margin: 0;
  opacity: ${(props => {
    if (props.disabled) return 0.5

    return 1
  })}
  cursor: ${props => {
    if (props.disabled) {
      return 'not-allowed'
    }

    return 'pointer'
  }};
  background: none;
  color: ${props => {

    if (props.disabled) {
      return neutral
    }

    if (props.positive) {
      return positive
    } else if (props.info) {
      return info
    } else if (props.negative) {
      return negative 
    } else if (props.warning) {
      return warning
    } else {
      return neutral
    }
  }};
  border-color: ${props => {

    if (props.disabled) {
      return neutral
    }

    if (props.positive) {
      return positive
    } else if (props.info) {
      return info
    } else if (props.negative) {
      return negative 
    } else if (props.warning) {
      return warning
    } else {
      return neutral
    }
  }};
`

const FieldLabel = styled.label`
  display: flex;
  flex-direction: column;
  font-size: 0.7rem;
  margin-bottom: 0.2rem;
`

const TextInput = styled.input`
  border-width: 1px;
  border-style: solid;
  border-color: ${({error}) => {
    if (error) {
      return negative
    }

    return neutral
  }};
  border-radius: 2px;
  line-height: 2rem;
  padding: 0;
  padding-left: 0.5rem;
`

const InputGroup = styled.div`
  display: flex;
  & > *:not(:first-child) {
    margin-left: 0.25rem;
  }
`

const Tooltip = styled.div`
  display: inline-block;
  position: relative;
  border-radius: ${border_radius};
  background: ${props => {
    if (props.error) {
      return negative
    }

    return '#333333'
  }};
  padding: 1rem;
  margin-bottom: 10px;
  color: white;

  &::after { 
    bottom: -10px;
    left: calc(50% - 10px);
    position: absolute;
    content: " ";
    font-size: 0px;
    line-height: 0;
    width: 0px;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-top-width: 10px;
    border-top-style: solid;
    border-top-color: ${props => {
      if (props.error) {
        return negative
      }

      return '#333333'
    }};
  }
`

export {
  Button,
  FieldLabel,
  TextInput,
  InputGroup,
  Tooltip,
}