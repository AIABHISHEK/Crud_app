const axios = require('axios');


exports.home_route = (req, res) => {
    
    axios.get("http://localhost:3000/api/users") // returns promise
        .then(function (response) {
            // response return all info and data
            res.render("index",{users:response.data});
    })
}

exports.add_user = (req, res) => {
    res.render("add_user");
}


exports.update_user = (req, res) => {

    axios.get("http://localhost:3000/api/users", { params: {id:req.query.id}// here we want specific user
    }).then(function (user_data) {
        res.render("update_user", {user:user_data.data});
    }).catch(function (err) {
        res.send(err);
})
    
}