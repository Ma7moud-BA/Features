"use client";
import React from "react";
import { Droppable } from "react-beautiful-dnd";
import Task from "./Task";

export const Column = ({ title, tasks, id }) => {
	return (
		<div className="bg-[#f4f5f7] border-r-2 w-[300px] h-[300px] overflow-y-scroll scrollbar-hide ">
			<h3 className="p-8 bg-pink-400 text-center sticky">{title}</h3>
			<Droppable droppableId={id}>
				{(provided, snapshot) => (
					<div
						className="p-3 bg-[#f4f5f7] flex-grow min-h-[100px]"
						ref={provided.innerRef}
						{...provided.droppableProps}
						isDraggingOver={snapshot.isDraggingOver}
					>
						{/* provide tasks here */}
						{tasks.map((task, index) => {
							return <Task key={index} index={index} task={task} />;
						})}
						{provided.placeholder}
					</div>
				)}
			</Droppable>
		</div>
	);
};
