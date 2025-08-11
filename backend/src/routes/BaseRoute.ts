
import express, { Router } from 'express'

export abstract class BaseRoute{
    public router : Router;
    constructor(){
        this.router = express.Router();
    }
}