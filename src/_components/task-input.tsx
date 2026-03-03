"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { TodoState } from "@root/public/enums";
import { useForm } from "react-hook-form";
import z from "zod";

const taskSchema = z.object({
  title: z.string().min(3, "O título precisa ter pelo menos 3 caracteres").max(20, "limite ultrapassado"),
  description: z.string(),
  state: z.enum(TodoState)
});

type TaskFormData = z.infer<typeof taskSchema>;

type FormTaskProps = {
  action: (data: TaskFormData) => void;
};

export default function TaskInput({ action: onSubmitForm }: FormTaskProps) {

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
    mode: "onChange",
  });

  function onSubmit(data: TaskFormData) {
    onSubmitForm(data);
  }

  return (
    <div>
      <form
        className="flex flex-col space-y-4"
        onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col">
          <label htmlFor="title" className="mb-1">Título:</label>
          <input
            {...register("title")}
            className="px-4 py-2 rounded-lg border border-gray-700 bg-gray-800 focus:outline-none focus:border-green-500"
          />
          {errors.title && (
            <span className="text-red-500 text-sm">
              {errors.title.message}
            </span>
          )}
        </div>

        <div className="flex flex-col">
          <label htmlFor="description" className="mb-1">Descrição:</label>
          <input
            type="description"
            {...register("description")}
            className="px-4 py-2 rounded-lg border border-gray-700 bg-gray-800"
          />
          {errors.description && (
            <span className="text-red-500 text-sm">
              {errors.description.message}
            </span>
          )}
        </div>

        <div className="flex w-full">
          <select
            {...register("state")}
            className="border p-2 rounded dark:bg-gray-800 w-full"
            defaultValue={TodoState.TODO}
          >
            <option value={TodoState.TODO}>A fazer</option>
            <option value={TodoState.DOING}>Fazendo</option>
            <option value={TodoState.DONE}>Feito</option>
          </select>

          {errors.state && (
            <span className="text-red-500 text-sm">
              {errors.state.message}
            </span>
          )}
        </div>


        <button
          type="submit"
          disabled={!isValid}
          className="bg-green-600 font-bold text-font-secondary px-4 py-2 rounded-lg hover:bg-green-500 cursor-pointer transition disabled:opacity-50 disabled:cursor-not-allowed hover:disabled:bg-green-600"
        >
          Adicionar Tarefa
        </button>
      </form>
    </div>
  )
}