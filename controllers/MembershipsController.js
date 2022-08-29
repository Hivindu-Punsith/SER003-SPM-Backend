const express = require('express');
const mongoose = require('mongoose');

const membershipModel = require("../models/membershipModel");

const router = express.Router();


 const getMemberships = async (req, res) => { 
    try {
        const memberships = await membershipModel.find();
                 
        res.status(200).json(memberships);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}


 const getMembership = async (req, res) => { 
    const { id } = req.params;

    try {
        const membership = await membershipModel.findById(id);
        
        res.status(200).json(membership);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}


 const createMembership = async (req, res) => {
    const memberships = req.body;

    const newMembership = new membershipModel({ ...memberships, creator: req.membershipsId, })
    console.log("Saved data",newMembership);
    try {
        await newMembership.save();
        
        res.status(201).json({newMembership} );
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}


 const updateMembership = async (req, res) => {
    const { id } = req.params;
    const { name, price, duration, description} = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const updatedMembership = {name, price, duration, description, _id: id };

    await membershipModel.findByIdAndUpdate(id, updatedMembership, { new: true });

    res.json({message : "Membership updated successfully."});
}


 const deleteMembership = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    await membershipModel.findByIdAndRemove(id);

    res.json({ message: "Membership deleted successfully." });
}

module.exports = {getMembership, getMemberships, deleteMembership, createMembership, updateMembership};