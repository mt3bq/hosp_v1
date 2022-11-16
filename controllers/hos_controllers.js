const connect=require('../db')
var oc = require('orthanc-client');
const { render } = require('express/lib/response');
const session= require('express-session');
const MySQLStore = require("express-mysql-session")(session);
const fs=require('fs');
const upload = require('express-fileupload');
const express = require('express');
const app=express();
app.use(upload());

let client= new oc({
    url:"http://127.0.0.1:8042",
    
    

});




const cheek=(req,res,next)=>{
    if(req.session.cheek){
       
        next();
    }else{
        res.redirect('login');
    }
}

const index=(req,res)=>{
    
        let name=req.session.user_info;
        res.render('index',{name});
    
       
    
}

const HealthPractitioner_get =(req,res)=>{
    var sql='SELECT * FROM healthparactitioner;';
    connect.query(sql, function (err, data, fields) {
    if (err) throw err;
    let name=req.session.user_info;
   
    res.render('Health Practitioner', {msg :"",user: data,name});
  });
}

const HealthPractitioner_post=(req,res)=>{
    let first_name=req.body.first_name;
    let se_name=req.body.se_name;
    let list_name=req.body.list_name;
    let ar_first_name=req.body.Arabic_first_name;
    let ar_se=req.body.Arabic_se_name;
    let ar_list_name=req.body.Arabic_list_name;
    let Specialization=req.body.Specialization;
    let Clinic=req.body.Clinic;
    let Role=req.body.Role;
    let momares_number=req.body.momares_number;
    let phone_number=req.body.phone_number;
    let up_sgnil=req.body.up_sgnil;
    var sql='SELECT * FROM healthparactitioner;';
    connect.query(sql, function (err, data, fields) {
    if (err) throw err;
    let sql='select * from healthparactitioner where phone_number="'+phone_number+'"';
    
    connect.query(sql,(er,resl)=>{
       
       
        if(!er){
           
            let inset_query='insert into healthparactitioner (first_name,se_name,list_name,ar_first_name,ar_se_name,ar_list_name,Specialization,Clinic,Role,Momares_number,phone_number,sig)values("'+first_name+'","'+se_name+'","'+list_name+'","'+ar_first_name+'","'+ar_se+'","'+ar_list_name+'","'+Specialization+'","'+Clinic+'","'+Role+'","'+momares_number+'","'+phone_number+'","'+up_sgnil+'")';
            if(resl.length===0){
                connect.query(inset_query,(e)=>{
                    if(!e){
                        res.status(201).json("true");
                         
                        
                    }else{
                        console.log(e);
                    }
                })
            }else{
                res.status(400).json("false");
                
            }
        }else{
            connect.log(er)
        }


    })
  });

    
}


const clinics_get=(req,res)=>{
    var sql='SELECT * FROM healthparactitioner;';
    connect.query(sql, function (err, data, fields) {
    if (err) throw err;
    let name=req.session.user_info;
    res.render('clinics', {msg :"",user: data,name});
  });
}

const clinics_post=()=>{}

const Radiology_get=(req,res)=>{
    let id=req.params.id;

    let dr_name=req.session.user_info;
    var sql='SELECT * FROM x_ray_order where dr_name="'+dr_name+'";';
    connect.query(sql, function (err, data, fields) {
    if (err) throw err;
    let name=req.session.user_info;
    client.studies.getAll()
        .then(function(ress) {
            console.log(ress);
            for(let i=0;i<ress.length;i++){
                console.log(ress[i]);
            }
            
            res.render('Radiology', {msg :"",data,name,ress});
        })
        .catch(function(err) {
            console.log(err+
              '12345678x-');
        });
          
    
  });
           
      
       
}



const Radiology_post=(req,res)=>{
    let Patients_name=req.body.Patients_name;
    let Patients_id=req.body.Patients_id;
    let x_ray_type=req.body.x_ray_type;
    let clinic_name=req.body.clinic_name;
    let dr_name=req.session.user_info;
    let phone_number=req.body.Phone_number;
    let status_info=req.body.status_info;


    let sql='insert into x_ray_order (Pation_id,Pation_name,dr_name,x_ray_type,status,Clinic_Name,Phone_number,order_status,dicom_file,dicom_id_view) values ("'+Patients_id+'","'+Patients_name+'","'+dr_name+'","'+x_ray_type+'","'+status_info+'","'+clinic_name+'","'+phone_number+'","order_status","","")';
    connect.query(sql,(e)=>{
        if(!e){
            res.status(201).json("true");
             
            
        }else{
            res.status(201).json("false");
            console.log(e);
        }
    })


}

const up_dicom_get=(req,res)=>{
    let id=req.params.id;
    let sql= 'select * from x_ray_order where id="'+id+'"';

    connect.query(sql,(e,data)=>{
        if(data.length===1){
      
            let name=req.session.user_info;
            res.render('x_ray/x_ray_order_edit',{data,name});

        }else{
            console.log(e);
        }
    });
}

const up_dicom_post=(req,res)=>{}





const login_get=(req,res)=>{
  

   // connect.query(sql)
   res.render('login');
}

const login_post=(req,res)=>{
    let name=req.body.name;
    let password=req.body.password;
    let sql='select * from admin where name= "'+name+'" and password="'+password+'"';


  connect.query(sql,(e,d)=>{
      if(d.length!=0){
         //res.render('index');
         req.session.cheek=true;
        req.session.user_info=name;
         
         

         res.render("index",{data:d,name})
         
      }else{
          res.render('login');
          
      }
  })
}

const x_ray_index=(req,res)=>{
    let name=req.session.user_info;
    res.render('x_ray/index_x_ray.ejs',{name})
}


const x_ray_order_get=(req,res)=>{
    let sql ="select * from x_ray_order"

    connect.query(sql,(e,data)=>{
        if(!e){
            let name=req.session.user_info;
            
            res.render('x_ray/x_ray_order',{data,name});
        }
    })
}

const x_ray_order_post=(req,res)=>{}


const x_ray_order_edit_get=(req,res)=>{

    let name=req.session.user_info;

    res.render('x_ray/x_ray_order_edit',{name});

}

const x_ray_order_edit_post=(req,res)=>{

    let file=req.files.dicom_file.data;
    let id=req.params.id;
    console.log(file);
    //let dicom_file=req.body.dicom_file;
    let sql='UPDATE x_ray_order SET dicom_file = "'+dicom_file+'"  WHERE id = "'+id+'";'
    console.log(req.files)
    connect.query(sql,(er,da)=>{
        if(!er){

            
        }else{
            console.log(er);
            
        }
    })
}




module.exports={
    HealthPractitioner_get,
    HealthPractitioner_post,
    clinics_get,
    clinics_post,
    Radiology_get,
    Radiology_post,
    login_get,
    login_post ,
    cheek,
    index,
    x_ray_index,
    x_ray_order_get,
    x_ray_order_post,
    up_dicom_get,
   // x_ray_order_edit_get,
    //x_ray_order_edit_post
}
