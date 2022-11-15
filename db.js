const mysql=require('mysql');

const connect=mysql.createConnection(
    {

        
        host:"localhost",
        port:3306,
        user:"root",
        password:"123456789",
        database:"hospital"
    }



);

connect.connect((err)=>{
    if(!err){
        console.log("Connect secssful...");
    }else{
        console.log(err)
    }
})

module.exports=connect;