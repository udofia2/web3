import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

const notFound = (req: Request, res: Response) => {
    res.status(StatusCodes.NOT_FOUND).json({
    status: false,
    error: true,
    message: "Route does not exist"
})}


export default notFound