export const asynchandler=(requestHandler)=>{
    return ( req,res, next) => {
        Promise.resolve(requestHandler(res, req, next)).catch((err) => next(err));
      };
}