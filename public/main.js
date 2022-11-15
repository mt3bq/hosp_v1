



let btn_1=document.querySelector('.btn')
let btn_2=document.querySelector('.btn2')
let form_box=document.querySelector('.box_1')
let reg_box_2=document.querySelector('.reg_box_2')

let form_1=document.getElementById('form_1')
console.log(form_1)
let error_1=document.querySelector('.error_1')
let Add_clinics=document.querySelector('.btn_clinics_box_1');
let close_form_2_add_hel=document.getElementById('close_form_2')
console.log(close_form_2_add_hel)

let link_t=document.querySelectorAll('a');
console.log(link_t)


console.log(link_t[0].pathname)

let x_ray=document.getElementById('add_x_ray');
console.log(x_ray)

let up_box=document.querySelector('.up_box')
console.log("box"+up_box);



let e_msg=document.getElementById('e_msg')

let btn_3=document.querySelector('.btn3')


//function x_ray_order

function show_add_dicom(){
    window.open("","","width=400,height=400");
}
//function close_add_dicom(){
  //  up_box.classList.remove('show_up_dicom')
//}


//function Radiology

let All_patients_box=document.querySelector('.All_patients_box');
console.log(All_patients_box);


function show_All_patients(){
    All_patients_box.classList.add('show_3');
}

function close_show_All_patients(){
    All_patients_box.classList.remove('show_3');
}



//function clinics page

let box_add_clinic=document.querySelector('.box_add_clinic');
console.log(box_add_clinic);

function show_Add_clinics(){
    box_add_clinic.classList.add('show_2')
}


function close__boc_add_clicics(){
    box_add_clinic.classList.remove('show_2');
    console.log("s2")
}



//dasebord
for(let i=0;i<link_t.length;i++){
    if(window.location.pathname==link_t[i].pathname){
        link_t[i].classList.add('active');
    }
}





//function HealthPractitioner page

function show_reg(){
form_box.classList.add('show');
}
function show_reg_2(){
    reg_box_2.classList.add('show');
}


function close_form(){
    form_box.classList.remove('show');
}


function close_form_2(){
    reg_box_2.classList.remove('show');
}




form_1.addEventListener('submit',async(e)=>{
    e.preventDefault();

    
   

    let first_name=form_1.first_name.value;
    let se_name=form_1.se_name.value;
    let list_name=form_1.list_name.value;
    let Arabic_first_name=form_1.Arabic_first_name.value;
    let Arabic_se_name=form_1.Arabic_se_name.value;
    let Arabic_list_name=form_1.Arabic_list_name.value;
    let Specialization=form_1.Specialization.value;
    let Clinic=form_1.Clinic.value;
    let Role=form_1.Role.value;
    let momares_number=form_1.momares_number.value;
    let phone_number=form_1.phone_number.value;
    let up_sgnil=form_1.up_sgnil.value;
    try {
        const res=await fetch('/HealthPractitioner',{
            method:'POST',
            body:JSON.stringify({first_name,se_name,list_name,Arabic_first_name,Arabic_se_name,Arabic_list_name,Specialization,Clinic,Role,momares_number,phone_number,up_sgnil}),
            headers:{'Content-Type':'application/json'}
        });
        const data= await res.json();
        if(data=='true'){
            Swal.fire({
                position: 'center-center',
                icon: 'success',
                title: 'Your work has been saved',
                showConfirmButton: false,
                timer: 2000
              }).then(function() {
                location.assign('/HealthPractitioner');
            });
              
           
        }if(data=='false'){
            
            Swal.fire({
                position: 'center-center',
                icon: 'error',
                title: 'The health practitioner already exists!',
                showConfirmButton: false,
                timer: 2000
              })
        }
    } catch (error) {
        console.log(error)
    }
})

//function of x-ray page



