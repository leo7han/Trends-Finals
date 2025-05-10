import OverallStat from "../models/OverallStat.js";

export const getSales = async (req, res) => {
  try {
    //find overallstats
    const overallStats = await OverallStat.find();

    //return it
    res.status(200).json(overallStats[0]);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
