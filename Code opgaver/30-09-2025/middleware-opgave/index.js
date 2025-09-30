const express = require('express');
const app = express();

app.use((req, res, next) => {
    const start = Date.now();
    res.on('finish', () => {
        const duration = Date.now() - start;
        console.log(`${new Date().toISOString()} ${req.method} ${req.path} - ${duration}ms`);
    });

    next();
});

app.use(express.json());

const authMiddleware = (req, res, next) => {
    // Hent Authorization header
    const authHeader = req.get('Authorization');
    // Check om header findes
    if (!authHeader) {
        return res.status(401).json({
            error: 'Authorization header mangler'
        });
    }
    // Valider token
    if (authHeader !== 'Bearer secret123') {
        return res.status(401).json({
            error: 'Ugyldig token'
        });
    }
    // Tilføj user info til request
    req.user = { id: 1, name: 'John Doe', role: 'admin' };
    next();
};





app.get('/', (req, res) => {
    res.json({ message: 'Middleware opgave' });
});

app.listen(3000, () => {
    console.log('Server kører på http://localhost:3000');
});




// Offentlig route - ingen auth nødvendig
app.get('/public', (req, res) => {
    res.json({ message: 'Denne side er offentlig for alle' });
});
// Beskyttet route - kræver auth
app.get('/protected', authMiddleware, (req, res) => {
    res.json({
        message: 'Du er inde i det beskyttede område!',
        user: req.user
    });
});
// Dashboard - også beskyttet
app.get('/dashboard', authMiddleware, (req, res) => {
    res.json({
        message: `Velkommen til dashboard, ${req.user.name}`,
        data: {
            stats: { users: 42, posts: 128 }
        }
    });
});



const validateUser = (req, res, next) => {
    const { name, email, age } = req.body;
    const errors = [];
    // Valider name
    if (!name) {
        errors.push('Name er påkrævet');
    } else if (name.length < 2) {
        errors.push('Name skal være mindst 2 tegn');

    }
    // Valider email
    if (!email) {
        errors.push('Email er påkrævet');
    } else if (!email.includes('@')) {
        errors.push('Email skal indeholde @');
    }
    // Valider age (valgfrit felt)
    if (age !== undefined) {
        const ageNum = parseInt(age);
        if (isNaN(ageNum) || ageNum < 18 || ageNum > 100) {
            errors.push('Age skal være mellem 18 og 100');
        }
    }
    // Hvis der er fejl, send 400 response
    if (errors.length > 0) {
        return res.status(400).json({
            error: 'Validation fejlede',
            details: errors
        });
    }
    // Alt er OK, fortsæt
    next();
};
// Route med validation
app.post('/users', validateUser, (req, res) => {
    res.status(201).json({
        message: 'User oprettet succesfuldt',
        user: req.body
    });
});



app.post('/admin/users',
    authMiddleware, // Check auth først
    validateUser, // Derefter valider input
    (req, res) => {
        res.status(201).json({
            message: 'Admin user created succesfuldt',
            user: req.body,
            createdBy: req.user.name
        });
    }
);




app.use((err, req, res, next) => {
    // Log fejl til console
    console.error('Error:', err.message);
    console.error('Stack:', err.stack);
    // Send response til client
    const statusCode = err.status || 500;
    res.status(statusCode).json({
        error: true,
        message: err.message,
        status: statusCode,
        // Kun vis stack trace i development
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
});
app.get('/error', (req, res, next) => {
    const error = new Error('Noget gik galt!');
    error.status = 500;
    next(error); // Send til error handler
});
// Route med database "fejl"
app.get('/db-error', (req, res, next) => {
    const error = new Error('Database forbindelse fejlede');
    error.status = 503;
    next(error);
});
// Route der simulerer 404
app.get('/users/:id', (req, res, next) => {
    const id = req.params.id;
    // Simuler at user ikke findes
    if (id === '999') {
        const error = new Error('User ikke fundet');
        error.status = 404;
        return next(error);
    }
    res.json({ user: { id, name: 'John' } });
});

app.use((req, res) => {
    res.json({
        code: 404,
        error: 'Page not found'
    });
});