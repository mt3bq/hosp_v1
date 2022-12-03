const mysql=require('mysql');

const connect=mysql.createConnection(
    {

        
        host:"sql6.freesqldatabase.com",
        port:3306,
        user:"sql6582586",
        password:"dmgntDb6Np",
        database:"sql6582586"
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
