import React from 'react';
import styled from 'styled-components'
import '../styles/accordion.css';
import {
  Accordion,
  AccordionItem,
  AccordionItemTitle,
  AccordionItemBody,
} from 'react-accessible-accordion'

import {
  ActionsFooter,
} from './generic'

import {
  Button,
  InputGroup,
} from './input'

const AccordionContent = styled.div`
  margin: 0.5rem;
`

const RecipesAccordion = ({recipes, onDelete, onEdit}) => (
  <Accordion>
    {
      recipes.map((recipe, index) => (
        <AccordionItem key={recipe._id}>
            <AccordionItemTitle>
              <div className="accordion__arrow"></div>
              {recipe.name}
            </AccordionItemTitle>
            <AccordionItemBody>
              <AccordionContent>
                <h3>Ingredients:</h3>
                <ol> 
                  { recipe.ingredients.map(ing => <li key={ing}>{ing}</li>) }
                </ol>
              </AccordionContent>
              <ActionsFooter>
                <InputGroup>
                  <Button onClick={() => onDelete(recipe)}>Delete</Button>
                  <Button onClick={() => onEdit(recipe)} >Edit</Button>
                </InputGroup>
              </ActionsFooter>
            </AccordionItemBody>
        </AccordionItem>
      ))
    }
  </Accordion>
)

export default RecipesAccordion