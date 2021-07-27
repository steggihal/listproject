from backend.db import get_db_conn
from psycopg2.extras import RealDictCursor


def load(self):
    conn = get_db_conn()
    cursor = conn.cursor(cursor_factory=RealDictCursor)
    query = """
        SELECT * FROM directory.public.validusers;
        """
    cursor.execute(query)
    data = cursor.fetchall()
    return data

