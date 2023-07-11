"use client";
import React, { useEffect, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { Column } from "./Column";
const KanbanBoard = () => {
	const [completed, setCompleted] = useState([]);
	const [incomplete, setIncomplete] = useState([]);
	useEffect(() => {
		const getTodos = async () => {
			const res = await fetch("https://jsonplaceholder.typicode.com/todos");
			const data = await res.json();
			setCompleted(data.filter((task) => task.completed));
			setIncomplete(data.filter((task) => !task.completed));
		};
		getTodos();
	}, []);

	// const handleDragEnd = (result) => {
	// 	const { destination, source, draggableId } = result;
	// 	if (!destination || source.droppableId === destination.droppableId) {
	// 		return;
	// 	}

	// 	const startColumn = source.droppableId === "2" ? completed : incomplete;
	// 	const endColumn = destination.droppableId === "2" ? completed : incomplete;

	// 	const draggedTask = startColumn.find(
	// 		(task) => task.id.toString() === draggableId
	// 	);

	// 	if (!draggedTask) {
	// 		return; // Dragged task not found in the start column
	// 	}

	// 	const updatedStartColumn = startColumn.filter(
	// 		(task) => task.id.toString() !== draggableId
	// 	);

	// 	const updatedEndColumn = [...endColumn];

	// 	if (destination.index === updatedEndColumn.length) {
	// 		updatedEndColumn.push(draggedTask);
	// 	} else {
	// 		updatedEndColumn.splice(destination.index, 0, draggedTask);
	// 	}

	// 	if (source.droppableId === "2") {
	// 		setCompleted(updatedStartColumn);
	// 		setIncomplete(updatedEndColumn);
	// 	} else {
	// 		setCompleted(updatedEndColumn);
	// 		setIncomplete(updatedStartColumn);
	// 	}
	// };
	const handleDragEnd = (result) => {
		const { destination, source, draggableId } = result;

		if (source.droppableId === destination.droppableId) {
			const column = source.droppableId === "2" ? completed : incomplete;
			const updatedColumn = Array.from(column);

			const [draggedTask] = updatedColumn.splice(source.index, 1);
			updatedColumn.splice(destination.index, 0, draggedTask);

			if (source.droppableId === "2") {
				setCompleted(updatedColumn);
			} else {
				setIncomplete(updatedColumn);
			}

			return;
		}

		const startColumn = source.droppableId === "2" ? completed : incomplete;
		const endColumn = destination.droppableId === "2" ? completed : incomplete;

		const draggedTask = startColumn.find(
			(task) => task.id.toString() === draggableId
		);

		if (!draggedTask) {
			return; // Dragged task not found in the start column
		}

		const updatedStartColumn = startColumn.filter(
			(task) => task.id.toString() !== draggableId
		);
		const updatedEndColumn = [...endColumn];

		if (destination.index === updatedEndColumn.length) {
			updatedEndColumn.push(draggedTask);
		} else {
			updatedEndColumn.splice(destination.index, 0, draggedTask);
		}

		if (source.droppableId === "2") {
			setCompleted(updatedStartColumn);
			setIncomplete(updatedEndColumn);
		} else {
			setCompleted(updatedEndColumn);
			setIncomplete(updatedStartColumn);
		}
	};

	const removeItemById = (id, array) => {
		return array.filter((item) => item.id != id);
	};
	const findItemById = (id, array) => {
		return array.find((item) => item.id == id);
	};
	return (
		<DragDropContext onDragEnd={handleDragEnd}>
			<h2 className="text-center">Time Line</h2>
			<div className="flex justify-between items-center ">
				<Column title={"To Do"} tasks={incomplete} id="1"></Column>
				<Column title={"done"} tasks={completed} id="2"></Column>
				<Column title={"backlog"} tasks={[]} id="3"></Column>
			</div>
		</DragDropContext>
	);
};

export default KanbanBoard;
