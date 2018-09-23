import React, { Component } from 'react';
import './styles/reset.css';
import './styles/typography.css';
import {
  connect
} from 'react-redux';

import { Modal } from './components/Modal'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faUtensils, faPlus, faTimes, faInfoCircle } from '@fortawesome/free-solid-svg-icons'

import {
  fetchRecipes,
  updateRecipe,
  createRecipe,
  deleteRecipe,
} from './actions/recipeActions'

import { 
  openEditor,
  closeEditor,
} from './actions/editorActions'

import {
  MainLayout,
  GridItem,
  FlexContainer,
  Message,
} from './components/generic'

import {
  Button,
} from './components/input'

import RecipeEditor from './components/RecipeEditor'
import RecipesAccordion from './components/RecipesAccordion'

library.add(faTrash, faUtensils, faPlus, faTimes, faInfoCircle)

class App extends Component {

  componentDidMount() {
    this.props.fetchRecipes()
  }

  handleCreateNewRecipe = () => {
    this.props.openEditor({
      name: '',
      ingredients: [],
    })
  }

  handleEditRecipe = (recipe) => {
    this.props.openEditor(recipe)
  }
  
  handleCloseEditor = () => {
    this.props.closeEditor()
  }

  handleUpdateRecipe = ({_id, name, ingredients}) => {
    return this.props.updateRecipe({_id, name, ingredients})
  }
  
  handleCreateRecipe = ({name, ingredients}) => {
    return this.props.createRecipe({name, ingredients})
  }

  handleDeleteRecipe = ({_id}) => {
    return this.props.deleteRecipe(_id)
  }

  render() {
    return (
      <MainLayout className="App">

        <GridItem column={"3 / 11"} row={2}>
          <FlexContainer justify="center">
            <h1>Welcome! Let's <FontAwesomeIcon icon="utensils" /></h1>
          </FlexContainer>
        </GridItem>

        <GridItem column={"4 / 10"} row={3}>
          {this.props.recipes.length === 0 && <Message type="info">You have no recipes :(</Message>}
          
          {this.props.recipes.length > 0 && 
            <RecipesAccordion
              recipes={this.props.recipes}
              onDelete={this.handleDeleteRecipe}
              onEdit={this.handleEditRecipe}
            />
          }
          
        </GridItem>

        <GridItem column={"5 / 9"} row={4}>
          <FlexContainer justify="center">
            <Button onClick={this.handleCreateNewRecipe}>Create recipe</Button>
          </FlexContainer>
        </GridItem>
        
        <GridItem column={"5 / 9"} row={5}>
          {this.props.error && <Message type="negative">{this.props.error.toString()}</Message>}
        </GridItem>

          <Modal
            isOpen={this.props.editor.isOpen}
            contentLabel="Recipe Editor"
          >
            <RecipeEditor 
              recipe={this.props.editor.data}
              onUpdate={this.handleUpdateRecipe}
              onCreate={this.handleCreateRecipe}
              onEnd={this.handleCloseEditor}
            />
          </Modal>
      </MainLayout>
    );
  }
}

const mapStateToProps = state => {
  return ({
    recipes: state.recipes.items,
    loading: state.recipes.loading,
    error: state.recipes.error,
    editor: state.editor
  })
}

const mapDispatchToProps = dispatch => ({
  fetchRecipes: () => dispatch(fetchRecipes()),
  updateRecipe: (data) => dispatch(updateRecipe(data)),
  createRecipe: (data) => dispatch(createRecipe(data)),
  deleteRecipe: (id) => dispatch(deleteRecipe(id)),
  openEditor: (data) => dispatch(openEditor(data)),
  closeEditor: () => dispatch(closeEditor()),
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
