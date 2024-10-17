function TaskManager() {
  let tasks = loadTasks();

  //////////////////////////////////////////////////////////////////////
  function loadTasks() {
    const tasksJSON = localStorage.getItem("tasks");
    const loadedTasks = tasksJSON ? JSON.parse(tasksJSON) : [];
    return loadedTasks.filter(
      (task) =>
        task.id !== undefined && task.id !== null && Number.isInteger(task.id)
    );
  }

  //////////////////////////////////////////////////////////////////////
  function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  //////////////////////////////////////////////////////////////////////
  function generateUniqueId() {
    if (tasks.length === 0) return 1;
    return tasks.reduce((maxId, task) => Math.max(maxId, task.id), 0) + 1;
  }

  //////////////////////////////////////////////////////////////////////
  function createTask(description) {
    const newId = generateUniqueId();
    return {
      id: newId,
      description: description ? description : "No Description",
      completed: false,
    };
  }

  //////////////////////////////////////////////////////////////////////
  function addTask(description) {
    if (!description || typeof description !== "string") {
      console.log(
        "Task description cannot be empty and must be a valid string.😪"
      );
      return;
    }
    const newTask = createTask(description);
    tasks.push(newTask);
    saveTasks();
    console.log(`Task added: ${description}`);
  }

  //////////////////////////////////////////////////////////////////////
  function viewTasks() {
    if (tasks.length === 0) {
      console.log("No tasks available.");
      return;
    }
    tasks.forEach((task) => {
      console.log(
        `[ID: ${task.id}] ${task.description} - ${
          task.completed ? "Completed" : "Not Completed"
        }`
      );
    });
  }

  //////////////////////////////////////////////////////////////////////
  function toggleTaskCompletion(id) {
    if (isNaN(id)) {
      console.log("Invalid task ID.");
      return;
    }
    const task = tasks.find((t) => t.id === id);
    if (task) {
      task.completed = !task.completed;
      saveTasks();
      console.log(
        `Task [ID: ${id}] status changed to ${
          task.completed ? "Completed" : "Not Completed"
        }.`
      );
    } else {
      console.log(`Task with ID ${id} not found.`);
    }
  }

  //////////////////////////////////////////////////////////////////////
  function removeTask(id) {
    if (isNaN(id)) {
      console.log("Invalid task ID.");
      return;
    }
    const initialLength = tasks.length;
    tasks = tasks.filter((t) => t.id !== id);
    if (tasks.length < initialLength) {
      saveTasks();
      console.log(`Task [ID: ${id}] removed.`);
    } else {
      console.log(`Task with ID ${id} not found.`);
    }
  }

  //////////////////////////////////////////////////////////////////////
  function updateTask(id, newDescription) {
    if (!newDescription || typeof newDescription !== "string") {
      console.log("Invalid task description.");
      return;
    }
    const task = tasks.find((t) => t.id === id);
    if (task) {
      task.description = newDescription;
      saveTasks();
      console.log(`Task [ID: ${id}] updated to: "${newDescription}"`);
    } else {
      console.log(`Task with ID ${id} not found.`);
    }
  }

  //////////////////////////////////////////////////////////////////////
  function searchTasks(searchTerm) {
    if (!searchTerm || typeof searchTerm !== "string") {
      console.log("Search term cannot be empty.");
      return;
    }
    const foundTasks = tasks.filter((t) =>
      t.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (foundTasks.length > 0) {
      foundTasks.forEach((task) => {
        console.log(
          `[ID: ${task.id}] ${task.description} - ${
            task.completed ? "Completed" : "Not Completed"
          }`
        );
      });
    } else {
      console.log(`No tasks matching "${searchTerm}" found.`);
    }
  }

  return {
    addTask,
    viewTasks,
    toggleTaskCompletion,
    removeTask,
    updateTask,
    searchTasks,
  };
}

//////////////////////////////////////////////////////////////////////
function displayMenu() {
  console.log("Task Manager Menu: 💻");
  console.log("1. Add Task");
  console.log("2. View Tasks");
  console.log("3. Toggle Task Completion");
  console.log("4. Edit Task");
  console.log("5. Delete Task");
  console.log("6. Search for Task");
  console.log("7. Exit");
}

//////////////////////////////////////////////////////////////////////
function handleUserInput() {
  const taskManager = TaskManager();
  displayMenu();
  let choice = prompt("Select an option from the menu (1-7):");

  switch (choice) {
    case "1":
      let taskDescription = prompt("Enter the task description: 💡");
      if (taskDescription) {
        taskManager.addTask(taskDescription);
      }
      handleUserInput();
      break;
    case "2":
      taskManager.viewTasks();
      handleUserInput();
      break;
    case "3":
      let toggleId = parseInt(
        prompt("Enter the task ID to toggle its completion status: 😎")
      );
      taskManager.toggleTaskCompletion(toggleId);
      handleUserInput();
      break;
    case "4":
      let editId = parseInt(prompt("Enter the task ID to edit: 😏"));
      let newDescription = prompt("Enter the new description:");
      if (newDescription) {
        taskManager.updateTask(editId, newDescription);
      }
      handleUserInput();
      break;
    case "5":
      let deleteId = parseInt(prompt("Enter the task ID to delete: 😯"));
      taskManager.removeTask(deleteId);
      handleUserInput();
      break;
    case "6":
      let searchTerm = prompt("Enter search term: 🔍");
      taskManager.searchTasks(searchTerm);
      handleUserInput();
      break;
    case "7":
      console.log("Thank you for using Task Manager! 🙏");
      break;
    default:
      console.log("Invalid option, please choose a number from 1 to 7. 🌝");
      handleUserInput();
      break;
  }
}

handleUserInput();
