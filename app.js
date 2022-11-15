const express =require('express');
//export exoresss from 'express';
const mysql= require('mysql');
const connect=require('./db');
const session= require('express-session');
const MySQLStore = require("express-mysql-session")(session);
const upload = require('express-fileupload');

var oc = require('orthanc-client');
const hostpetal_routes=require('./routes/hostpetal_routes');
const app=express();

app.use(express.urlencoded ({ extended: false }));
app.use(express.json());

const port=process.env.PORT ||3000;


app.set('view engine','ejs');
app.use(express.static('public'))

let client= new oc({
  url:"http://localhost:8042",
  
  

});

//start session middleware
const sessionConnrct=connect;
const sessionStore= new MySQLStore({
  expiration: 10800000,
  createDatabaseTable: true,
  schema:{
    tableName: 'session',
    columnNames:{
        session_id: 'sesssion_id',
        expires: 'expires',
        data: 'data'
    }
  }
},sessionConnrct)


app.use( session({
  key: 'smail',
  secret: 'my secret',
  store: sessionStore,
  resave: false,
  saveUninitialized: true
}))
app.use(upload())
app.use(hostpetal_routes)

app.get('/x_ray_order_edit:id',(req,res)=>{
  let name=req.session.user_info;

    res.render('x_ray/x_ray_order_edit',{name});
})

app.post('/x_ray_order_edit:id',(req,res)=>{
  //let file=req.files.dicom_file.data;
  let id=req.params.id;
  const dicom_file=req.body.file;
  const file=req.files.file.data;
 
  //dicom_file=req.body.dicom_file;
  let sql='UPDATE x_ray_order SET dicom_file = "'+dicom_file+'"  WHERE id = "'+id+'";'
  console.log(file)
  connect.query(sql,(er,da)=>{
      if(!er){

        client.instances.add(file)
        .then(function(ress) {
            console.log(ress);
            connect.query('UPDATE x_ray_order SET dicom_id_view = "'+ress.ParentStudy+'"  WHERE id = "'+id+'";')
            res.redirect('x_ray_order');

        })
        .catch(function(err) {
            console.log(err+
              '12345678');
        });
          
      }else{
          console.log(er);
      }
  })

 
 

})
  



app.listen(port,()=>{
    console.log("Server is Working...");
    })