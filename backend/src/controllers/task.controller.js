const { createTask, editTask, removeTask } = require("../services/task.service");

const postTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, status } = req.body;
  const { _id } = req.user;

  try {
    const tarea = await createTask(id, title, description, status, _id);
    res.json(tarea);
  } catch (err) {
    console.log(err);
  }
};
const updateTask = async (req, res) => {
  const { taskId } = req.params;
  const {title, description,status} = req.body;
  const { _id } = req.user;
  const taskData = {
    title,
    description,
    status
  }
  console.log(taskData);
  try {
    const updateTask = await editTask(taskId, taskData, _id);
    res.json(updateTask);
  } catch (err) {
    console.log(err);
  }
};

const deleteTask = async (req,res) => {
  const { taskId} = req.params;
  const { _id } = req.user;
  try {
    const remove = await removeTask(_id, taskId)
   } catch(err) {
    console.log(err);
   }
};
module.exports = {
  postTask,
  deleteTask,
  updateTask,
};
