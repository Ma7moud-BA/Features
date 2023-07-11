import Image from "next/image";
import KanbanBoard from "./components/KanbanBoard";
import Task from "./components/Task";
export default function Home() {
	return (
		<div className=" min-h-screen text-red-700">
			<KanbanBoard></KanbanBoard>
		</div>
	);
}
