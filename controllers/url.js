const shortid=require("shortid");
const URL=require("../models/url");

// create should be used when the method is POST //
async function getshorturl(req,res)
{
    const body=req.body;
    if(!body.url) return res.status(400).json( {error:'url is required'});
        const shortId=shortid();
        await URL.create({
            shortId:shortId,
            redirectURL:body.url,
            visitHistory:[], // we are creating an array bcz we want the length that is no.of clicks so length functn is with array
            craetedBy:req.user._id, // got this req.user from auth.js in middleware
        });
        return res.render("home",{
            id:shortId,
        })
        // return res.json({id:shortId})
}


async function getanalytics(req,res)
{
    const shortId=req.params.shortId;
    const result=await URL.findOne({shortId});
    return res.json({totalclicks:result.visitHistory.length});
}
module.exports={
    getshorturl,
    getanalytics,
}