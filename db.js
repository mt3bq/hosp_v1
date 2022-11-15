const mysql=require('mysql');

const connect=mysql.createConnection(
    {

        
        host:"sql12.freesqldatabase.com",
        port:3306,
        user:"sql12573873",
        password:"cwbgHIfVQt",
        database:"sql12573873"
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
