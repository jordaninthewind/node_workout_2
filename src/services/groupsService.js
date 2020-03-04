import { Group } from '../database/models';

class GroupsService {
  createGroup(name, permissions) {
    this.group = Group.create({ name, permissions });
    return this.group;
  }

  // eslint-disable-next-line class-methods-use-this
  getAllGroups() {
    return Group.findAll({ order: [['id', 'DESC']] });
  }

  updateGroup(id, query) {
    const currentGroup = this.getGroup(id);
    if (currentGroup) {
      return Group.update(query, { where: { id } });
    }
    return false;
  }

  deleteGroup(id) {
    const currentGroup = this.getGroup(id);
    if (currentGroup) {
      return Group.destroy({ where: { id } });
    }
    return false;
  }

  async getGroup(id) {
    this.currentGroup = await Group.findAll({ where: { id } });
    if (this.currentGroup) {
      return this.currentGroup;
    }

    return false;
  }
}

export default GroupsService;
