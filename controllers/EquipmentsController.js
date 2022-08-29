const express = require('express');
const mongoose = require('mongoose');

const equipmentsModel = require("../models/equipmentsModel");

const router = express.Router();


 const getEquipments = async (req, res) => { 
    try {
        const equipments = await equipmentsModel.find();
                 
        res.status(200).json(equipments);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}


 const getEquipment = async (req, res) => { 
    const { id } = req.params;

    try {
        const equipment = await equipmentsModel.findById(id);
        
        res.status(200).json(equipment);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}


 const createEquipment = async (req, res) => {
    const equipment = req.body;

    const newEquipment = new equipmentsModel({ ...equipment, creator: req.equipmentId, })
    console.log("Saved data",newEquipment);
    try {
        await newEquipment.save();
        
        res.status(201).json({newEquipment} );
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}


 const updateEquipment = async (req, res) => {
    const { id } = req.params;
    const { name, quantity, value, company_name, date_of_purchaced, category} = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const updatedEquipment = {name, quantity, value, company_name, date_of_purchaced, category, _id: id };

    await equipmentsModel.findByIdAndUpdate(id, updatedEquipment, { new: true });

    res.json({message : "Equipment updated successfully."});
}


 const deleteEquipment = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    await equipmentsModel.findByIdAndRemove(id);

    res.json({ message: "Equipment deleted successfully." });
}

module.exports = {getEquipment, getEquipments, deleteEquipment, createEquipment, updateEquipment};