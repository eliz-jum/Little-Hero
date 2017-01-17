from little_hero_rest_api.database import db
from little_hero_rest_api.database.models import Task
from little_hero_rest_api.dao.avatar import AvatarDAO
from little_hero_rest_api.dao.tutor import TutorDAO
from little_hero_rest_api.dao.generic import GenericDAO


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
        reward = data.get('reward')

        task = Task(content, avatar, tutor, difficulty, experience, reward)

        db.session.add(task)
        db.session.commit()

        return task

    def update(self, id, data):
        content = data.get('content')
        avatar_id = data.get('avatar_id')
        tutor_id = data.get('tutor_id')
        difficulty = data.get('difficulty')
        experience = data.get('experience')
        reward = data.get('reward')

        task = Task.query.filter_by(id=id).one()

        if content:
            task.content = content
        if isinstance(avatar_id, int):
            avatar = self.avatar_dao.get(avatar_id)
            task.avatar = avatar
        if isinstance(tutor_id, int):
            tutor = self.tutor_dao.get(tutor_id)
            task.tutor = tutor
        if isinstance(difficulty, int):
            task.difficulty = difficulty
        if isinstance(experience, int):
            task.experience = experience
        if isinstance(reward, int):
            task.reward = reward

        db.session.commit()

        return task
