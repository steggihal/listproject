from backend.db import get_db_conn
from psycopg2.extras import RealDictCursor


class ItemDatabase:
    def load(self):
        conn = get_db_conn()
        cursor = conn.cursor(cursor_factory=RealDictCursor)
        query = """
        SELECT * FROM directory.public.todoitems;
        """
        cursor.execute(query)
        data = cursor.fetchall()
        return data

    def save(self, new_task):
        conn = get_db_conn()
        cursor = conn.cursor(cursor_factory=RealDictCursor)
        query = """
        INSERT INTO directory.public.todoitems (task) 
         VALUES (%(task)s)"""
        cursor.execute(query,
                       dict(task=new_task['task'])
                       )
        conn.commit()

    def update_status(self, tobeupdated):
        conn = get_db_conn()
        cursor = conn.cursor(cursor_factory=RealDictCursor)
        query = """
        UPDATE directory.public.todoitems set status=true where (%(index)s)=id"""
        cursor.execute(query,
                       dict(index=tobeupdated['id'])
                       )
        conn.commit()

    def return_items(self):
        conn = get_db_conn()
        cursor = conn.cursor(cursor_factory=RealDictCursor)
        query = """
        SELECT * FROM directory.public.todoitems where status=false;
        """
        cursor.execute(query)
        data = cursor.fetchall()
        return data
pass
