// In-memory data store
const bloodBankEntries = [
    {
        id: 1,
        donorName: "John Doe",
        age: 30,
        bloodType: "A+",
        contactInfo: "john.doe@example.com",
        quantity: 500,
        collectionDate: "2024-11-15",
        expirationDate: "2024-12-15",
        status: "Available",
    },
    {
        id: 2,
        donorName: "Jane Smith",
        age: 25,
        bloodType: "O-",
        contactInfo: "jane.smith@example.com",
        quantity: 450,
        collectionDate: "2024-11-10",
        expirationDate: "2024-12-10",
        status: "Requested",
    },
    {
        id: 3,
        donorName: "Alice Johnson",
        age: 35,
        bloodType: "B+",
        contactInfo: "alice.johnson@example.com",
        quantity: 600,
        collectionDate: "2024-11-01",
        expirationDate: "2024-12-01",
        status: "Expired",
    },
];

let idCounter = 4;

class BloodBankController {
    // Create new entry
    createEntry(req, res) {
        const { donorName, age, bloodType, contactInfo, quantity, collectionDate, expirationDate, status } = req.body;

        if (!donorName || !age || !bloodType || !contactInfo || !quantity || !collectionDate || !expirationDate || !status) {
            return res.status(400).json({ error: 'All fields are required.' });
        }

        const newEntry = {
            id: idCounter++,
            donorName,
            age,
            bloodType,
            contactInfo,
            quantity,
            collectionDate,
            expirationDate,
            status,
        };
        bloodBankEntries.push(newEntry);
        res.status(201).json(newEntry);
    }

    // Get all entries with pagination
    getAllEntries(req, res) {
        const { page = 1, size = 5 } = req.query;

        const pageNumber = parseInt(page, 10);
        const pageSize = parseInt(size, 10);

        if (isNaN(pageNumber) || isNaN(pageSize) || pageNumber <= 0 || pageSize <= 0) {
            return res.status(400).json({ error: 'Invalid page or size parameter. Must be positive integers.' });
        }

        const startIndex = (pageNumber - 1) * pageSize;
        const endIndex = startIndex + pageSize;

        const paginatedData = bloodBankEntries.slice(startIndex, endIndex);

        res.json({
            page: pageNumber,
            size: pageSize,
            totalEntries: bloodBankEntries.length,
            totalPages: Math.ceil(bloodBankEntries.length / pageSize),
            data: paginatedData,
        });
    }

    // Search entries
    searchEntries(req, res) {
        const { bloodType, status, donorName } = req.query;
        let results = [...bloodBankEntries];

        if (bloodType) {
            results = results.filter(entry => entry.bloodType === bloodType);
        }

        if (status) {
            results = results.filter(entry => entry.status === status);
        }

        if (donorName) {
            results = results.filter(entry => 
                entry.donorName.toLowerCase().includes(donorName.toLowerCase())
            );
        }

        res.json(results);
    }

    // Get entry by ID
    getEntryById(req, res) {
        const { id } = req.params;
        const entry = bloodBankEntries.find((entry) => entry.id === parseInt(id));
        if (!entry) return res.status(404).json({ error: 'Entry not found.' });
        res.json(entry);
    }

    // Update entry
    updateEntry(req, res) {
        const { id } = req.params;
        const { donorName, age, bloodType, contactInfo, quantity, collectionDate, expirationDate, status } = req.body;

        const entry = bloodBankEntries.find((entry) => entry.id === parseInt(id));
        if (!entry) return res.status(404).json({ error: 'Entry not found.' });

        if (donorName) entry.donorName = donorName;
        if (age) entry.age = age;
        if (bloodType) entry.bloodType = bloodType;
        if (contactInfo) entry.contactInfo = contactInfo;
        if (quantity) entry.quantity = quantity;
        if (collectionDate) entry.collectionDate = collectionDate;
        if (expirationDate) entry.expirationDate = expirationDate;
        if (status) entry.status = status;

        res.json(entry);
    }

    // Delete entry
    deleteEntry(req, res) {
        const { id } = req.params;
        const index = bloodBankEntries.findIndex((entry) => entry.id === parseInt(id));
        if (index === -1) return res.status(404).json({ error: 'Entry not found.' });

        bloodBankEntries.splice(index, 1);
        res.status(200).json({ message: 'Entry deleted successfully.' });
    }
}

module.exports = new BloodBankController();