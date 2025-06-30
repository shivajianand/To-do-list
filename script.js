const taskInput = document.getElementById('task-input');
const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');
const clearAllBtn = document.getElementById('clear-all-btn');
const progress = document.getElementById('progress');
const customCategoryInput = document.getElementById('custom-category-input');
const addCategoryBtn = document.getElementById('add-category-btn');
const categoryDropdown = document.getElementById('category');

// Add a new task
addTaskBtn.addEventListener('click', () => {
  const taskText = taskInput.value.trim();
  const taskCategory = categoryDropdown.value;
  const dueDate = document.getElementById('due-date').value;

  if (taskText === '') {
    alert('Please enter a task');
    return;
  }

  // Create a task item
  const taskItem = document.createElement('li');
  taskItem.className = 'task-item';
  taskItem.innerHTML = `
    <span>${taskText}</span>
    <span class="category">${taskCategory}</span>
    <span class="due-date">${dueDate}</span>
    <button class="complete-btn">Complete</button>
    <button class="delete-btn">Delete</button>
  `;

  // Append to task list
  taskList.appendChild(taskItem);
  taskInput.value = '';
  document.getElementById('due-date').value = '';

  // Mark task as completed
  const completeBtn = taskItem.querySelector('.complete-btn');
  completeBtn.addEventListener('click', () => {
    taskItem.classList.toggle('completed');
    updateProgress();
  });

  // Delete task functionality
  const deleteBtn = taskItem.querySelector('.delete-btn');
  deleteBtn.addEventListener('click', () => {
    taskList.removeChild(taskItem);
    updateProgress();
  });

  updateProgress();
});

// Add custom category
addCategoryBtn.addEventListener('click', () => {
  const customCategory = customCategoryInput.value.trim();

  if (customCategory === '') {
    alert('Please enter a category name');
    return;
  }

  // Check for duplicate categories
  const existingOptions = Array.from(categoryDropdown.options).map(option => option.value);
  if (existingOptions.includes(customCategory.toLowerCase())) {
    alert('Category already exists');
    customCategoryInput.value = '';
    return;
  }

  // Create a new <option> element
  const newOption = document.createElement('option');
  newOption.value = customCategory.toLowerCase();
  newOption.textContent = customCategory;

  // Add the new option to the dropdown
  categoryDropdown.appendChild(newOption);

  // Clear the input field
  customCategoryInput.value = '';
});

// Clear all tasks
clearAllBtn.addEventListener('click', () => {
  taskList.innerHTML = '';
  updateProgress();
});

// Update progress
function updateProgress() {
  const totalTasks = taskList.children.length;
  const completedTasks = document.querySelectorAll('.task-item.completed').length;

  if (totalTasks === 0) {
    progress.value = 0;
  } else {
    progress.value = (completedTasks / totalTasks) * 100;
  }
}
