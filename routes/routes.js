import express from "express"

const router = express.Router()

router.get('/', (req, res) => {
    res.send('add again emai')
})

router.post("/post", async(req,res)=>{
    console.log(req.body)
})

export default router
