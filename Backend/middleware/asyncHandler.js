export const asynchandler=(requestHandler)=>{
    return (res, req, next) => {
        Promise.resolve(requestHandler(res, req, next)).catch((err) => next(err));
      };
}