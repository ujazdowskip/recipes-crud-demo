import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' 
import TetherComponent from 'react-tether'

import {
  ActionsFooter,
  Section,
  Message,
} from '../components/generic';

import {
  Button,
  FieldLabel,
  TextInput,
  InputGroup,
  Tooltip,
} from '../components/input';

import { ModalHeader } from './Modal'

const EditorHeader = (({_id}) => {
  if (_id) {
    return 'Create new recipe'
  }

  return 'Edit recipe'
})

const IngredientsList = ({ingredients, onRemove}) => {
  if (!ingredients || ingredients.length === 0) {
    return (
      <Message type="info">
        Add some ingredients...
      </Message>
    )
  }

  return (
    <ol>
      {
        ingredients.map(ing => (
          <li key={ing}>
            {ing}
            <Button 
              iconOnly={true}
              negative={true}
              minimal={true}
              onClick={() => onRemove(ing)}
            >
              <FontAwesomeIcon icon="trash" />
            </Button>
          </li>
        ))
      } 
    </ol>
  )
}

class RecipeEditor extends Component {

  constructor(props) {
    super(...arguments )
    const {_id, name, ingredients} = props.recipe
    this.state = {
      _id,
      name,
      ingredients,
      newIngredient: '',
      alreadyExist: false
    }
  }

  handleEdit = (evt) => {
    const {name, value} = evt.target

    switch (name) {
      case 'name':
      case 'ingredients':
        this.setState((state, props) => ({[name]: value})) 
        break;
      case 'newIngredient':
        //TODO: add validation (same ingredient) 
        this.setState((state, props) => {
          const alreadyExist = this.state.ingredients.includes(value)

          return {
            'newIngredient': value,
            alreadyExist
          }
        }) 
      default:
        break;
    }
  }

  handleSave = async () => {
    const {_id, name, ingredients} = this.state

    try {
      if (_id) {
        await this.props.onUpdate({ _id, name, ingredients})
      } else {
        await this.props.onCreate({ name, ingredients})
      }
      this.props.onEnd()
    } catch (error) {
      //TODO: catch some errors 
    }
  }

  handleRemoveIng = (ingredient) => {
    const {ingredients} = this.state

    this.setState((state) => {
      return {
        ingredients: ingredients.filter(ing => ing !== ingredient)
      }
    })
  }

  handleAddIng = () => {
    this.setState((state) => {
      return {
        newIngredient: '',
        ingredients: [
          this.state.newIngredient,
          ...this.state.ingredients
        ]
      }
    })
  }

  handleClearNewIng = () => {
    this.setState((state) => {
      return {
        newIngredient: '',
      }
    })
  }

  render() {
    return (
      <div style={{width: '400px'}}>
          <ModalHeader>
            <EditorHeader _id={this.state._id} />
          </ModalHeader>
          <Section>
            <FieldLabel htmlFor="nameInput">
              Name 
            </FieldLabel>
            <TextInput 
              id="nameInput"
              name="name"
              type="text"
              value={this.state.name}
              onChange={this.handleEdit}
              placeholder="Recipe name"
            />
            <hr/>
            <h3>Ingredients:</h3>
            <IngredientsList ingredients={this.state.ingredients} onRemove={this.handleRemoveIng} />
            <hr/>
              <FieldLabel htmlFor="newIngField">
                New ingredient
              </FieldLabel>
              <InputGroup> 
                <TetherComponent attachment="bottom center" offset="0 0">
                  <TextInput
                    id="newIngField"
                    name="newIngredient"
                    type="text"
                    error={this.state.alreadyExist}
                    value={this.state.newIngredient}
                    onChange={this.handleEdit}
                    placeholder="Ingredient name"
                  />
                  {this.state.alreadyExist && <Tooltip error={true}>Ingredient already exist!</Tooltip>}
                </TetherComponent>
                <Button 
                  iconOnly={true}
                  disabled={!this.state.newIngredient || this.state.alreadyExist}
                  onClick={this.handleAddIng}
                >
                  <FontAwesomeIcon icon="plus" />
                </Button>
                <Button
                  negative={true}
                  iconOnly={true}
                  onClick={this.handleClearNewIng}
                >
                  <FontAwesomeIcon icon="times" />
                </Button>
              </InputGroup>
          </Section>

          <ActionsFooter>
            <InputGroup>
              <Button onClick={this.props.onEnd}>Cancel</Button>
              <Button
                disabled={!this.state.name || this.state.ingredients.length === 0}
                onClick={this.handleSave}>Save</Button>
            </InputGroup>
          </ActionsFooter>
      </div>
    )
  }
}

export default RecipeEditor