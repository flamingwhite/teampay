import React, { Component } from 'react';
import { connect } from 'react-redux';
import TodoList from './TodoList';
import RichArray from '../../lib/richArray';
import PropTypes from 'prop-types';
import { createSelector } from 'reselect';

const visibileTodosSelector = createSelector(
	state => state.todoChunk.todos,
	state => state.todoChunk.visibilityFilter,
	(todos, filter) => RichArray(todos).filter(td => filter=='ALL' || (filter=='DONE' && td.done) || (filter=='UNDONE'&&!td.done))
)


// const getFilteredTodos = (todos, filter) => RichArray(todos).filter(td => filter=='ALL' || (filter=='DONE' && td.done) || (filter=='UNDONE'&&!td.done))

@connect(
	state => ({
		todos: visibileTodosSelector(state)
		// visibilityFilter: state.todoChunk.visibilityFilter
	})
)
class TodoListContainer extends Component {
	constructor(props) {
		super(props);
		// this.showingTodos = this.showingTodos.bind(this);
	}

	// showingTodos() {

	// 	let { todos, visibilityFilter } = this.props;
	// 	return todos.filter(td => (visibilityFilter == 'ALL' || (visibilityFilter == 'DONE' && td.done) || (visibilityFilter == 'UNDONE' && !td.done)));
	// }

	render() {
		let { todos } = this.props;
		return <TodoList {...this.props} todos={todos}></TodoList>
	}

}

TodoListContainer.propTypes = {
	todos: PropTypes.arrayOf(PropTypes.object),
	visibilityFilter: PropTypes.string
};


export default TodoListContainer;

