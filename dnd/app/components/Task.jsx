"use client";
import React from "react";
import { Draggable } from "react-beautiful-dnd";

const Task = ({ task, index }) => {
	return (
		<Draggable draggableId={`${task.id}`} key={task.id} index={index}>
			{(provided, snapshot) => (
				<div
					className="  text-black min-h-[90px]  cursor-pointer flex justify-between flex-col"
					{...provided.draggableProps}
					{...provided.dragHandleProps}
					ref={provided.innerRef}
					isDragging={snapshot.isDragging}
				>
					<div className="flex bg-red-200 shadow-md shadow-black">
						<div className="flex justify-start p-2">
							<span>
								<small>#{task.id}</small>
							</span>
						</div>
						<div className="flex justify-center p-2">{task.title}</div>
					</div>
					{provided.placeholder}
				</div>
			)}
		</Draggable>
	);
};

export default Task;
