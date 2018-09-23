import styled from 'styled-components'
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import {
  spacing_md,
  info,
  negative,
  warning,
  border_radius,
} from './variables'

const MainLayout = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: 100px auto auto;
`

const GridItem = styled.div`
  grid-column: ${props => props.column};
  grid-row: ${props => props.row};
  padding: 1rem;
`

const ActionsFooter = styled.div`
  background-color: #f4f4f4;
  display: flex;
  justify-content: flex-end;
  padding: 0.25rem;
`

const FlexContainer = styled.div`
  display: flex;
  justify-content: ${props => props.justify ? props.justify : 'unset'};
  align-content: ${props => props.align ? props.align : 'unset'};
`

const Section = styled.div`
  padding: 1rem;
`

const Message = styled(({children, ...props})=> {
  return (
    <div {...props}>
      <FontAwesomeIcon style={{marginRight: '0.5rem'}} icon="info-circle" />
      {children}
    </div>
  )
})`
  padding: ${spacing_md};
  border-width: 1px;
  border-style: solid;
  border-color: ${props => {
    switch (props.type) {
      case 'info':
        return info 
      case 'negative':
        return negative
      case 'warning':
        return warning 
      default:
        return 'gray'
    }
  }};
  border-radius: ${border_radius};
`

export {
  MainLayout,
  GridItem,
  ActionsFooter,
  FlexContainer,
  Section,
  Message,
}