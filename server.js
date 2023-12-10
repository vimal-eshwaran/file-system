const express=require('express');
const fs=require('fs');
const path=require('path');


const app=express();
const PORT=3000;
const outputFolder="./output";//folder name where files getting stored

if(!fs.existsSync(outputFolder)){
    fs.mkdirSync(outputFolder)
}

//end point to create file
app.get('/',(req,res)=>{
    const currentTime=new Date();
    const year=currentTime.getFullYear().toString();
    const month=(currentTime.getMonth()+1).toString();
    const day=currentTime.getDate().toString();
    const hours=currentTime.getHours().toString();
    const minutes=currentTime.getMinutes().toString();
    const sec=currentTime.getSeconds().toString();
  
    const dateTimeForFile=`${year}-${month}-${day}-${hours}-${minutes}-${sec}.txt`

    const filePath=path.join(outputFolder,dateTimeForFile);

    fs.writeFile(filePath,currentTime.toISOString(),(err)=>{
        if(err){
        res.status(500).send(`Error Occured : ${err}`)
        return
    }
        res.send(`File created successfully at:${filePath}`)
    })

});

//end point to get files
app.get("/getFiles",(req,res)=>{
    fs.readdir(outputFolder,(err,files)=>{
     if(err){
      res.status(500).send(`Error reading files:${err}`);
      return
     }
      const textFiles=files.filter((file)=>path.extname(file)==".txt");
      res.json(textFiles);
    })
})



app.listen(PORT,()=>{
    console.log(`server in running at ${PORT}`);
})