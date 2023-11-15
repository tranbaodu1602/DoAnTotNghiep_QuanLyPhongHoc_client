const GiaoVien = require('../services/GiaoVienService');

const themGiaoVien = async (req, res) => {
    try {
        const GV = await GiaoVien.themGiaoVien(req.body);
        res.status(200).json({
            GV,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    themGiaoVien,
};
