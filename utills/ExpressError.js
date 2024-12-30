class ExpressError extends Error{
    constructor(message,statusCode){
        super(message); // call Parent Constructor ( Error Class )
        this.statusCode=statusCode || 500;
        this.message =message || "Something Went Wrong! i am Constructor message : ";
    }
}

module.exports=ExpressError; 