import { useAssignedTasks } from "./hooks/useEmpAssignedTasks";

const EmployeeAssignedTasksPage = () => {
  const { data: tasks, isLoading } = useAssignedTasks();

  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      <h2>Tasks Assigned to You</h2>
      {tasks?.length === 0 ? (
        <p>No tasks assigned</p>
      ) : (
        tasks.map((task) => (
          <div
            key={task._id}
            style={{ border: "1px solid #ddd", padding: 10, marginBottom: 10 }}
          >
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>Status: {task.status}</p>
            <p>Due: {new Date(task.dueDate).toLocaleDateString()}</p>
            <p>Created by: {task.createdBy}</p>
            <p>Assigned to: {task.assignedTo}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default EmployeeAssignedTasksPage;
