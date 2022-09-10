const Coremember = require('../model/core_mem')

const postreq = async(req, res) => {
    const {id} = req.params;
    // Find user in database with the id 
    const user = await User.findById(id);
    
    console.log(user)
    let core_mem = new Coremember({
        role: req.body.role,
        object: id,
        github: req.body.github,
        Linkedin: req.body.Linkedin,
        Branch: req.body.Branch
    })
    try{
        core_mem= await core_mem.save();
        res.send('saved').status(200);
    } catch(e){
        res.send(e.message);
    }
}

const getreq = async (req,res)=>{

    const {id} = req.params;

    // Find user in database with the id 
    const user = await User.findById(id);
    console.log(user)
    res.send("dashboard").status(200);
}
module.exports =  { postreq,getreq };