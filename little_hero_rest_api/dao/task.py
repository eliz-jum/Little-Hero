from little_hero_rest_api.database import db
from little_hero_rest_api.database.models import Task
from little_hero_rest_api.dao.avatar import AvatarDAO
from little_hero_rest_api.dao.tutor import TutorDAO
from little_hero_rest_api.dao.generic import GenericDAO
from datetime import datetime

class TaskDAO(GenericDAO):

    avatar_dao = AvatarDAO()
    tutor_dao = TutorDAO()

    def __init__(self):
        super().__init__(Task)

    def get_all(self, avatar_id, tutor_id):
        if avatar_id and tutor_id:
            return Task.query.filter_by(avatar_id=avatar_id, tutor_id=tutor_id).all()
        if avatar_id:
            return Task.query.filter_by(avatar_id=avatar_id).all()
        if tutor_id:
            return Task.query.filter_by(tutor_id=tutor_id).all()
        return super().get_all()

    def create(self, data):
        content = data.get('content')
        avatar_id = data.get('avatar_id')
        avatar = self.avatar_dao.get(avatar_id)
        tutor_id = data.get('tutor_id')
        tutor = self.tutor_dao.get(tutor_id)
        difficulty = data.get('difficulty')
        experience = data.get('experience')
        is_completed = data.get('is_completed')
        is_archived = data.get('is_archived')
        reward = data.get('reward')

        task = Task(content, avatar, tutor, difficulty, experience, is_completed, is_archived, reward)

        db.session.add(task)
        db.session.commit()

        return task

    def update(self, id, data):
        content = data.get('content')
        avatar_id = data.get('avatar_id')
        tutor_id = data.get('tutor_id')
        difficulty = data.get('difficulty')
        experience = data.get('experience')
        is_completed = data.get('is_completed')
        is_archived = data.get('is_archived')
        reward = data.get('reward')

        query = Task.query.filter_by(id=id)
        task = query.one()

        completed_date = None
        if not task.is_completed and not is_completed:
            completed_date = datetime.utcnow()

        if content:
            query.update({Task.content: content})
        if avatar_id:
            #avatar = self.avatar_dao.get(avatar_id)
            query.update({Task.avatar: avatar_id})
        if tutor_id:
            #tutor = self.tutor_dao.get(tutor_id)
            query.update({Task.tutor: tutor_id})
        if difficulty:
            query.update({Task.difficulty: difficulty})
        if experience:
            query.update({Task.experience: experience})
        if is_completed:
            query.update({Task.is_completed: is_completed})
        if is_archived:
            query.update({Task.is_archived: is_archived})
        if reward:
            query.update({Task.reward: reward})
        if completed_date:
            query.update({Task.completed_date: completed_date})

        db.session.commit()
