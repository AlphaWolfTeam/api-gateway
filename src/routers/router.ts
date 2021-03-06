import { Router } from 'express';
import config from '../config';
import { IGroup, User } from '../group/group.interface';
import GroupService from '../group/group.service';
import UserService from '../user/user.service';
import { wrapAsync } from '../utils/apm';

const router = Router();

// Get group by ID
router.get('/groups/:id', wrapAsync(async (req, res) => {
  const groupID = req.params.id;
  const requesterID = req.headers[config.userHeader] as string;

  const axiosRes = await GroupService.getByID(groupID, requesterID);
  const group = axiosRes.data as IGroup;
  const members = group.users;
  let isPartialContent = false;

  const populatedUsers = await Promise.all(members.map(async (member: User) => {
    try {
      const userAxiosRes = await UserService.getByID(member.id);
      return { ...member, user: userAxiosRes.data };
    } catch {
      isPartialContent = true;
      return member;
    }
  }));
  res
    .status(isPartialContent ? 206 : 200)
    .send({ ...group, users: populatedUsers });
}));

export default router;
