# Scalable Node.js Backend Architecture Patterns

![Node.js Architecture](https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=1200)

Building scalable Node.js applications requires thoughtful architecture. Let's explore proven patterns for creating maintainable backend systems.

## Layered Architecture

```
┌─────────────────┐
│   Controllers   │ ← HTTP Layer
├─────────────────┤
│    Services     │ ← Business Logic
├─────────────────┤
│  Repositories   │ ← Data Access
├─────────────────┤
│     Models      │ ← Data Models
└─────────────────┘
```

## Controller Layer

```javascript
class UserController {
  constructor(userService) {
    this.userService = userService;
  }

  async createUser(req, res) {
    try {
      const user = await this.userService.createUser(req.body);
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getUser(req, res) {
    try {
      const user = await this.userService.getUserById(req.params.id);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
```

![Backend Development](https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=800)

## Service Layer

```javascript
class UserService {
  constructor(userRepository, emailService) {
    this.userRepository = userRepository;
    this.emailService = emailService;
  }

  async createUser(userData) {
    // Validation
    if (!userData.email) {
      throw new Error('Email is required');
    }

    // Business logic
    const existingUser = await this.userRepository.findByEmail(userData.email);
    if (existingUser) {
      throw new Error('User already exists');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    userData.password = hashedPassword;

    // Create user
    const user = await this.userRepository.create(userData);
    
    // Send welcome email
    await this.emailService.sendWelcomeEmail(user.email);
    
    return user;
  }

  async getUserById(id) {
    return this.userRepository.findById(id);
  }
}
```

## Repository Pattern

```javascript
class UserRepository {
  constructor(database) {
    this.db = database;
  }

  async findByEmail(email) {
    return this.db.users.findOne({ email });
  }

  async create(userData) {
    return this.db.users.create(userData);
  }

  async findById(id) {
    return this.db.users.findById(id);
  }

  async update(id, updateData) {
    return this.db.users.findByIdAndUpdate(id, updateData, { new: true });
  }

  async delete(id) {
    return this.db.users.findByIdAndDelete(id);
  }
}
```

## Dependency Injection

```javascript
// container.js
const container = {
  userRepository: new UserRepository(database),
  emailService: new EmailService(),
  userService: null,
  userController: null
};

container.userService = new UserService(
  container.userRepository,
  container.emailService
);

container.userController = new UserController(
  container.userService
);

module.exports = container;
```

![Server Architecture](https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&w=800)

## Error Handling Middleware

```javascript
const errorHandler = (error, req, res, next) => {
  console.error(error.stack);

  if (error.name === 'ValidationError') {
    return res.status(400).json({
      error: 'Validation Error',
      details: error.details
    });
  }

  if (error.name === 'UnauthorizedError') {
    return res.status(401).json({
      error: 'Unauthorized'
    });
  }

  if (error.name === 'CastError') {
    return res.status(400).json({
      error: 'Invalid ID format'
    });
  }

  res.status(500).json({
    error: 'Internal Server Error'
  });
};

module.exports = errorHandler;
```

## Middleware Pattern

```javascript
// Authentication middleware
const authenticate = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ error: 'Access denied' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

// Rate limiting middleware
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP'
});
```

## Configuration Management

```javascript
// config/index.js
const config = {
  development: {
    port: process.env.PORT || 3000,
    database: {
      url: process.env.DB_URL || 'mongodb://localhost:27017/myapp-dev'
    },
    jwt: {
      secret: process.env.JWT_SECRET || 'dev-secret'
    }
  },
  production: {
    port: process.env.PORT,
    database: {
      url: process.env.DB_URL
    },
    jwt: {
      secret: process.env.JWT_SECRET
    }
  }
};

module.exports = config[process.env.NODE_ENV || 'development'];
```

## Testing Strategy

```javascript
// Unit test example
const UserService = require('../services/UserService');

describe('UserService', () => {
  let userService;
  let mockUserRepository;
  let mockEmailService;

  beforeEach(() => {
    mockUserRepository = {
      findByEmail: jest.fn(),
      create: jest.fn()
    };
    mockEmailService = {
      sendWelcomeEmail: jest.fn()
    };
    
    userService = new UserService(mockUserRepository, mockEmailService);
  });

  test('should create user successfully', async () => {
    const userData = { email: 'test@example.com', password: 'password' };
    mockUserRepository.findByEmail.mockResolvedValue(null);
    mockUserRepository.create.mockResolvedValue({ id: 1, ...userData });

    const result = await userService.createUser(userData);

    expect(result).toBeDefined();
    expect(mockEmailService.sendWelcomeEmail).toHaveBeenCalled();
  });
});
```

These architectural patterns help create maintainable, testable, and scalable Node.js applications that can grow with your business needs. The key is to maintain clear separation of concerns and follow SOLID principles throughout your codebase.