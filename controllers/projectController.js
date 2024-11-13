const projects = require("../model/projectModel");



exports.addProjectController = async (req,res)=>{
    console.log('inside project controller');

    const {title,language,github,website,overview} = req.body

    console.log(title,language,github,website,overview);

    const projectImage=req.file.filename
    console.log(projectImage);

    const userId = req.payload

    try {
        const existingProject = await projects.findOne({github})
        if(existingProject){
            res.status(406).json('project already exist')
        }
        else{
            const newProject = new projects({
                title ,language ,github ,website ,overview , projectImage , userId
            })

            await newProject.save()
            res.status(200).json(newProject)
        }
    } catch (error) {
        res.status(401).json(error)
    }  
}

// get all project
exports.getAllProjectController = async (req,res) => {
    const searchKey= req.query.search
    // console.log(searchKey);
    
    const query={
        language:{
            $regex:searchKey, $options:"i"
        }
    }
    
    try{
        const allProject = await projects.find(query)
        if(allProject){
            res.status(200).json(allProject)
        }else{
            res.status(406).json("No Projects available")
        }
    }catch(error){
        res.status(401).json(error)
    }
    
}

// get home project
exports.getHomeProjectController = async (req,res) => {
    try{
        const allProject = await projects.find().limit(3)
        if(allProject){
            res.status(200).json(allProject)
        }else{
            res.status(406).json("No Projects available")
        }
    }catch(error){
        res.status(401).json(error)
    }
    
}

// get user project 
exports.getUserProjectController = async (req,res) => {
    const userId = req.payload
    try{
        const allProject = await projects.find({userId})
        if(allProject){
            res.status(200).json(allProject)
        }else{
            res.status(406).json("No Projects available")
        }
    }catch(error){
        res.status(401).json(error)
    }
    
}

// delete project
exports.removeUserProjectController = async(req,res)=>{
    const {id} =req.params
    
    try{
        await projects.findByIdAndDelete({_id:id})
        res.status(200).json('deleted successfully')
    }catch (error){
        res.status(402).json(error)
    }
    
}

// update user project
exports.updateUserProjectController = async(req,res)=>{
    const {id} = req.params
    const userId = req.payload
    
    const{title,language,github,website,overview,projectImage} = req.body
    console.log(title,language,github,website,overview,projectImage);

    uploadedImage = req.file?req.file.filename:projectImage
    try{
        const existingProject = await projects.findByIdAndUpdate({_id:id},{
            title,
            language,
            github,
            website,
            overview,
            projectImage:uploadedImage,
            userId
        },{new:true})
        // console.log(existingProject);
        
        await existingProject.save()
        res.status(200).json(existingProject)

    }catch(error){
        res.status(401).json(error)
    }
}