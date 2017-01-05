from flask_restplus import fields
from little_hero_rest_api.api.restplus import api

child_for_post = api.model('Child for post', {
    'login': fields.String(required=True, description='Child login'),
    'nickname': fields.String(required=True, description='Child nickname'),
    'password': fields.String(required=True, description='Child password'),
    'mail': fields.String(required=True, description='Child e-mail')
})


child_full = api.clone('Child entity', child_for_post, {
    'id': fields.Integer(readOnly=True, description='Id of child'),
})

child_for_patch = api.model('Child entity for patch request', {
    'login': fields.String(description='Child login'),
    'nickname': fields.String(description='Child nickname'),
    'password': fields.String(description='Child password'),
    'mail': fields.String(description='Child e-mail')
})

avatar_for_post = api.model('Avatar for post', {
    'name': fields.String(required=True, description='Avatar name'),
    'clazz': fields.String(required=True, description='Avatar class'),
    'child_id': fields.Integer(required=True, description='Id of avatars owner (child)'),
    'tutor_id': fields.Integer(required=True, description='Id of tutors related to avatar'),
    'level': fields.Integer(required=True, description='Avatar level'),
    'money': fields.Integer(required=True, description='Avatar money'),
    'health': fields.Integer(required=True, description='Avatar health'),
    'experience': fields.Integer(requried=True, description='Avatar experience points')
})

avatar_full = api.clone('Avatar entity', avatar_for_post, {
    'id': fields.Integer(readOnly=True, description='Id of avatar'),
    'update_task': fields.Boolean(required=True, description='Flag indicating if update of task is required'),
    'update_invitation': fields.Boolean(required=True, description='Flag indicating if invitations changed'),
    'update_notification': fields.Boolean(required=True, description='Flag indicating if notification is required'),
})

avatar_for_patch = api.model('Avatar entity for patch request', {
    #'id': fields.Integer(readOnly=True, description='Id of avatar'),
    'name': fields.String(description='Avatar name'),
    'clazz': fields.String(description='Avatar class'),
    'update_task': fields.Boolean(description='Flag indicating if update of task is required'),
    'update_invitation': fields.Boolean(description='Flag indicating if invitations changed'),
    'update_notification': fields.Boolean(description='Flag indicating if notification is required'),
    'child_id': fields.Integer(description='Id of avatars owner (child)'),
    'tutor_id': fields.Integer(description='Id of tutors related to avatar'),
    'level': fields.Integer(description='Avatar level'),
    'money': fields.Integer(description='Avatar money'),
    'health': fields.Integer(description='Avatar health'),
    'experience': fields.Integer(description='Avatar experience points')
})

avatar_item_for_post = api.model('Avatar-Item for post', {
    'avatar_id': fields.Integer(required=True, description='Avatar id'),
    'item_id': fields.Integer(required=True, description='Item id'),
    'state': fields.String(required=True, description='State of item (on, bought, available, unavailable)')
})

avatar_item_full = api.clone('Avatar-Item entity', avatar_item_for_post, {
    'id': fields.Integer(readOnly=True, description='Id of avatar-item'),
})

avatar_item_for_patch = api.model('Avatar-Item entity for patch request', {
    #'id': fields.Integer(readOnly=True, description='Id of avatar-item'),
    'avatar_id': fields.Integer(description='Avatar id'),
    'item_id': fields.Integer(description='Item id'),
    'state': fields.String(description='State of item (on, bought, available, unavailable)')
})

tutor_for_post = api.model('Tutor for post', {
    'login': fields.String(description='Tutor login'),
    'password': fields.String(required=True, description='Tutor password'),
    'mail': fields.String(required=True, description='Tutor e-mail')
})

tutor_full = api.clone('Tutor entity', tutor_for_post, {
    'id': fields.Integer(readOnly=True, description='Id of tutor'),
})

tutor_for_patch = api.model('Tutor entity for patch request', {
    #'id': fields.Integer(readOnly=True, description='Id of tutor'),
    'password': fields.String(description='Tutor password'),
    'mail': fields.String(description='Tutor e-mail')
})

task_for_post = api.model('Task for post', {
    'content': fields.String(required=True, description='Description of task'),
    'avatar_id': fields.Integer(required=True, description='Id of avatar who was given this task'),
    'tutor_id': fields.Integer(required=True, description='Id of tutor who was gave the task'),
    'experience': fields.Integer(required=True, description='Experience to be gained after completing task'),
    'reward': fields.Integer(required=True, description='Money reward after completing task'),
})

task_full = api.clone('Task entity', task_for_post, {
    'id': fields.Integer(readOnly=True, description='Id of item'),
})

task_for_patch = api.model('Task entity for patch request', {
    #'id': fields.Integer(readOnly=True, description='Id of item'),
    'content': fields.String(description='Description of task'),
    'avatar_id': fields.Integer(description='Id of avatar who was given this task'),
    'tutor_id': fields.Integer(description='Id of tutor who was gave the task'),
    'experience': fields.Integer(description='Experience to be gained after completing task'),
    'reward': fields.Integer(description='Money reward after completing task'),
})

item_for_post = api.model('Item for post', {
    'price': fields.Integer(required=True, description='Item price'),
    'level': fields.Integer(required=True, description='Item level. Item is available from this level.'),
    'clazz': fields.String(required=True, description='Item class'),
    'type': fields.String(required=True, description='Item type'),
    'imgSrc': fields.String(required=True, description='Path to item image'),
    'iconSrc': fields.String(required=True, description='Path to item icon')
})

item_full = api.clone('Item entity', item_for_post, {
    'id': fields.Integer(readOnly=True, description='Id of item'),
})

item_for_patch = api.model('Item entity for patch request', {
    'price': fields.Integer(description='Item price'),
    'level': fields.Integer(description='Item level. Item is available from this level.'),
    'clazz': fields.String(description='Item class'),
    'type': fields.String(description='Item type'),
    'imgSrc': fields.String(description='Path to item image'),
    'iconSrc': fields.String(description='Path to item icon')
})

child_invitation_for_post = api.model('Child invitation for post', {
    'kind': fields.String(required=True, description='Type of invitation'),
    'tutor_id': fields.Integer(required=True, description='Tutor id')
})

tutor_invitation_for_post = api.model('Tutor invitation for post', {
    'kind': fields.String(required=True, description='Type of invitation'),
    'child_id': fields.Integer(required=True, description='Child id')
})

invitation_full = api.model('Invitation entity', {
    'id': fields.Integer(readOnly=True, description='Id of item'),
    'kind': fields.String(required=True, description='Type of invitation'),
    'status': fields.String(required=True, description='Status of invitation'),
    'child_id': fields.Integer(required=True, description='Child id'),
    'tutor_id': fields.Integer(required=True, description='Tutor id')
})

invitation_for_patch = api.model('Invitation for patch', {
    'status': fields.String(description='Status of invitation')
})

notification_for_patch = api.model('Notification for patch', {
    'avatar_id': fields.Integer(description='Id of avatar who has that notification'),
    'content': fields.String(description='Content of notification')
})

notification_for_post = api.model('Notification for post', {
    'content': fields.String(required=True, description='Content of notification')
})

notification_full = api.clone('Full notification', notification_for_post, {
    'id': fields.Integer(readOnly=True, description='Id of notification'),
    'avatar_id': fields.Integer(required=True, description='Id of avatar who has that notification')
})


