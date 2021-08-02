import psycopg2
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import create_engine
from sqlalchemy.engine.url import URL


def get_db_conn():
    return psycopg2.connect(
        host="localhost",
        database="directory",
        port=5432,
        user="sampada",
        password="Saga@123"
    )


db = SQLAlchemy()
