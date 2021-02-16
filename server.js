const express = require('express')
const app = express()
const bodyParser  =require('body-parser')

//*----body------------------
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

//*------DB------------------
const Books = require('./model_books')
const { ReplSet } = require('mongodb')

app.get('/',(req,res,next)=>{
     res.json({messages:'Created by Air_Natthaphon'})
})

//*-------Get-Display------------------------
app.get('/books',async(req,res,next)=>{
     const result = await Books.find()
     let meaasges = ''
     try {
         if(result === undefined || result.length===0){
               messages = 'No Books in Database'
         }else{
              messages = 'Get Books in Database'
         }
         res.status(201).json({    error:false,
                                   messages:messages,
                                   data:result
                              })      
     } 
     catch (error) {
          res.status(400).json({messages:'It is something Error'})
          console.log(error.message)
     }

}) 


//*------post Books-----------------------------------
app.post('/books/add',async(req,res,next)=>{
    let name = req.body.name
    let author = req.body.author
     //*------validation
     if(!name || !author){
          res.status(400).json({error:true,messages:'Please Add Books Name and Author'})
     }else{
          try{
              let new_Books = new Books({
                   name:name,
                   author:author})
                   
               console.log(new_Books)

             const result = await new_Books.save()
             res.status(201).json({     error:false,
                                        messages:'Successfully books Added',
                                        data:result
                                   })
          }
          catch(error){
               res.status(400).json({messages:'It is something Error'})
               console.log(error.message)
          }
     }
})

//*--------Get Books by id-----------------------
app.get('/books/:id',async(req,res,next)=>{
     let id =req.params.id
     //*---validation
     if(!id){
          res.status(400).json({error:true,meaasges:'Please provide Books ID'})
     }else{
          try {
               const result = await Books.findById(id)
               let messages =''
               if(result === undefined || result.length ===0){
                    messages = 'No Books ID in Database'
               }else{
                    messages = 'Get Books ID in Database'
               }     
               res.status(201).json({        error:false,
                                             messages:messages,
                                             data:result
                                        })
          } 
          catch (error) {
               res.status(400).json({messages:'It is something Error'})
               console.log(error.message)
          }
     }
})

//*-------Edit Books----------------------
app.put('/books/update',async(req,res,next)=>{
     let id = req.body.id
     let name = req.body.name
     let author = req.body.author

     //*---validation
     if(!id || !name ||!author){
          res.status(400).json({error:true,messages:'Please provide Books ID ,Name and Author'})
     }else{
          try {
               const result = await Books.findByIdAndUpdate({_id:id},
                    {$set:{
                         name:name,
                         author:author
                    }},{new:true}) 
               
               res.status(201).json({   error:false,
                                        messages:'Successfully books Updated',
                                        data:result
                                   })
          } 
          catch (error) {
               res.status(400).json({messages:'It is something Error'})
               console.log(error.message)   
          }
     }
})


//*---Delete Books By ID------------
app.delete('/books/delete',async(req,res,next)=>{
     let id = req.body.id

     //*---validation---
     if(!id){
          res.status(400).json({error:true,messages:'Please provide Books ID'})
     }else{
          try {
               const result = await Books.findByIdAndDelete(id)
               res.status(201).json({   error:false,
                                        messages:'Successfully Books Deleted',
                                        data:result})     
                              } 
          catch (error) {
               res.status(400).json({messages:'It is something Error'})
               console.log(error.message)   
          }
     }
})

app.listen(3000,()=>{
     console.log('Connect On Port 3000 !!! ')
})