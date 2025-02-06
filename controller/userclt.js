const user = require('../model/usermodel')

module.exports.home = async(req,res)=>{
    try{
        // console.log("request has been find")
        let showdtata = await user.find()
         res.status(200).json({msg:'data request has been found',data:showdtata})

    }
    catch(err){
        res.status(400).json({msg:'data request has been not found found',error:err})
    }
}

module.exports.addData = async(req,res)=>{
    try{
        console.log(req.body)
        let adduser = await user.create(req.body)
        res.status(200).json({msg:"data inserted sucessfully",data:adduser})
    }
    catch(err){
        res.status(400).json({msg:'data not inserted',error:err})
    }
}

module.exports.deletedata = async(req,res)=>{
    try{
        // console.log(req.params.id)
        let deletedata = await user.findByIdAndDelete(req.params.id);
        if(deletedata){
            res.status(200).json({msg:"data deleted sucessfully"})
        }
        else{
            res.status(400).json({msg:'data not delted'})
        }
    }
    catch(err){
        res.status(400).json({msg:'data not delted',error:err})
    }
}


module.exports.singledata = async(req,res)=>{
    try{
        // console.log(req.params.id);
        let singledata = await user.findById(req.params.id);
        if(singledata){
            res.status(200).json({msg:"data found",data:singledata})
        }
        else{
            
            res.status(200).json({msg:'data not found'})
        }
    }   
    catch(err){
        res.status(400).json({msg:'something went wrong',error:err})
    }
}


module.exports.updatedata = async(req,res)=>{
    try{
        let checkdata = await user.findById(req.params.id);
        if(checkdata){
            let updatedata = await user.findByIdAndUpdate(checkdata._id,req.body);
            if(updatedata){
                let updateddata = await user.findById(req.params.id);
                    res.status(200).json({msg:"data updated",data:updateddata})
                }
                else{

                    res.status(400).json({msg:'data not updated'})
                }
        }
        else{
            res.status(400).json({msg:'data not found'})
         }
    }
    catch(err){
        res.status(400).json({msg:'something went wrong',error:err})
    }
}