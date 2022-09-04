const express = require('express');
const mongoose = require('mongoose');
const apiResponse = require("../helpers/apiResponse");

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
        const instructor = req.body;

        const newInstructor = new instructorModel({ ...instructor, creator: req.instructorId, })
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
        const { instructor_id, fullName, mobileno, email, dateOfBirth, weight, height, status, salary, password, userRole } = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
         
        const updatedInstructor = { instructor_id, fullName, mobileno, email, dateOfBirth, weight, height, status, salary, password, userRole, _id: id };

        await instructorModel.findByIdAndUpdate(id, updatedInstructor, { new: true });

        apiResponse.Success(res,"Instructor Updated", {})
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