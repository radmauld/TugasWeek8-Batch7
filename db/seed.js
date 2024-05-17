const pool = require("../config/config.js");
const seedActors = async () => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        
        const queryText = `
            INSERT INTO actor (first_name, last_name)
            VALUES ($1, $2)
            RETURNING actor_id
        `;

        const actors = [
            ['John', 'Doe'],
            ['Jane', 'Smith'],
            ['Alice', 'Johnson'],
            ['Bob', 'Brown']
        ];

        for (let actor of actors) {
            const res = await client.query(queryText, actor);
            console.log('Inserted actor with ID:', res.rows[0].actor_id);
        }

        await client.query('COMMIT');
    } catch (err) {
        await client.query('ROLLBACK');
        console.error('Error seeding actors:', err);
    } finally {
        client.release();
    }
};

seedActors().catch(err => console.error('Error in seeding script:', err));