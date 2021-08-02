from backend.db import get_db_conn
from flask.views import MethodView
from psycopg2.extras import RealDictCursor


class UserDatabase:
    def load(self):
        conn = get_db_conn()
        cursor = conn.cursor(cursor_factory=RealDictCursor)
        query = """
        SELECT * FROM directory.public.users;
        """
        cursor.execute(query)
        data = cursor.fetchall()
        return data

pass