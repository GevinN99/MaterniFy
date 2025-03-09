const AvailableSlot = require('../models/availableSlotModel');

// Create Available Slot
exports.createAvailableSlot = async (req, res) => {
    try {
        const {startTime, endTime} = req.body;
        const doctorId = req.user.id; // Assuming doctor is authenticated and userId is available

        const newSlot = new AvailableSlot({
            doctorId,
            startTime,
            endTime,
        });

        await newSlot.save();
        res.status(201).json({message: 'Slot created successfully'});
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Internal server error'});
    }
};

// Get Available Slots for a Doctor
exports.getAvailableSlots = async (req, res) => {
    try {
        const doctorId = req.params.doctorId;
        const slots = await AvailableSlot.find({doctorId, isBooked: false});
        res.status(200).json(slots);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Error fetching slots'});
    }
};

// Book a Slot
exports.bookSlot = async (req, res) => {
    try {
        const {slotId} = req.body;
        const userId = req.user.id; // Assuming mother is authenticated and userId is available

        const slot = await AvailableSlot.findById(slotId);
        if (!slot || slot.isBooked) {
            return res.status(400).json({message: 'Slot is unavailable'});
        }

        slot.isBooked = true;
        slot.bookedBy = userId;
        await slot.save();

        res.status(200).json({message: 'Slot booked successfully'});
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Error booking slot'});
    }
};

// Get Booked Slots for a Doctor
exports.getBookedSlots = async (req, res) => {
    try {
        const doctorId = req.params.doctorId;
        const slots = await AvailableSlot.find({doctorId, isBooked: true}).populate('bookedBy', 'fullName email');
        res.status(200).json(slots);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Error fetching booked slots'});
    }
};
