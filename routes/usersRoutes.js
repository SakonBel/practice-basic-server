import express from 'express';
import {
  getUsers,
  postUsers,
  updateUsers,
  deleteUsers,
} from '../controllers/usersController.js';

const router = express.Router();

router.route('/').get(getUsers).post(postUsers);
router.route('/:id').patch(updateUsers).delete(deleteUsers);

export default router;
