const express = require('express');
const router = express.Router();
const Coremember = require('../model/core_mem')
const {verifyToken} = require('../middleware/auth')
const {corecheck} = require('../controller/alumni')


//recheck
// router.get('/new',(req,res) => {
//     res.send('core_mem/new', {core_mem: new Coremember()})
// })

// router.get('/:id',(req,res) => {
//     const core_mem = Coremember.findbyid(req.params)
//     res.send(req.params.id)
// })

router.post('/:id',async(req, res) => {
    console.log(req.body)
    let core_mem = new Coremember({
        designation: req.body.designation,
        github: req.body.github,
        Linkedin: req.body.Linkedin,
        Branch: req.body.Branch

    })
    try{
        core_mem= await core_mem.save();
        // res.redirect(`/core_member/${core_mem.id}`)
        res.send('saved');
    } catch(e){
        res.send(e.message);
    }
   
})
module.exports = router