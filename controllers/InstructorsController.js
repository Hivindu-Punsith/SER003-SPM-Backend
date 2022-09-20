const express = require('express');
const mongoose = require('mongoose');
const apiResponse = require("../helpers/apiResponse");
const uniqueID = require("../helpers/uniqueID");
const bcrypt = require("bcryptjs");
const passwordGenerator = require("../helpers/passwordGenerator.js");
const instructorModel = require("../models/instructorModel");

    const getInstructors = async (req, res) => {
        try {
            const instructors = await instructorModel.find();
            apiResponse.Success(res,"Instructors",{ instructors: instructors })
        } catch (err) {
            console.error(err.message);
            apiResponse.ServerError(res,"Server Error",{err:err});
        }
    }

    const getInstructor = async (req, res) => {
        const { id } = req.params;

        try {
            const instructor = await instructorModel.findById(id);
            apiResponse.Success(res,"Instructor",{ instructor: instructor })
        } catch (err) {
            console.error(err.message);
            apiResponse.ServerError(res,"Server Error",{err:err});
        }
    }

    const createInstructor = async (req, res) => {
        const { 
            fullName, 
            email, 
            mobileno, 
            dateOfBirth,
            weight,
            height,    
        } = req.body;
   

        var instructor_id = await uniqueID.generateInstructorID();
        var password = await passwordGenerator.generateRandomPassword();

        const newInstructor = new instructorModel({ 
            instructor_id,
            fullName, 
            email, 
            password,
            mobileno, 
            dateOfBirth,
            weight,
            height, 
        });

        //Encrypt Password
        const salt = await bcrypt.genSalt(10);

        newInstructor.password = await bcrypt.hash(newInstructor.password, salt);

        console.log("Saved data",newInstructor);
        try {
            await newInstructor.save();
            apiResponse.Success(res,"NewInstructor",{ newInstructor: newInstructor })
        } catch (err) {
            console.error(err.message);
            apiResponse.ServerError(res,"Server Error",{err:err});
        }
    }

    const updateInstructor = async (req, res) => {
        const { id } = req.params;
        const {  fullName, mobileno, email, dateOfBirth, weight, height } = req.body;
        
        const filter = { _id: id };
        const update = { 
             fullName: fullName,
             mobileno:mobileno,
             email : email,
             dateOfBirth : dateOfBirth,
             weight : weight,
             height : height      
            };
      
        try {
        
        let data = await instructorModel.findOneAndUpdate(filter, update);
        console.log(data);
        apiResponse.Success(res,"Instructor Details Updated", {data:data});
      
        } catch (error) {
          apiResponse.ServerError(res,"Server Error",{err:error});
        }
    }

    const deleteInstructor = async (req, res) => {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

        await instructorModel.findByIdAndRemove(id);

        apiResponse.Success(res,"Instructor Deleted", {})
    }

module.exports = {
    getInstructors,
    getInstructor,
    createInstructor,
    updateInstructor,
    deleteInstructor
}

// Language: javascript