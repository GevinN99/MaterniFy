const EmergencyContact = require('../models/EmergencyContactModel');

// Add a new emergency contact with images
exports.addEmergencyContact = async (req, res) => {
    try {
        const { contactName, contactNumber, type, region, images } = req.body;

        const newContact = new EmergencyContact({
            contactName,
            contactNumber,
            type,
            region,
            images,
        });

        await newContact.save();

        res.status(201).json({ message: 'Emergency contact added successfully', contact: newContact });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Get all emergency contacts
exports.getEmergencyContacts = async (req, res) => {
    try {
        const contacts = await EmergencyContact.find();
        res.status(200).json(contacts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Update emergency contact images
exports.updateEmergencyContactImages = async (req, res) => {
    try {
        const { contactId } = req.params;
        const { images } = req.body;

        const updatedContact = await EmergencyContact.findByIdAndUpdate(
            contactId,
            { $set: { images } },
            { new: true }
        );

        if (!updatedContact) {
            return res.status(404).json({ message: 'Contact not found' });
        }

        res.status(200).json({ message: 'Contact images updated successfully', contact: updatedContact });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Delete an emergency contact
exports.deleteEmergencyContact = async (req, res) => {
    try {
        const { contactId } = req.params;

        const contact = await EmergencyContact.findByIdAndDelete(contactId);

        if (!contact) {
            return res.status(404).json({ message: 'Contact not found' });
        }

        res.status(200).json({ message: 'Contact deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
