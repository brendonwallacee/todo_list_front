import { TrashIcon } from "@heroicons/react/16/solid";
import { TodoState } from "@root/public/enums";

interface CardProps {
  id: number;
  title: string;
  description: string;
  state: TodoState;
  onChangeState: (id: number, newState: TodoState) => void;
}

export default function Card({ id, title, description, state, onChangeState}: CardProps) {

  return (
    <div className="relative flex flex-col p-2 w-[95%] bg-white rounded-sm shadow-lg dark:bg-gray-800">
      <h1 className="">{title}</h1>
      <p >{description}</p>
      <select
        value={state}
        onChange={(e) => onChangeState(id, e.target.value as TodoState)}
        className="border p-2 rounded dark:bg-gray-800"
        >
          {Object.values(TodoState).map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
      </select>
      <button onClick={() => {onChangeState(id, TodoState.TRASH)}}>< TrashIcon className="absolute top-2 right-2 w-4 h-4 hover:text-red-800"/></button>
    </div>
  );
}