

import express from 'express'
import { createComment, deleteComment, getComments,  updateComment } from '../controllers/CommentsController.js'
import authMiddleWare from '../middleware/AuthMiddleware.js'
const router = express.Router()





// comments routes 

router.post('/',createComment)
router.get('/:postId',getComments)
router.put('/:commentId',updateComment)
router.delete('/:commentId',deleteComment)


export default router