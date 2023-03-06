const { default: mongoose } = require("mongoose");




const StatusSchema = new mongoose.Schema ({
    title: {
        type: String,
        required: true
    },
    color: {
        type: String,
        default: ''
    }
})

const SubTaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
    },
    completed: {
        type: Boolean,
        default: false
    }
},
{timestamps: true}
);

const TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    substasks: {
        type: [SubTaskSchema],
    },
    status: {
        type: StatusSchema,
        required: true
    }
})
const BoardSchema = new mongoose.Schema ({
    title: {
        type: String,
        required: true,
        unique:true
    },
    description: {
        type: String,
        required:true
      },
      createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:true
      },
      /*  
      column: {
        type: [{
            name: {
                type: String,
                required:true
            },
            description: {
                type: String,
                required: true
            }
        }]
      },
      tasks: {
        type: [TaskSchema]
      }
      */
},
{timestamps: true})

const Board = mongoose.model('Board', BoardSchema);

module.exports= Board;