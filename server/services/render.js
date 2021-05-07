const  axios = require('axios');
// const { query } = require('express');

exports.homeRoutes = (req,res)=>{
    axios.get("http://localhost:8080/api/users")
    .then(function(response){
        // console.log(response.data)
        res.render('index', {users:response.data});
    })
    .catch(err=>{
        res.send(err)
    })
}
exports.addUser=(req,res)=>{
    res.render('add_user');
    
}
exports.updateUser = (req,res)=>{
    axios.get('http://localhost:8080/api/users',{params:{id:req.query.id}})
    .then(function(userdata){
        res.render("update_user", {user: userdata.data})
    })
    .catch(err=>{
        res.send(err);
    })
    // res.render('update_user');
    
}