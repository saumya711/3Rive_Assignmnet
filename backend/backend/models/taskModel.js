const mongoose = require('mongoose')

const taskSchema = mongoose.Schema(
    {
        taskName: {
            type: String,
            required: [true, "Please add a task"]
        },
        status: {
            type: String,
            required: [true, "Please add a status"],
            enum: ["Pending", "In Progress", "Completed", "Overdue"],
        }
    },
    {
        timestamps: true,
    }
)

const Task = mongoose.model("Task", taskSchema);

module.exports=Task;