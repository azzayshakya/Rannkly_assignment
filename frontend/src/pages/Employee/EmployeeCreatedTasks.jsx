import { useCreatedTasks } from "./hooks/useEmpCreatedTasks.js";
import { useDeleteTask } from "./hooks/useEmpDeleteTask.js";
import { useUpdateTask } from "./hooks/useEmpUpdateTask.js";



const EmployeeCreatedTasksPage = () => {
  const { data: tasks, isLoading } = useCreatedTasks();
  const updateTask = useUpdateTask();
  const deleteTask = useDeleteTask();

  if (isLoading) return <p>Loading...</p>;

  const handleEdit = (task) => {
    const newTitle = prompt("Enter new title", task.title);
    if (!newTitle) return;

    updateTask.mutate({ id: task._id, updatedData: { title: newTitle } });
  };

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this task?")) {
      deleteTask.mutate(id);
    }
  };

  return (
    <div>
      <h2>Tasks You Created</h2>
      {tasks?.length === 0 ? (
        <p>No tasks created</p>
      ) : (
        tasks.map((task) => (
          <div key={task._id} style={{ border: "1px solid #ddd", padding: 10, marginBottom: 10 }}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>Status: {task.status}</p>
            <button onClick={() => handleEdit(task)}>Edit</button>
            <button onClick={() => handleDelete(task._id)}>Delete</button>
          </div>
        ))
      )}
    </div>
  );
};

export default EmployeeCreatedTasksPage;
