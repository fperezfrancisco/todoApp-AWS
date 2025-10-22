### API DOCUMENTATION

## Tasks Structure

# Task POST

Task req.body should come with

- task: string;
- user ID: string;
- taskListID: string;
- taskListName: string;
- completed: boolean;

Task DB structure:

- taskID: randomID;
- task: string;
- userID: string;
- taskListID: string;
- taskListName: string;
- completed: boolean;
- createdOn: timestamp;
- lastUpdated: timestamp;

# Task READ

Task req.body should come with

- taskID: string;

Return
That specific task object from the DB corresponding to that ID

# Task READ ALL associated with taskList ID

Task req.body should come with

- taskListID: string

Return
List of all tasks associated with that tasklist ID

# Task UPDATE

Task req.body should come with
Task elements to update (completed, taskListName, etc.)

# Task DELETE

Task req.body should come with

- taskID: string;

Return
Whether task was deleted successfully or not

## Task List Structure

# Task List POST

Task List req.body should come with

- taskListName: string;
- userID: string;
- completed: boolean;
- state: archived or draft or active;
- tags: String[] (array of strings)

# Task List READ

Task List req.body should come with

- taskListID or taskListName

Return
Task List object from DB corresponding to id or name

# Task List READ ALL associated with User

Task List req.body should come with

- userID

Return
All task lists associated with user id

# Task List UPDATE

Task list req.body should come with
Task list elements to update (completed, name, etc.)

# Task List DELETE

Task list req.body

- taskListID

Return
whether list was deleted successfully
