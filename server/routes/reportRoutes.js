import express from "express";
import Interview from "../models/Interview.js";

const router = express.Router();


router.get("/:userId", async(req,res)=>{

    try{

        const interviews = await Interview.find({
            userId:req.params.userId
        });


        const totalInterviews = interviews.length;


        const bestScore = totalInterviews > 0
        ? Math.max(...interviews.map(i=>i.score))
        : 0;



        const avgScore = totalInterviews > 0
        ?
        Math.round(
            interviews.reduce(
                (sum,i)=>sum+i.score,
                0
            ) / totalInterviews
        )
        :
        0;



        const monthlyMap={};



        interviews.forEach((interview)=>{


            const month =
            new Date(interview.createdAt)
            .toLocaleString(
                "en-US",
                {
                    month:"short"
                }
            );


            if(!monthlyMap[month]){

                monthlyMap[month]={
                    month,
                    totalScore:0,
                    interviews:0
                };

            }



            monthlyMap[month].totalScore += interview.score;

            monthlyMap[month].interviews +=1;



        });



        const monthlyData =
        Object.values(monthlyMap)
        .map(item=>({

            month:item.month,

            avgScore:
            Math.round(
                item.totalScore /
                item.interviews
            ),

            interviews:item.interviews

        }));




        res.json({

            totalInterviews,

            avgScore,

            bestScore,

            monthlyData

        });



    }
    catch(error){

        console.log(error);

        res.status(500).json({
            message:error.message
        });

    }

});


export default router;