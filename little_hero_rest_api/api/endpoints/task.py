import logging

from flask import request
from little_hero_rest_api.api.restplus import api
from flask_restplus import Resource
from little_hero_rest_api.api.serializers import task
from little_hero_rest_api.api.serializers import task_for_patch
from little_hero_rest_api.dao.task import TaskDAO

log = logging.getLogger(__name__)

ns = api.namespace('v1/tasks', description='Operations related to tasks')
DAO = TaskDAO()


@ns.route('/')
class TasksCollection(Resource):
    """Show a list of all tasks and lets you POST to add new task."""
    @ns.param('avatar_id', 'For filtering by avatar id', 'query')
    @ns.param('tutor_id', 'For filtering by tutor id', 'query')
    @api.marshal_list_with(task)
    def get(self):
        """Returns list of tasks or filtered list of task given avatar id or tutor id."""
        avatar_id = request.args.get('avatar_id')
        tutor_id = request.args.get('tutor_id')
        tasks = DAO.get_all(avatar_id, tutor_id)
        return tasks

    @api.response(201, 'task created.')
    @api.expect(task)
    @ns.marshal_with(task)
    def post(self):
        """Create task"""
        data = request.json
        return DAO.create(data), 201


@ns.route('/<int:id>')
@ns.response(404, 'Task not found')
@ns.param('id', 'The task identifier')
class Task(Resource):
    """Show a single task entity and lets you delete and update it"""
    @ns.marshal_with(task)
    def get(self, id):
        """Returns task"""
        task = DAO.get(id)
        return task

    @ns.response(204, 'Task deleted')
    def delete(self, id):
        """Delete a task given its identifier"""
        DAO.delete(id)
        return None, 204

    @ns.response(200, 'Task updated')
    @api.expect(task_for_patch)
    @ns.marshal_with(task)
    def patch(self, id):
        """Update task given only its parameters that should be updated"""
        data = request.json
        return DAO.update(id, data), 200
