import express, { Request, Response, NextFunction } from "express";
import "reflect-metadata";
import "express-async-errors";
import createConnection from "./database";
import { AppError } from "./errors/AppError";
import { router } from "./routes";

createConnection();
const app = express();

app.use(express.json());
app.use(router);

app.use((err: Error, request: Request, response: Response, _next: NextFunction) => {
    if (err instanceof AppError) {
        return response.status(err.statusCode).json({
            error: {
                status: err.statusCode,
                message: err.message
            }
        })      
    }
    return response.json(500).json({
        error: {
            status: 500,
            message: "Internal server error"
        }        
    })
})

export { app };