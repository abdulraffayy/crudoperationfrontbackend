import { Router, RequestHandler } from 'express';
import { getUsers, getUser, createUser, updateUser, deleteUser } from '../controllers/userController';

const router = Router();

// Define all routes
router.get('/users', getUsers as RequestHandler);
router.get('/users/:id', getUser as RequestHandler);
router.post('/users', createUser as RequestHandler);
router.put('/users/:id', updateUser as RequestHandler);
router.delete('/users/:id', deleteUser as RequestHandler);

export default router;
