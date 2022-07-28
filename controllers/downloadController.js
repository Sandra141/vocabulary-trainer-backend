import express from "express";
import User from '../models/user.js'

// download all decks, cards from a user
const download_get = async (req, res) => {
    console.log("----------------download_get")

    try {

        const data = await User.aggregate([
            { $match: { _id: 0 } },

            { $lookup: { from: "users_decks", localField: "_id", foreignField: "users_id", as: "users_decks" } },

            { $lookup: { from: "decks", localField: "users_decks.decks_id", foreignField: "_id", as: "decks" } },

            { $lookup: { from: "decks_cards", localField: "decks._id", foreignField: "decks_id", as: "decks_cards" } },

            { $lookup: { from: "cards", localField: "decks_cards.cards_id", foreignField: "_id", as: "cards" } },

            { $project: { email: 0, password: 0, users_decks: 0 } }
        ])

        // EXIT: SUCCESS
        return res.status(200).json({
            success: false,
            data: data
        });
    } catch (err) {
        console.log("Error", err)

        // EXIT: Error
        return res.status(500).send({
            message: "Error",
        });
    }

}

export {
    download_get
}