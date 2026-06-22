

export const validate =(firstName,lastName,email,password,role,confirmpassword)=>{

    
    if(!email){
        return "please fill email"
    }
    
    if(!password){
        return "please fill password"
    }
    
    if(!confirmpassword){
        return "please fill confirmpassword"
    }
    
    if(!firstName || !lastName){
        return "please fill firstName or lastName"
    }

      if(confirmpassword !== password){
     return "password is not matched !!"
    }

    return null;
}

export const validateLogin =(email,password)=>{

    if(!email){
        return "fill email required"
    }
    if(!password){
        return "fill password required"
    }

  

    return null;

}