const Coremember = require('../model/core_mem')

const postreq = async(req, res) => {
    const {id} = req.params;

    // Find user in database with the id 

    const user = await User.findById(id);
    const core = await Coremember.find({object:id});
    
    console.log(core);
    let core_mem = new Coremember({
        role,
        object: id,
        github,
        Linkedin,
        Branch
    })
    try{
        core_mem = await core_mem.save();
        res.send('saved').status(200);
    } catch(e){
        res.send(e.message);
    }
}

const patchreq = async (req,res)=>{
    const {id} = req.params;
}

const getreq = async (req,res)=>{

    const {id} = req.params;

    // Find user in database with the id 
    try{
        const user = await User.findById(id);
        res.send("dashboard").status(200);
    }catch(e){
        res.status(400).send('No core member');
    }
}
// const updateUserinfor=(req,res)=>{
//     const {id} = req.params;
    
//     const update = {
//         role:req.body.role,
//         github:req.body.github,
//         Linkedin:req.bod.Linkedin,
//         Branch:req.body.Branch
//     }
    
//     try{
//         const core = await Coremember.findByIdAndUpdate({'object':id},)
//     }

// }
module.exports =  { postreq,getreq };