import {repository} from '@loopback/repository';
import {post, requestBody, HttpErrors} from '@loopback/rest';
import {UserRepository} from '../repositories';
import {User} from '../models';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';

const JWT_SECRET = process.env.JWT_SECRET || 'my-secret-key';

export class AuthController {
  constructor(
    @repository(UserRepository)
    public userRepository: UserRepository,
  ) {}

    // User Signup
  
  @post('/signup')
  async signup(
    @requestBody({
      content: {
        'application/json': {
          schema: {
            type: 'object',
            required: ['email', 'password', 'role'],
            properties: {
              email: {type: 'string'},
              password: {type: 'string'},
              role: {type: 'string', enum: ['ADMIN', 'USER']},
            },
          },
        },
      },
    })
    userData: {email: string; password: string; role: string},
  ): Promise<User> {
    // Check if user already exists
    const existingUser = await this.userRepository.findOne({
      where: {email: userData.email},
    });
    if (existingUser) {
      throw new HttpErrors.Conflict('Email already in use');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    // Create user
    const newUser = await this.userRepository.create({
      email: userData.email,
      password: hashedPassword,
      role: userData.role,
    });

    return newUser;
  }

 // User login
  @post('/login')
  async login(
    @requestBody({
      content: {
        'application/json': {
          schema: {
            type: 'object',
            required: ['email', 'password'],
            properties: {
              email: {type: 'string'},
              password: {type: 'string'},
            },
          },
        },
      },
    })
    credentials: {email: string; password: string},
  ): Promise<{token: string}> {
    // Find user by email
    const user = await this.userRepository.findOne({
      where: {email: credentials.email},
    });

    if (!user) {
      throw new HttpErrors.Unauthorized('Invalid email or password');
    }

    // Compare passwords
    const passwordMatched = await bcrypt.compare(credentials.password, user.password);
    if (!passwordMatched) {
      throw new HttpErrors.Unauthorized('Invalid email or password');
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      JWT_SECRET,
      { expiresIn: 3600 }, 
    );
    

    return {token};
  }
}