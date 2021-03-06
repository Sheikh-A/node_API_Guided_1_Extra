const express = require("express")
const db = require("./database.js")

// creates our server instance
const server = express()

// we'll talk about this later, just copy it for now
server.use(express.json())

server.get("/", (req, res) => {
	res.json({ message: "hello, world" })
})

server.get("/users", (req, res) => {
	// don't worry about the function implementation yet, just call it.
	// it's essentially "faking" a real database
	const users = db.getUsers()

	res.json(users)
})

server.get("/users/:id", (req, res) => {
	// our route params come into variables with the same name as the param.
	// so :id === req.params.id
	const userId = req.params.id
	const user = db.getUserById(userId)

	if (user) {
		res.json(user)
	} else {
		res.status(404).json({
			message: "User not found",
		})
	}
})

server.post("/users", (req, res) => {
	// we don't want to create a user with an empty name, so check for it
	if (!req.body.name) {
		return res.status(400).json({
			message: "Need a user name!",
		})
	}

	const newUser = db.createUser({
		name: req.body.name,
	})

	// 201 status code means a resource was successfully created
	res.status(201).json(newUser)
})

server.put("/users/:id", (req, res) => {
	const user = db.getUserById(req.params.id)

	// can't update a user that doesn't exist, so make sure it exists first
	if (user) {
		const updatedUser = db.updateUser(user.id, {
			// use a fallback value if no name is specified, so it doesn't empty the field
			name: req.body.name || user.name,
		})

		res.json(updatedUser)
	} else {
		res.status(404).json({
			message: "User not found",
		})
	}
})

server.delete("/users/:id", (req, res) => {
	const user = db.getUserById(req.params.id)

	if (user) {
		db.deleteUser(user.id)
		// 204 is just a successful empty response
		res.status(204).end()
	} else {
		res.status(404).json({
			message: "User not found",
		})
	}
})

server.listen(8080, () => {
	console.log("server started at port 8080")
})