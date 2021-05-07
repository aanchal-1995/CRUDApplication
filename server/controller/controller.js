var Userdb = require('../model/model');
//create and save new user
exports.create=(req,res)=>{
    if(!req.body){
        res.status(400).send({message : "Content cannot be emptied"});
        return; 
    }
    //new user
    const user = new Userdb({
        name: req.body.name,
        email: req.body.email,
        gender : req.body.gender,
        status : req.body.status
    })

    //save user in DB
    user
        .save(user)
        .then(data=>{
            // res.send(data)
            res.redirect('/add-user')
        })
        .catch(err=>{
            res.status(500).send({
                message:err.message || "Some error occured while creating the user"
            })
        })
}

//retrieve and return all users / single user
exports.find = (req,res)=>{
    if(req.query.id){
        const id = req.query.id;
        Userdb.findById(id)
        .then(data=>{
            if(!data){
                res.status(404).send({message: `User not found with ${id}`})
            }else{
                res.send(data)
            }
        })
        .catch(err=>{
            res.status(500).send({message:`Error retrieving user by ${id}`})
        })
    }else{Userdb.find()
    .then(user=>{
        res.send(user)
    })
    .catch(err=>{
        res.status(500).send({message:err.message ||"error occurred while retrieving info"})
    })}
}
//update new user by userid
exports.update = (req,res)=>{
    if(!req.body){
        return res.status(400).send({message: "Data to update cannot be empty"})
    }
    const id = req.params.id;
    Userdb.findByIdAndUpdate(id, req.body, {useFindAndModify:false})
    .then(data=>{
    if(!data){
        res.status(400).send({message: `Cannot update user with ${id}. May be user not found`});

    }else{
        res.send(data);
    }
    })
    .catch(err=>{
        res.status(500).send({message : "Error updating error information"})
    })
}

//del user with userid
exports.delete = (req,res)=>{
    const id = req.params.id;
    Userdb.findByIdAndDelete(id)
    .then(data=>{
        if(!data){
            res.status(404).send({
                message: `Cannot delete ${id}. May be the user is not available`
            })
        }else{
            res.send({message:"User deleted successfully"})
        }
    }).catch(err=>{
        res.status(500).send({message: "Couldnt send the message "+id})
    })
}