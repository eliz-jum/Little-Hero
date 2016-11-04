from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


def reset_database():
    from app.database.models import Child  # noqa
    db.drop_all()
    db.create_all()
