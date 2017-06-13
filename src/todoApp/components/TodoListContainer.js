import React, { Component } from 'react';
import { connect } from 'react-redux';
import TodoList from './TodoList';
import PropTypes from 'prop-types';


const getFilteredTodos = (todos, filter) => todos.filter(td => filter=='ALL' || (filter=='DONE' && td.done) || (filter=='UNDONE'&&!td.done))

@connect(
	state => ({
		todos: state.todoChunk.todos,
		visibilityFilter: state.todoChunk.visibilityFilter
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
		let { todos, visibilityFilter } = this.props;
		return <TodoList {...this.props} todos={getFilteredTodos(todos, visibilityFilter)}></TodoList>
	}

}

TodoListContainer.propTypes = {
	todos: PropTypes.arrayOf(PropTypes.object),
	visibilityFilter: PropTypes.string
};


export default TodoListContainer;

