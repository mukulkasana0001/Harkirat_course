import { Router } from "express";
import { Prisma, PrismaClient } from "@prisma/client";
import { authenticate } from "../middleware/authenticate.js";

const client = new PrismaClient();

const accountRouter = Router();


accountRouter.get('/balance', authenticate, async (req, res) => {
    const userId = req.userId;

    if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const account = await client.account.findFirst({
            where: {
                userId: parseInt(userId)
            },
            include: {
                user:true}
        });
        if (!account) {
            return res.status(404).json({ message: "Account not found" });
        }
        res.status(200).json({ balance: account.balance ,
        username: account.user.username
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }


});

accountRouter.put('/transfer', authenticate, async (req, res) => {
    const userId = req.userId;
    const { amount, toAccountId } = req.body;
    console.log(amount, toAccountId);

    const from = Number(userId);
    const to = Number(toAccountId);
    const amounts = Number(amount);


    if (from === to) {
        return res.status(400).json({ message: "Cannot transfer to the same account" });
    }
    if (!amounts && isNaN(amounts) && amounts <= 0) {
        return res.status(400).json({ message: "Invalid transfer amount" });
    }
    if (!to) {
        return res.status(400).json({ message: "Recipient account ID is required" });
    }





    // function transfer(from: string, to: string, amount: number) {
    try {
        await client.$transaction(async (tx) => {
            // 1. Decrement amount from the sender.
            const sender = await tx.account.update({
                data: {
                    balance: {
                        decrement: amounts,
                    },
                },
                where: {
                    userId: from,
                },
            })

            // 2. Verify that the sender's balance didn't go below zero.
            if (Number(sender.balance) < 0) {
                throw new Error(`${from} doesn't have enough to send ${amounts}`)
            }

            // 3. Increment the recipient's balance by amount
            const recipient = await tx.account.update({
                data: {
                    balance: {
                        increment: amounts,
                    },
                },
                where: {
                    userId: to,
                },
            })
        })

        res.status(200).json({ message: `Transfer successful ` });
    }
    catch (error) {
        console.error(error)
        return res.status(500).json({
            message: "Transfer failed",
            error: error instanceof Error ? error.message : String(error),
        });

    }


});



export default accountRouter;