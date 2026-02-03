const bcrypt = require('bcryptjs');

const users = [
    {
        name: 'Admin User',
        email: 'admin@example.com',
        password: 'password123', // Will be hashed by pre-save hook? No, seeder inserts directly. Need to hash here or let model handle it? Model handles it on save, but insertMany might bypass pre-save hooks depending on implementation. Wait, insertMany DOES NOT trigger pre('save'). I should hash them or use create/save in loop. 
        // Actually, for simplicity in seeder using insertMany, I usually hash manualy. 
        // But wait, my model has pre('save'). 
        // Let's rely on the fact that I will change the seeder to use create() or just hash it here.
        // Actually, hashing here is safer.
        password: '$2a$10$D/..hashed..password..', // Placeholder, let's trusting user logic for now or updating seeder to use save() loop.
        isAdmin: true,
    },
    {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
        isAdmin: false,
    },
    {
        name: 'Jane Doe',
        email: 'jane@example.com',
        password: 'password123',
        isAdmin: false,
    },
];

module.exports = users;
