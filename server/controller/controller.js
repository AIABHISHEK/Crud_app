var userdb = require("../model/model");

// Create and save user

exports.create = (req, res) => {
    //validate user
    if (!req.body) {
        res.status(400).send({ message: "content can not be empty" });
        return;
    }

    // Create new user
    const user = new userdb({
        name: req.body.name,
        email: req.body.email,
        gender: req.body.gender,
        status: req.body.status,
    });

    //save user in database
    user.save(user)
        .then((data) => {  //save user in database
            // res.send(data); now we need to redirect page back to new user page 
            res.redirect("/add-user");
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "some error occurred",
            });
        });
}

exports.find = (req, res) => {

//if query
    if (req.query.id) {
        const id = req.query.id;
        userdb.findById(id)
            .then((data) => {
                if (!data) {
                    res.status(404).send({
                        message: "not found user with id " + id
                    })
                }
                else {
                    res.send(data)
                }
            })
            .catch((err) => {
            res.status(500).send({message:"Error getting user"})
        })
    }
    else {
        userdb.find()
            .then(user => {
                res.send(user)
            })
            .catch(err => {
                res.status(500).send({ message: err.message || "some error occured" });
            })   
}
    
}

exports.update = (req, res) => {
    if (!req.body) {
        return res.status(500).send({ message: "Update can not performed" });
    }

    const id = req.params.id;// getting the id of user to be updated  --- url partameter

    userdb.findByIdAndUpdate(id, req.body, { useFindAndModify: true }).then(data => {
        if (!data) {
            res.status(404).send({ message: `Cannot update ${id}user` })
        }
        else {
            res.send(data);
        }
    }).catch(err => {
        res.status(500).send({ message: "Error in update" })
    })
}

exports.delete = (req, res) => { 
    const id = req.params.id;
    userdb.findByIdAndDelete(id)
        .then(data => {
            if (!data) {
            res.status(404).send({ message: `Cannot delete ${id}user` })
            }
            else {
                res.send({message:"user deleted"})
            }
        })
        .catch(err => {
        res.status(500).send({ message: "Error in delete" })
    })
    
}
